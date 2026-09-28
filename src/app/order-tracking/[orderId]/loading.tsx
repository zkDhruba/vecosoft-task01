import { TrackingSkeleton } from "@/components/order-tracking/states/TrackingSkeleton";

export default function OrderTrackingLoading() {
  return (
    <main className="min-h-full bg-[radial-gradient(circle_at_top,_#f5f5f4_0%,_#e7e5e4_55%,_#d6d3d1_100%)]">
      <TrackingSkeleton />
    </main>
  );
}
