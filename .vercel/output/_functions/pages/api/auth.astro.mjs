export { renderers } from '../../renderers.mjs';

const users = [
  {
    id: "1",
    name: "Admin",
    email: "admin@site.com",
    passwordHash: "$2b$10$saltsaltadmin",
    // fake hash
    role: "admin",
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  }
];
function verifyPassword(password, hash) {
  return password === "admin";
}
const POST = async ({ request }) => {
  const { email, password } = await request.json();
  const user = users.find((u) => u.email === email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
  }
  const token = btoa(`${user.id}:${user.email}:${user.role}`);
  const response = {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
  return new Response(JSON.stringify(response), { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
