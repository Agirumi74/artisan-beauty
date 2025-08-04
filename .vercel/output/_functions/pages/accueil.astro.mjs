import { c as createComponent, f as renderScript, b as renderTemplate } from '../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Accueil = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/accueil.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/accueil.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/accueil.astro";
const $$url = "/accueil";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Accueil,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
