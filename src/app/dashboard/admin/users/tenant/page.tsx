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

import { Button } from "@/components/ui/button";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/ui/ConfirmModalDelete";
import { userService } from "@/features/user/services/user.service";
import PageHeader from "@/components/common/PageHeader";

const UserListPage = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => userService.getAllTenants(),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(users, "USERS");

  return (
    <div>
      <PageHeader title="Pemilik Kost" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nama Penyewa</TableHead>
            <TableHead>Jenis Kelamin</TableHead>
            <TableHead>Pekerjaan</TableHead>
            <TableHead>Kota Asal</TableHead>
            <TableHead>Kontak Darurat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      width={40}
                      height={40}
                      src={user.avatarUrl || "/profile-default.png"}
                      alt="Foto Profil"
                    />
                  </div>
                  <div>
                    <span className="block text-base font-medium text-gray-800 dark:text-white/90">
                      {user.name}
                    </span>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="capitalize">
                {user.tenantProfile?.gender ?? "-"}
              </TableCell>
              <TableCell>{user.tenantProfile?.job ?? "-"}</TableCell>
              <TableCell>{user.tenantProfile?.hometown ?? "-"}</TableCell>
              <TableCell>
                {user.tenantProfile?.emergencyContact ?? "-"}
              </TableCell>
              {/* <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="link"
                    className="h-auto p-0 text-blue-500"
                    onClick={() => alert("Edit user " + user.name)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-red-500"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowDeleteModal(true);
                    }}
                  >
                    Hapus
                  </Button>
                </div>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserListPage;
