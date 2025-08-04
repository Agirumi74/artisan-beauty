import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_yOR9iWGp.mjs';
export { renderers } from '../renderers.mjs';

const $$Logout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex flex-col items-center justify-center min-h-screen"> <h1 class="text-2xl font-bold mb-4">Déconnexion</h1> <form method="POST" action="/api/logout" class="flex flex-col gap-4 w-80 bg-white p-6 rounded shadow"> <button type="submit" class="bg-primary text-white py-2 rounded">Se déconnecter</button> </form> </main> ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/logout.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/logout.astro";
const $$url = "/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Logout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
