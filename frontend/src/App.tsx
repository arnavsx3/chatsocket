import { useEffect, useState } from "react";
import { getSocket } from "./lib/socket"; 

const socket = getSocket();

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow rounded-lg p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-center">Chat</h2>

        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="bg-gray-200 px-3 py-2 rounded w-fit max-w-[80%]">
              {msg}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
