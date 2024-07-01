import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import emptyCartImage from "@/assets/empty_cart.png";

export default function EmptyCart() {
  return (
    <div className="h-[500px] flex items-center justify-center">
      <div className="text-center">
        <img src={emptyCartImage} className="w-[300px]" />
        <h1 className="text-base">Keranjang anda kosong</h1>
        <Link to="/product">
          <Button className="mt-3">Mulai belanja</Button>
        </Link>
      </div>
    </div>
  );
}
