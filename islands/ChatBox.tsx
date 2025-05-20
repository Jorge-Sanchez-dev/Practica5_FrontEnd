/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import MessageBubble from "../components/MessageBubble.tsx";

interface ChatBoxProps {
  contactId: string;
}

export default function ChatBox({ contactId }: ChatBoxProps) {
  interface Message {
    id: string;
    text: string;
    isContactMessage: boolean; // Add other fields as per your API response
  }

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`https://back-a-p4.onrender.com/messages/${contactId}`);
      const data = await res.json(); // Extract data from the API response
      setMessages(data.map((msg: any) => ({
        ...msg,
        isContactMessage: msg.isContactMessage ?? false, // Ensure the property exists
      })));
    };
    fetchMessages();
  }, [contactId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "85%", overflowY: "scroll" }}>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}
