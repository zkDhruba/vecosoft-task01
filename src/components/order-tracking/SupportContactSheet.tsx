"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import type { SupportContact } from "@/lib/order-tracking";
import { BottomSheet } from "./BottomSheet";

interface SupportContactSheetProps {
  open: boolean;
  onClose: () => void;
  orderNumber: string;
  support: SupportContact;
}

export function SupportContactSheet({
  open,
  onClose,
  orderNumber,
  support,
}: SupportContactSheetProps) {
  const subject = encodeURIComponent(`Help with order #${orderNumber}`);

  return (
    <BottomSheet open={open} title="Contact support" onClose={onClose}>
      <p className="text-sm leading-relaxed text-stone-600">
        Choose how you want to reach us about order #{orderNumber}.
      </p>

      <ul className="mt-4 space-y-2">
        {support.email ? (
          <li>
            <a
              href={`mailto:${support.email}?subject=${subject}`}
              className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 transition hover:bg-stone-50"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-teal-50 text-teal-800">
                <Mail className="size-4" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-stone-900">
                  Email support
                </span>
                <span className="block truncate text-xs text-stone-500">
                  {support.email}
                </span>
              </span>
            </a>
          </li>
        ) : null}

        {support.phone ? (
          <li>
            <a
              href={`tel:${support.phone}`}
              className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 transition hover:bg-stone-50"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-stone-100 text-stone-700">
                <Phone className="size-4" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-stone-900">
                  Call support
                </span>
                <span className="block text-xs text-stone-500">
                  {support.phone}
                </span>
              </span>
            </a>
          </li>
        ) : null}

        {support.chatAvailable ? (
          <li>
            <button
              type="button"
              onClick={() => {
                window.alert(
                  "Live chat is a mock in this demo. A real chat widget would open here.",
                );
              }}
              className="flex w-full items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 text-left transition hover:bg-stone-50"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-amber-50 text-amber-900">
                <MessageCircle className="size-4" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-stone-900">
                  Start live chat
                </span>
                <span className="block text-xs text-stone-500">
                  Usually replies in a few minutes
                </span>
              </span>
            </button>
          </li>
        ) : null}
      </ul>
    </BottomSheet>
  );
}
