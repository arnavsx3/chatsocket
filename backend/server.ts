import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const users = new Map<string, string>(); // socket.id → name

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (name: string) => {
    users.set(socket.id, name);
    io.emit("message", `${name} joined the chat`);
  });

  socket.on("message", (msg: string) => {
    const name = users.get(socket.id);
    io.emit("message", `${name}: ${msg}`);
  });

  socket.on("disconnect", () => {
    const name = users.get(socket.id);
    users.delete(socket.id);
    if (name) {
      io.emit("message", `${name} left the chat`);
    }
  });
});

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
