import type { OrderStatus } from "./types";

/** Ordered lifecycle used by the timeline. Index = progress position. */
export const ORDER_STATUS_FLOW: readonly OrderStatus[] = [
  "processing",
  "shipped",
  "out_for_delivery",
  "delivered",
] as const;

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  processing: "Processing",
  shipped: "Shipped",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
};

export const TRACKING_PRIMARY_ACTION_LABELS = {
  contact_support: "Contact support",
  report_issue: "Report delivery issue",
  view_details: "View order details",
} as const;
