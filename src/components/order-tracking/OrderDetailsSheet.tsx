"use client";

import Image from "next/image";
import type { OrderTracking, OrderSummaryViewModel } from "@/lib/order-tracking";
import { formatDateTime, formatMoney } from "@/lib/order-tracking";
import { BottomSheet } from "./BottomSheet";

interface OrderDetailsSheetProps {
  open: boolean;
  onClose: () => void;
  order: OrderTracking;
  summary: OrderSummaryViewModel;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <dt className="text-sm text-stone-500">{label}</dt>
      <dd className="text-right text-sm font-medium text-stone-900">{value}</dd>
    </div>
  );
}

export function OrderDetailsSheet({
  open,
  onClose,
  order,
  summary,
}: OrderDetailsSheetProps) {
  return (
    <BottomSheet open={open} title="Order details" onClose={onClose}>
      <dl className="divide-y divide-stone-100 rounded-xl border border-stone-200 px-3">
        <DetailRow label="Order" value={`#${order.orderNumber}`} />
        <DetailRow label="Placed" value={formatDateTime(order.placedAt)} />
        {order.carrierName ? (
          <DetailRow label="Carrier" value={order.carrierName} />
        ) : null}
        {order.trackingNumber ? (
          <DetailRow label="Tracking no." value={order.trackingNumber} />
        ) : (
          <DetailRow label="Tracking no." value="Not assigned yet" />
        )}
        {order.shippingAddressSummary ? (
          <DetailRow label="Ship to" value={order.shippingAddressSummary} />
        ) : null}
      </dl>

      <h3 className="mt-5 text-sm font-semibold tracking-tight text-stone-900">
        Items
      </h3>
      <ul className="mt-3 space-y-3">
        {summary.items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-stone-100">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-stone-900">
                {item.name}
              </p>
              <p className="text-xs text-stone-500">
                Qty {item.quantity}
                {item.sku ? ` · SKU ${item.sku}` : null}
              </p>
            </div>
            <p className="text-sm font-medium text-stone-800">
              {formatMoney({
                amount: item.unitPrice.amount * item.quantity,
                currency: item.unitPrice.currency,
              })}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
        <span className="text-sm text-stone-500">Total paid</span>
        <span className="text-sm font-semibold text-stone-900">
          {formatMoney(summary.total)}
        </span>
      </div>
    </BottomSheet>
  );
}
