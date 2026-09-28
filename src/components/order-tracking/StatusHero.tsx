import type { StatusHeroViewModel } from "@/lib/order-tracking";

interface StatusHeroProps {
  hero: StatusHeroViewModel;
}

export function StatusHero({ hero }: StatusHeroProps) {
  return (
    <section
      aria-labelledby="tracking-status-heading"
      className="rounded-2xl bg-teal-800 px-5 py-6 text-teal-50 shadow-[0_12px_40px_-24px_rgba(19,78,74,0.85)]"
    >
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-teal-200/90">
        Current status
      </p>
      <h2
        id="tracking-status-heading"
        className="mt-2 text-2xl font-semibold tracking-tight text-white"
      >
        {hero.statusLabel}
      </h2>
      <p
        className={`mt-2 text-sm ${
          hero.isDelayed ? "font-medium text-amber-200" : "text-teal-100"
        }`}
      >
        {hero.etaLabel}
      </p>
    </section>
  );
}
