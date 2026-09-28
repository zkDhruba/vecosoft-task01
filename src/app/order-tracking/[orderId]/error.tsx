"use client";

import { useParams } from "next/navigation";
import { TrackingError } from "@/components/order-tracking/states/TrackingError";

interface OrderTrackingErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function OrderTrackingError({
  error,
  reset,
}: OrderTrackingErrorProps) {
  const params = useParams<{ orderId?: string }>();
  const orderId = typeof params?.orderId === "string" ? params.orderId : undefined;

  return (
    <main className="min-h-full bg-background">
      <TrackingError
        message={error.message}
        orderId={orderId}
        onRetry={reset}
      />
    </main>
  );
}
