import { TRACKING_PRIMARY_ACTION_LABELS } from "@/lib/order-tracking";
import type { TrackingPrimaryAction } from "@/lib/order-tracking";

interface ActionBarProps {
  primaryAction: TrackingPrimaryAction;
  supportEmail?: string;
}

export function ActionBar({ primaryAction, supportEmail }: ActionBarProps) {
  const primaryLabel = TRACKING_PRIMARY_ACTION_LABELS[primaryAction];
  const primaryHref =
    primaryAction === "contact_support" && supportEmail
      ? `mailto:${supportEmail}`
      : "#order-details";

  return (
    <section aria-label="Order actions" className="space-y-2">
      <a
        href={primaryHref}
        className="flex h-12 w-full items-center justify-center rounded-xl bg-stone-900 text-sm font-medium text-white transition hover:bg-stone-800"
      >
        {primaryLabel}
      </a>
      <a
        href="#order-details"
        className="flex h-12 w-full items-center justify-center rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-800 transition hover:bg-stone-50"
      >
        View order details
      </a>
    </section>
  );
}
