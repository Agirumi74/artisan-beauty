import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_yOR9iWGp.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Utilisateurs = createComponent(async ($$result, $$props, $$slots) => {
  let utilisateurs = [];
  try {
    const res = await fetch("/api/utilisateur-db");
    if (res.ok) {
      utilisateurs = await res.json();
    }
  } catch (e) {
    utilisateurs = [];
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", `<section class="container mx-auto py-12"> <h1 class="text-3xl font-bold mb-4">Utilisateurs</h1> <p class="mb-8">Liste des utilisateurs inscrits.</p> <form id="add-utilisateur-form" class="mb-8 bg-gray-50 p-4 rounded shadow max-w-xl mx-auto"> <div class="flex flex-col md:flex-row gap-4 items-end"> <div class="flex-1"> <label for="nom" class="block font-semibold">Nom</label> <input id="nom" name="nom" type="text" required class="w-full border rounded px-3 py-2" placeholder="Nom"> </div> <div class="flex-1"> <label for="email" class="block font-semibold">Email</label> <input id="email" name="email" type="email" required class="w-full border rounded px-3 py-2" placeholder="Email"> </div> <button type="submit" class="bg-pink-700 text-white px-4 py-2 rounded hover:bg-pink-800">Ajouter</button> </div> </form> <script type="module">
      document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('add-utilisateur-form');
        if (form) {
          form.onsubmit = async function(e) {
            e.preventDefault();
            const nom = form.nom.value.trim();
            const email = form.email.value.trim();
            if (!nom || !email) {
              alert('Veuillez remplir tous les champs.');
              return;
            }
            const res = await fetch('/api/utilisateur-db', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ nom, email })
            });
            if (res.ok) {
              form.reset();
              location.reload();
            } else {
              alert("Erreur lors de l'ajout.");
            }
          };
        }
      });
    <\/script> `, " </section> "])), maybeRenderHead(), utilisateurs.length === 0 ? renderTemplate`<div class="bg-yellow-100 text-yellow-800 p-4 rounded">Aucun utilisateur pour le moment.</div>` : renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"> ${utilisateurs.map((u) => renderTemplate`<div class="border rounded-lg p-4 bg-white shadow"> <div class="font-semibold mb-2">${u.nom}</div> <div class="italic">${u.email}</div> </div>`)} </div>`) })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/utilisateurs.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/utilisateurs.astro";
const $$url = "/utilisateurs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Utilisateurs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
