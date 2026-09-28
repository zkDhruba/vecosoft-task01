import type {
  StatusHeroViewModel,
  TrackingScreenVariant,
} from "@/lib/order-tracking";

interface StatusHeroProps {
  hero: StatusHeroViewModel;
  variant: TrackingScreenVariant;
}

const heroTone: Record<
  TrackingScreenVariant,
  { shell: string; eyebrow: string; eta: string }
> = {
  normal: {
    shell:
      "bg-teal-800 text-teal-50 shadow-[0_12px_40px_-24px_rgba(19,78,74,0.85)]",
    eyebrow: "text-teal-200/90",
    eta: "text-teal-100",
  },
  delayed: {
    shell:
      "bg-amber-900 text-amber-50 shadow-[0_12px_40px_-24px_rgba(120,53,15,0.75)]",
    eyebrow: "text-amber-200/90",
    eta: "font-medium text-amber-100",
  },
  tracking_unavailable: {
    shell:
      "bg-stone-700 text-stone-50 shadow-[0_12px_40px_-24px_rgba(41,37,36,0.7)]",
    eyebrow: "text-stone-300",
    eta: "text-stone-200",
  },
  delivered_not_received: {
    shell:
      "bg-teal-900 text-teal-50 shadow-[0_12px_40px_-24px_rgba(19,78,74,0.85)]",
    eyebrow: "text-teal-200/90",
    eta: "text-teal-100",
  },
};

export function StatusHero({ hero, variant }: StatusHeroProps) {
  const tone = heroTone[variant];

  return (
    <section
      aria-labelledby="tracking-status-heading"
      className={`rounded-2xl px-5 py-6 ${tone.shell}`}
    >
      <p
        className={`text-xs font-medium uppercase tracking-[0.14em] ${tone.eyebrow}`}
      >
        Current status
      </p>
      <h2
        id="tracking-status-heading"
        className="mt-2 text-2xl font-semibold tracking-tight text-white"
      >
        {hero.statusLabel}
      </h2>
      <p className={`mt-2 text-sm ${tone.eta}`}>{hero.etaLabel}</p>
    </section>
  );
}
