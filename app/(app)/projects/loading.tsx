import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/shared/card-skeleton";

export default function ProjectsLoading() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-4 rounded-md bg-yellow-400/20 border border-yellow-400/50 px-3 py-1.5 text-xs font-mono text-yellow-300 w-fit">
        Hello from ProjectsLoading
      </div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-56 mt-2" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>
      <CardSkeleton count={6} />
    </div>
  );
}
