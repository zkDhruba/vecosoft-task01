import { TrackingSkeleton } from "@/components/order-tracking/states/TrackingSkeleton";

export default function OrderTrackingLoading() {
  return (
    <main className="min-h-full bg-background">
      <TrackingSkeleton />
    </main>
  );
}
