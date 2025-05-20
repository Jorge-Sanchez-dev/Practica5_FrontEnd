import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();
    const data = {
      name: form.get("nombre"),
      email: form.get("correo"),
      phone: form.get("telefono"),
    };

    await fetch("https://back-a-p4.onrender.com/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return Response.redirect("/", 302);
  },
};

export default function NuevoContacto() {
  return (
    <form method="POST" style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px", margin: "50px auto" }}>
      <h1>Nuevo Contacto</h1>
      <input name="nombre" placeholder="Nombre" required />
      <input name="correo" type="email" placeholder="Correo" required />
      <input name="telefono" placeholder="Teléfono" required />
      <button type="submit">Guardar</button>
    </form>
  );
}
