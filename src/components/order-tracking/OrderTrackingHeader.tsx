import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface OrderTrackingHeaderProps {
  orderNumber: string;
}

export function OrderTrackingHeader({ orderNumber }: OrderTrackingHeaderProps) {
  return (
    <header className="flex items-center gap-3">
      <Link
        href="/"
        aria-label="Back to home"
        className="inline-flex size-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-700 transition hover:bg-stone-50"
      >
        <ChevronLeft className="size-5" aria-hidden />
      </Link>
      <div className="min-w-0">
        <h1 className="truncate text-lg font-semibold tracking-tight text-stone-900">
          Track order
        </h1>
        <p className="truncate text-sm text-stone-500">Order #{orderNumber}</p>
      </div>
    </header>
  );
}
