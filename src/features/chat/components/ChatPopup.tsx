// components/chat/ChatPopup.tsx
"use client";

import { motion } from "framer-motion";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
// import { useChat } from "@/hooks/useChat";
// import { useMessages } from "@/hooks/useMessages";
import { Loader2, MessageSquare, X } from "lucide-react";
// import { useAuthStore } from "@/stores/auth.store";
// import { useChatPopupStore } from "@/stores/chatPopup.store";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useChat } from "../hooks/useChat";
import { useChatPopupStore } from "@/stores/chatPopup.store";
import { useMessages } from "../hooks/useMessages";

const ChatPopup = () => {
  const { selectedChatId, closePopup, setSelectedChatId } = useChatPopupStore();

  const { user } = useAuthStore();

  const { chatList } = useChat();
  const { messages, sendMessage } = useMessages(selectedChatId ?? "");

  const data = messages.data;

  const handleSend = (message: string) => {
    if (!selectedChatId) return;

    sendMessage.mutate({ chatRoomId: selectedChatId, message }); // API post/send via socket/react query
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedChatId) {
        setSelectedChatId(""); // hilangkan chat yang sedang dibuka
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedChatId, setSelectedChatId]);

  if (!user) {
    return;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed right-4 bottom-5 z-50 w-full max-w-2xl rounded-lg border bg-white shadow-lg"
    >
      <div className="mx-auto flex h-[600px] overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        {/* Left panel */}

        {chatList.isLoading ? (
          <div className="flex h-full w-[280px] items-center justify-center bg-gray-50">
            <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
          </div>
        ) : (
          <ChatSidebar
            chats={chatList.data ?? []}
            selectedChatId={selectedChatId}
            user={user}
          />
        )}

        {/* Right panel */}
        <div className="flex w-full flex-1 flex-col">
          {selectedChatId ? (
            <>
              {/* Header */}
              <ChatHeader
                name={
                  user?.role === "tenant"
                    ? data?.namaKost
                    : data?.sender?.name || "User"
                }
                image={
                  user?.role === "tenant"
                    ? data?.photo
                    : data?.sender?.avatar || "/profile-default.png"
                }
                isLoading={messages.isLoading}
              />
              {/* Messages */}
              <ChatMessages
                messages={data?.messages ?? []}
                currentUserId={user?.id}
                isLoading={messages.isLoading}
                chatRoomId={selectedChatId}
              />
              {/* Input */}
              <ChatInput
                onSend={handleSend}
                isSending={sendMessage.isPending}
              />
            </>
          ) : (
            <>
              <div className="flex items-center justify-end border-b border-gray-200 px-6 py-4">
                <button
                  aria-label="Close chat"
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={closePopup}
                >
                  <X />
                </button>
              </div>
              <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-gray-400">
                <MessageSquare className="h-8 w-8" />
                <p className="text-sm">Pilih chat untuk mulai percakapan</p>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatPopup;
