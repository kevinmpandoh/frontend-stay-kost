"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: string;
}

interface ChatMessagesProps {
  messages: Message[];
  currentUserId: string;
  isLoading: boolean;
  chatRoomId: string;
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const ChatMessages = ({
  messages: initialMessages,
  currentUserId,
  isLoading,
  chatRoomId,
}: ChatMessagesProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages ?? []);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL!, {
      withCredentials: true,
      query: {
        userId: currentUserId,
      },
    });

    socketRef.current = socket;

    // Gabung ke chat room
    socket.emit("joinRoom", { chatRoomId });

    // Dapat pesan baru
    socket.on("receiveMessage", (newMessage: Message) => {
      console.log(newMessage, "NEW MESSAGE");
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [chatRoomId, currentUserId]);

  if (isLoading || !initialMessages) {
    return (
      <div className="max-w-s w-full flex-1 space-y-4 overflow-y-auto px-6 py-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="scrollbar-thin w-full max-w-md flex-1 space-y-6 overflow-y-auto px-6 py-4 text-sm text-gray-700">
      {messages.map((msg) => {
        const isMe = msg.senderId === currentUserId;

        return (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-[80%] space-y-1">
              {!isMe && (
                <p className="font-semibold text-gray-700">{msg.senderName}</p>
              )}
              <div
                className={`rounded-lg px-4 py-3 text-sm ${
                  isMe
                    ? "bg-primary-600 self-end text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
              <p
                className={`text-xs text-gray-400 ${
                  isMe ? "text-right" : "text-left"
                }`}
              >
                {formatTime(msg.createdAt)}
              </p>
            </div>
          </motion.div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
