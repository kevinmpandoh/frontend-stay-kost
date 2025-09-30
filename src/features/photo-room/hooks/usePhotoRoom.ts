// hooks/useKostQuery.ts
import { KostOwnerService } from "@/features/kost/services/kostOwner.service";
import { useCreateKostStore } from "@/stores/createKost.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { photoRoomService } from "../services/photoRoom-service";

export const usePhotoRoom = () => {
  const queryClient = useQueryClient();
  const { kostTypeId } = useCreateKostStore();

  const {
    data: photoRoom,
    isLoading: isLoadingPhoto,
    refetch,
  } = useQuery({
    queryKey: ["photo-room", kostTypeId],
    queryFn: () => KostOwnerService.getPhotoRoom(kostTypeId!),
    enabled: !!kostTypeId,
  });

  const { mutateAsync: uploadPhoto, isPending: isUploading } = useMutation({
    mutationFn: ({
      kostTypeId,
      formData,
    }: {
      kostTypeId: string;
      formData: FormData;
    }) => photoRoomService.uploadPhotoRoom(kostTypeId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photo-room", kostTypeId] });
    },
  });

  const { mutateAsync: deletePhoto, isPending: isDeleting } = useMutation({
    mutationFn: ({
      kostTypeId,
      photoId,
    }: {
      kostTypeId: string;
      photoId: string;
    }) => KostOwnerService.deletePhotoRoom(kostTypeId, photoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photo-room", kostTypeId] });
    },
  });

  return {
    photoRoom,
    isLoadingPhoto,
    uploadPhoto,
    isUploading,
    deletePhoto,
    isDeleting,
    refetch,
  };
};
