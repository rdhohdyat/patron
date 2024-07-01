import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailSkeleton = () => {
  return (
    <div>
      <div>
        <Skeleton className="sm:w-[300px] h-[380px]" />
      </div>
      <div className="mt-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/2 mt-2" />
        <Skeleton className="h-6 w-1/4 mt-2" />
      </div>
      <Skeleton className="w-full mt-3 sm:w-[300px] h-10" />
      <Skeleton className="w-full mt-3 sm:w-[300px] h-10" />
    </div>
  );
};

export default ProductDetailSkeleton;
