"use client";

import { PackageX } from "lucide-react";
import type { TrackingAlertViewModel } from "@/lib/order-tracking";

interface DeliveredNotReceivedPromptProps {
  alert: TrackingAlertViewModel;
  onReportIssue: () => void;
  issueReported?: boolean;
  reportedCaseId?: string | null;
}

export function DeliveredNotReceivedPrompt({
  alert,
  onReportIssue,
  issueReported = false,
  reportedCaseId = null,
}: DeliveredNotReceivedPromptProps) {
  return (
    <section
      aria-label="Delivery issue"
      className="rounded-3xl border border-line bg-foreground px-4 py-4 text-white shadow-[var(--shadow-card)]"
    >
      <div className="flex gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-white">
          <PackageX className="size-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-sm font-semibold tracking-tight">
            {issueReported ? "Issue reported" : alert.title}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-white/70">
            {issueReported
              ? `Support case ${reportedCaseId ?? ""} is open. We will follow up soon.`
              : alert.body}
          </p>
          {!issueReported ? (
            <button
              type="button"
              onClick={onReportIssue}
              className="mt-3 inline-flex rounded-2xl bg-brand px-3 py-2 text-sm font-bold text-white transition hover:bg-brand-dark"
            >
              {alert.actionLabel}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
