import { KostOwnerService } from "@/features/kost/services/kostOwner.service";
import { roomTypeService } from "@/features/roomType/services/roomType.service";
import { useCreateKostStore } from "@/stores/createKost.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useKostType = ({ kostTypeId }: { kostTypeId?: string }) => {
  const queryClient = useQueryClient();
  const { setFacilitiesKostType, setCurrentStep, setProgressStep } =
    useCreateKostStore();
  const router = useRouter();

  const {
    data: getRoomTypeDetail,
    isLoading: loadingRoomTypeDetail,
    error: errorKostType,
    isError,
    refetch: refetchKostTypeOwner,
  } = useQuery({
    queryKey: ["kost-type", kostTypeId],
    queryFn: () => roomTypeService.getRoomTypeById(kostTypeId!),
    enabled: !!kostTypeId,
  });

  const { mutateAsync: create, isPending: isCreating } = useMutation({
    mutationFn: ({ kostId, data }: { kostId: string; data: any }) =>
      roomTypeService.create(kostId, data),

    onSuccess: (res) => {
      if (res.data.kostStatus === "draft") {
        setProgressStep(6);
        setCurrentStep(6);
        router.replace(
          `/dashboard/tambah-kost?kost_id=${res.data.kostId}&step=6`,
        );
        queryClient.invalidateQueries({ queryKey: ["kost", res.data.kostId] });
      } else {
        setCurrentStep(2);
        setProgressStep(2);
        router.replace(
          `/dashboard/kost-type/create?kost_id=${res.data.kostId}&kost_type_id=${res.data.roomTypeId}&step=2`,
        );
        queryClient.invalidateQueries({
          queryKey: ["roomType", res.data.roomTypeId],
        });
      }
    },
    onError: (err: any) => {
      console.log(err, "ERROR");
    },
  });
  const { mutateAsync: edit, isPending: isEditing } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      roomTypeService.edit(id, data),
    onSuccess: (res) => {
      if (res.kostStatus === "draft") {
        setCurrentStep(6);
        router.replace(`/dashboard/tambah-kost?kost_id=${res.kostId}&step=6`);
        // queryClient.invalidateQueries({
        //   queryKey: ["kost", res.kostId],
        // });
      } else {
        if (res.roomTypeStatus === "draft") {
          setCurrentStep(2);
          setProgressStep(2);
          router.replace(
            `/dashboard/kost-type/create?kost_id=${res.kostId}&kost_type_id=${res.roomTypeId}&step=2`,
          );
          queryClient.invalidateQueries({
            queryKey: ["kost", res.kostId],
          });
        } else {
          router.push(`/dashboard/owner/kost-saya/${res.kostId}`);
        }

        queryClient.invalidateQueries({
          queryKey: ["roomType", res.roomTypeId],
        });
      }
    },
  });

  const { mutate: saveFacilities, isPending: savingFacilities } = useMutation({
    mutationFn: ({ kostTypeId, data }: { kostTypeId: string; data: any }) =>
      KostOwnerService.createFacilitiesKostType(kostTypeId, data),

    onSuccess: (res) => {
      if (res.data.kostStatus === "draft") {
        setCurrentStep(7);
        setProgressStep(7);
        setFacilitiesKostType(res.data.facilities);
        router.replace(
          `/dashboard/tambah-kost?kost_id=${res.data.kostId}&step=7`,
        );
        queryClient.invalidateQueries({
          queryKey: ["kost", res.data.kostId],
        });
      } else {
        setCurrentStep(3);
        setProgressStep(3);
        router.replace(
          `/dashboard/kost-type/create?kost_id=${res.data.kostId}&kost_type_id=${res.data.roomTypeId}&step=3`,
        );
        queryClient.invalidateQueries({
          queryKey: ["roomType", res.data.roomTypeId],
        });
      }
    },
  });

  const { mutate: submitPhotoRoom } = useMutation({
    mutationFn: ({ kostTypeId }: { kostTypeId: string }) =>
      KostOwnerService.submitPhotoRoom(kostTypeId),
    onSuccess: (res) => {
      if (res.data.kostStatus === "draft") {
        setCurrentStep(8);
        setProgressStep(8);
        router.replace(
          `/dashboard/tambah-kost?kost_id=${res.data.kostId}&step=8`,
        );
        queryClient.invalidateQueries({
          queryKey: ["kost", res.data.kostId],
        });
      } else {
        setCurrentStep(4);
        setProgressStep(4);
        router.replace(
          `/dashboard/kost-type/create?kost_id=${res.data.kostId}&kost_type_id=${res.data.roomTypeId}&step=4`,
        );
        queryClient.invalidateQueries({
          queryKey: ["roomType", res.data.roomTypeId],
        });
        //  setIsSubmitSuccess(true);
      }
      queryClient.invalidateQueries({ queryKey: ["photo-kost", kostTypeId] });
    },
    onError: (err: any) => {
      console.log(err, "ERROR");
    },
  });

  const { mutate: saveKostTypePrice, isPending: savingKostTypePrice } =
    useMutation({
      mutationFn: ({ kostTypeId, data }: { kostTypeId: string; data: any }) =>
        KostOwnerService.createKostTypePrice(kostTypeId, data),
      onSuccess: (res) => {
        if (res.data.kost.status === "draft") {
          router.push(`/dashboard/owner/kost-saya`);
          queryClient.invalidateQueries({
            queryKey: ["kost", res.data.kostId],
          });
        } else {
          router.push(`/dashboard/owner/kost-saya/${res.data.kost._id}`);
          queryClient.invalidateQueries({
            queryKey: ["roomType", kostTypeId],
          });
        }
      },
    });

  return {
    getRoomTypeDetail,
    loadingRoomTypeDetail,
    submitPhotoRoom,
    errorKostType,
    refetchKostTypeOwner,
    isError,
    create,
    isCreating,
    edit,
    isEditing,
    saveFacilities,
    savingFacilities,
    saveKostTypePrice,
    savingKostTypePrice,
  };
};
