import { OrderTrackingScreen } from "@/components/order-tracking/OrderTrackingScreen";
import { TrackingEmpty } from "@/components/order-tracking/states/TrackingEmpty";
import {
  fetchOrderTracking,
  MOCK_NOW,
  toOrderTrackingViewModel,
} from "@/lib/order-tracking";

interface OrderTrackingPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderTrackingPage({
  params,
}: OrderTrackingPageProps) {
  const { orderId } = await params;
  const order = await fetchOrderTracking(orderId);

  if (!order) {
    return (
      <main className="min-h-full bg-[radial-gradient(circle_at_top,_#f5f5f4_0%,_#e7e5e4_55%,_#d6d3d1_100%)]">
        <TrackingEmpty orderId={orderId} />
      </main>
    );
  }

  const viewModel = toOrderTrackingViewModel(order, MOCK_NOW);

  return (
    <main className="min-h-full bg-[radial-gradient(circle_at_top,_#f5f5f4_0%,_#e7e5e4_55%,_#d6d3d1_100%)]">
      <OrderTrackingScreen viewModel={viewModel} />
    </main>
  );
}
