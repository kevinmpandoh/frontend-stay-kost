"use client";

import { useQuery } from "@tanstack/react-query";
import { bookingService } from "../booking.service";

export const useBooking = (bookingId?: string) => {
  const getDetailBooking = useQuery({
    queryKey: ["owner-bookings", bookingId],
    queryFn: () => bookingService.getDetailBooking(bookingId!),
    enabled: !!bookingId,
  });

  return {
    getDetailBooking,
  };
};
