import type { TimelineStepViewModel } from "@/lib/order-tracking";
import { TimelineStep } from "./TimelineStep";

interface DeliveryTimelineProps {
  steps: TimelineStepViewModel[];
}

export function DeliveryTimeline({ steps }: DeliveryTimelineProps) {
  return (
    <section
      aria-labelledby="delivery-timeline-heading"
      className="rounded-3xl border border-line bg-surface p-4 shadow-[var(--shadow-card)]"
    >
      <h2
        id="delivery-timeline-heading"
        className="font-display text-base font-semibold tracking-tight text-foreground"
      >
        Delivery progress
      </h2>
      <ol className="mt-4">
        {steps.map((step, index) => (
          <TimelineStep
            key={step.status}
            step={step}
            isLast={index === steps.length - 1}
          />
        ))}
      </ol>
    </section>
  );
}
