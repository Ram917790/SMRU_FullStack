export function Skeleton({ className = "" }) {
    return <div className={`animate-pulse bg-gray-100 ${className}`} />;
  }
  export function SkeletonCard({ className = "" }) {
    return (
      <div className={`rounded-2xl border shadow-sm p-5 ${className}`}>
        <Skeleton className="h-5 w-1/2 rounded mb-3" />
        <Skeleton className="h-4 w-3/4 rounded mb-2" />
        <Skeleton className="h-4 w-2/3 rounded mb-6" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>
    );
  }
  