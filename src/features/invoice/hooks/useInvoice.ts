// hooks/useBilling.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invoiceService } from "@/features/invoice/services/invoice.service";

type UseInvoiceProps = {
  status?: string;
  search?: string;
  month?: string;
  bookingId?: string;
  invoiceNumber?: string;
};

export const useInvoice = ({ bookingId, invoiceNumber }: UseInvoiceProps) => {
  const queryClient = useQueryClient();

  const { data: billings, isLoading: loadingBillings } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => invoiceService.getInvoiceByBooking(bookingId!),
    enabled: !!bookingId,
  });

  const {
    data: invoice,
    isLoading: loadingInvoice,
    error: errorInvoice,
  } = useQuery({
    queryKey: ["invoice-payment"],
    queryFn: () => invoiceService.getInvoice(invoiceNumber!),
    enabled: !!invoiceNumber,
    retry: false,
  });

  const {
    data: unpaidBilling,
    isLoading: loadingUnpaidBilling,
    error: billingError,
  } = useQuery({
    queryKey: ["billing", "unpaid"],
    queryFn: () => invoiceService.getUnpaidBilling(bookingId!),
    enabled: !!bookingId,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { mutate: createPayment, isPending: creatingPayment } = useMutation({
    mutationFn: ({
      invoiceNumber,
      provider,
      method,
      channel,
    }: {
      invoiceNumber: string;
      provider: string;
      method: string;
      channel: string;
    }) =>
      invoiceService.createPayment({
        invoiceNumber,
        provider,
        method,
        channel,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoice-payment"],
      });
    },
  });

  return {
    billings,
    loadingBillings,
    invoice,
    loadingInvoice,
    errorInvoice,
    unpaidBilling,
    loadingUnpaidBilling,
    createPayment,
    creatingPayment,

    billingError,
  };
};
