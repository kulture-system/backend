import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { CtaButtons } from "@/components/marketing/MarketingShell";
import { HubGrid } from "@/components/marketing/HubGrid";
import { facilityServices } from "@/lib/marketing/taxonomy";
import { breadcrumbLd, SITE_STATE } from "@/lib/seo";

const TITLE = "Facility Staffing";
const DESC = `Reliable healthcare staffing for nursing homes, assisted living, memory care and skilled nursing facilities across ${SITE_STATE} — CNAs, caregivers, med techs, LPNs, RNs and 1:1 patient support, including short-notice coverage.`;

export const metadata: Metadata = {
    title: `Healthcare Facility Staffing Agency in ${SITE_STATE}`,
    description: DESC,
    alternates: { canonical: "/facility-staffing" },
    openGraph: { title: `Healthcare Facility Staffing Agency in ${SITE_STATE}`, description: DESC, url: "/facility-staffing" },
};

export default function FacilityStaffingHub() {
    return (
        <>
            <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: TITLE, path: "/facility-staffing" }])} />
            <section className="border-b border-border-card bg-surface-card">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
                    <p className="text-sm font-black uppercase tracking-wider text-brand-primary">For Facilities</p>
                    <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-text-primary max-w-3xl">
                        Dependable healthcare staffing for {SITE_STATE} facilities
                    </h1>
                    <p className="mt-4 text-lg text-text-secondary leading-relaxed max-w-2xl">{DESC}</p>
                    <CtaButtons className="mt-7" />
                </div>
            </section>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
                <h2 className="text-xl font-black text-text-primary mb-6">Staffing services</h2>
                <HubGrid items={facilityServices} basePath="/facility-staffing" />
            </section>
        </>
    );
}
