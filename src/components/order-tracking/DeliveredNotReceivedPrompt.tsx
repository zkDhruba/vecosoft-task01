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
      className="rounded-2xl border border-stone-300 bg-stone-900 px-4 py-4 text-stone-50"
    >
      <div className="flex gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-stone-700 text-stone-100">
          <PackageX className="size-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-tight">
            {issueReported ? "Issue reported" : alert.title}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-stone-300">
            {issueReported
              ? `Support case ${reportedCaseId ?? ""} is open. We will follow up soon.`
              : alert.body}
          </p>
          {!issueReported ? (
            <button
              type="button"
              onClick={onReportIssue}
              className="mt-3 inline-flex rounded-lg bg-white px-3 py-2 text-sm font-medium text-stone-900 transition hover:bg-stone-100"
            >
              {alert.actionLabel}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
