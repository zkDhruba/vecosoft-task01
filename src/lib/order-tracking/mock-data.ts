import type { OrderTracking } from "./types";

/**
 * Fixed "now" for deterministic happy-path demos.
 * Selectors still accept a real Date in production.
 */
export const MOCK_NOW = new Date("2026-09-28T15:30:00.000Z");

const happyPathOrder: OrderTracking = {
  orderId: "ord_48291",
  orderNumber: "VECO-48291",
  status: "out_for_delivery",
  placedAt: "2026-09-26T10:12:00.000Z",
  estimatedDelivery: {
    start: "2026-09-28T17:00:00.000Z",
    end: "2026-09-28T19:00:00.000Z",
  },
  deliveredAt: null,
  items: [
    {
      id: "item_earbuds",
      name: "Wireless earbuds",
      quantity: 1,
      unitPrice: { amount: 79, currency: "USD" },
      imageUrl: "/products/earbuds.svg",
      sku: "AUD-WE-01",
    },
  ],
  events: [
    {
      id: "evt_processing",
      status: "processing",
      occurredAt: "2026-09-26T10:15:00.000Z",
      description: "Payment confirmed · preparing shipment",
      locationLabel: "Dhaka fulfillment center",
    },
    {
      id: "evt_shipped",
      status: "shipped",
      occurredAt: "2026-09-27T08:40:00.000Z",
      description: "Package handed to carrier",
      locationLabel: "Dhaka",
    },
    {
      id: "evt_ofd",
      status: "out_for_delivery",
      occurredAt: "2026-09-28T13:05:00.000Z",
      description: "Courier is on the way",
      locationLabel: "Local depot",
    },
  ],
  shippingAddressSummary: "House 12, Road 4 · Dhanmondi, Dhaka",
  carrierName: "Pathao Parcel",
  trackingNumber: "PP-90821455",
  support: {
    email: "support@vecosoft.example",
    phone: "+8801711000000",
    chatAvailable: true,
  },
};

/** Additional fixtures reserved for Phase 2–3 edge cases. */
const delayedOrder: OrderTracking = {
  ...happyPathOrder,
  orderId: "ord_delayed",
  orderNumber: "VECO-55102",
  estimatedDelivery: {
    start: "2026-09-28T10:00:00.000Z",
    end: "2026-09-28T12:00:00.000Z",
  },
};

const trackingUnavailableOrder: OrderTracking = {
  ...happyPathOrder,
  orderId: "ord_pending_track",
  orderNumber: "VECO-33011",
  status: "processing",
  estimatedDelivery: null,
  trackingNumber: null,
  events: [],
};

const deliveredNotReceivedOrder: OrderTracking = {
  ...happyPathOrder,
  orderId: "ord_missing",
  orderNumber: "VECO-77840",
  status: "delivered",
  deliveredAt: "2026-09-27T09:42:00.000Z",
  estimatedDelivery: {
    start: "2026-09-27T08:00:00.000Z",
    end: "2026-09-27T10:00:00.000Z",
  },
  customerReportedNotReceived: true,
  events: [
    ...happyPathOrder.events,
    {
      id: "evt_delivered",
      status: "delivered",
      occurredAt: "2026-09-27T09:42:00.000Z",
      description: "Marked delivered by carrier",
      locationLabel: "Customer address",
    },
  ],
};

const ordersById: Record<string, OrderTracking> = {
  [happyPathOrder.orderId]: happyPathOrder,
  [happyPathOrder.orderNumber.toLowerCase()]: happyPathOrder,
  [delayedOrder.orderId]: delayedOrder,
  [trackingUnavailableOrder.orderId]: trackingUnavailableOrder,
  [deliveredNotReceivedOrder.orderId]: deliveredNotReceivedOrder,
};

export function getMockOrderTracking(
  orderId: string,
): OrderTracking | null {
  const key = orderId.trim().toLowerCase();
  return (
    ordersById[key] ??
    ordersById[orderId] ??
    null
  );
}

export const DEFAULT_DEMO_ORDER_ID = happyPathOrder.orderId;
