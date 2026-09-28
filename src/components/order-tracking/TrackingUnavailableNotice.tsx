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
      className="rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-4"
    >
      <div className="flex gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600">
          <Radar className="size-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-tight text-stone-900">
            {alert.title}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-stone-600">
            {alert.body}
          </p>
          <button
            type="button"
            onClick={onContactSupport}
            className="mt-3 inline-flex text-sm font-medium text-stone-800 underline underline-offset-2"
          >
            {alert.actionLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
