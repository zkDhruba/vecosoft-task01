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
      className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-4 text-amber-950"
    >
      <div className="flex gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-200/80 text-amber-900">
          <Clock3 className="size-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-tight">{alert.title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-amber-900/80">
            {alert.body}
          </p>
          <button
            type="button"
            onClick={onContactSupport}
            className="mt-3 inline-flex text-sm font-medium text-amber-950 underline underline-offset-2"
          >
            {alert.actionLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
