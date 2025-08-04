import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_v3SqN70E.mjs';
export { renderers } from '../../renderers.mjs';

const $$Formations = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Gestion des formations</h1> <p>Ajoutez, modifiez ou supprimez les formations proposées.</p> <div style="margin-top:2rem"> ${renderComponent($$result2, "AdminFormations", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "@components/admin/AdminFormations.jsx", "client:component-export": "default" })} </div> ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/formations.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/formations.astro";
const $$url = "/admin/formations";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Formations,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
