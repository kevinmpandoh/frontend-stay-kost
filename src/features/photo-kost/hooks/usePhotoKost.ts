// hooks/useKostQuery.ts
import { KostOwnerService } from "@/features/kost/services/kostOwner.service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { photoKostService } from "../services/photoKost.service";
import { useCreateKostStore } from "@/stores/createKost.store";
import { useRouter } from "next/navigation";

export const usePhotoKost = ({ kostId }: { kostId?: string }) => {
  const queryClient = useQueryClient();
  const { setCurrentStep, setOnNext } = useCreateKostStore();
  const router = useRouter();
  const {
    data: photoKost,
    isLoading: isLoadingPhoto,
    refetch,
  } = useQuery({
    queryKey: ["photo-kost", kostId],
    queryFn: () => KostOwnerService.getPhotoKost(kostId!),
    enabled: !!kostId,
  });

  const { mutateAsync: uploadPhoto, isPending: isUploading } = useMutation({
    mutationFn: ({
      kostId,
      formData,
    }: {
      kostId: string;
      formData: FormData;
    }) => KostOwnerService.uploadPhotoKost(kostId, formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["photo-kost", kostId] });
    },
  });

  const { mutateAsync: deletePhoto, isPending: isDeleting } = useMutation({
    mutationFn: (photoId: string) => photoKostService.deletePhotoKost(photoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photo-kost", kostId] });
    },
  });

  return {
    photoKost,
    isLoadingPhoto,
    uploadPhoto,
    isUploading,
    deletePhoto,
    isDeleting,
    refetch,
  };
};
