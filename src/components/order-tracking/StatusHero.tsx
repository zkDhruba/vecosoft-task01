import { Bike } from "lucide-react";
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
  { shell: string; eyebrow: string; title: string; eta: string; badge: string }
> = {
  normal: {
    shell: "border-line bg-surface",
    eyebrow: "text-muted",
    title: "text-foreground",
    eta: "text-brand",
    badge: "bg-brand-soft text-brand",
  },
  delayed: {
    shell: "border-orange-200 bg-[#fff6ef]",
    eyebrow: "text-orange-700/80",
    title: "text-foreground",
    eta: "text-brand-dark",
    badge: "bg-orange-100 text-brand-dark",
  },
  tracking_unavailable: {
    shell: "border-line bg-surface",
    eyebrow: "text-muted",
    title: "text-foreground",
    eta: "text-muted",
    badge: "bg-[#f3f1ee] text-muted",
  },
  delivered_not_received: {
    shell: "border-line bg-surface",
    eyebrow: "text-muted",
    title: "text-foreground",
    eta: "text-sage",
    badge: "bg-sage-soft text-sage",
  },
};

export function StatusHero({ hero, variant }: StatusHeroProps) {
  const tone = heroTone[variant];

  return (
    <section
      aria-labelledby="tracking-status-heading"
      className={`relative overflow-hidden rounded-3xl border px-5 py-5 shadow-[var(--shadow-card)] ${tone.shell}`}
    >
      <div className="relative z-10 max-w-[70%]">
        <p className={`text-xs font-semibold uppercase tracking-[0.12em] ${tone.eyebrow}`}>
          Estimated delivery
        </p>
        <h2
          id="tracking-status-heading"
          className={`mt-2 font-display text-[1.75rem] leading-tight font-semibold tracking-tight ${tone.title}`}
        >
          {hero.statusLabel}
        </h2>
        <p className={`mt-2 text-sm font-semibold ${tone.eta}`}>{hero.etaLabel}</p>
      </div>

      <div
        className={`absolute top-4 right-4 flex size-16 items-center justify-center rounded-full ${tone.badge}`}
        aria-hidden
      >
        <Bike className="size-8" strokeWidth={2} />
      </div>
    </section>
  );
}
