// "use client";
// import { useEffect } from "react";
// import { io, Socket } from "socket.io-client";
// import { useQueryClient } from "@tanstack/react-query";

// let socket: Socket;

// export const useSocketNotification = (userId: string) => {
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     if (!userId) return;

//     // 1️⃣ connect ke server socket
//     socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);

//     // 2️⃣ subscribe ke event newNotification
//     socket.on("connect", () => {
//       console.log("Connected to socket server:", socket.id);
//     });

//     socket.on("newNotification", (notif) => {
//       console.log("Received new notification:", notif);

//       // 3️⃣ update cache react-query notifications
//       queryClient.setQueryData(["notifications"], (old: any = []) => [
//         notif,
//         ...old,
//       ]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, queryClient]);
// };
