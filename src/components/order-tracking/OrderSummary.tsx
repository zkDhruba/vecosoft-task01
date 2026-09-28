"use client";

import Image from "next/image";
import type { OrderSummaryViewModel } from "@/lib/order-tracking";
import { formatMoney } from "@/lib/order-tracking";

interface OrderSummaryProps {
  summary: OrderSummaryViewModel;
  shippingAddressSummary?: string;
  onViewDetails?: () => void;
}

export function OrderSummary({
  summary,
  shippingAddressSummary,
  onViewDetails,
}: OrderSummaryProps) {
  return (
    <section
      aria-labelledby="order-summary-heading"
      className="rounded-3xl border border-line bg-surface p-4 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2
          id="order-summary-heading"
          className="font-display text-base font-semibold tracking-tight text-foreground"
        >
          Order details
        </h2>
        {onViewDetails ? (
          <button
            type="button"
            onClick={onViewDetails}
            className="text-sm font-bold text-brand transition hover:text-brand-dark"
          >
            View receipt
          </button>
        ) : (
          <p className="text-xs text-muted">
            {summary.itemCount} {summary.itemCount === 1 ? "item" : "items"}
          </p>
        )}
      </div>

      <ul className="mt-4 space-y-3">
        {summary.items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-2xl bg-brand-soft">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              ) : (
                <span className="absolute inset-0 bg-[#f0ebe5]" aria-hidden />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-foreground">
                {item.name}
              </p>
              <p className="text-xs text-muted">Qty {item.quantity}</p>
            </div>
            <p className="text-sm font-bold text-foreground">
              {formatMoney(item.unitPrice)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <span className="text-sm text-muted">Total</span>
        <span className="font-display text-base font-semibold text-foreground">
          {formatMoney(summary.total)}
        </span>
      </div>

      {shippingAddressSummary ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-[#f7f4f0] px-3 py-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Deliver to
            </p>
            <p className="mt-1 text-sm leading-relaxed text-foreground">
              {shippingAddressSummary}
            </p>
          </div>
          <div
            className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-sage"
            aria-hidden
          >
            <span className="font-display text-xs font-bold">MAP</span>
          </div>
        </div>
      ) : null}
    </section>
  );
}
