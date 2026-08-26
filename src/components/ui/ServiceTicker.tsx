const ITEMS = [
  "Web Design",
  "Development",
  "SEO",
  "Ad Campaigns",
  "AI Automation",
  "Growth Strategy",
];

export default function ServiceTicker() {
  const loopItems = [...ITEMS, ...ITEMS];

  return (
    <section
      className="border-t border-b border-[var(--site-border)] overflow-hidden bg-[var(--site-bg)]"
      aria-hidden="true"
    >
      <div className="flex w-max marquee-track">
        {[...loopItems, ...loopItems].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center py-5 text-[clamp(1.3rem,2.3vw,2.05rem)] text-[var(--site-text-primary)] whitespace-nowrap"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {item}
            <span className="inline-block w-[7px] h-[7px] bg-[var(--site-copper)] rotate-45 mx-[clamp(28px,4vw,52px)]" />
          </span>
        ))}
      </div>
    </section>
  );
}
