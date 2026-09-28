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
          className={`absolute top-7 left-[15px] h-[calc(100%-12px)] w-px ${
            isCompleted ? "bg-teal-700" : "bg-stone-200"
          }`}
        />
      ) : null}

      <span
        className={`relative z-10 mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border-2 ${
          isCompleted
            ? "border-teal-700 bg-teal-700 text-white"
            : isCurrent
              ? "border-teal-700 bg-white text-teal-800 ring-4 ring-teal-100"
              : isPending
                ? "border-dashed border-stone-300 bg-stone-50 text-stone-300"
                : "border-stone-200 bg-white text-stone-300"
        }`}
        aria-current={isCurrent ? "step" : undefined}
      >
        {isCompleted ? <Check className="size-4" strokeWidth={2.5} /> : null}
        {isCurrent ? (
          <span className="size-2.5 rounded-full bg-teal-700" />
        ) : null}
      </span>

      <div className="min-w-0 flex-1 pb-6">
        <p
          className={`text-sm font-medium ${
            isCurrent || isCompleted ? "text-stone-900" : "text-stone-400"
          }`}
        >
          {step.label}
        </p>
        {step.occurredAt && !isPending ? (
          <p className="mt-0.5 text-xs text-stone-500">
            {formatDateTime(step.occurredAt)}
            {step.description ? ` · ${step.description}` : null}
          </p>
        ) : null}
        {isPending ? (
          <p className="mt-0.5 text-xs text-stone-400">Awaiting carrier update</p>
        ) : null}
      </div>
    </li>
  );
}
