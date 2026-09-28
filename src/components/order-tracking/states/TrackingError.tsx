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
      <div className="rounded-2xl border border-red-200 bg-white p-5">
        <div className="flex size-11 items-center justify-center rounded-full bg-red-50 text-red-700">
          <AlertCircle className="size-5" aria-hidden />
        </div>
        <h1 className="mt-4 text-lg font-semibold tracking-tight text-stone-900">
          Couldn’t load tracking
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">{message}</p>
        {orderId ? (
          <p className="mt-2 text-xs text-stone-400">Order ref: {orderId}</p>
        ) : null}

        <div className="mt-5 flex flex-col gap-2">
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-stone-900 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              <RefreshCw className="size-4" aria-hidden />
              Try again
            </button>
          ) : null}
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
