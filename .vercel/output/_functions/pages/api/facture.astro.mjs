export { renderers } from '../../renderers.mjs';

let factures = [];
const GET = async () => {
  return new Response(JSON.stringify(factures), { status: 200 });
};
const POST = async ({ request }) => {
  const data = await request.json();
  const newFacture = { ...data, id: crypto.randomUUID(), createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
  factures.push(newFacture);
  return new Response(JSON.stringify(newFacture), { status: 201 });
};
const PUT = async ({ request }) => {
  const data = await request.json();
  const idx = factures.findIndex((f) => f.id === data.id);
  if (idx === -1) return new Response("Not found", { status: 404 });
  factures[idx] = { ...factures[idx], ...data, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
  return new Response(JSON.stringify(factures[idx]), { status: 200 });
};
const DELETE = async ({ request }) => {
  const { id } = await request.json();
  factures = factures.filter((f) => f.id !== id);
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
