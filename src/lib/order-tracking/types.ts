/**
 * Order Tracking domain + view models.
 *
 * Domain types mirror what a future API would return.
 * View models are derived (selectors) so UI components stay presentational.
 */

/** ISO-8601 datetime string — serializable across API / mock / client. */
export type IsoDateTime = string;

/**
 * Canonical fulfillment lifecycle.
 * Kept as a closed union so the timeline order is compile-time safe.
 */
export type OrderStatus =
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered";

/**
 * Monetary value with currency code.
 * Avoids floating display bugs and supports multi-currency later.
 */
export interface Money {
  amount: number;
  /** ISO 4217 currency code, e.g. "USD" */
  currency: string;
}

/**
 * A single purchasable line on the order.
 * Powers the order summary without needing a separate catalog fetch.
 */
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: Money;
  imageUrl?: string;
  sku?: string;
}

/**
 * Estimated delivery as a window (not a single instant).
 * Carriers almost always communicate ranges (“5–7 PM”).
 * `null` on the parent means ETA is unknown (tracking unavailable).
 */
export interface DeliveryWindow {
  start: IsoDateTime;
  end: IsoDateTime;
}

/**
 * A historical checkpoint in the shipment journey.
 * Separated from `OrderStatus` so we can show timestamps/locations
 * without inventing fake data for steps that have not happened yet.
 */
export interface TrackingEvent {
  id: string;
  status: OrderStatus;
  occurredAt: IsoDateTime;
  description?: string;
  locationLabel?: string;
}

/**
 * How the customer can reach help from this screen.
 * Kept small and optional so channels can vary by region.
 */
export interface SupportContact {
  email?: string;
  phone?: string;
  chatAvailable?: boolean;
}

/**
 * Root domain aggregate for the tracking experience.
 * One object = everything the screen needs for a given orderId.
 */
export interface OrderTracking {
  orderId: string;
  /** Human-facing order number shown in the header. */
  orderNumber: string;
  status: OrderStatus;
  placedAt: IsoDateTime;
  /** Null when carrier ETA / tracking feed is not ready yet. */
  estimatedDelivery: DeliveryWindow | null;
  /** Set only when status is delivered. */
  deliveredAt: IsoDateTime | null;
  items: OrderItem[];
  events: TrackingEvent[];
  shippingAddressSummary?: string;
  carrierName?: string;
  /** Null/undefined until a carrier tracking id exists. */
  trackingNumber?: string | null;
  support: SupportContact;
  /**
   * Customer-side dispute flag.
   * Enables the “delivered but not received” UI variant without
   * changing the system `status` (which remains Delivered).
   */
  customerReportedNotReceived?: boolean;
}

/**
 * Visual state of one step in the progress timeline.
 * Derived from domain status — never stored as source of truth.
 */
export type TimelineStepVisualState =
  | "completed"
  | "current"
  | "upcoming"
  | "pending";

/**
 * Ready-to-render timeline row.
 * Components consume this instead of re-deriving step math.
 */
export interface TimelineStepViewModel {
  status: OrderStatus;
  label: string;
  visualState: TimelineStepVisualState;
  occurredAt: IsoDateTime | null;
  description?: string;
}

/**
 * Screen-level anomaly / edge-case variant.
 * Orthogonal to OrderStatus — same status can map to different variants.
 */
export type TrackingScreenVariant =
  | "normal"
  | "delayed"
  | "tracking_unavailable"
  | "delivered_not_received";

/**
 * Props for the status hero (section B in the wireframe).
 * Centralizes status copy + ETA so hierarchy stays consistent.
 */
export interface StatusHeroViewModel {
  status: OrderStatus;
  statusLabel: string;
  etaLabel: string;
  isDelayed: boolean;
}

/**
 * Compact summary of line items for section E.
 */
export interface OrderSummaryViewModel {
  items: OrderItem[];
  itemCount: number;
  total: Money;
}

/**
 * Primary CTA for section F — changes by variant in later phases.
 */
export type TrackingPrimaryAction =
  | "contact_support"
  | "report_issue"
  | "view_details";

/**
 * Full screen view model.
 * Page/route loads domain data → selectors build this → UI renders it.
 */
export interface OrderTrackingViewModel {
  order: OrderTracking;
  variant: TrackingScreenVariant;
  hero: StatusHeroViewModel;
  timeline: TimelineStepViewModel[];
  summary: OrderSummaryViewModel;
  primaryAction: TrackingPrimaryAction;
}
