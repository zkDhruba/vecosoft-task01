"use client";

import { Clock3 } from "lucide-react";
import type { TrackingAlertViewModel } from "@/lib/order-tracking";

interface DelayBannerProps {
  alert: TrackingAlertViewModel;
  onContactSupport: () => void;
}

export function DelayBanner({ alert, onContactSupport }: DelayBannerProps) {
  return (
    <section
      aria-label="Delivery delay"
      className="rounded-3xl border border-orange-200 bg-[#fff1e8] px-4 py-4 text-foreground shadow-[var(--shadow-card)]"
    >
      <div className="flex gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-white">
          <Clock3 className="size-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-sm font-semibold tracking-tight">
            {alert.title}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">{alert.body}</p>
          <button
            type="button"
            onClick={onContactSupport}
            className="mt-3 inline-flex text-sm font-bold text-brand underline underline-offset-2"
          >
            {alert.actionLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
