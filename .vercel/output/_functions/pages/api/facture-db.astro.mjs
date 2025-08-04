import db from '../../chunks/db_DLs-JeiT.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  const stmt = db.prepare("SELECT * FROM factures ORDER BY id DESC");
  const factures = stmt.all();
  return new Response(JSON.stringify(factures), {
    headers: { "Content-Type": "application/json" }
  });
};
const POST = async ({ request }) => {
  const { reservationId, userId, amount, status, pdfUrl } = await request.json();
  const createdAt = (/* @__PURE__ */ new Date()).toISOString();
  const updatedAt = createdAt;
  const stmt = db.prepare("INSERT INTO factures (reservationId, userId, amount, status, pdfUrl, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)");
  const info = stmt.run(reservationId, userId, amount, status, pdfUrl, createdAt, updatedAt);
  return new Response(JSON.stringify({ id: info.lastInsertRowid, reservationId, userId, amount, status, pdfUrl, createdAt, updatedAt }), {
    headers: { "Content-Type": "application/json" }
  });
};
const PATCH = async ({ request, url }) => {
  const id = url.searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });
  const { reservationId, userId, amount, status, pdfUrl } = await request.json();
  const updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  const stmt = db.prepare("UPDATE factures SET reservationId=?, userId=?, amount=?, status=?, pdfUrl=?, updatedAt=? WHERE id=?");
  stmt.run(reservationId, userId, amount, status, pdfUrl, updatedAt, id);
  return new Response(JSON.stringify({ id, reservationId, userId, amount, status, pdfUrl, updatedAt }), {
    headers: { "Content-Type": "application/json" }
  });
};
const DELETE = async ({ url }) => {
  const id = url.searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });
  const stmt = db.prepare("DELETE FROM factures WHERE id=?");
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
