import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongoose';
import EmployeeRecord from '@/models/EmployeeRecord';
import OnboardingForm from '@/models/OnboardingForm';
import OnboardingResponse from '@/models/OnboardingResponse';
import OnboardingInvite from '@/models/OnboardingInvite';
import { rollUpOnboarding } from '@/lib/onboardingProgress';
import { getComplianceRequirements } from '@/lib/compliance';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 20;

async function isAdmin() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return false;
    const role = (session.user as any).role;
    return role === 'admin' || role === 'superadmin';
}

// List of STAFF onboarding entries — existing staff (no application) who were
// invited to onboard. Keyed on the EmployeeRecord: staff invites carry an
// employeeRecordId and no applicationId. Mirrors the candidates list shape so
// the Staff sub-tab can render the same table.
// Filters: ?onboardingStatus (not_started|in_progress|completed), ?q, ?page.
export async function GET(request: Request) {
    try {
        if (!(await isAdmin())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const onboardingStatus = searchParams.get('onboardingStatus') || '';
        const q = (searchParams.get('q') || '').trim();
        const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);

        // Staff invites: employeeRecordId set, no applicationId.
        const invites = await OnboardingInvite.find({ applicationId: null, employeeRecordId: { $ne: null } })
            .select('employeeRecordId applicantEmail applicantName status expiresAt onboardingFormIds requestedDocumentKeys updatedAt')
            .sort({ updatedAt: -1 })
            .lean();

        const recordIds = Array.from(new Set(invites.map((iv: any) => String(iv.employeeRecordId)).filter(Boolean)));
        const [records, responses, complianceReqs] = await Promise.all([
            EmployeeRecord.find({ _id: { $in: recordIds } }).select('staffId email name').lean(),
            OnboardingResponse.find({ employeeRecordId: { $in: recordIds } })
                .select('employeeRecordId onboardingFormId formName order status assignee answeredCount totalCount requiredCount completedAt createdAt updatedAt')
                .sort({ order: 1, createdAt: 1 })
                .lean(),
            getComplianceRequirements(),
        ]);
        const recordById = new Map((records as any[]).map((r) => [String(r._id), r]));
        const reqLabelByKey = new Map((complianceReqs as any[]).map((r) => [r.key, r.label]));

        const formIds = Array.from(new Set(responses.map((r: any) => String(r.onboardingFormId)).filter(Boolean)));
        const forms = formIds.length
            ? await OnboardingForm.find({ _id: { $in: formIds } }).select('name').lean()
            : [];
        const formNameById = new Map((forms as any[]).map((f) => [String(f._id), f.name]));

        const responsesByRecord = new Map<string, any[]>();
        for (const r of responses as any[]) {
            const key = String(r.employeeRecordId);
            if (!responsesByRecord.has(key)) responsesByRecord.set(key, []);
            responsesByRecord.get(key)!.push(r);
        }

        let rows = invites.map((iv: any) => {
            const recordId = String(iv.employeeRecordId);
            const rec = recordById.get(recordId);
            const packet = responsesByRecord.get(recordId) || [];
            const progress = rollUpOnboarding(packet);
            return {
                recordId,
                staffId: rec?.staffId || null,
                applicantName: rec?.name || iv.applicantName || 'Staff member',
                applicantEmail: rec?.email || iv.applicantEmail || '',
                onboardingStatus: progress.status,
                progress,
                onboarding: packet.map((r: any) => ({
                    _id: r._id,
                    onboardingFormId: r.onboardingFormId,
                    formName: formNameById.get(String(r.onboardingFormId)) || r.formName || 'Questionnaire',
                    status: r.status,
                    assignee: r.assignee || 'admin',
                    answeredCount: r.answeredCount || 0,
                    totalCount: r.totalCount || 0,
                    requiredCount: r.requiredCount || 0,
                    completedAt: r.completedAt || null,
                    updatedAt: r.updatedAt,
                })),
                invite: {
                    status: iv.status,
                    expiresAt: iv.expiresAt || null,
                    updatedAt: iv.updatedAt,
                    requestedQuestionnaires: packet
                        .filter((r: any) => r.assignee === 'applicant')
                        .map((r: any) => formNameById.get(String(r.onboardingFormId)) || r.formName || 'Questionnaire'),
                    requestedDocuments: (iv.requestedDocumentKeys || []).map((k: string) => ({ key: k, label: reqLabelByKey.get(k) || k })),
                },
            };
        });

        if (q) {
            const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
            rows = rows.filter((r) => rx.test(r.applicantName) || rx.test(r.applicantEmail) || rx.test(String(r.staffId || '')));
        }
        if (onboardingStatus === 'not_started' || onboardingStatus === 'in_progress' || onboardingStatus === 'completed') {
            rows = rows.filter((r) => r.onboardingStatus === onboardingStatus);
        }

        const total = rows.length;
        const start = (page - 1) * PAGE_SIZE;
        const data = rows.slice(start, start + PAGE_SIZE);

        return NextResponse.json({ data, total, page, pageSize: PAGE_SIZE });
    } catch (error: any) {
        console.error('GET /api/admin/onboarding/staff error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
