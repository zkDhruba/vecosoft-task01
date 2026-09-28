"use client";

import { useState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { BottomSheet } from "./BottomSheet";

interface ReportIssueSheetProps {
  open: boolean;
  onClose: () => void;
  orderNumber: string;
  onReported: (caseId: string) => void;
}

type ReportStep = "confirm" | "success";

function createMockCaseId(): string {
  const suffix = Math.floor(100000 + Math.random() * 900000);
  return `CASE-${suffix}`;
}

export function ReportIssueSheet({
  open,
  onClose,
  orderNumber,
  onReported,
}: ReportIssueSheetProps) {
  const [step, setStep] = useState<ReportStep>("confirm");
  const [note, setNote] = useState("");
  const [caseId, setCaseId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetLocalState() {
    setStep("confirm");
    setNote("");
    setCaseId(null);
    setIsSubmitting(false);
  }

  function handleClose() {
    onClose();
    window.setTimeout(resetLocalState, 200);
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    await new Promise((resolve) => {
      window.setTimeout(resolve, 650);
    });
    const nextCaseId = createMockCaseId();
    setCaseId(nextCaseId);
    setStep("success");
    setIsSubmitting(false);
    onReported(nextCaseId);
  }

  return (
    <BottomSheet
      open={open}
      title={step === "success" ? "Issue reported" : "Report delivery issue"}
      onClose={handleClose}
    >
      {step === "confirm" ? (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-stone-600">
            Confirm that order #{orderNumber} was marked delivered but you have
            not received it. We will open a support case.
          </p>

          <label className="block">
            <span className="text-sm font-medium text-stone-800">
              Add a note (optional)
            </span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={3}
              placeholder="Gate code, neighbor notes, or anything else that helps"
              className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 outline-none ring-teal-700/30 placeholder:text-stone-400 focus:ring-2"
            />
          </label>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-stone-900 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" aria-hidden />
                  Submitting
                </>
              ) : (
                "Confirm and report"
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-800 transition hover:bg-stone-50 disabled:opacity-70"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex size-11 items-center justify-center rounded-full bg-teal-50 text-teal-800">
            <CheckCircle2 className="size-5" aria-hidden />
          </div>
          <p className="text-sm leading-relaxed text-stone-600">
            Your delivery issue was submitted. Support will follow up using your
            account contact details.
          </p>
          {caseId ? (
            <p className="rounded-xl bg-stone-100 px-3 py-2 font-mono text-sm text-stone-800">
              {caseId}
            </p>
          ) : null}
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-stone-900 text-sm font-medium text-white transition hover:bg-stone-800"
          >
            Done
          </button>
        </div>
      )}
    </BottomSheet>
  );
}
