import { useState } from "react";

export default function Join({ onJoin }: { onJoin: (name: string) => void }) {
  const [name, setName] = useState("");

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 shadow rounded flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Enter your name</h2>
        <input
          className="border px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={() => name && onJoin(name)}
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Join Chat
        </button>
      </div>
    </div>
  );
}
