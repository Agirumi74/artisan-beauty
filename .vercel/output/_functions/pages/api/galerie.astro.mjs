export { renderers } from '../../renderers.mjs';

let galeries = [];
const GET = async () => {
  return new Response(JSON.stringify(galeries), { status: 200 });
};
const POST = async ({ request }) => {
  const data = await request.json();
  const newGalerie = { ...data, id: crypto.randomUUID(), createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  galeries.push(newGalerie);
  return new Response(JSON.stringify(newGalerie), { status: 201 });
};
const PUT = async ({ request }) => {
  const data = await request.json();
  const idx = galeries.findIndex((g) => g.id === data.id);
  if (idx === -1) return new Response("Not found", { status: 404 });
  galeries[idx] = { ...galeries[idx], ...data };
  return new Response(JSON.stringify(galeries[idx]), { status: 200 });
};
const DELETE = async ({ request }) => {
  const { id } = await request.json();
  galeries = galeries.filter((g) => g.id !== id);
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
