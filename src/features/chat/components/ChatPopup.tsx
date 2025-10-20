// components/chat/ChatPopup.tsx
"use client";

import { motion } from "framer-motion";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
// import { useChat } from "@/hooks/useChat";
// import { useMessages } from "@/hooks/useMessages";
import { ArrowLeft, Loader2, MessageSquare, X } from "lucide-react";
// import { useAuthStore } from "@/stores/auth.store";
// import { useChatPopupStore } from "@/stores/chatPopup.store";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useChat } from "../hooks/useChat";
import { useChatPopupStore } from "@/stores/chatPopup.store";
import { useMessages } from "../hooks/useMessages";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const ChatPopup = () => {
  const { selectedChatId, closePopup, setSelectedChatId } = useChatPopupStore();

  const { user } = useAuthStore();
  const isMobile = useMediaQuery("(max-width: 768px)");

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
      className="fixed right-0 bottom-14 z-50 w-full rounded-t-xl border bg-white sm:right-4 sm:bottom-5 sm:max-w-2xl sm:rounded-lg sm:shadow-lg"
    >
      <div className="mx-auto flex h-[94vh] overflow-hidden rounded-t-xl border-gray-200 sm:h-[600px] sm:rounded-lg">
        {/* Left panel */}

        {(!isMobile || !selectedChatId) && (
          <div className="w-full flex-shrink-0 border-r border-gray-200 bg-white sm:w-[260px]">
            {chatList.isLoading ? (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              </div>
            ) : (
              <ChatSidebar
                chats={chatList.data ?? []}
                selectedChatId={selectedChatId}
                user={user}
              />
            )}
          </div>
        )}

        {/* Right panel */}
        <div className="flex w-full flex-1 flex-col">
          {selectedChatId ? (
            <>
              <div className="flex items-center border-b border-gray-200">
                {isMobile && (
                  <button
                    className="px-4 text-gray-600 hover:text-gray-800"
                    onClick={() => setSelectedChatId("")}
                  >
                    <ArrowLeft />
                  </button>
                )}
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
              </div>
              {/* Header */}

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
            !isMobile && (
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
            )
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatPopup;
