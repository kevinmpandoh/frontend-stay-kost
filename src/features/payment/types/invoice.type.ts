export type InvoiceBase = {
  id: string;
  invoiceNumber: string;
  baseAmount: number;
  totalAmount: number;
  serviceFeeTenant: number;
  status: "unpaid" | "paid" | "expired";
  dueDate: string;
  payment: Payment | null;
  type: "booking" | "subscription"; // 🔑 tambahkan di base
};

export type BookingInvoice = InvoiceBase & {
  type: "booking";
  kostName: string;
  kostType: string;
  photos: string;
  address: string;
  startDate: string;
  endDate: string;
  duration: string;
};

export type SubscriptionInvoice = InvoiceBase & {
  type: "subscription";
  packageName: string;
  packageDuration: number;
  packageFeatures: string[];
};

export type Invoice = BookingInvoice | SubscriptionInvoice;

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "success" | "failed" | "expired";
  provider: string;
  method: string;
  channel: string;
  vaNumber: string | null;
  billKey: string | null;
  billerCode: string | null;
  qrisUrl: string | null;
  deeplink: string | null;
  expiredAt: string;
};

export type CreatePaymentPayload = {
  provider: string;
  method: string;
  channel: string;
};
