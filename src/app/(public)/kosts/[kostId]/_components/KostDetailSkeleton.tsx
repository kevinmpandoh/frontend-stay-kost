import { Skeleton } from "@/components/ui/skeleton";

const KostDetailSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 my-20 space-y-6">
      <Skeleton className="w-full h-[300px] rounded-xl" />
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-10 mt-6">
        <div className="lg:col-span-6 space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="lg:col-span-3 space-y-4">
          <Skeleton className="h-60 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default KostDetailSkeleton;
