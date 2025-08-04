import db from '../../chunks/db_DLs-JeiT.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  const stmt = db.prepare("SELECT * FROM faq ORDER BY id ASC");
  const faqs = stmt.all();
  return new Response(JSON.stringify(faqs), {
    headers: { "Content-Type": "application/json" }
  });
};
const POST = async ({ request }) => {
  const { question, reponse, global = 0, servicesGlobal = 0, formationsGlobal = 0, serviceId = null, formationId = null } = await request.json();
  const stmt = db.prepare("INSERT INTO faq (question, reponse, global, servicesGlobal, formationsGlobal, serviceId, formationId) VALUES (?, ?, ?, ?, ?, ?, ?)");
  const info = stmt.run(question, reponse, global, servicesGlobal, formationsGlobal, serviceId, formationId);
  return new Response(JSON.stringify({ id: info.lastInsertRowid, question, reponse, global, servicesGlobal, formationsGlobal, serviceId, formationId }), {
    headers: { "Content-Type": "application/json" }
  });
};
const PATCH = async ({ request, url }) => {
  const id = url.searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });
  const { question, reponse, global = 0, servicesGlobal = 0, formationsGlobal = 0, serviceId = null, formationId = null } = await request.json();
  const stmt = db.prepare("UPDATE faq SET question=?, reponse=?, global=?, servicesGlobal=?, formationsGlobal=?, serviceId=?, formationId=? WHERE id=?");
  stmt.run(question, reponse, global, servicesGlobal, formationsGlobal, serviceId, formationId, id);
  return new Response(JSON.stringify({ id, question, reponse, global, servicesGlobal, formationsGlobal, serviceId, formationId }), {
    headers: { "Content-Type": "application/json" }
  });
};
const DELETE = async ({ url }) => {
  const id = url.searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });
  const stmt = db.prepare("DELETE FROM faq WHERE id=?");
  stmt.run(id);
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PATCH,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
