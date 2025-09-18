// hooks/useBilling.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invoiceService } from "@/features/invoice/services/invoice.service";
import { useRouter } from "next/navigation";

type UseInvoiceProps = {
  status?: string;
  search?: string;
  month?: string;
  bookingId?: string;
  invoiceNumber?: string;
};

export const useInvoice = ({
  status,
  search,
  month,
  bookingId,
  invoiceNumber,
}: UseInvoiceProps) => {
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

  const {
    data: payment,
    isLoading: loadingPayment,
    refetch: refetchPayment,
  } = useQuery({
    queryKey: ["billing", "payment"],
    queryFn: () =>
      invoice
        ? invoiceService.getBillingPayment(invoice.id)
        : Promise.resolve(null),
    enabled: !!invoice?.id && invoice?.hasPayment === true,
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
      refetchPayment();
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
    payment,
    loadingPayment,
    createPayment,
    creatingPayment,

    billingError,
  };
};
