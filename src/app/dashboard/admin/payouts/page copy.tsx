// "use client";

// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import {
//   getAllPayout,
//   sendPayout,
// } from "@/features/payout/services/payout.service";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { format } from "date-fns";
// import { id } from "date-fns/locale";
// import { cn } from "@/lib/utils";
// import { SendPayoutDialog } from "./SendPayoutDialog";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { PayoutDetailDialog } from "./PayoutDetailDialog";
// import { toast } from "sonner";
// import { AxiosError } from "axios";
// import Image from "next/image";
// import { findPaymentMethod } from "@/utils/findPaymentMethod";
// import PageHeader from "@/components/common/PageHeader";

// const AdminPayout = () => {
//   const [selectedPayoutId, setSelectedPayoutId] = useState<string | null>(null);
//   const [selectedDetail, setSelectedDetail] = useState<any | null>(null);

//   const queryClient = useQueryClient();

//   const { data, isLoading } = useQuery({
//     queryKey: ["admin-payouts"],
//     queryFn: () => getAllPayout(),
//   });

//   const { mutate: send, isPending } = useMutation({
//     mutationFn: sendPayout,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["admin-payouts"] });
//       setSelectedPayoutId(null);
//     },
//     onError: (error) => {
//       if (error instanceof AxiosError)
//         toast.error(
//           error.response?.data?.message ||
//             "Payout gagal dikirim silahkan coba lagi",
//         );
//       setSelectedPayoutId(null);
//     },
//   });

//   const payouts = data || [];

//   return (
//     <>
//       <PageHeader title="Payout ke Pemilik Kost" />

//       {isLoading && <h1>Loading</h1>}
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>No.</TableHead>
//             <TableHead>Invoice Payout</TableHead>
//             <TableHead>Nama Pemilik</TableHead>
//             <TableHead>Rekening</TableHead>
//             <TableHead>Tanggal Payout</TableHead>
//             <TableHead>Jumlah</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead className="text-center">Aksi</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {payouts.map((payout: any, index: number) => {
//             const owner = payout.owner;
//             const rekeningLengkap =
//               payout?.method &&
//               payout?.channel &&
//               payout.accountName &&
//               payout.accountNumber;
//             const status = payout.status;

//             console.log(payout, "PAYPOUT");

//             const selectedMethod = findPaymentMethod(
//               payout.channel || payout.method,
//             );

//             console.log(selectedMethod, "TESTING");

//             return (
//               <TableRow key={payout._id}>
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{payout.payoutNumber ?? "-"}</TableCell>
//                 <TableCell>
//                   {" "}
//                   <div className="flex items-center gap-3">
//                     <div className="h-10 w-10 overflow-hidden rounded-full">
//                       <Image
//                         width={40}
//                         height={40}
//                         src={payout.owner?.photo || "/profile-default.png"}
//                         alt="Foto Penyewa"
//                       />
//                     </div>
//                     <div>
//                       <span className="text-theme-sm block font-medium text-gray-800 dark:text-white/90">
//                         {payout.owner?.name ?? "-"}
//                       </span>
//                       <span className="text-theme-xs block text-gray-500 dark:text-gray-400">
//                         {payout.owner?.email ?? "-"}
//                         &nbsp;
//                       </span>
//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   {rekeningLengkap && (
//                     <>
//                       <div className="flex items-center gap-3">
//                         <div className="h-12 w-12 overflow-hidden">
//                           <Image
//                             width={150}
//                             height={150}
//                             src={selectedMethod?.logo || "/profile-default.png"}
//                             alt="Foto Penyewa"
//                           />
//                         </div>
//                         <div>
//                           <span className="text-theme-sm block font-medium text-gray-800 dark:text-white/90">
//                             {payout.accountName ?? "-"}
//                           </span>
//                           <span className="block text-base text-gray-500 dark:text-gray-400">
//                             {payout.accountNumber ?? "-"}
//                             &nbsp;
//                           </span>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {format(new Date(payout.requestedAt), "dd MMM yyyy", {
//                     locale: id,
//                   })}
//                 </TableCell>
//                 <TableCell>
//                   Rp{" "}
//                   {payout.netAmount?.toLocaleString("id-ID", {
//                     minimumFractionDigits: 0,
//                   })}
//                 </TableCell>
//                 <TableCell>
//                   <span
//                     className={cn(
//                       "rounded px-2 py-1 text-xs font-medium capitalize",
//                       status === "success" && "bg-green-100 text-green-700",
//                       status === "Menunggu Rekening" &&
//                         "bg-yellow-100 text-yellow-700",
//                       status === "Gagal" && "bg-red-100 text-red-700",
//                       status === "processed" && "bg-blue-100 text-blue-700",
//                     )}
//                   >
//                     {status}
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex flex-col items-center justify-center gap-2">
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           onClick={() => setSelectedDetail(payout)}
//                         >
//                           Lihat Detail
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Lihat detail informasi payout</p>
//                       </TooltipContent>
//                     </Tooltip>

//                     {(status === "pending" ||
//                       (status === "pending" && rekeningLengkap)) && (
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             size="sm"
//                             variant={
//                               status === "failed" ? "outline" : "default"
//                             }
//                             onClick={() => setSelectedPayoutId(payout._id)}
//                           >
//                             {status === "failed" ? "Retry" : "Kirim"}
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>
//                             {status === "failed"
//                               ? "Coba kirim ulang payout yang gagal"
//                               : "Kirim payout ke pemilik"}
//                           </p>
//                         </TooltipContent>
//                       </Tooltip>
//                     )}
//                   </div>
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//           {!payouts.length && (
//             <TableRow>
//               <TableCell colSpan={8} className="py-4 text-center text-black">
//                 Tidak ada data payout saat ini.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//       <SendPayoutDialog
//         open={!!selectedPayoutId}
//         onClose={() => setSelectedPayoutId(null)}
//         onConfirm={() => selectedPayoutId && send(selectedPayoutId)}
//         loading={isPending}
//       />
//       <PayoutDetailDialog
//         open={!!selectedDetail}
//         onClose={() => setSelectedDetail(null)}
//         data={selectedDetail}
//       />
//     </>
//   );
// };

// export default AdminPayout;
