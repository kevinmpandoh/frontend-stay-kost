import React from "react";
import { Wishlist } from "@/features/wishlist/components/Wishlist";

const wishlistPage = () => {
  return (
    <>
      <h1 className="mb-6 text-base font-bold text-gray-900 select-none">
        Wishlist saya
      </h1>
      <div className="flex flex-wrap gap-4">
        <Wishlist />
      </div>
    </>
  );
};

export default wishlistPage;
