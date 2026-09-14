// Image hero for the hub pages. The banner is shown whole (natural aspect
// ratio, never cropped), with the heading/description and CTA in a band below.
export function MarketingHero({
    image,
    eyebrow,
    title,
    description,
    children,
}: {
    image: string;
    eyebrow?: string;
    title: string;
    description: string;
    children?: React.ReactNode;
}) {
    return (
        <section className="border-b border-border-card bg-surface-card">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-auto rounded-2xl border border-border-card shadow-lg"
                />
            </div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                {eyebrow && <p className="text-sm font-black uppercase tracking-wider text-brand-primary">{eyebrow}</p>}
                <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-text-primary max-w-3xl">{title}</h1>
                <p className="mt-4 text-lg text-text-secondary leading-relaxed max-w-2xl">{description}</p>
                {children}
            </div>
        </section>
    );
}
