"use client";

import { useState, useMemo } from "react";
import { useChatPopupStore } from "@/stores/chatPopup.store";
import ChatItem from "./ChatItem";
import { User } from "@/features/user/user.type";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Badge } from "@/components/ui/badge";

interface ChatSidebarProps {
  chats: {
    id: string;
    kost: {
      namaKost: string;
      fotoKost: string;
    };
    sender: {
      id: string;
      name: string;
      avatar: string;
    };
    last_message: string;
    last_message_at: string;
    unread_messages: number;
  }[];
  selectedChatId: string | null;
  user: User;
}

const ChatSidebar = ({ chats, selectedChatId, user }: ChatSidebarProps) => {
  const { setSelectedChatId, closePopup } = useChatPopupStore();
  const [search, setSearch] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  // Filter chats berdasarkan nama kost / nama pengirim
  const filteredChats = useMemo(() => {
    if (!search) return chats;
    return chats.filter((chat) => {
      const searchLower = search.toLowerCase();
      const target =
        user.role === "tenant"
          ? chat.kost.namaKost
          : chat.sender.name + " " + chat.kost.namaKost;
      return target.toLowerCase().includes(searchLower);
    });
  }, [chats, search, user.role]);

  return (
    <div className="flex w-full flex-col border-r border-gray-200 sm:w-[260px]">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">Chat</h2>
          <Badge>{filteredChats.length}</Badge>
        </div>
        {isMobile && (
          <button
            aria-label="Close chat"
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={closePopup}
          >
            <X />
          </button>
        )}
      </div>
      <div className="px-4 pb-4">
        <div className="relative text-gray-400">
          <Input
            type="text"
            placeholder="Cari Chat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search size={18} />}
            className="w-full"
          />
        </div>
      </div>
      <div className="scrollbar-thin flex-1 overflow-y-auto">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ChatItem
              key={chat.id}
              imgSrc={
                user.role === "tenant"
                  ? chat.kost.fotoKost
                  : chat.sender.avatar || "/profile-default.png"
              }
              name={
                user.role === "tenant" ? chat.kost.namaKost : chat.sender.name
              }
              kost={user.role === "owner" ? chat.kost.namaKost : ""}
              message={chat.last_message}
              onClick={() => handleSelect(chat.id)}
              active={chat.id === selectedChatId}
              unreadCount={chat.unread_messages || 0}
            />
          ))
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            Percakapan tidak ditemukan
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
