"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { PAYMENT_METHOD } from "@/constants/paymentMethod";
import { userService } from "@/features/user/services/user.service";
import PageHeader from "@/components/common/PageHeader";

const getBankData = (bankCode: string) => {
  for (const category of PAYMENT_METHOD) {
    const found = category.methods.find((m) => m.channel === bankCode);
    if (found) return found;
  }
  return null;
};

const OwnerListPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-owner-list"],
    queryFn: () => userService.getAllOwners(),
  });
  const owners = data || [];

  if (isLoading) {
    <h1>Loading</h1>;
  }

  return (
    <div>
      <PageHeader title="Pemilik Kost" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Nama Pemilik</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Nomor HP</TableHead>
            <TableHead>Rekening Bank</TableHead>
            <TableHead>Nomor Rekening</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {owners.map((owner: any, i: number) => {
            const bankData = getBankData(owner.bank?.bankCode);
            return (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      width={40}
                      height={40}
                      src={owner.photo || "/profile-default.png"}
                      alt={"Foto"}
                      className="rounded-full"
                    />
                    <span className="font-medium">{owner.name}</span>
                  </div>
                </TableCell>
                <TableCell>{owner.email}</TableCell>
                <TableCell>{owner.phone ?? "-"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {bankData && (
                      <Image
                        src={bankData.logo}
                        alt={bankData.name}
                        width={30}
                        height={30}
                      />
                    )}
                    <div>
                      <span className="block font-medium">
                        {bankData?.name ?? "-"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {owner.bank?.accountName}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{owner.bank?.accountNumber ?? "-"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Modal Edit */}
      {/* <EditOwnerModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        owner={selectedOwner}
      /> */}

      {/* Modal Hapus
      <ConfirmDeleteModal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => {
          // TODO: delete owner
          setShowDeleteModal(false);
        }}
        title="Hapus Pemilik Kost?"
        description={`Apakah Anda yakin ingin menghapus pemilik "${selectedOwner?.name}"?`}
      /> */}
    </div>
  );
};

export default OwnerListPage;
