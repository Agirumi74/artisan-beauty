export { renderers } from '../../renderers.mjs';

let planningData = [];
const GET = async () => {
  return new Response(JSON.stringify(planningData), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
const POST = async ({ request }) => {
  const body = await request.json();
  if (!body.date || !body.startTime || !body.endTime || !body.status) {
    return new Response(JSON.stringify({ error: "Champs requis manquants." }), { status: 400 });
  }
  const newPlanning = {
    id: crypto.randomUUID(),
    date: body.date,
    startTime: body.startTime,
    endTime: body.endTime,
    status: body.status,
    description: body.description || "",
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  planningData.push(newPlanning);
  return new Response(JSON.stringify(newPlanning), { status: 201 });
};
const PUT = async ({ request }) => {
  const body = await request.json();
  const idx = planningData.findIndex((p) => p.id === body.id);
  if (idx === -1) {
    return new Response(JSON.stringify({ error: "Planning non trouvé." }), { status: 404 });
  }
  planningData[idx] = {
    ...planningData[idx],
    ...body,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  return new Response(JSON.stringify(planningData[idx]), { status: 200 });
};
const DELETE = async ({ request }) => {
  const body = await request.json();
  const idx = planningData.findIndex((p) => p.id === body.id);
  if (idx === -1) {
    return new Response(JSON.stringify({ error: "Planning non trouvé." }), { status: 404 });
  }
  const deleted = planningData.splice(idx, 1)[0];
  return new Response(JSON.stringify(deleted), { status: 200 });
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
