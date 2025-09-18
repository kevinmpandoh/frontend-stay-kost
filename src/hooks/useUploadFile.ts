import { uploadService } from "@/services/upload.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUploadFile = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("photo", file);
      uploadService.uploadDocument(formData);
    },
  });
};
export const useGetDocument = (documentId: string) => {
  return useQuery({
    queryKey: ["document", documentId],
    queryFn: async () => {
      const response = await uploadService.getDocument(documentId);
      return response.data;
    },
  });
};
