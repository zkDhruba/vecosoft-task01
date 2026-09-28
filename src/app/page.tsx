import Link from "next/link";
import { DEMO_ORDERS } from "@/lib/order-tracking";

export default function HomePage() {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_#f5f5f4_0%,_#e7e5e4_55%,_#d6d3d1_100%)] px-4 py-10">
      <div className="w-full max-w-[430px] rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_20px_50px_-30px_rgba(28,25,23,0.45)]">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-teal-800">
          Vecosoft
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900">
          Order tracking
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          Full flow demo — system states, edge cases, plus support sheet, report
          confirmation, and order details.
        </p>

        <ul className="mt-6 space-y-2">
          {DEMO_ORDERS.map((demo) => (
            <li key={demo.id}>
              <Link
                href={`/order-tracking/${demo.id}`}
                className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-800 transition hover:bg-stone-50"
              >
                <span>{demo.label}</span>
                <span className="font-mono text-xs text-stone-400">
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
