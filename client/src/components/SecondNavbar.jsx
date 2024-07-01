import React from "react";
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
import useAuthStore from "@/lib/zustand/authStore";
import useCartStore from "@/lib/zustand/cartStore";

export const SecondNavbar = ({ title }) => {
  const { logout } = useAuthStore();
  const { clearCart } = useCartStore();
  return (
    <div className="shadow fixed top-0 left-0 right-0 bg-white z-50">
      <div className="p-4 flex justify-between sm:px-28 items-center">
        <Link to="/">
          <div className="logo font-bold text-xl text-emerald-500">PATRON</div>
        </Link>
        <div>
          <h1 className="font-semibold -ml-8">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="hidden sm:block">Ridho</h1>
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
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <Button variant="destructive" onClick={logout}>
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
  );
};
