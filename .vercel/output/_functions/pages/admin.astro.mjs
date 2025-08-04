import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_v3SqN70E.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Bienvenue sur le dashboard admin</h1> <p>Utilisez la navigation à gauche pour gérer les contenus du site (services, formations, galerie, avis, réservations, planning, factures, médias).</p> ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/index.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
