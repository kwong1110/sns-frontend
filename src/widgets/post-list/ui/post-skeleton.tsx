export function PostSkeleton() {
  return (
    <div className="animate-pulse p-4">
      <div className="flex gap-3">
        <div className="h-10 w-10 shrink-0 rounded-full bg-muted" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-32 rounded bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-3/4 rounded bg-muted" />
          </div>
          <div className="flex gap-2">
            <div className="h-24 w-24 rounded-lg bg-muted" />
            <div className="h-24 w-24 rounded-lg bg-muted" />
          </div>
          <div className="flex gap-6">
            <div className="h-4 w-12 rounded bg-muted" />
            <div className="h-4 w-12 rounded bg-muted" />
            <div className="h-4 w-12 rounded bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
