// hooks/useBilling.ts

import { invoiceService } from "@/features/invoice/services/invoice.service";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useInvoiceAdmin = () => {
  const searchParams = useSearchParams();

  const queryObject: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    queryObject[key] = value;
  });
  const { data: invoices, isLoading: loadingInvoices } = useQuery({
    queryKey: ["billing", queryObject],
    queryFn: () => invoiceService.getAdminInvoices(queryObject),
  });

  return {
    invoices,
    loadingInvoices,
  };
};
