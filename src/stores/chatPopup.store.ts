import { create } from "zustand";

type ChatPopupStore = {
  isOpen: boolean;
  selectedChatId: string | null;
  openPopup: () => void;
  openPopupWithChatId: (chatId: string) => void;
  closePopup: () => void;
  togglePopup: () => void;
  setSelectedChatId: (chatId: string) => void;
};

export const useChatPopupStore = create<ChatPopupStore>((set) => ({
  isOpen: false,
  selectedChatId: null,
  setSelectedChatId: (chatId: string) => set({ selectedChatId: chatId }),
  openPopup: () => set({ isOpen: true }),
  openPopupWithChatId: (chatId) =>
    set({ isOpen: true, selectedChatId: chatId }),
  closePopup: () => set({ isOpen: false, selectedChatId: null }),
  togglePopup: () => set((state) => ({ isOpen: !state.isOpen })),
}));
