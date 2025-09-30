"use client";

import { useState, useMemo } from "react";
import { useChatPopupStore } from "@/stores/chatPopup.store";
import ChatItem from "./ChatItem";
import { User } from "@/features/user/user.type";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
  const { setSelectedChatId } = useChatPopupStore();
  const [search, setSearch] = useState("");

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

  if (!chats || chats.length === 0) {
    return (
      <div className="flex w-[260px] flex-col border-r border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-lg font-bold">Chat</h2>
          <span className="rounded-md bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-700 select-none">
            0
          </span>
        </div>
        <div className="px-4 pb-4">
          <div className="relative text-gray-400">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border border-gray-300 py-2 pr-10 pl-3 text-sm placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
              disabled
            />
          </div>
        </div>
        <div className="flex h-full flex-1 items-center justify-center">
          <p className="text-gray-400">No chats available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-[260px] flex-col border-r border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-lg font-bold">Chat</h2>
        <span className="rounded-md bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-700 select-none">
          {filteredChats.length}
        </span>
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
