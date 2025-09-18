import api from "@/lib/api";
import type {
  Payment,
  CreatePaymentPayload,
} from "@/features/payment/types/invoice.type";

export const paymentService = {
  getTenantPayments: async () => {
    const response = await api.get(`/payments/tenant`);
    return response.data.data;
  },

  getBillingPayment: async (billingId: string): Promise<Payment | null> => {
    const res = await api.get(`/tenant/payments/${billingId}`);
    return res.data.data ?? null;
  },
  createPayment: async ({
    invoiceId,
    ...payload
  }: CreatePaymentPayload & { invoiceId: string }): Promise<Payment> => {
    const res = await api.post(
      `/tenant/billings/${invoiceId}/create-payment`,
      payload,
    );
    return res.data.data;
  },

  confirmPayment: async (paymentId: string) => {
    const { data } = await api.patch(`/payments/${paymentId}/status`);
    return data.data;
  },

  changePaymentMethod: async ({
    paymentId,
    provider,
    method,
    channel,
  }: {
    paymentId: string;
    provider: string;
    method: string;
    channel: string;
  }) => {
    const { data } = await api.put(`/payments/${paymentId}/change-method`, {
      provider,
      method,
      channel,
    });
    return data;
  },
};
