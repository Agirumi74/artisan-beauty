export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Champs manquants" }), { status: 400 });
    }
    const db = (await import('../../chunks/db_DLs-JeiT.mjs')).default;
    db.prepare("INSERT INTO contact (name, email, message) VALUES (?, ?, ?)").run(name, email, message);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
};
const GET = async ({ url }) => {
  if (url.searchParams.get("all") === "1") {
    try {
      const db = (await import('../../chunks/db_DLs-JeiT.mjs')).default;
      const rows = db.prepare("SELECT name, email, message, created_at FROM contact ORDER BY created_at DESC").all();
      return new Response(JSON.stringify(rows), { status: 200 });
    } catch (e) {
      return new Response(JSON.stringify([]), { status: 200 });
    }
  }
  return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
