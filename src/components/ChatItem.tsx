import Image from "next/image";
import React from "react";

interface ChatItemProps {
  imgSrc: string;
  name: string;
  message: string;
  active?: boolean;
  onClick?: () => void;
  unreadCount: number;
}

const ChatItem = ({
  imgSrc,
  name,
  message,
  active,
  onClick,
  unreadCount,
}: ChatItemProps) => {
  return (
    <div onClick={onClick}>
      <div
        className={`flex items-center space-x-4 px-4 py-3 mx-2 cursor-pointer ${
          active ? "bg-gray-100 rounded-lg" : ""
        }`}
      >
        <div className="relative">
          <Image
            src={imgSrc}
            alt={name}
            className="w-10 h-auto rounded-full object-cover "
            width={90}
            height={90}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-gray-900">{name}</span>
          <span className="text-gray-500 truncate max-w-[160px]">
            {message}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
