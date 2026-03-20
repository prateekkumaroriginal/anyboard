import { Skeleton } from "@/components/ui/skeleton";

export default function EditDataSourceLoading() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-5 w-56" />
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-[560px] w-full" />
      </div>
    </div>
  );
}
