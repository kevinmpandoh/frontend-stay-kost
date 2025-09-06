// lib/socket.ts
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  withCredentials: true,
  query: {
    userId: typeof window !== "undefined" ? localStorage.getItem("userId") : "", // Sesuaikan
  },
});

export default socket;
