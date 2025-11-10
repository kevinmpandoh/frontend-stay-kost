"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roomService } from "@/features/room/services/room.service";
import { ModalTambahEditRoom } from "./ModalTambahEditRoom";
import { useConfirm } from "@/hooks/useConfirmModal";
import BackLink from "@/components/common/BackLink";
import { useSubscription } from "@/features/subscription/hooks/useSubscription";
import { useModalStore } from "@/stores/modal.store";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { APIError } from "@/utils/handleAxiosError";
// import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

const KetersediaanKamarPage = () => {
  const params = useParams();
  const kostTypeId = params.kostTypeId as string;
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10; // jumlah data per halaman
  const [filterStatus, setFilterStatus] = useState("all");
  const { currentSubscription } = useSubscription();
  const { openUpgrade } = useModalStore();
  const confirm = useConfirm();
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<
    | {
        _id: string;
        nomor_kamar: string;
        lantai: number;
        status_ketersediaan: "occupied" | "available";
      }
    | undefined
  >(undefined);

  const { data: rooms, isLoading } = useQuery({
    queryKey: ["owner-room", kostTypeId],
    queryFn: () => roomService.getRoomsByKostType(kostTypeId),
    enabled: !!kostTypeId,
  });

  console.log(rooms, "ROOMS");

  useEffect(() => {
    setPage(1);
  }, [search, filterStatus]);

  const deleteMutation = useMutation({
    mutationFn: (roomId: string) => roomService.deleteRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner-room", kostTypeId] });
    },
    onError: (error: any) => {
      if (error instanceof APIError) {
        toast.error(error?.message || "Gagal menyimpan data kamar");
        return;
      }
      toast.error(
        error?.response?.data?.message || "Gagal menghapus data kamar",
      );
    },
  });

  const handleDelete = async (roomId: string) => {
    const ok = await confirm({
      title: "Hapus Kamar ini?",
      description:
        "Apakah kamu yakin ingin menghapus data ini? Tindakan ini tidak bisa dibatalkan.",
      confirmText: "Hapus",
      cancelText: "Batal",
    });

    if (ok) {
      deleteMutation.mutate(roomId);
    }
  };

  const usedRooms = useMemo(() => {
    if (!rooms) return 0;
    return rooms.length;
  }, [rooms]);

  const filteredRooms = (rooms || []).filter((kamar: any) => {
    const matchesSearch = kamar.number
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      kamar.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const paginatedRooms = filteredRooms.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filteredRooms.length / limit);

  return (
    <div className="space-y-6 p-6">
      <BackLink fallbackUrl="/" />
      <h1 className="text-2xl font-bold">Atur Ketersediaan Kamar</h1>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder="Cari nama atau nomor kamar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="available">Tersedia</SelectItem>
              <SelectItem value="occupied">Terisi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => {
            if (
              usedRooms >= (currentSubscription?.package?.maxRoom ?? Infinity)
            ) {
              openUpgrade();
            } else {
              setOpenModal(true); // buka modal
            }
          }}
        >
          <Plus /> Tambah Kamar
        </Button>

        {/* <ModalTambahEditRoom kostTypeId={kostTypeId} /> */}
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nomor Kamar</TableHead>
              <TableHead>Lantai</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading && paginatedRooms.length > 0 ? (
              paginatedRooms.map((kamar: any, index: number) => (
                <TableRow
                  key={kamar._id}
                  className={index % 2 === 1 ? "bg-muted" : ""}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{kamar.number}</TableCell>
                  <TableCell>{kamar.floor}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded px-2 py-1 text-base ${
                        kamar.status === "occupied"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {kamar.status === "occupied" ? "Terisi" : "Tersedia"}
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditData({
                          _id: kamar._id,
                          nomor_kamar: kamar.number,
                          lantai: kamar.floor,
                          status_ketersediaan: kamar.status,
                        });
                        setOpenModal(true);
                      }}
                    >
                      <SquarePen size={24} className="text-primary" />
                    </Button>

                    <Button
                      variant="ghost"
                      size={"icon"}
                      onClick={() => handleDelete(kamar._id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  {isLoading ? "Memuat data..." : "Tidak ada kamar ditemukan."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Sebelumnya
          </Button>

          <span className="text-sm">
            Halaman {page} dari {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Berikutnya
          </Button>
        </div>
      )}

      {/* Modal konfirmasi hapus */}
      <ModalTambahEditRoom
        kostTypeId={kostTypeId}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        defaultValues={editData}
      />
    </div>
  );
};

export default KetersediaanKamarPage;
