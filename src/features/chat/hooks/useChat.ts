"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useChatPopupStore } from "@/stores/chatPopup.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { chatService } from "../chat.service";

export const useChat = () => {
  const queryClient = useQueryClient();
  const { isOpen, openPopup, openPopupWithChatId } = useChatPopupStore();
  const { user } = useAuthStore();

  const chatList = useQuery({
    queryKey: ["chat", "message"],
    queryFn: chatService.getChat,
    enabled: !!user,
  });

  const { mutate: startChat, isPending: startingChat } = useMutation({
    mutationFn: chatService.startChat,
    onSuccess: (res) => {
      openPopupWithChatId(res._id);
      queryClient.invalidateQueries({
        queryKey: ["chat", "message"],
      });
      openPopup();
    },
  });
  const { mutate: getChatTenant, isPending: gettingChatTenant } = useMutation({
    mutationFn: ({
      roomTypeId,
      tenantId,
    }: {
      roomTypeId: string;
      tenantId: string;
    }) => chatService.getChatTenant(roomTypeId, tenantId),

    onSuccess: (res) => {
      console.log(res, "RESNYA");
      queryClient.invalidateQueries({
        queryKey: ["chat", "message"],
      });
      openPopupWithChatId(res._id);
    },
  });

  return {
    chatList,
    startChat,
    startingChat,
    getChatTenant,
    gettingChatTenant,
  };
};
