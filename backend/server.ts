import express from "express";
import { createServer } from "node:http";
import type { Request, Response } from "express";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);
const PORT = 3001;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
