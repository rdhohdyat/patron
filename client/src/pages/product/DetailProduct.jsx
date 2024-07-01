import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MainLayout } from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { imageUrl, formatRupiah } from "@/lib/response";
import useCartStore from "@/lib/zustand/cartStore";
import { useToast } from "@/components/ui/use-toast";
import { useProduct } from "@/features/product/fetchProductById";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import ProductList from "./ProductList";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const DetailProduct = () => {
  const { toast } = useToast();
  const { id } = useParams();

  const { addToCart, calculateTotal, cart } = useCartStore();

  const { data: product, isLoading: productDetailLoading } = useProduct(id);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Berhasil menambahkan ke keranjang",
      variant: "default",
    });

    calculateTotal();
  };

  const checkOutToWa = (product) => {
    const url = `https://wa.me/6282287498239?text=${product}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <Navbar />
      <MainLayout>
        <Breadcrumb className="mb-2 font-medium">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link href="/components">Detail</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {productDetailLoading ? (
          <ProductDetailSkeleton />
        ) : (
          <div className="sm:flex justify-between">
            <div>
              <div>
                <img
                  src={imageUrl(product.image)}
                  className="w-full object-cover rounded sm:w-[300px] h-[350px]"
                  alt={product.product_name}
                />
              </div>
              <div className="mt-2">
                <h1 className="text-xl">{product.product_name}</h1>
                <p className="font-semibold">
                  {formatRupiah(product.product_price)}/Kg
                </p>
                <p>{product.product_category}</p>
              </div>
            </div>

            <div className="fixed sm:static bottom-0 z-10 bg-white left-0 right-0">
              <div className="flex gap-2 p-5">
                <Button
                  className="w-full mt-3 sm:w-[300px] block"
                  onClick={() => handleAddToCart(product)}
                >
                  Tambah Keranjang
                </Button>
                <Button
                  className="w-full mt-3 sm:w-[300px]"
                  onClick={() => checkOutToWa(product)}
                >
                  Beli Langsung
                
                </Button>
              </div>
            </div>
          </div>
        )}

        <ProductList></ProductList>
      </MainLayout>
      <Footer />
    </>
  );
};

export default DetailProduct;
