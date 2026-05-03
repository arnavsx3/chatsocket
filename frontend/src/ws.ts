import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function connectWs() {
  if (!socket) {
    socket = io("http://localhost:3001");
    
  }
  return socket
}
