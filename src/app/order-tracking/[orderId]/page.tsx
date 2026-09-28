import { notFound } from "next/navigation";
import { OrderTrackingScreen } from "@/components/order-tracking/OrderTrackingScreen";
import {
  getMockOrderTracking,
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
  const order = getMockOrderTracking(orderId);

  if (!order) {
    notFound();
  }

  const viewModel = toOrderTrackingViewModel(order, MOCK_NOW);

  return (
    <main className="min-h-full bg-[radial-gradient(circle_at_top,_#f5f5f4_0%,_#e7e5e4_55%,_#d6d3d1_100%)]">
      <OrderTrackingScreen viewModel={viewModel} />
    </main>
  );
}
