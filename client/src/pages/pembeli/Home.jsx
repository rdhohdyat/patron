import { Navbar } from "@/components/Navbar";
import { MainLayout } from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { MapPin, Store } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Footer } from "@/components/Footer";
import { formatRupiah, imageUrl } from "@/lib/response";
import { Link } from "react-router-dom";
import { ProductSkeleton } from "../product/ProductSkeleton";
import { useProducts } from "@/features/product/fetchProducts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Apple,
  Beef,
  Fish,
  Egg,
  LeafyGreen,
  ChefHat,
  Wheat,
  Coffee,
  Hop,
  Cookie,
  HandPlatter,
  Croissant,
} from "lucide-react";

const BuyerHome = () => {
  const { data: products, isLoading: productLoading } = useProducts();

  const category = [
    { name: "Sayur", icon: <LeafyGreen /> },
    { name: "Buah", icon: <Apple /> },
    { name: "Daging", icon: <Beef /> },
    { name: "Ikan", icon: <Fish /> },
    { name: "Bumbu dapur", icon: <ChefHat /> },
    { name: "Beras/biji-bijian", icon: <Wheat /> },
    { name: "Telur", icon: <Egg /> },
    { name: "Minuman", icon: <Coffee /> },
    { name: "Rempah-rempah", icon: <Hop /> },
    { name: "Produk olahan", icon: <HandPlatter /> },
    { name: "Makanan ringan", icon: <Cookie /> },
    { name: "Roti dan kue", icon: <Croissant /> },
  ];

  return (
    <>
      <Navbar />
      <MainLayout>
        <div className="w-full">
          <Dialog>
            <DialogTrigger asChild>
              <div className=" bg-gray-100 border border-gray-100 rounded-xl p-3 flex items-center text-sm justify-between text-gray-600 hover:bg-white hover:border-gray-300">
                <div className="flex items-center gap-1">
                  <MapPin />
                  <p className="w-[200px] sm:w-full truncate">
                    Umban sari, Rumbai, Pekanbaru
                  </p>
                </div>
                <p>Pilih Lokasi</p>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Lokasi</DialogTitle>
                <DialogDescription>
                  <div className="h-[300px]"></div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="submit">Pilih Lokasi</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div
            className="sm:p-12 p-6 z-10 sm:bg-none bg-cover bg-center rounded-xl mt-6"
            style={{ backgroundImage: "url(/market.jpg)" }}
          >
            <div>
              <h1 className="font-semibold text-lg sm:text-2xl  text-white sm:w-[600px]">
                Temukan Pasar Terdekat dan Berbagai Kebutuhan Rumah Tangga Anda
                dengan Patron
              </h1>
              <p className="text-white mt-3 sm:text-lg">
                Jelajahi pasar terdekat dengan Anda dan mulai berbelanja.
              </p>
            </div>
          </div>
          {/* categori */}
          <div className="mt-6">
            <Carousel>
              <CarouselContent>
                {category.map((item, index) => (
                  <CarouselItem className="basis-1/2 sm:basis-1/6" key={index}>
                    <div className="bg-white shadow p-3 text-center border rounded flex flex-col items-center justify-center">
                      <div className="text-emerald-500">{item.icon}</div>
                      <h1 className="text-gray-500 font-medium mt-2">{item.name}</h1>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="flex justify-between items-center mt-3">
            <h1 className="font-semibold sm:text-xl">Product terlaris</h1>
            <Button variant="link" className="sm:text-lg">
              Lihat semua
            </Button>
          </div>

          {/* produk terlaris */}
          <div className="relative rounded-md">
            <Carousel className="rounded-md">
              <CarouselContent>
                {productLoading
                  ? Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <CarouselItem
                          key={index}
                          className="basis-1/2 lg:basis-1/5"
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

          <div className="flex justify-between items-center mt-8">
            <h1 className="font-semibold sm:text-xl">Pasar terdekat</h1>
            <Button variant="link" className="sm:text-lg">
              Lihat semua
            </Button>
          </div>

          {/* produk terlaris */}
          <div>
            <Carousel>
              <CarouselContent>
                {[...Array(10)].map((item, index) => (
                  <CarouselItem key={index} className="basis-1/2 sm:basis-1/5">
                    <div>
                      <img
                        src="/pasar.jpg"
                        className="rounded-lg w-[250px] h-[170px] sm:h-[200px] sm:object-cover"
                        alt=""
                      />
                      <div className="mt-1">
                        <h1 className="font-semibold">Pasar Rumbai</h1>
                        <p className="text-sm">
                          Jl. Sekolah, Kec. Rumbai, Pekanbaru
                        </p>
                        <div className="text-sm flex items-center gap-1 mt-2">
                          <MapPin size="16" />
                          <p>2 Km</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex absolute left-0 top-[40%] transform -translate-y-1/2" />
              <CarouselNext className="hidden sm:flex absolute right-0 top-[40%] transform -translate-y-1/2" />
            </Carousel>
          </div>
        </div>
      </MainLayout>
      <Footer></Footer>
    </>
  );
};

export default BuyerHome;
// <div className="flex w-max space-x-3">
//
// </div>;
