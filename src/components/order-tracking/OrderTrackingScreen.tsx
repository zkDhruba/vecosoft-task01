import type { OrderTrackingViewModel } from "@/lib/order-tracking";
import { ActionBar } from "./ActionBar";
import { DeliveryTimeline } from "./DeliveryTimeline";
import { OrderSummary } from "./OrderSummary";
import { OrderTrackingHeader } from "./OrderTrackingHeader";
import { StatusHero } from "./StatusHero";

interface OrderTrackingScreenProps {
  viewModel: OrderTrackingViewModel;
}

export function OrderTrackingScreen({ viewModel }: OrderTrackingScreenProps) {
  const { order, hero, timeline, summary, primaryAction } = viewModel;

  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-col gap-5 px-4 py-6 sm:px-5">
      <OrderTrackingHeader orderNumber={order.orderNumber} />
      <StatusHero hero={hero} />
      <DeliveryTimeline steps={timeline} />
      <OrderSummary
        summary={summary}
        shippingAddressSummary={order.shippingAddressSummary}
      />
      <ActionBar
        primaryAction={primaryAction}
        supportEmail={order.support.email}
      />
    </div>
  );
}
