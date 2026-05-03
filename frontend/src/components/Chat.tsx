import { useEffect, useState } from "react";
import { getSocket } from "../lib/socket";

export default function Chat({ name }: { name: string }) {
  const socket = getSocket();
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.emit("join", name);

    socket.on("message", (m: string) => {
      setMessages((prev) => [...prev, m]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const send = () => {
    if (!msg.trim()) return;
    socket.emit("message", msg);
    setMsg("");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-4 shadow rounded flex flex-col">
        <h2 className="text-center font-semibold mb-2">Chat</h2>

        <div className="flex-1 overflow-y-auto space-y-2 mb-2">
          {messages.map((m, i) => (
            <div key={i} className="bg-gray-200 px-2 py-1 rounded">
              {m}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 border px-2"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button onClick={send} className="bg-blue-500 text-white px-3">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
