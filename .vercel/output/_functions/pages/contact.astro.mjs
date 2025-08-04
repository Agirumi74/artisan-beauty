import { c as createComponent, r as renderComponent, b as renderTemplate, e as addAttribute, F as Fragment, m as maybeRenderHead } from '../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_yOR9iWGp.mjs';
import db from '../chunks/db_DLs-JeiT.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  let siteInfo = {};
  try {
    siteInfo = db.prepare("SELECT * FROM site_identity LIMIT 1").get() || {};
  } catch (error) {
    console.error("Error fetching site info:", error);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<section class="relative bg-gradient-to-br from-pink-100 to-pink-300 py-16 mb-12"> <div class="container mx-auto text-center"> <h1 class="text-4xl md:text-5xl font-bold text-pink-800 mb-4">Contactez-nous</h1> <p class="text-lg md:text-xl text-pink-900 mb-2">\nUne question ? Un projet ? Nous sommes l\xE0 pour vous accompagner dans votre d\xE9marche beaut\xE9.\n</p> </div> </section> <section class="container mx-auto py-12"> <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"> <!-- Contact Information --> <div class="space-y-8"> <div> <h2 class="text-2xl font-bold text-pink-700 mb-6">Nos coordonn\xE9es</h2> <div class="space-y-4"> ', " ", " ", " </div> </div> ", ' <!-- Social Media Links --> <div> <h3 class="text-lg font-semibold text-pink-700 mb-3">Suivez-nous</h3> <div class="flex gap-4"> ', " ", " ", " ", ` </div> </div> <!-- Quick Links --> <div> <h3 class="text-lg font-semibold text-pink-700 mb-3">Liens rapides</h3> <div class="space-y-2"> <div> <a href="/reservations" class="text-pink-600 hover:text-pink-800 transition">
\u2192 R\xE9server une prestation
</a> </div> <div> <a href="/services" class="text-pink-600 hover:text-pink-800 transition">
\u2192 D\xE9couvrir nos services
</a> </div> <div> <a href="/formations" class="text-pink-600 hover:text-pink-800 transition">
\u2192 Nos formations
</a> </div> <div> <a href="/galerie" class="text-pink-600 hover:text-pink-800 transition">
\u2192 Voir notre galerie
</a> </div> </div> </div> </div> <!-- Contact Form --> <div class="bg-white rounded-xl shadow-lg p-8"> <h2 class="text-2xl font-bold text-pink-700 mb-6">Envoyez-nous un message</h2> <form id="contact-form" class="space-y-6"> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label for="prenom" class="block font-semibold text-gray-700 mb-1">
Pr\xE9nom <span class="text-red-500">*</span> </label> <input id="prenom" name="prenom" type="text" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Votre pr\xE9nom"> </div> <div> <label for="nom" class="block font-semibold text-gray-700 mb-1">
Nom <span class="text-red-500">*</span> </label> <input id="nom" name="nom" type="text" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Votre nom"> </div> </div> <div> <label for="email" class="block font-semibold text-gray-700 mb-1">
Email <span class="text-red-500">*</span> </label> <input id="email" name="email" type="email" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="votre@email.com"> </div> <div> <label for="telephone" class="block font-semibold text-gray-700 mb-1">T\xE9l\xE9phone</label> <input id="telephone" name="telephone" type="tel" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="06 12 34 56 78"> </div> <div> <label for="sujet" class="block font-semibold text-gray-700 mb-1">
Sujet <span class="text-red-500">*</span> </label> <select id="sujet" name="sujet" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"> <option value="">Choisissez un sujet...</option> <option value="reservation">Demande de r\xE9servation</option> <option value="information">Demande d'information</option> <option value="formation">Question sur les formations</option> <option value="devis">Demande de devis</option> <option value="autre">Autre</option> </select> </div> <div> <label for="message" class="block font-semibold text-gray-700 mb-1">
Message <span class="text-red-500">*</span> </label> <textarea id="message" name="message" rows="5" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="D\xE9crivez votre demande, vos besoins, vos questions..."></textarea> </div> <button type="submit" class="w-full bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-800 transition">
Envoyer le message
</button> <div id="contact-feedback" class="mt-4 text-center"></div> </form> </div> </div> </section> <script type="module">
    document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById('contact-form');
      const feedback = document.getElementById('contact-feedback');
      
      if (form) {
        form.onsubmit = async function(e) {
          e.preventDefault();
          feedback.textContent = '';
          
          const formData = new FormData(form);
          const data = {
            prenom: formData.get('prenom')?.toString().trim(),
            nom: formData.get('nom')?.toString().trim(),
            email: formData.get('email')?.toString().trim(),
            telephone: formData.get('telephone')?.toString().trim(),
            sujet: formData.get('sujet')?.toString().trim(),
            message: formData.get('message')?.toString().trim()
          };
          
          // Basic validation
          if (!data.prenom || !data.nom || !data.email || !data.sujet || !data.message) {
            feedback.textContent = 'Veuillez remplir tous les champs obligatoires.';
            feedback.className = 'mt-4 text-center text-red-600 bg-red-50 p-3 rounded';
            return;
          }
          
          const submitBtn = form.querySelector('button[type="submit"]');
          const originalText = submitBtn.textContent;
          submitBtn.disabled = true;
          submitBtn.textContent = 'Envoi en cours...';
          
          try {
            const res = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            
            if (res.ok) {
              form.reset();
              feedback.textContent = 'Message envoy\xE9 avec succ\xE8s ! Nous vous recontacterons tr\xE8s prochainement.';
              feedback.className = 'mt-4 text-center text-green-700 bg-green-50 p-3 rounded';
            } else {
              throw new Error('Erreur serveur');
            }
          } catch (error) {
            feedback.textContent = "Erreur lors de l'envoi. Merci de r\xE9essayer ou de nous contacter directement par t\xE9l\xE9phone.";
            feedback.className = 'mt-4 text-center text-red-600 bg-red-50 p-3 rounded';
          }
          
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        };
      }
    });
  <\/script> `])), maybeRenderHead(), siteInfo.adresse && renderTemplate`<div class="flex items-start gap-3"> <div class="text-pink-600 mt-1">📍</div> <div> <div class="font-semibold text-gray-800">Adresse</div> <div class="text-gray-600"> ${siteInfo.adresse}<br> ${siteInfo.codePostal} ${siteInfo.ville} ${siteInfo.pays && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`, ${siteInfo.pays}` })}`} </div> </div> </div>`, siteInfo.telephone && renderTemplate`<div class="flex items-start gap-3"> <div class="text-pink-600 mt-1">📞</div> <div> <div class="font-semibold text-gray-800">Téléphone</div> <div class="text-gray-600"> <a${addAttribute(`tel:${siteInfo.telephone}`, "href")} class="hover:text-pink-700"> ${siteInfo.telephone} </a> </div> </div> </div>`, siteInfo.email && renderTemplate`<div class="flex items-start gap-3"> <div class="text-pink-600 mt-1">📧</div> <div> <div class="font-semibold text-gray-800">Email</div> <div class="text-gray-600"> <a${addAttribute(`mailto:${siteInfo.email}`, "href")} class="hover:text-pink-700"> ${siteInfo.email} </a> </div> </div> </div>`, siteInfo.horaires && renderTemplate`<div> <h3 class="text-lg font-semibold text-pink-700 mb-3">Horaires d'ouverture</h3> <div class="text-gray-600 whitespace-pre-line">${siteInfo.horaires}</div> </div>`, siteInfo.facebook && renderTemplate`<a${addAttribute(siteInfo.facebook, "href")} target="_blank" rel="noopener noreferrer" class="text-pink-600 hover:text-pink-800 transition">
Facebook
</a>`, siteInfo.instagram && renderTemplate`<a${addAttribute(siteInfo.instagram, "href")} target="_blank" rel="noopener noreferrer" class="text-pink-600 hover:text-pink-800 transition">
Instagram
</a>`, siteInfo.linkedin && renderTemplate`<a${addAttribute(siteInfo.linkedin, "href")} target="_blank" rel="noopener noreferrer" class="text-pink-600 hover:text-pink-800 transition">
LinkedIn
</a>`, siteInfo.youtube && renderTemplate`<a${addAttribute(siteInfo.youtube, "href")} target="_blank" rel="noopener noreferrer" class="text-pink-600 hover:text-pink-800 transition">
YouTube
</a>`) })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/contact.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
