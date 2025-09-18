import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React from "react";

const TableSubscriptionAdmin = ({ subscriptions }: { subscriptions: any }) => {
  return (
    <>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>

            <TableHead className="w-[100px]">Pemilik Kost</TableHead>
            <TableHead>Paket Langganan</TableHead>
            <TableHead>Durasi</TableHead>
            <TableHead>Tanggal Mulai</TableHead>
            <TableHead>Tanggal Berakhir</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((subscription: any, index: number) => (
            <TableRow key={subscription.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      width={40}
                      height={40}
                      src={subscription.owner?.photo || "/profile-default.png"}
                      alt="Foto Penyewa"
                    />
                  </div>
                  <div>
                    <span className="text-theme-sm block font-medium text-gray-800 dark:text-white/90">
                      {subscription.owner?.name ?? "-"}
                    </span>
                    <span className="text-theme-xs block text-gray-500 dark:text-gray-400">
                      {subscription.owner?.email ?? "-"}
                      &nbsp;
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{subscription.package?.name || ""}</TableCell>
              <TableCell>{subscription.duration}</TableCell>
              <TableCell>{subscription.startDate}</TableCell>
              <TableCell>{subscription.endDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TableSubscriptionAdmin;
