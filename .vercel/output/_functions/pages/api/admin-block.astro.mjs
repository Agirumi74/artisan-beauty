import db from '../../chunks/db_DLs-JeiT.mjs';
export { renderers } from '../../renderers.mjs';

async function GET({ request }) {
  try {
    const rows = db.prepare("SELECT * FROM blocked_slots").all();
    return new Response(JSON.stringify(rows), { status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
  } catch (e) {
    console.error("[admin-block][GET] Error:", e);
    return new Response("Erreur serveur", { status: 500 });
  }
}
async function POST({ request }) {
  try {
    const body = await request.json();
    if (!body.title || typeof body.title !== "string") return new Response(JSON.stringify({ error: "Champ title manquant" }), { status: 400, headers: { "Content-Type": "application/json" } });
    if (!body.start || typeof body.start !== "string") return new Response(JSON.stringify({ error: "Champ start manquant" }), { status: 400, headers: { "Content-Type": "application/json" } });
    if (body.end && typeof body.end !== "string") return new Response(JSON.stringify({ error: "Champ end invalide" }), { status: 400, headers: { "Content-Type": "application/json" } });
    if (typeof body.allDay !== "boolean" && typeof body.allDay !== "number") return new Response(JSON.stringify({ error: "Champ allDay manquant" }), { status: 400, headers: { "Content-Type": "application/json" } });
    const start = body.start;
    const end = body.end || body.start;
    const overlapRes = db.prepare(`SELECT * FROM reservations WHERE (date || 'T' || time) < ? AND (? < (date || 'T' || time))`).all(end, start);
    if (overlapRes.length > 0) {
      return new Response(JSON.stringify({ error: "Un créneau de réservation existe déjà sur cette période." }), { status: 409, headers: { "Content-Type": "application/json" } });
    }
    const overlapBlock = db.prepare(`SELECT * FROM blocked_slots WHERE start < ? AND ? < COALESCE(end, start)`).all(end, start);
    if (overlapBlock.length > 0) {
      return new Response(JSON.stringify({ error: "Un autre créneau bloqué existe déjà sur cette période." }), { status: 409, headers: { "Content-Type": "application/json" } });
    }
    const stmt = db.prepare("INSERT INTO blocked_slots (title, start, end, allDay) VALUES (?, ?, ?, ?)");
    const result = stmt.run(body.title, body.start, body.end, body.allDay ? 1 : 0);
    console.log("[admin-block][POST] Créneau ajouté", body);
    return new Response(JSON.stringify({ id: result.lastInsertRowid }), { status: 201, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
  } catch (e) {
    console.error("[admin-block][POST] Error:", e);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
async function DELETE({ request }) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return new Response("Missing id", { status: 400 });
    db.prepare("DELETE FROM blocked_slots WHERE id = ?").run(id);
    console.log("[admin-block][DELETE] Créneau supprimé", id);
    return new Response("Deleted", { status: 200, headers: { "Access-Control-Allow-Origin": "*" } });
  } catch (e) {
    console.error("[admin-block][DELETE] Error:", e);
    return new Response("Erreur serveur", { status: 500 });
  }
}
async function PATCH({ request }) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return new Response("Missing id", { status: 400 });
    const body = await request.json();
    if (!body.title || typeof body.title !== "string") return new Response("Champ title manquant", { status: 400 });
    if (!body.start || typeof body.start !== "string") return new Response("Champ start manquant", { status: 400 });
    if (body.end && typeof body.end !== "string") return new Response("Champ end invalide", { status: 400 });
    if (typeof body.allDay !== "boolean" && typeof body.allDay !== "number") return new Response("Champ allDay manquant", { status: 400 });
    const stmt = db.prepare("UPDATE blocked_slots SET title = ?, start = ?, end = ?, allDay = ? WHERE id = ?");
    stmt.run(body.title, body.start, body.end, body.allDay ? 1 : 0, id);
    console.log("[admin-block][PATCH] Créneau modifié", { id, ...body });
    return new Response("Updated", { status: 200, headers: { "Access-Control-Allow-Origin": "*" } });
  } catch (e) {
    console.error("[admin-block][PATCH] Error:", e);
    return new Response("Erreur serveur", { status: 500 });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PATCH,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
