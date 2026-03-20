import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function NewProjectLoading() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-4 rounded-md bg-yellow-400/20 border border-yellow-400/50 px-3 py-1.5 text-xs font-mono text-yellow-300 w-fit">
        Hello from NewProjectLoading
      </div>
      <Skeleton className="h-4 w-16 mb-6" />
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-64 mt-1" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-9 w-32 mt-2" />
        </CardContent>
      </Card>
    </div>
  );
}
