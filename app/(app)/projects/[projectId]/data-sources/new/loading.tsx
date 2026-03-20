import { Skeleton } from "@/components/ui/skeleton";

export default function NewDataSourceLoading() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="rounded-md bg-yellow-400/20 border border-yellow-400/50 px-3 py-1.5 text-xs font-mono text-yellow-300 w-fit">
          Hello from NewDataSourceLoading
        </div>
        <Skeleton className="h-5 w-56" />
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-[560px] w-full" />
      </div>
    </div>
  );
}
