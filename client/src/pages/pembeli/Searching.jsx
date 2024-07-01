import { useState } from "react";
import { SecondNavbar } from "@/components/SecondNavbar";
import { MainLayout } from "@/components/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { formatRupiah, imageUrl } from "@/lib/response";
import { Link } from "react-router-dom";
import { useProducts } from "@/features/product/fetchProducts";
import { Store } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Footer } from "@/components/Footer";

const SearchingPage = () => {
  const { data: products, isLoading: isLoadingProduct } = useProducts();
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const filteredProducts = products?.filter((product) =>
    product.product_name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div>
      <SecondNavbar title="Pencarian"></SecondNavbar>
      <MainLayout>
        <div>
          <form action="" onSubmit={(e) => e.preventDefault()}>
            <div className="flex justify-between items-center gap-2">
              <div className="w-full bg-gray-100 border border-gray-100 rounded-xl p-3 flex items-center text-sm justify-between text-gray-600 hover:bg-white hover:border-gray-300">
                <input
                  type="text"
                  className="bg-transparent focus:outline-none w-full"
                  placeholder="Cari pasar, produk, dan toko"
                  value={searchKeyword}
                  onChange={handleSearchChange}
                />
              </div>
              <Button className="sm:w-[200px]" onClick={() => {}}>
                Cari
              </Button>
            </div>
          </form>
        </div>

        <Tabs className="w-full mt-3" defaultValue="produk">
          <TabsList className="w-full sm:w-[500px]">
            <TabsTrigger value="produk" className="w-full">
              Produk
            </TabsTrigger>
            <TabsTrigger value="toko" className="w-full">
              Toko
            </TabsTrigger>
            <TabsTrigger value="pasar" className="w-full">
              Pasar
            </TabsTrigger>
          </TabsList>
          <TabsContent value="produk" className="w-full">
            <ScrollArea className="overflow-y-auto max-h-screen">
              {filteredProducts && filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {filteredProducts.map((product) => (
                    <Link to={`/detail/${product.id}`} key={product.id}>
                      <div className="">
                        <img
                          // src={product.image}
                          src={imageUrl(product.image)}
                          className="rounded-lg w-full h-[170px] sm:h-[200px] object-cover"
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
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-lg font-semibold">Produk tidak tersedia</p>
                </div>
              )}
              <ScrollBar className="hidden" orientation="vertical" />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="toko" className="w-full flex justify-center">
            <div>Toko</div>
          </TabsContent>
          <TabsContent value="pasar" className="w-full flex justify-center">
            <div>Pasar</div>
          </TabsContent>
        </Tabs>
      </MainLayout>
      <Footer></Footer>
    </div>
  );
};

export default SearchingPage;
