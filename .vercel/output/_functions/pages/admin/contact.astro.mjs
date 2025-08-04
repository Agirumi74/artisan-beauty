import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_v3SqN70E.mjs';
export { renderers } from '../../renderers.mjs';

const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  let messages = [];
  try {
    const res = await fetch("/api/contact?all=1");
    if (res.ok) {
      messages = await res.json();
    }
  } catch (e) {
    messages = [];
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container mx-auto py-12"> <h1 class="text-3xl font-bold mb-4">Messages de contact</h1> ${messages.length === 0 ? renderTemplate`<div class="bg-yellow-100 text-yellow-800 p-4 rounded">Aucun message reçu.</div>` : renderTemplate`<div class="overflow-x-auto"> <table class="min-w-full bg-white rounded shadow"> <thead> <tr> <th class="px-4 py-2">Nom</th> <th class="px-4 py-2">Email</th> <th class="px-4 py-2">Message</th> <th class="px-4 py-2">Reçu le</th> </tr> </thead> <tbody> ${messages.map((m) => renderTemplate`<tr> <td class="border px-4 py-2">${m.name}</td> <td class="border px-4 py-2">${m.email}</td> <td class="border px-4 py-2">${m.message}</td> <td class="border px-4 py-2">${m.created_at}</td> </tr>`)} </tbody> </table> </div>`} </section> ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/contact.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/contact.astro";
const $$url = "/admin/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
