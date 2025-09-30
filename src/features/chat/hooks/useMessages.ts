"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { chatService } from "../chat.service";

export const useMessages = (chatRoomId: string) => {
  const queryClient = useQueryClient();

  // Booking aktif (khusus status aktif)
  const messages = useQuery({
    queryKey: ["chat", "message", chatRoomId],
    queryFn: () => chatService.getMessageByChat(chatRoomId),
    enabled: !!chatRoomId,
  });

  const sendMessage = useMutation({
    mutationFn: ({
      chatRoomId,
      message,
    }: {
      chatRoomId: string;
      message: string;
    }) => chatService.sendMessage(chatRoomId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat", "message"],
      });
    },
  });

  return {
    messages,
    sendMessage,
  };
};
