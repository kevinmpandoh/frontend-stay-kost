// hooks/useWishlist.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  isWishlisted,
} from "../services/wishlist.service";
import { toast } from "sonner";

// import { useLoginModal } from "@/stores/loginModal.store";
import { useAuthStore } from "@/stores/auth.store";

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useAuthStore();

  const isTenant = isAuthenticated && user?.role === "tenant";

  const wishlist = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: isTenant,
  });

  const add = useMutation({
    mutationFn: addToWishlist,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Ditambahkan ke wishlist");
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        // useLoginModal.getState().open();
        // toast.error("Silakan login untuk menambahkan ke wishlist.");
        // opsional: redirect ke login
        // router.push("/login");
      } else {
        toast.error("Gagal menambahkan ke wishlist.");
      }
    },
  });

  const remove = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Dihapus dari wishlist");
    },
  });

  return {
    wishlist,
    add,
    remove,
  };
};

export const useIsWishlisted = (kostId: string) => {
  const { isAuthenticated, user } = useAuthStore();
  const isTenant = isAuthenticated && user?.role === "tenant";
  return useQuery({
    queryKey: ["wishlist", kostId],
    queryFn: () => isWishlisted(kostId),
    enabled: isTenant && !!kostId,
  });
};
