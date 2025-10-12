import Image from "next/image";
import React from "react";

interface ChatItemProps {
  imgSrc: string;
  name: string;
  message: string;
  kost?: string;
  active?: boolean;
  onClick?: () => void;
  unreadCount: number;
}

const ChatItem = ({
  imgSrc,
  name,
  kost,
  message,
  active,
  onClick,
  unreadCount,
}: ChatItemProps) => {
  return (
    <div onClick={onClick}>
      <div
        className={`mx-2 flex cursor-pointer items-center space-x-4 px-4 py-3 ${
          active ? "rounded-lg bg-gray-100" : ""
        }`}
      >
        <div className="relative h-10 w-10 flex-shrink-0">
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="rounded-full object-cover"
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-gray-900">{name}</span>
          <span className="text-xs">{kost || ""}</span>
          <span className="max-w-[160px] truncate text-gray-500">
            {message}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
