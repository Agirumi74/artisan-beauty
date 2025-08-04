export { renderers } from '../../renderers.mjs';

let utilisateurs = [];
const GET = async () => {
  return new Response(JSON.stringify(utilisateurs), { status: 200 });
};
const POST = async ({ request }) => {
  const data = await request.json();
  const newUser = { ...data, id: crypto.randomUUID(), createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
  utilisateurs.push(newUser);
  return new Response(JSON.stringify(newUser), { status: 201 });
};
const PUT = async ({ request }) => {
  const data = await request.json();
  const idx = utilisateurs.findIndex((u) => u.id === data.id);
  if (idx === -1) return new Response("Not found", { status: 404 });
  utilisateurs[idx] = { ...utilisateurs[idx], ...data, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
  return new Response(JSON.stringify(utilisateurs[idx]), { status: 200 });
};
const DELETE = async ({ request }) => {
  const { id } = await request.json();
  utilisateurs = utilisateurs.filter((u) => u.id !== id);
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
