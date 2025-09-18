"use client";
// hooks/useWishlist.ts
import { useQuery } from "@tanstack/react-query";

import { roomService } from "@/features/room/services/room.service";

export const useRoom = (kostTypeId: string) => {
  const { data: getAvaibleRooms, isLoading: getting } = useQuery({
    queryKey: ["rooms"], // supaya cache terpisah berdasarkan status
    queryFn: () => roomService.getRoomsByKostType(kostTypeId, "available"),
    enabled: !!kostTypeId,
  });

  return {
    getAvaibleRooms,
    getting,
  };
};
