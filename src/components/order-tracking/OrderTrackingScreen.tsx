"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { OrderTrackingViewModel } from "@/lib/order-tracking";
import { ActionBar } from "./ActionBar";
import { DelayBanner } from "./DelayBanner";
import { DeliveredNotReceivedPrompt } from "./DeliveredNotReceivedPrompt";
import { DeliveryTimeline } from "./DeliveryTimeline";
import { OrderDetailsSheet } from "./OrderDetailsSheet";
import { OrderSummary } from "./OrderSummary";
import { OrderTrackingHeader } from "./OrderTrackingHeader";
import { ReportIssueSheet } from "./ReportIssueSheet";
import { StatusHero } from "./StatusHero";
import { SupportContactSheet } from "./SupportContactSheet";
import { TrackingUnavailableNotice } from "./TrackingUnavailableNotice";

type ActiveSheet = "support" | "report" | "details" | null;

interface OrderTrackingScreenProps {
  viewModel: OrderTrackingViewModel;
}

export function OrderTrackingScreen({ viewModel }: OrderTrackingScreenProps) {
  const { order, hero, alert, timeline, summary, primaryAction, variant } =
    viewModel;

  const [activeSheet, setActiveSheet] = useState<ActiveSheet>(null);
  const [reportedCaseId, setReportedCaseId] = useState<string | null>(null);
  const issueReported = reportedCaseId !== null;

  const openSupport = () => setActiveSheet("support");
  const openReport = () => setActiveSheet("report");
  const openDetails = () => setActiveSheet("details");
  const closeSheet = () => setActiveSheet(null);

  const handlePrimaryAction = () => {
    if (primaryAction === "report_issue") {
      openReport();
      return;
    }
    if (primaryAction === "view_details") {
      openDetails();
      return;
    }
    openSupport();
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-[430px] flex-col gap-5 px-4 py-6 sm:px-5">
        <OrderTrackingHeader
          orderNumber={order.orderNumber}
          onHelp={openSupport}
        />
        <StatusHero hero={hero} variant={variant} />

        {issueReported ? (
          <div
            role="status"
            className="flex items-start gap-3 rounded-3xl border border-[#d7e6d3] bg-sage-soft px-4 py-3 text-[#355338]"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden />
            <p className="text-sm leading-relaxed">
              Delivery issue reported
              {reportedCaseId ? ` · ${reportedCaseId}` : null}. Support will
              follow up.
            </p>
          </div>
        ) : null}

        {alert?.kind === "delayed" ? (
          <DelayBanner alert={alert} onContactSupport={openSupport} />
        ) : null}

        {alert?.kind === "tracking_unavailable" ? (
          <TrackingUnavailableNotice
            alert={alert}
            onContactSupport={openSupport}
          />
        ) : null}

        {alert?.kind === "delivered_not_received" ? (
          <DeliveredNotReceivedPrompt
            alert={alert}
            onReportIssue={openReport}
            issueReported={issueReported}
            reportedCaseId={reportedCaseId}
          />
        ) : null}

        <DeliveryTimeline steps={timeline} />
        <OrderSummary
          summary={summary}
          shippingAddressSummary={order.shippingAddressSummary}
          onViewDetails={openDetails}
        />
        <ActionBar
          primaryAction={primaryAction}
          onPrimaryAction={handlePrimaryAction}
          onContactSupport={openSupport}
          onViewDetails={openDetails}
          issueReported={issueReported}
        />
      </div>

      <SupportContactSheet
        open={activeSheet === "support"}
        onClose={closeSheet}
        orderNumber={order.orderNumber}
        support={order.support}
      />
      <ReportIssueSheet
        open={activeSheet === "report"}
        onClose={closeSheet}
        orderNumber={order.orderNumber}
        onReported={setReportedCaseId}
      />
      <OrderDetailsSheet
        open={activeSheet === "details"}
        onClose={closeSheet}
        order={order}
        summary={summary}
      />
    </>
  );
}
