import { useState } from "react";
import Join from "./components/Join";
import Chat from "./components/Chat";

export default function App() {
  const [name, setName] = useState<string | null>(null);

  if (!name) {
    return <Join onJoin={setName} />;
  }

  return <Chat name={name} />;
}
