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
      <main className="min-h-full bg-background">
        <TrackingEmpty orderId={orderId} />
      </main>
    );
  }

  const viewModel = toOrderTrackingViewModel(order, MOCK_NOW);

  return (
    <main className="min-h-full bg-background">
      <OrderTrackingScreen viewModel={viewModel} />
    </main>
  );
}
