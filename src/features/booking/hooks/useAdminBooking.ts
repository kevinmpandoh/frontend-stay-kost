"use client";

import { useQuery } from "@tanstack/react-query";
import { bookingService } from "../booking.service";
import { useSearchParams } from "next/navigation";

export const useAdminBooking = () => {
  const searchParams = useSearchParams();

  const queryObject: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    queryObject[key] = value;
  });

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["admin-bookings", queryObject],
    queryFn: () => bookingService.getAdminBookings(queryObject),
  });

  return {
    bookings,
    isLoading,
  };
};
