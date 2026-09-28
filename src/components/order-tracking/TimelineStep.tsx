import { Check } from "lucide-react";
import type { TimelineStepViewModel } from "@/lib/order-tracking";
import { formatDateTime } from "@/lib/order-tracking";

interface TimelineStepProps {
  step: TimelineStepViewModel;
  isLast: boolean;
}

export function TimelineStep({ step, isLast }: TimelineStepProps) {
  const isCompleted = step.visualState === "completed";
  const isCurrent = step.visualState === "current";
  const isPending = step.visualState === "pending";

  return (
    <li className="relative flex gap-3">
      {!isLast ? (
        <span
          aria-hidden
          className={`absolute top-8 left-[15px] h-[calc(100%-14px)] w-[2px] rounded-full ${
            isCompleted ? "bg-brand" : "bg-line"
          }`}
        />
      ) : null}

      <span
        className={`relative z-10 mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border-2 ${
          isCompleted
            ? "border-brand bg-brand text-white"
            : isCurrent
              ? "border-brand bg-white text-brand ring-4 ring-brand-soft"
              : isPending
                ? "border-dashed border-[#d9d3cc] bg-[#f7f4f0] text-[#cfc8c0]"
                : "border-line bg-white text-[#d4cec7]"
        }`}
        aria-current={isCurrent ? "step" : undefined}
      >
        {isCompleted ? <Check className="size-4" strokeWidth={2.75} /> : null}
        {isCurrent ? (
          <span className="size-2.5 rounded-full bg-brand" />
        ) : null}
      </span>

      <div className="min-w-0 flex-1 pb-6">
        <p
          className={`text-sm font-bold ${
            isCurrent || isCompleted ? "text-foreground" : "text-[#b0aaa3]"
          }`}
        >
          {step.label}
        </p>
        {step.occurredAt && !isPending ? (
          <p className="mt-0.5 text-xs text-muted">
            {formatDateTime(step.occurredAt)}
            {step.description ? ` · ${step.description}` : null}
          </p>
        ) : null}
        {isPending ? (
          <p className="mt-0.5 text-xs text-muted">Awaiting carrier update</p>
        ) : null}
      </div>
    </li>
  );
}
