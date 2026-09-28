import Link from "next/link";
import { DEMO_ORDERS } from "@/lib/order-tracking";

export default function HomePage() {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-[430px] rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
        <p className="font-display text-xs font-semibold tracking-[0.16em] text-brand uppercase">
          Vecosoft
        </p>
        <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
          Order tracking
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Same flows as before — restyled to the playful orange food-delivery
          theme from the reference.
        </p>

        <ul className="mt-6 space-y-2">
          {DEMO_ORDERS.map((demo) => (
            <li key={demo.id}>
              <Link
                href={`/order-tracking/${demo.id}`}
                className="flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-4 py-3 text-sm font-bold text-foreground transition hover:bg-brand-soft"
              >
                <span>{demo.label}</span>
                <span className="font-mono text-xs font-medium text-muted">
                  {demo.id}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
