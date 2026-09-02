import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { CtaButtons } from "@/components/marketing/MarketingShell";
import { HubGrid } from "@/components/marketing/HubGrid";
import { homeCareServices } from "@/lib/marketing/taxonomy";
import { breadcrumbLd, SITE_STATE } from "@/lib/seo";

const TITLE = "Home Care";
const DESC = `Compassionate in-home care for seniors and families across ${SITE_STATE} — personal care, companion care, respite, dementia support, and 24-hour and overnight care so your loved one can stay safely at home.`;

export const metadata: Metadata = {
    title: `In-Home Senior Care in ${SITE_STATE}`,
    description: DESC,
    alternates: { canonical: "/home-care" },
    openGraph: { title: `In-Home Senior Care in ${SITE_STATE}`, description: DESC, url: "/home-care" },
};

export default function HomeCareHub() {
    return (
        <>
            <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: TITLE, path: "/home-care" }])} />
            <section className="border-b border-border-card bg-surface-card">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
                    <p className="text-sm font-black uppercase tracking-wider text-brand-primary">For Families</p>
                    <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-text-primary max-w-3xl">
                        Caring in-home support so your loved one can stay home
                    </h1>
                    <p className="mt-4 text-lg text-text-secondary leading-relaxed max-w-2xl">{DESC}</p>
                    <CtaButtons className="mt-7" />
                </div>
            </section>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
                <h2 className="text-xl font-black text-text-primary mb-6">Home care services</h2>
                <HubGrid items={homeCareServices} basePath="/home-care" />
            </section>
        </>
    );
}
