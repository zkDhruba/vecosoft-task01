"use client";

import { TRACKING_PRIMARY_ACTION_LABELS } from "@/lib/order-tracking";
import type { TrackingPrimaryAction } from "@/lib/order-tracking";

interface ActionBarProps {
  primaryAction: TrackingPrimaryAction;
  onPrimaryAction: () => void;
  onContactSupport: () => void;
  onViewDetails: () => void;
  issueReported?: boolean;
}

export function ActionBar({
  primaryAction,
  onPrimaryAction,
  onContactSupport,
  onViewDetails,
  issueReported = false,
}: ActionBarProps) {
  const primaryLabel =
    primaryAction === "report_issue" && issueReported
      ? "View support options"
      : TRACKING_PRIMARY_ACTION_LABELS[primaryAction];

  const handlePrimary = () => {
    if (primaryAction === "report_issue" && issueReported) {
      onContactSupport();
      return;
    }
    onPrimaryAction();
  };

  return (
    <section aria-label="Order actions" className="space-y-2">
      <button
        type="button"
        onClick={handlePrimary}
        className="flex h-12 w-full items-center justify-center rounded-xl bg-stone-900 text-sm font-medium text-white transition hover:bg-stone-800"
      >
        {primaryLabel}
      </button>

      {primaryAction === "report_issue" && !issueReported ? (
        <button
          type="button"
          onClick={onContactSupport}
          className="flex h-12 w-full items-center justify-center rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-800 transition hover:bg-stone-50"
        >
          Contact support
        </button>
      ) : (
        <button
          type="button"
          onClick={onViewDetails}
          className="flex h-12 w-full items-center justify-center rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-800 transition hover:bg-stone-50"
        >
          View order details
        </button>
      )}

      {primaryAction === "report_issue" && !issueReported ? (
        <button
          type="button"
          onClick={onViewDetails}
          className="flex h-11 w-full items-center justify-center text-sm font-medium text-stone-600 transition hover:text-stone-900"
        >
          View order details
        </button>
      ) : null}
    </section>
  );
}
