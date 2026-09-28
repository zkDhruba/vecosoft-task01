"use client";

import { Headset } from "lucide-react";
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

  const isSupportPrimary =
    primaryAction === "contact_support" ||
    (primaryAction === "report_issue" && issueReported);

  return (
    <section aria-label="Order actions" className="space-y-2">
      <button
        type="button"
        onClick={handlePrimary}
        className={`flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold transition ${
          primaryAction === "report_issue" && !issueReported
            ? "bg-brand text-white hover:bg-brand-dark"
            : "border border-line bg-surface text-foreground hover:bg-brand-soft"
        }`}
      >
        {isSupportPrimary ? <Headset className="size-4" aria-hidden /> : null}
        {primaryLabel}
      </button>

      {primaryAction === "report_issue" && !issueReported ? (
        <button
          type="button"
          onClick={onContactSupport}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-line bg-surface text-sm font-bold text-foreground transition hover:bg-brand-soft"
        >
          <Headset className="size-4" aria-hidden />
          Contact support
        </button>
      ) : (
        <button
          type="button"
          onClick={onViewDetails}
          className="flex h-12 w-full items-center justify-center rounded-2xl border border-line bg-surface text-sm font-bold text-foreground transition hover:bg-brand-soft"
        >
          View order details
        </button>
      )}

      {primaryAction === "report_issue" && !issueReported ? (
        <button
          type="button"
          onClick={onViewDetails}
          className="flex h-11 w-full items-center justify-center text-sm font-bold text-muted transition hover:text-brand"
        >
          View order details
        </button>
      ) : null}
    </section>
  );
}
