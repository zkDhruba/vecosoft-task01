"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface OrderTrackingHeaderProps {
  orderNumber: string;
  onHelp?: () => void;
}

export function OrderTrackingHeader({
  orderNumber,
  onHelp,
}: OrderTrackingHeaderProps) {
  return (
    <header className="grid grid-cols-[40px_1fr_auto] items-center gap-2">
      <Link
        href="/"
        aria-label="Back to home"
        className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface text-foreground shadow-sm transition hover:bg-brand-soft"
      >
        <ChevronLeft className="size-5" aria-hidden />
      </Link>

      <div className="min-w-0 text-center">
        <h1 className="truncate font-display text-lg font-semibold tracking-tight text-foreground">
          Order Tracking
        </h1>
        <p className="truncate text-xs text-muted">Order #{orderNumber}</p>
      </div>

      {onHelp ? (
        <button
          type="button"
          onClick={onHelp}
          className="justify-self-end text-sm font-bold text-brand transition hover:text-brand-dark"
        >
          Help
        </button>
      ) : (
        <span className="w-10" aria-hidden />
      )}
    </header>
  );
}
