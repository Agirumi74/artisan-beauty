export { renderers } from '../../renderers.mjs';

let avis = [];
const GET = async () => {
  return new Response(JSON.stringify(avis), { status: 200 });
};
const POST = async ({ request }) => {
  const data = await request.json();
  const newAvis = { ...data, id: crypto.randomUUID(), createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  avis.push(newAvis);
  return new Response(JSON.stringify(newAvis), { status: 201 });
};
const PUT = async ({ request }) => {
  const data = await request.json();
  const idx = avis.findIndex((a) => a.id === data.id);
  if (idx === -1) return new Response("Not found", { status: 404 });
  avis[idx] = { ...avis[idx], ...data };
  return new Response(JSON.stringify(avis[idx]), { status: 200 });
};
const DELETE = async ({ request }) => {
  const { id } = await request.json();
  avis = avis.filter((a) => a.id !== id);
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
