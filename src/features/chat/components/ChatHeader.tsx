"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatPopupStore } from "@/stores/chatPopup.store";
import { Button } from "@/components/ui/button";
// import { useChatPopupStore } from "@/stores/chatPopup.store";

interface ChatHeaderProps {
  name: string;
  image: string;
  isLoading: boolean;
}

const ChatHeader = ({ name, image, isLoading }: ChatHeaderProps) => {
  const { closePopup } = useChatPopupStore();
  if (isLoading) {
    return (
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    );
  }
  return (
    <div className="flex w-full items-center justify-between border-b border-gray-200 py-4 sm:px-6">
      <div className="mr-4 flex items-center space-x-4">
        <Image
          src={image}
          alt="Portrait of a man with dark hair and blue shirt"
          className="h-10 w-10 rounded-full object-cover"
          width={40}
          height={40}
        />
        <div className="sm:max-w-[230px]">
          <p
            className="truncate font-semibold text-gray-900"
            title={name} // Tooltip saat hover
          >
            {name}
          </p>
          {/* <p className="text-sm text-gray-400">Reply to messagee</p> */}
        </div>
      </div>
      <button
        type="button"
        aria-label="Close chat"
        className="mr-4 cursor-pointer text-gray-400 hover:text-gray-600 focus:outline-none"
        onClick={closePopup}
      >
        <X />
      </button>
    </div>
  );
};

export default ChatHeader;
