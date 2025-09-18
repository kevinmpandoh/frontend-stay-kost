export enum BookingStatus {
  PENDING = "pending",
  EXPIRED = "expired",
  APPROVED = "approved",
  REJECTED = "rejected",
  WAITING_FOR_PAYMENT = "waiting_for_payment",
  WAITING_FOR_CHECKIN = "waiting_for_checkin",
  ACTIVE = "active",
  WAITING_FOR_CHECKOUT = "waiting_for_checkout",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum StopRequestStatus {
  PENDING = "pending_approval",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface RentalRequestCardProps {
  id?: string;
  kostId: string;
  date: string;
  status: string;
  kostName: string;
  address: string;
  category: string;
  checkInDate: string;
  checkOutDate: string;
  duration: string;
  imageUrl: string;
  price: number;
  paymentDeadline: string;
  invoiceUnpaid: string;
  reason?: string;
}
//    roomTypeId: booking.roomType._id,

export interface BookingResponse {
  kost: {
    photo: string;
    name: string;
    room: string;
    roomTypeId: string;
  };
  startDate: string;
  endDate: string;
  duration: number;
  status: BookingStatus;
  stopRequest?: {
    status: StopRequestStatus;
    requestedStopDate: Date;
    reason?: string;
  };
  note?: string;
  totalPrice: number;
  paymentDeadline?: Date | null;
  tenant: {
    id: string;
    name: string;
    email: string;
    phone: string;
    emergencyContact: string;
    gender: string;
    job: string;
    photo: string;
  };
  idDocument?: string;
  createdAt: string;
  // firstInvoice: Object;
}

export type RejectBookingInput = {
  reason: string;
};
