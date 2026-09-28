import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { DEFAULT_DEMO_ORDER_ID } from "@/lib/order-tracking";

interface TrackingEmptyProps {
  orderId: string;
}

export function TrackingEmpty({ orderId }: TrackingEmptyProps) {
  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-col gap-5 px-4 py-6 sm:px-5">
      <div className="rounded-2xl border border-stone-200 bg-white p-5">
        <div className="flex size-11 items-center justify-center rounded-full bg-stone-100 text-stone-600">
          <PackageSearch className="size-5" aria-hidden />
        </div>
        <h1 className="mt-4 text-lg font-semibold tracking-tight text-stone-900">
          Order not found
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          No tracking is available for{" "}
          <span className="font-medium text-stone-800">{orderId}</span>. Check
          the order id and try again.
        </p>

        <div className="mt-5 flex flex-col gap-2">
          <Link
            href={`/order-tracking/${DEFAULT_DEMO_ORDER_ID}`}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-stone-900 text-sm font-medium text-white transition hover:bg-stone-800"
          >
            Open a demo order
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-800 transition hover:bg-stone-50"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
