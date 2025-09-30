// hooks/useKostQuery.ts
"use client";

import { useCreateKostStore } from "@/stores/createKost.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { KostOwnerService } from "../services/kostOwner.service";
import { toast } from "sonner";
import { APIError } from "@/utils/handleAxiosError";
import { useEditKostModalStore } from "@/stores/editKostModal";
import { CreateKostPayload } from "../types/kost.type";

export const useOwnerKost = (kostId?: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { setIsSubmitSuccess } = useEditKostModalStore();
  const { setCurrentStep, setInformasiKost, setAlamatKost, setFacilitiesKost } =
    useCreateKostStore();

  const setQuery = (key: string, value: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (Array.isArray(value)) {
      params.set(key, value.join(","));
    } else {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    router.push(`/kost?${params.toString()}`);
  };

  const resetQuery = () => {
    router.push("/kost");
  };

  // ✅ Kost owner list (dashboard awal)
  const { data: kostOwner, isLoading: loadingKostOwner } = useQuery({
    queryKey: ["kost-owner"],
    queryFn: () => KostOwnerService.getKostOwner(),
  });

  const {
    data: detailKost,
    isLoading: loadingDetailKost,
    error: errorDetailKost,
    isError,
  } = useQuery({
    queryKey: ["kost", kostId],
    queryFn: () => KostOwnerService.getKostDetail(kostId!),
    enabled: !!kostId,
  });

  const { mutate: createKost, isPending: createKostLoading } = useMutation({
    mutationFn: KostOwnerService.createKost,
    onSuccess: (res) => {
      setInformasiKost({
        name: res.data.name,
        type: res.data.type,
        description: res.data.description,
        rules: res.data.rules,
      });
      toast.success("Data Informasi Kost berhasil simpan");
      if (res.data.status === "draft") {
        setCurrentStep(res.data.progressStep);
        router.replace(`/dashboard/tambah-kost?kost_id=${res.data._id}&step=2`);
      } else {
        setIsSubmitSuccess(true);
      }
      queryClient.invalidateQueries({
        queryKey: ["kost", res.data._id],
      });
    },
  });

  const { mutate: editKost, isPending: editKostLoading } = useMutation({
    mutationFn: ({
      kostId,
      data,
    }: {
      kostId: string;
      data: CreateKostPayload;
    }) => KostOwnerService.editKost(kostId, data),
    onSuccess: (res) => {
      setInformasiKost({
        name: res.data.name,
        type: res.data.type,
        description: res.data.description,
        rules: res.data.rules,
      });
      toast.success("Data Informasi Kost berhasil diperbarui");
      if (res.data.status === "draft") {
        setCurrentStep(res.data.progressStep);
        router.replace(`/dashboard/tambah-kost?kost_id=${res.data._id}&step=2`);
      } else {
        setIsSubmitSuccess(true);
      }

      queryClient.invalidateQueries({
        queryKey: ["kost", kostId],
      });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Gagal memperbarui kost");
    },
  });

  const { mutate: saveAddress, isPending: saveAddressLoading } = useMutation({
    mutationFn: ({ kostId, data }: { kostId: string; data: any }) =>
      KostOwnerService.saveKostAddress(kostId, data),
    onSuccess: (res) => {
      setAlamatKost({
        provinsi: res.address.province,
        kabupaten_kota: res.address.city,
        kecamatan: res.address.district,
        detail_alamat: res.address.detail,
        koordinat: {
          lat: res.address.coordinates.coordinates[1],
          lng: res.address.coordinates.coordinates[0],
        },
      });
      toast.success("Data Alamat Kost berhasil disimpan");

      if (res.status === "draft") {
        setCurrentStep(res.progressStep);
        router.replace(`/dashboard/tambah-kost?kost_id=${res._id}&step=3`);
      } else {
        setIsSubmitSuccess(true);
      }
      queryClient.invalidateQueries({
        queryKey: ["kost", res._id],
      });
    },
    onError: (err: any) => {
      console.log(err, "ERRORNYA");
      if (err instanceof APIError) {
        toast.error(err.message || "Gagal menyimpan alamat kost");
        return;
      }
      toast.error(
        err?.response?.data?.message || "Gagal menyimpan alamat kost",
      );
    },
  });

  const { mutate: saveFacilities, isPending: savingFacilities } = useMutation({
    mutationFn: ({ kostId, data }: { kostId: string; data: any }) =>
      KostOwnerService.createFacilitiesKost(kostId, data),
    onSuccess: (res) => {
      setFacilitiesKost(res.data.facilities);
      toast.success("Data Fasilitas Kost berhasil disimpan");
      if (res.data.status === "draft") {
        setCurrentStep(4);
        router.replace(`/dashboard/tambah-kost?kost_id=${res.data._id}&step=4`);
      } else {
        setIsSubmitSuccess(true);
      }
      queryClient.invalidateQueries({
        queryKey: ["kost", res.data._id],
      });
    },
  });

  const { mutate: submitPhotoKost, isPending: isSubmittingPhoto } = useMutation(
    {
      mutationFn: ({ kostId }: { kostId: string }) =>
        KostOwnerService.submitPhotoKost(kostId),
      onSuccess: (res) => {
        if (res.data.status === "draft") {
          setCurrentStep(5);
          router.replace(
            `/dashboard/tambah-kost?kost_id=${res.data.kostId}&step=5`,
          );
        } else {
          setIsSubmitSuccess(true);
        }
        queryClient.invalidateQueries({
          queryKey: ["kost", res.data.kostId],
        });
      },
      onError: (err: any) => {
        console.log(err, "ERROR");
      },
    },
  );

  return {
    query: searchParams,
    setQuery,
    resetQuery,
    kostOwner,
    loadingKostOwner,
    detailKost,
    loadingDetailKost,
    submitPhotoKost,
    isSubmittingPhoto,
    errorDetailKost,
    isError,
    createKost,
    createKostLoading,
    editKost,
    editKostLoading,
    saveAddress,
    saveAddressLoading,
    saveFacilities,
    savingFacilities,
  };
};
