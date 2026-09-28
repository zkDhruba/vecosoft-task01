import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DEMO_ORDERS } from "@/lib/order-tracking";

export default function HomePage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col items-center justify-center overflow-hidden bg-background px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-brand/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-10 size-56 rounded-full bg-[#ffb347]/35 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 -left-10 size-48 rounded-full bg-sage/25 blur-3xl"
      />

      <div className="relative w-full max-w-[430px] rounded-3xl border border-line bg-surface/95 p-6 shadow-[var(--shadow-card)] backdrop-blur-sm">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1">
          <span className="size-2 rounded-full bg-brand" aria-hidden />
          <p className="font-display text-xs font-semibold tracking-[0.14em] text-brand uppercase">
            Vecosoft
          </p>
        </div>

        <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground">
          Order tracking
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Pick a demo state — hover an option to light it up in brand orange.
        </p>

        <ul className="mt-6 space-y-2.5">
          {DEMO_ORDERS.map((demo) => (
            <li key={demo.id}>
              <Link
                href={`/order-tracking/${demo.id}`}
                className="group flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-line bg-brand-soft/40 px-4 py-3 text-sm font-bold text-foreground transition duration-200 hover:border-brand hover:bg-brand hover:text-white hover:shadow-[0_12px_24px_-12px_rgba(255,92,0,0.7)]"
              >
                <span>{demo.label}</span>
                <span className="flex items-center gap-2">
                  <span className="font-mono text-xs font-medium text-muted transition group-hover:text-white/80">
                    {demo.id}
                  </span>
                  <ChevronRight
                    className="size-4 text-brand transition group-hover:translate-x-0.5 group-hover:text-white"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
