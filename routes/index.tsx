/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import ChatBox from "../islands/ChatBox.tsx";
import MessageInput from "../islands/MessageInput.tsx";
import ContactCard from "../components/ContactCard.tsx";


export const handler = {
  async GET(_: Request, ctx: { render: (data: any) => Response }) {
    const res = await fetch("https://back-a-p4.onrender.com/contacts");
    const contacts = (await res.json()).map((contact: any) => ({
      ...contact,
      phone: contact.phone || "N/A", // Ensure phone is present
    }));
    return ctx.render({ contacts });
  },
};

interface HomeProps {
  data: {
      phone: string;
      id: string;
      name: string;
      [key: string]: any;
    };
  };

export default function Home({ data }: HomeProps) {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Lista de contactos */}
      <div style={{ width: "20%", overflowY: "scroll", borderRight: "1px solid #ccc" }}>
        <a href="/nuevo-contacto">
          <button style={{ width: "100%", padding: "10px" }}>Crear contacto</button>
        </a>
        {data.contacts.map((contact: any) => (
          <ContactCard contact={contact} onClick={(id: string) => setSelectedContactId(id)} />

))}
      </div>

      {/* Área de chat */}
      <div style={{ width: "80%", position: "relative", padding: "10px" }}>
        {selectedContactId ? (
          <>
            <ChatBox contactId={selectedContactId} />
            <MessageInput contactId={selectedContactId} />
          </>
        ) : (
          <p>Selecciona un contacto para comenzar a chatear</p>
        )}
      </div>
    </div>
  );
}
