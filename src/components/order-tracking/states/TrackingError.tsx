"use client";

import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";

interface TrackingErrorProps {
  message?: string;
  orderId?: string;
  onRetry?: () => void;
}

export function TrackingError({
  message = "Tracking details could not be loaded. Check your connection and try again.",
  orderId,
  onRetry,
}: TrackingErrorProps) {
  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-col gap-5 px-4 py-6 sm:px-5">
      <div className="rounded-3xl border border-orange-200 bg-surface p-5 shadow-[var(--shadow-card)]">
        <div className="flex size-11 items-center justify-center rounded-full bg-brand-soft text-brand">
          <AlertCircle className="size-5" aria-hidden />
        </div>
        <h1 className="mt-4 font-display text-lg font-semibold tracking-tight text-foreground">
          Couldn’t load tracking
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">{message}</p>
        {orderId ? (
          <p className="mt-2 text-xs text-muted">Order ref: {orderId}</p>
        ) : null}

        <div className="mt-5 flex flex-col gap-2">
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-brand text-sm font-bold text-white transition hover:bg-brand-dark"
            >
              <RefreshCw className="size-4" aria-hidden />
              Try again
            </button>
          ) : null}
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
