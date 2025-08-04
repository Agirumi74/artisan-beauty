export { renderers } from '../../renderers.mjs';

let services = [];
const GET = async () => {
  return new Response(JSON.stringify(services), { status: 200 });
};
const POST = async ({ request }) => {
  const data = await request.json();
  const newService = { ...data, id: crypto.randomUUID(), createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
  services.push(newService);
  return new Response(JSON.stringify(newService), { status: 201 });
};
const PUT = async ({ request }) => {
  const data = await request.json();
  const idx = services.findIndex((s) => s.id === data.id);
  if (idx === -1) return new Response("Not found", { status: 404 });
  services[idx] = { ...services[idx], ...data, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
  return new Response(JSON.stringify(services[idx]), { status: 200 });
};
const DELETE = async ({ request }) => {
  const { id } = await request.json();
  services = services.filter((s) => s.id !== id);
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
