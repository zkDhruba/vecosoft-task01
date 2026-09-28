import { getMockOrderTracking, MOCK_ERROR_ORDER_ID } from "./mock-data";
import type { OrderTracking } from "./types";

const MOCK_LATENCY_MS = 700;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/** Thrown when tracking cannot be loaded (network / server failure). */
export class OrderTrackingFetchError extends Error {
  readonly orderId: string;

  constructor(orderId: string, message: string) {
    super(message);
    this.name = "OrderTrackingFetchError";
    this.orderId = orderId;
  }
}

/**
 * Async data access boundary for the tracking screen.
 * Swap the body for a real API later without touching UI components.
 */
export async function fetchOrderTracking(
  orderId: string,
): Promise<OrderTracking | null> {
  await delay(MOCK_LATENCY_MS);

  const normalized = orderId.trim().toLowerCase();

  if (
    normalized === MOCK_ERROR_ORDER_ID ||
    normalized === "error"
  ) {
    throw new OrderTrackingFetchError(
      orderId,
      "Tracking details could not be loaded. Check your connection and try again.",
    );
  }

  return getMockOrderTracking(orderId);
}
