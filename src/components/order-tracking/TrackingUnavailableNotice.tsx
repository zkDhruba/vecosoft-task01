"use client";

import { Radar } from "lucide-react";
import type { TrackingAlertViewModel } from "@/lib/order-tracking";

interface TrackingUnavailableNoticeProps {
  alert: TrackingAlertViewModel;
  onContactSupport: () => void;
}

export function TrackingUnavailableNotice({
  alert,
  onContactSupport,
}: TrackingUnavailableNoticeProps) {
  return (
    <section
      aria-label="Tracking unavailable"
      className="rounded-3xl border border-dashed border-line bg-surface px-4 py-4 shadow-[var(--shadow-card)]"
    >
      <div className="flex gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
          <Radar className="size-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-sm font-semibold tracking-tight text-foreground">
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
