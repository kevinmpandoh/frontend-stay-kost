// hooks/useBilling.ts

import { invoiceService } from "@/features/invoice/services/invoice.service";
import { useQuery } from "@tanstack/react-query";

export const useInvoiceAdmin = ({
  status,
  search,
  month,
}: {
  status?: string;
  search?: string;
  month?: string;
}) => {
  const { data: invoices, isLoading: loadingInvoices } = useQuery({
    queryKey: ["billing", status, search, month],
    queryFn: () => invoiceService.getAdminInvoices({ status, search, month }),
  });

  return {
    invoices,
    loadingInvoices,
  };
};
