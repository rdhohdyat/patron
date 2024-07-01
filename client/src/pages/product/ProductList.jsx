import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { Store } from "lucide-react";
import { ProductSkeleton } from "./ProductSkeleton";
import { useProducts } from "@/features/product/fetchProducts";
import { imageUrl , formatRupiah} from "@/lib/response";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductList = () => {
  const { data: products, isLoading: productLoading } = useProducts();

  return (
    <div>
      <div className="flex justify-between items-center mt-6">
        <h1 className="font-semibold sm:text-xl">
          Product lain dari Penjual ini
        </h1>
        <Button variant="link" className="sm:text-lg">
          Lihat semua
        </Button>
      </div>

      <div className="relative rounded-md">
        <Carousel className="rounded-md">
          <CarouselContent>
            {productLoading
              ? Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="rounded-lg w-[170px] sm:w-[250px] cursor-pointer"
                    >
                      <ProductSkeleton />
                    </CarouselItem>
                  ))
              : products?.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-1/2  lg:basis-1/5"
                  >
                    <Link to={`/detail/${product.id}`}>
                      <div className="cursor-pointer">
                        <img
                          src={imageUrl(product.image)}
                          className="rounded-lg w-[250px] h-[170px] sm:h-[200px] object-cover"
                          alt={product.product_name}
                        />
                        <div className="mt-1">
                          <h1>{product.product_name}</h1>
                          <p className="text-sm font-semibold">
                            {formatRupiah(product.product_price)}/1 kg
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            <Store size="16" />
                            <p className="text-sm">
                              {product.product_category}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex absolute left-0 top-[40%] transform -translate-y-1/2" />
          <CarouselNext className="hidden sm:flex absolute right-0 top-[40%] transform -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  );
};

export default ProductList;
