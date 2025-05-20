/** @jsx h */
import { h } from "preact";

interface Message {
  isContactMessage: boolean;
  text: string;
}

export default function MessageBubble({ message }: { message: Message }) {
  const align = message.isContactMessage ? "left" : "right";
  const backgroundColor = message.isContactMessage ? "#eee" : "#cce5ff";

  return (
    <div
      style={{
        maxWidth: "60%",
        margin: "5px",
        padding: "10px",
        backgroundColor,
        borderRadius: "10px",
        alignSelf: align === "left" ? "flex-start" : "flex-end",
      }}
    >
      {message.text}
    </div>
  );
}
