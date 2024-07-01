import {
  Search,
  ShoppingBasket,
  CircleUserRound,
  LogOut,
  Store,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import EmptyCart from "./EmptyCart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "./ui/use-toast";
import useCartStore from "@/lib/zustand/cartStore";
import { imageUrl, formatRupiah } from "@/lib/response";
import useAuthStore from "@/lib/zustand/authStore";

export const Navbar = () => {
  const { toast } = useToast();
  const {
    cart,
    total,
    increaseQty,
    decreaseQty,
    removeFromCart,
    calculateTotal,
    clearCart,
  } = useCartStore();

  const { user, logout } = useAuthStore();

  const handleIncreaseQty = (productId) => {
    increaseQty(productId);
    calculateTotal();
  };

  const handleDecreaseQty = (productId) => {
    decreaseQty(productId);
    calculateTotal();
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    toast({
      title: "Produk dihapus dari keranjang",
      variant: "alert",
    });
    calculateTotal();
  };

  return (
    <div className="shadow fixed top-0 left-0 right-0 bg-white z-20">
      <div className="p-4 flex justify-between sm:justify-around items-center">
        <Link to="/">
          <div className="logo font-bold text-xl text-emerald-500">PATRON</div>
        </Link>
        <Link to="/search">
          <div className="hidden border-2 sm:flex sm:w-[700px] rounded-xl px-6 p-2 items-center gap-2">
            <input
              type="text"
              className="sm:w-full focus:outline-none text-sm"
              placeholder="Cari Product, Lapak dan Pasar"
            />
            <Search className="text-gray-400"></Search>
          </div>
        </Link>
        <div className="flex items-center">
          <Link to="/search" variant="link" className="sm:hidden ">
            <Search />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="link">
                <div className="relative">
                  <ShoppingBasket />
                  {cart.length > 0 && (
                    <div className="bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-1">
                      {cart.length}
                    </div>
                  )}
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col h-full justify-between">
              <SheetHeader>
                <SheetTitle>Keranjang Belanja</SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto flex flex-col gap-2 max-h-[450px] sm:max-h-[450px] flex-grow">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border p-2 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={imageUrl(item.image)}
                        className="w-[70px] h-[70px] object-cover"
                        alt={item.product_name}
                      />
                      <div className="text-start">
                        <h1 className="text-lg">{item.product_name}</h1>
                        <p className="font-semibold">
                          {formatRupiah(item.product_price)}
                        </p>
                      </div>
                    </div>
                    <div className="sm:flex items-center gap-3">
                      <div className="flex items-center gap-2 w-24 justify-between">
                        <Button
                          size="xs"
                          onClick={() => handleDecreaseQty(item.id)}
                          variant="outline"
                        >
                          -
                        </Button>
                        <div className="">{item.qty}</div>
                        <Button
                          size="xs"
                          onClick={() => handleIncreaseQty(item.id)}
                          variant="outline"
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="mt-3 w-full h-8"
                      >
                        Hapus
                      </Button>
                    </div>
                  </div>
                ))}
                {cart.length == 0 && <EmptyCart />}
              </div>
              <SheetFooter>
                {cart.length > 0 && (
                  <div className="flex flex-col w-full">
                    <div className="text-black">
                      <h1 className="text-lg font-semibold">
                        Rincian pembayaran
                      </h1>
                      <div>
                        <tr>
                          <td>Sub-total</td>
                          <td className="w-5">:</td>
                          <td>{formatRupiah(total)}</td>
                        </tr>
                        <tr>
                          <td>Ongkos Kirim</td>
                          <td className="w-5">:</td>
                          <td>Rp.10.000</td>
                        </tr>
                        <tr>
                          <td>
                            <h1 className="font-semibold text-xl">
                              Total Pembayaran
                            </h1>
                          </td>
                          <td className="w-5">:</td>
                          <td className="text-xl">
                            {formatRupiah(total + 10000)}
                          </td>
                        </tr>
                      </div>
                    </div>
                    <Button type="submit" className="w-full mt-3">
                      Checkout
                    </Button>
                  </div>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <h1 className="hidden sm:block">{user.name}</h1>
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-32">
                <div className="flex flex-col gap-3 ">
                  <Link to="/profile" className="flex gap-2">
                    <CircleUserRound></CircleUserRound>
                    <div>Profil</div>
                  </Link>
                  <AlertDialog>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-sm">
                          Apakah anda yakin untuk keluar ?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="w-full">
                          Batal
                        </AlertDialogCancel>
                        <Button
                          onClick={() => {
                            logout();
                            clearCart();
                          }}
                          className="w-full"
                          variant="destructive"
                        >
                          Keluar
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                    <AlertDialogTrigger className="flex gap-2">
                      <LogOut />
                      <div>Keluar</div>
                    </AlertDialogTrigger>
                  </AlertDialog>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};
