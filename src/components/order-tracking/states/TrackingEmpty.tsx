import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { DEFAULT_DEMO_ORDER_ID } from "@/lib/order-tracking";

interface TrackingEmptyProps {
  orderId: string;
}

export function TrackingEmpty({ orderId }: TrackingEmptyProps) {
  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-col gap-5 px-4 py-6 sm:px-5">
      <div className="rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
        <div className="flex size-11 items-center justify-center rounded-full bg-brand-soft text-brand">
          <PackageSearch className="size-5" aria-hidden />
        </div>
        <h1 className="mt-4 font-display text-lg font-semibold tracking-tight text-foreground">
          Order not found
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          No tracking is available for{" "}
          <span className="font-bold text-foreground">{orderId}</span>. Check the
          order id and try again.
        </p>

        <div className="mt-5 flex flex-col gap-2">
          <Link
            href={`/order-tracking/${DEFAULT_DEMO_ORDER_ID}`}
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-brand text-sm font-bold text-white transition hover:bg-brand-dark"
          >
            Open a demo order
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-line bg-surface text-sm font-bold text-foreground transition hover:bg-brand-soft"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
