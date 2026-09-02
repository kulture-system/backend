import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { CtaButtons } from "@/components/marketing/MarketingShell";
import { locations } from "@/lib/marketing/taxonomy";
import { breadcrumbLd, SITE_STATE } from "@/lib/seo";

const TITLE = "Service Areas";
const DESC = `Pristine Health serves communities across ${SITE_STATE} with healthcare staffing for facilities and in-home care for families.`;

export const metadata: Metadata = {
    title: `Service Areas Across ${SITE_STATE}`,
    description: DESC,
    alternates: { canonical: "/locations" },
    openGraph: { title: `Service Areas Across ${SITE_STATE}`, description: DESC, url: "/locations" },
};

export default function LocationsHub() {
    return (
        <>
            <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: TITLE, path: "/locations" }])} />
            <section className="border-b border-border-card bg-surface-card">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-text-primary">Service Areas Across {SITE_STATE}</h1>
                    <p className="mt-4 text-lg text-text-secondary leading-relaxed max-w-2xl">{DESC}</p>
                    <CtaButtons className="mt-7" />
                </div>
            </section>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
                <h2 className="text-xl font-black text-text-primary mb-6">Cities we serve</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {locations.map((l) => (
                        <Link key={l.slug} href={`/locations/${l.slug}`} className="rounded-xl border border-border-card bg-surface-card p-5 hover:border-brand-primary/50 transition-colors">
                            <span className="text-lg font-black text-text-primary">{l.city}</span>
                            <span className="block text-sm text-text-muted">{l.region}</span>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
