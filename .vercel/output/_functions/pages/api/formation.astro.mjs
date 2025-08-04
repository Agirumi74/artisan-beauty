export { renderers } from '../../renderers.mjs';

let formations = [];
const GET = async () => {
  return new Response(JSON.stringify(formations), { status: 200 });
};
const POST = async ({ request }) => {
  const data = await request.json();
  const newFormation = { ...data, id: crypto.randomUUID(), createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
  formations.push(newFormation);
  return new Response(JSON.stringify(newFormation), { status: 201 });
};
const PUT = async ({ request }) => {
  const data = await request.json();
  const idx = formations.findIndex((f) => f.id === data.id);
  if (idx === -1) return new Response("Not found", { status: 404 });
  formations[idx] = { ...formations[idx], ...data, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
  return new Response(JSON.stringify(formations[idx]), { status: 200 });
};
const DELETE = async ({ request }) => {
  const { id } = await request.json();
  formations = formations.filter((f) => f.id !== id);
  return new Response("Deleted", { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
