import Link from "next/link";

// Shared shell for the intake pages: a two-column layout with a full, clearly
// visible banner image beside the form. Stacks (image on top) on mobile.
export function RequestPageLayout({
    crumbLabel,
    crumbHref,
    title,
    description,
    image,
    imageAlt,
    children,
}: {
    crumbLabel: string;
    crumbHref: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
            <nav className="text-[12px] font-semibold text-text-muted mb-6 flex items-center gap-1.5">
                <Link href="/" className="hover:text-brand-primary">Home</Link><span>/</span>
                <Link href={crumbHref} className="hover:text-brand-primary">{crumbLabel}</Link><span>/</span>
                <span className="text-text-secondary">{title}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Image — full and visible, sticky beside the form on desktop */}
                <div className="lg:sticky lg:top-24">
                    <img
                        src={image}
                        alt={imageAlt}
                        className="w-full h-56 sm:h-72 lg:h-[600px] object-cover rounded-2xl border border-border-card shadow-xl"
                    />
                </div>

                {/* Heading + form */}
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-text-primary">{title}</h1>
                    <p className="mt-3 text-text-secondary leading-relaxed">{description}</p>
                    <div className="mt-6 rounded-2xl border border-border-card bg-surface-card p-6 sm:p-8 shadow-lg">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
