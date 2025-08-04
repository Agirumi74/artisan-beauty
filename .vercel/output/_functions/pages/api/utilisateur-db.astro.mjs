import db from '../../chunks/db_DLs-JeiT.mjs';
import bcrypt from 'bcryptjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async () => {
  const stmt = db.prepare("SELECT * FROM utilisateurs");
  const utilisateurs = stmt.all();
  return new Response(JSON.stringify(utilisateurs), {
    headers: { "Content-Type": "application/json" }
  });
};
const POST = async ({ request }) => {
  const { nom, email, role, password } = await request.json();
  if (!nom || !email || !role || !password) {
    return new Response("Champs manquants", { status: 400 });
  }
  const hash = bcrypt.hashSync(password, 10);
  const stmt = db.prepare("INSERT INTO utilisateurs (nom, email, role, password) VALUES (?, ?, ?, ?)");
  const info = stmt.run(nom, email, role, hash);
  return new Response(JSON.stringify({ id: info.lastInsertRowid, nom, email, role }), {
    headers: { "Content-Type": "application/json" }
  });
};
const PATCH = async ({ request, url }) => {
  const id = url.searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });
  const { nom, email, role, password } = await request.json();
  if (!nom || !email || !role) return new Response("Champs manquants", { status: 400 });
  let query = "UPDATE utilisateurs SET nom=?, email=?, role=?";
  const values = [nom, email, role];
  if (password) {
    query += ", password=?";
    values.push(bcrypt.hashSync(password, 10));
  }
  query += " WHERE id=?";
  values.push(id);
  db.prepare(query).run(...values);
  return new Response(JSON.stringify({ id, nom, email, role }), {
    headers: { "Content-Type": "application/json" }
  });
};
const DELETE = async ({ url }) => {
  const id = url.searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });
  db.prepare("DELETE FROM utilisateurs WHERE id=?").run(id);
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PATCH,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
