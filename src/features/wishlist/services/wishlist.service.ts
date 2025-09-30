// import { Wishlist } from "@/types/wishlist.type";
import api from "@/lib/api";

export const addToWishlist = async (kostId: string) => {
  const res = await api.post(`/wishlists/${kostId}`);
  return res.data;
};

export const removeFromWishlist = async (kostId: string) => {
  const res = await api.delete(`/wishlists/${kostId}`);
  return res.data;
};

export const getWishlist = async () => {
  const res = await api.get(`/wishlists`);
  return res.data.data;
};

export const isWishlisted = async (kostId: string) => {
  const res = await api.get(`/wishlists/${kostId}`);
  return res.data; // asumsi { isWishlisted: true/false }
};
