import Link from "next/link";
import { DEFAULT_DEMO_ORDER_ID } from "@/lib/order-tracking";

export default function HomePage() {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_#f5f5f4_0%,_#e7e5e4_55%,_#d6d3d1_100%)] px-4">
      <div className="w-full max-w-[430px] rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_20px_50px_-30px_rgba(28,25,23,0.45)]">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-teal-800">
          Vecosoft
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900">
          Order tracking
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          Phase 1 happy path — status hero, delivery timeline, and order
          summary on a mobile-first layout.
        </p>
        <Link
          href={`/order-tracking/${DEFAULT_DEMO_ORDER_ID}`}
          className="mt-6 flex h-12 items-center justify-center rounded-xl bg-stone-900 text-sm font-medium text-white transition hover:bg-stone-800"
        >
          Open demo order
        </Link>
      </div>
    </main>
  );
}
