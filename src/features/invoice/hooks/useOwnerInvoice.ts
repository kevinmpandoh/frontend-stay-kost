// hooks/useBilling.ts

import { invoiceService } from "@/features/invoice/services/invoice.service";
import { useQuery } from "@tanstack/react-query";

export const useOwnerInvoice = ({
  status,
  search,
  month,
}: {
  status?: string;
  search?: string;
  month?: string;
}) => {
  const { data: billings, isLoading: loadingBillings } = useQuery({
    queryKey: ["billing", status, search, month], // agar refetch saat filter berubah
    queryFn: () =>
      invoiceService.getOwnerBillings({
        status,
        search,
        month,
      }),
  });
  return {
    billings,
    loadingBillings,
  };
};
