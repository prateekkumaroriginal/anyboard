import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/shared/card-skeleton";

export default function DataSourcesLoading() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-4 rounded-md bg-yellow-400/20 border border-yellow-400/50 px-3 py-1.5 text-xs font-mono text-yellow-300 w-fit">
        Hello from DataSourcesLoading
      </div>
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-80" />
        <CardSkeleton count={3} />
      </div>
    </div>
  );
}
