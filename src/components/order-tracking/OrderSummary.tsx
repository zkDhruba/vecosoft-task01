import Image from "next/image";
import type { OrderSummaryViewModel } from "@/lib/order-tracking";
import { formatMoney } from "@/lib/order-tracking";

interface OrderSummaryProps {
  summary: OrderSummaryViewModel;
  shippingAddressSummary?: string;
}

export function OrderSummary({
  summary,
  shippingAddressSummary,
}: OrderSummaryProps) {
  return (
    <section
      aria-labelledby="order-summary-heading"
      className="rounded-2xl border border-stone-200 bg-white p-4"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2
          id="order-summary-heading"
          className="text-sm font-semibold tracking-tight text-stone-900"
        >
          Order summary
        </h2>
        <p className="text-xs text-stone-500">
          {summary.itemCount} {summary.itemCount === 1 ? "item" : "items"}
        </p>
      </div>

      <ul className="mt-4 space-y-3">
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
              ) : (
                <span className="absolute inset-0 bg-stone-200" aria-hidden />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-stone-900">
                {item.name}
              </p>
              <p className="text-xs text-stone-500">
                Qty {item.quantity} · {formatMoney(item.unitPrice)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
        <span className="text-sm text-stone-500">Total</span>
        <span className="text-sm font-semibold text-stone-900">
          {formatMoney(summary.total)}
        </span>
      </div>

      {shippingAddressSummary ? (
        <p className="mt-3 text-xs leading-relaxed text-stone-500">
          Shipping to {shippingAddressSummary}
        </p>
      ) : null}
    </section>
  );
}
