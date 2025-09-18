"use client";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isSending?: boolean;
}

const ChatInput = ({ onSend, isSending }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };
  return (
    <div className="flex items-center space-x-3 border-t border-gray-200 px-6 py-3">
      <input
        type="text"
        placeholder="Ketik pesan..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // ⛔ penting
            handleSend(); // Kirim pesan
          }
        }}
        className="focus:ring-primary-600 focus:border-primary-600 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 placeholder-gray-400 focus:ring-1 focus:outline-none"
      />
      <button
        type="button"
        disabled={isSending}
        onClick={handleSend}
        // className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg p-3 flex items-center justify-center"
        className={`${
          isSending ? "bg-gray-400" : "bg-primary-600 hover:bg-primary-700"
        } flex items-center justify-center rounded-lg p-3 text-white`}
        aria-label="Send message"
      >
        <SendHorizonal size={18} />
      </button>
    </div>
  );
};

export default ChatInput;
