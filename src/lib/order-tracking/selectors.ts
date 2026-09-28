import { ORDER_STATUS_FLOW, ORDER_STATUS_LABELS } from "./constants";
import { formatDeliveryEta, formatDateTime, sumMoney } from "./format";
import type {
  OrderStatus,
  OrderTracking,
  OrderTrackingViewModel,
  StatusHeroViewModel,
  TimelineStepViewModel,
  TimelineStepVisualState,
  TrackingPrimaryAction,
  TrackingScreenVariant,
} from "./types";

function statusIndex(status: OrderStatus): number {
  return ORDER_STATUS_FLOW.indexOf(status);
}

function isPastEstimatedDelivery(
  order: OrderTracking,
  now: Date,
): boolean {
  if (!order.estimatedDelivery || order.status === "delivered") {
    return false;
  }
  return now.getTime() > new Date(order.estimatedDelivery.end).getTime();
}

/**
 * Derives the screen variant from domain facts.
 * Keeps anomaly rules out of React components.
 */
export function resolveTrackingVariant(
  order: OrderTracking,
  now = new Date(),
): TrackingScreenVariant {
  if (order.status === "delivered" && order.customerReportedNotReceived) {
    return "delivered_not_received";
  }

  if (order.estimatedDelivery === null || order.events.length === 0) {
    return "tracking_unavailable";
  }

  if (isPastEstimatedDelivery(order, now)) {
    return "delayed";
  }

  return "normal";
}

function resolveStepVisualState(
  stepStatus: OrderStatus,
  currentStatus: OrderStatus,
  variant: TrackingScreenVariant,
): TimelineStepVisualState {
  if (variant === "tracking_unavailable") {
    return "pending";
  }

  const step = statusIndex(stepStatus);
  const current = statusIndex(currentStatus);

  if (step < current) return "completed";
  if (step === current) {
    return currentStatus === "delivered" ? "completed" : "current";
  }
  return "upcoming";
}

export function buildTimeline(
  order: OrderTracking,
  variant: TrackingScreenVariant,
): TimelineStepViewModel[] {
  const eventByStatus = new Map(
    order.events.map((event) => [event.status, event] as const),
  );

  return ORDER_STATUS_FLOW.map((status) => {
    const event = eventByStatus.get(status);
    return {
      status,
      label: ORDER_STATUS_LABELS[status],
      visualState: resolveStepVisualState(status, order.status, variant),
      occurredAt: event?.occurredAt ?? null,
      description: event?.description,
    };
  });
}

export function buildStatusHero(
  order: OrderTracking,
  variant: TrackingScreenVariant,
  now = new Date(),
): StatusHeroViewModel {
  const statusLabel = ORDER_STATUS_LABELS[order.status];
  const isDelayed = variant === "delayed";

  if (variant === "tracking_unavailable") {
    return {
      status: order.status,
      statusLabel:
        order.status === "processing" ? "Order confirmed" : statusLabel,
      etaLabel: "Tracking updates soon",
      isDelayed: false,
    };
  }

  if (order.status === "delivered" && order.deliveredAt) {
    return {
      status: order.status,
      statusLabel,
      etaLabel: `Delivered ${formatDateTime(order.deliveredAt)}`,
      isDelayed: false,
    };
  }

  if (!order.estimatedDelivery) {
    return {
      status: order.status,
      statusLabel,
      etaLabel: "Delivery estimate unavailable",
      isDelayed,
    };
  }

  return {
    status: order.status,
    statusLabel,
    etaLabel: formatDeliveryEta(order.estimatedDelivery, {
      prefix: isDelayed ? "Was due" : "Arrives",
      now,
    }),
    isDelayed,
  };
}

export function resolvePrimaryAction(
  variant: TrackingScreenVariant,
): TrackingPrimaryAction {
  if (variant === "delivered_not_received") {
    return "report_issue";
  }
  if (variant === "delayed" || variant === "tracking_unavailable") {
    return "contact_support";
  }
  return "contact_support";
}

/** Domain → screen view model. Single entry point for the UI layer. */
export function toOrderTrackingViewModel(
  order: OrderTracking,
  now = new Date(),
): OrderTrackingViewModel {
  const variant = resolveTrackingVariant(order, now);

  const lineTotals = order.items.map((item) => ({
    amount: item.unitPrice.amount * item.quantity,
    currency: item.unitPrice.currency,
  }));

  return {
    order,
    variant,
    hero: buildStatusHero(order, variant, now),
    timeline: buildTimeline(order, variant),
    summary: {
      items: order.items,
      itemCount: order.items.reduce((count, item) => count + item.quantity, 0),
      total: sumMoney(lineTotals),
    },
    primaryAction: resolvePrimaryAction(variant),
  };
}
