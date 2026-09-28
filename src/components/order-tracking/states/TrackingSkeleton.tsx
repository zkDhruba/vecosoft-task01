export function TrackingSkeleton() {
  return (
    <div
      className="mx-auto flex w-full max-w-[430px] flex-col gap-5 px-4 py-6 sm:px-5"
      aria-busy="true"
      aria-label="Loading order tracking"
    >
      <div className="flex items-center gap-3">
        <div className="size-10 animate-pulse rounded-xl bg-stone-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-28 animate-pulse rounded bg-stone-200" />
          <div className="h-3 w-36 animate-pulse rounded bg-stone-200" />
        </div>
      </div>

      <div className="h-32 animate-pulse rounded-2xl bg-stone-200" />

      <div className="space-y-4 rounded-2xl border border-stone-200 bg-white/70 p-4">
        <div className="h-4 w-32 animate-pulse rounded bg-stone-200" />
        {[0, 1, 2, 3].map((row) => (
          <div key={row} className="flex gap-3">
            <div className="size-8 animate-pulse rounded-full bg-stone-200" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-3 w-40 animate-pulse rounded bg-stone-200" />
              <div className="h-3 w-56 animate-pulse rounded bg-stone-100" />
            </div>
          </div>
        ))}
      </div>

      <div className="h-28 animate-pulse rounded-2xl bg-stone-200" />
      <div className="space-y-2">
        <div className="h-12 animate-pulse rounded-xl bg-stone-200" />
        <div className="h-12 animate-pulse rounded-xl bg-stone-100" />
      </div>
    </div>
  );
}
