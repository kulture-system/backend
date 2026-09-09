import type { Metadata } from "next";
import Link from "next/link";
import { IntakeForm, type IntakeField } from "@/components/marketing/IntakeForm";
import { facilityServices } from "@/lib/marketing/taxonomy";
import { SITE_STATE } from "@/lib/seo";

const DESC = `Request healthcare staffing for your facility across ${SITE_STATE} — tell us the roles, shifts and timing and we’ll respond quickly.`;

export const metadata: Metadata = {
    title: "Request Staffing for Your Facility",
    description: DESC,
    alternates: { canonical: "/request-staffing" },
    openGraph: { title: "Request Staffing for Your Facility", description: DESC, url: "/request-staffing" },
};

const FIELDS: IntakeField[] = [
    { name: "name", label: "Your name", type: "text", required: true, core: "name" },
    { name: "email", label: "Work email", type: "email", required: true, core: "email" },
    { name: "phone", label: "Phone", type: "tel", core: "phone" },
    { name: "facility", label: "Facility name", type: "text" },
    { name: "facilityType", label: "Facility type", type: "select", options: ["Assisted Living", "Skilled Nursing", "Memory Care", "Nursing Home", "Hospital", "Other"] },
    { name: "city", label: "City", type: "text", placeholder: "e.g. Seattle" },
    { name: "roles", label: "Roles needed", type: "checkboxes", options: facilityServices.filter((s) => !["assisted-living", "skilled-nursing", "memory-care", "behavioral-health", "emergency-staffing"].includes(s.slug)).map((s) => s.name.replace(" Staffing", "")) },
    { name: "shifts", label: "Shifts / schedule needed", type: "text", placeholder: "e.g. weekend NOC, 3 shifts/week" },
    { name: "urgency", label: "How soon?", type: "select", options: ["Urgent — this week", "This month", "Planning ahead"] },
    { name: "notes", label: "Anything else?", type: "textarea", placeholder: "Tell us more about your coverage needs." },
];

export default function RequestStaffingPage() {
    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
            <nav className="text-[12px] font-semibold text-text-muted mb-4 flex items-center gap-1.5">
                <Link href="/" className="hover:text-brand-primary">Home</Link><span>/</span>
                <Link href="/facility-staffing" className="hover:text-brand-primary">Facility Staffing</Link><span>/</span>
                <span className="text-text-secondary">Request Staffing</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-text-primary">Request staffing for your facility</h1>
            <p className="mt-3 text-text-secondary leading-relaxed">{DESC}</p>
            <div className="mt-8 rounded-2xl border border-border-card bg-surface-card p-6 sm:p-8">
                <IntakeForm fields={FIELDS} inquiryType="Facility Staffing Request" submitLabel="Request staffing"
                    successMessage="Thanks — we’ve received your staffing request and will be in touch shortly." />
            </div>
        </div>
    );
}
