// services/billing.service.ts
import api from "@/lib/api";
import type {
  Invoice,
  Payment,
  CreatePaymentPayload,
} from "@/features/payment/types/invoice.type";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const invoiceService = {
  getInvoiceByBooking: async (bookingId: string): Promise<Invoice[] | null> => {
    const res = await api.get("/tenant/billings", {
      params: { bookingId },
    });
    return res.data.data ?? null;
  },
  getInvoice: async (invoice: string) => {
    try {
      const response = await api.get(`/invoices/${invoice}`);

      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  getUnpaidBilling: async (bookingId: string): Promise<Invoice | null> => {
    const res = await api.get("/tenant/billings/unpaid", {
      params: { bookingId },
    });
    return res.data.data ?? null;
  },

  createPayment: async ({
    invoiceNumber,
    ...payload
  }: CreatePaymentPayload & { invoiceNumber: string }): Promise<Payment> => {
    const res = await api.post(`/invoices/${invoiceNumber}/payment`, payload);
    return res.data.data;
  },

  confirmPayment: async (billingId: string) => {
    const { data } = await api.patch(
      `/tenant/billings/${billingId}/confirm-payment`,
    );
    return data;
  },

  getOwnerBillings: async (params?: {
    status?: string;
    search?: string;
    month?: string;
  }): Promise<Invoice[] | null> => {
    try {
      const query = new URLSearchParams();

      if (params?.status) query.set("status", params.status);
      if (params?.search) query.set("search", params.search);
      if (params?.month) query.set("month", params.month);

      const url = `/invoices/owner${query.toString() ? `?${query}` : ""}`;

      const response = await api.get(url);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  getAdminInvoices: async (
    params: Record<string, any>,
  ): Promise<Invoice[] | null> => {
    try {
      const response = await api.get("/invoices/admin", {
        params,
      });
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
