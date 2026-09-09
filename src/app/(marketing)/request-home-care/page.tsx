import type { Metadata } from "next";
import Link from "next/link";
import { IntakeForm, type IntakeField } from "@/components/marketing/IntakeForm";
import { SITE_STATE } from "@/lib/seo";

const DESC = `Request in-home care for your loved one across ${SITE_STATE} — tell us what kind of care and when, and we’ll be in touch to help.`;

export const metadata: Metadata = {
    title: "Request Home Care for a Loved One",
    description: DESC,
    alternates: { canonical: "/request-home-care" },
    openGraph: { title: "Request Home Care for a Loved One", description: DESC, url: "/request-home-care" },
};

const FIELDS: IntakeField[] = [
    { name: "name", label: "Your name", type: "text", required: true, core: "name" },
    { name: "email", label: "Email", type: "email", required: true, core: "email" },
    { name: "phone", label: "Phone", type: "tel", core: "phone" },
    { name: "recipient", label: "Who is the care for?", type: "select", options: ["My parent", "My spouse", "Myself", "Another family member", "Other"] },
    { name: "careType", label: "Type of care needed", type: "checkboxes", options: ["Personal Care", "Companion Care", "Respite Care", "Dementia Care", "Overnight Care", "24-Hour Care"] },
    { name: "city", label: "City", type: "text", placeholder: "e.g. Bellevue" },
    { name: "hours", label: "How much care?", type: "select", options: ["A few hours a week", "Daily", "Overnight", "24-hour", "Not sure yet"] },
    { name: "start", label: "When would you like to start?", type: "select", options: ["As soon as possible", "Within a month", "Just exploring options"] },
    { name: "notes", label: "Anything else?", type: "textarea", placeholder: "Tell us about your loved one’s needs." },
];

export default function RequestHomeCarePage() {
    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
            <nav className="text-[12px] font-semibold text-text-muted mb-4 flex items-center gap-1.5">
                <Link href="/" className="hover:text-brand-primary">Home</Link><span>/</span>
                <Link href="/home-care" className="hover:text-brand-primary">Home Care</Link><span>/</span>
                <span className="text-text-secondary">Request Home Care</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-text-primary">Request in-home care</h1>
            <p className="mt-3 text-text-secondary leading-relaxed">{DESC}</p>
            <div className="mt-8 rounded-2xl border border-border-card bg-surface-card p-6 sm:p-8">
                <IntakeForm fields={FIELDS} inquiryType="Home Care Request" submitLabel="Request home care"
                    successMessage="Thanks — we’ve received your request and a care coordinator will reach out shortly." />
            </div>
        </div>
    );
}
