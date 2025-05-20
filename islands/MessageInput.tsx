/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";

interface MessageInputProps {
  contactId: string; // Adjust the type if necessary
}

export default function MessageInput({ contactId }: MessageInputProps) {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (text.trim() === "") return;

    await fetch("https://back-a-p4.onrender.com/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contactId,
        text,
        isContactMessage: false,
      }),
    });

    setText("");
    location.reload(); // Recarga para actualizar mensajes
  };

  return (
    <div style={{ position: "absolute", bottom: "10px", width: "95%", display: "flex", gap: "10px" }}>
      <input
        value={text}
        onInput={(e) => setText(e.currentTarget.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Escribe tu mensaje"
        style={{ flex: 1 }}
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
}
