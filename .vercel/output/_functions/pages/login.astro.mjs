import { c as createComponent, h as renderHead, b as renderTemplate } from '../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="fr"> <head><title>Connexion Admin</title>${renderHead()}</head> <body> <main class="flex flex-col items-center justify-center min-h-screen"> <h1 class="text-2xl font-bold mb-4">Connexion Admin</h1> <form method="POST" action="/api/auth" class="flex flex-col gap-4 w-80 bg-white p-6 rounded shadow"> <input name="email" type="email" placeholder="Email" required class="border px-3 py-2 rounded"> <input name="password" type="password" placeholder="Mot de passe" required class="border px-3 py-2 rounded"> <button type="submit" class="bg-primary text-white py-2 rounded">Se connecter</button> </form> </main> </body></html>`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/login.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
