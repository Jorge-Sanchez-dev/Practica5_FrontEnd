/** @jsx h */
import { h } from "preact";

interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface ContactCardProps {
  contact: Contact;
  onClick: (id: string) => void;
}

export default function ContactCard({ contact, onClick }: ContactCardProps) {
  return (
    <div
      onClick={() => onClick(contact.id)}
      style={{ padding: "10px", borderBottom: "1px solid #ddd", cursor: "pointer" }}
    >
      <strong>{contact.name}</strong>
      <div>{contact.phone}</div>
    </div>
  );
}
