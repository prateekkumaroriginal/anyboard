import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/shared/card-skeleton";

export default function ProjectDetailLoading() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <CardSkeleton count={3} />
      </div>
    </div>
  );
}
