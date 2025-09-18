import { PAYMENT_METHOD } from "@/constants/paymentMethod";

export const findPaymentMethod = (value: string) => {
  for (const category of PAYMENT_METHOD) {
    const method = category.methods.find((m) => m.channel === value);
    if (method) return method;
  }
  return null;
};
