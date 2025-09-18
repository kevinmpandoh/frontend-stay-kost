// stores/booking.store.ts
import { create } from "zustand";

interface BookingState {
  startDate: string | null;
  success: boolean;
  setStartDate: (tanggal: string) => void;
  setSuccess: (success: boolean) => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  startDate: null,
  success: false,
  setStartDate: (tanggal) => set({ startDate: tanggal }),
  setSuccess: (success) => set({ success }),
  clearBooking: () => set({ startDate: null, success: false }),
}));
