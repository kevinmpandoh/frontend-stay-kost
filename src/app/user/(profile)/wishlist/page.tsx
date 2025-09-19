import React from "react";
import { Wishlist } from "@/features/wishlist/components/Wishlist";

const wishlistPage = () => {
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Wishlist saya</h2>

      <div className="flex flex-wrap gap-4">
        <Wishlist />
      </div>
    </>
  );
};

export default wishlistPage;
