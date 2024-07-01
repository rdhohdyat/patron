import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeleton = () => {
  return (
    <div className="sm:shadow rounded-lg w-[170px] sm:w-[250px] mx-2">
      <Skeleton className="rounded-lg w-[250px] h-[170px] sm:h-[200px]" />
      <div className="mt-1">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
        <div className="flex items-center gap-1 mt-2">
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
};
