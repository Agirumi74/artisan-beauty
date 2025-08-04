import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_yOR9iWGp.mjs';
export { renderers } from '../renderers.mjs';

const $$Factures = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container mx-auto py-16 text-center"> <h1 class="text-3xl font-bold mb-6 text-pink-700">Les factures sont accessibles depuis l’espace client ou admin</h1> <p class="text-lg">Pour consulter vos factures, connectez-vous à votre espace personnel.</p> <a href="/login" class="mt-8 inline-block bg-pink-700 text-white px-6 py-3 rounded hover:bg-pink-800">Se connecter</a> </section> ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/factures.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/factures.astro";
const $$url = "/factures";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Factures,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
