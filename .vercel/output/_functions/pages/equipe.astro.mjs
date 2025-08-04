import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_yOR9iWGp.mjs';
import db from '../chunks/db_DLs-JeiT.mjs';
export { renderers } from '../renderers.mjs';

const $$Equipe = createComponent(($$result, $$props, $$slots) => {
  let team = [];
  let siteInfo = {};
  try {
    team = db.prepare("SELECT * FROM team WHERE isActive = 1 ORDER BY id ASC").all();
    siteInfo = db.prepare("SELECT * FROM site_identity LIMIT 1").get() || {};
  } catch (error) {
    console.error("Database error:", error);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative bg-gradient-to-br from-pink-100 to-pink-300 py-16 mb-12"> <div class="container mx-auto text-center"> <h1 class="text-4xl md:text-5xl font-bold text-pink-800 mb-4">À propos de nous</h1> <p class="text-lg md:text-xl text-pink-900 mb-2 max-w-3xl mx-auto">
Découvrez l'équipe passionnée qui sublimera votre beauté avec expertise et créativité
</p> </div> </section> <section class="container mx-auto py-12"> <!-- Notre mission --> <div class="max-w-4xl mx-auto mb-16 text-center"> <h2 class="text-3xl font-bold text-pink-700 mb-6">Notre mission</h2> <p class="text-lg text-gray-700 mb-4"> ${siteInfo.description || "Chez Maquilleuse Annecy, nous croyons que chaque personne m\xE9rite de se sentir belle et confiante. Notre mission est de r\xE9v\xE9ler votre beaut\xE9 naturelle \xE0 travers des techniques professionnelles et une approche personnalis\xE9e."} </p> <p class="text-gray-600">
Nous combinons expertise technique, créativité artistique et écoute bienveillante pour vous offrir une expérience beauté exceptionnelle, que ce soit pour un événement spécial ou pour développer vos propres compétences.
</p> </div> <!-- Notre équipe --> <div class="mb-16"> <h2 class="text-3xl font-bold text-pink-700 mb-8 text-center">Notre équipe</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${team.map((member) => renderTemplate`<div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"> ${member.photo && renderTemplate`<img${addAttribute(member.photo, "src")}${addAttribute(member.nom, "alt")} class="w-full h-64 object-cover" loading="lazy">`} <div class="p-6"> <h3 class="text-xl font-bold text-pink-700 mb-2">${member.nom}</h3> <div class="text-pink-600 font-semibold mb-3">${member.role}</div> <p class="text-gray-600 mb-4">${member.bio}</p> ${member.diplome && renderTemplate`<div class="mb-3"> <span class="text-sm font-semibold text-gray-700">Formation :</span> <span class="text-sm text-gray-600 ml-1">${member.diplome}</span> </div>`} ${member.certifications && renderTemplate`<div class="mb-4"> <span class="text-sm font-semibold text-gray-700">Certifications :</span> <div class="text-sm text-gray-600 mt-1">${member.certifications}</div> </div>`} ${(member.email || member.telephone || member.instagram || member.linkedin) && renderTemplate`<div class="flex gap-3 text-sm"> ${member.email && renderTemplate`<a${addAttribute(`mailto:${member.email}`, "href")} class="text-pink-600 hover:text-pink-800">
📧
</a>`} ${member.telephone && renderTemplate`<a${addAttribute(`tel:${member.telephone}`, "href")} class="text-pink-600 hover:text-pink-800">
📞
</a>`} ${member.instagram && renderTemplate`<a${addAttribute(member.instagram, "href")} target="_blank" rel="noopener noreferrer" class="text-pink-600 hover:text-pink-800">
Instagram
</a>`} ${member.linkedin && renderTemplate`<a${addAttribute(member.linkedin, "href")} target="_blank" rel="noopener noreferrer" class="text-pink-600 hover:text-pink-800">
LinkedIn
</a>`} </div>`} </div> </div>`)} </div> </div> <!-- Nos valeurs --> <div class="mb-16"> <h2 class="text-3xl font-bold text-pink-700 mb-8 text-center">Nos valeurs</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> <div class="text-center"> <div class="text-4xl mb-4">💄</div> <h3 class="text-lg font-bold text-pink-700 mb-2">Expertise</h3> <p class="text-gray-600">Techniques professionnelles et formation continue pour toujours vous offrir le meilleur</p> </div> <div class="text-center"> <div class="text-4xl mb-4">✨</div> <h3 class="text-lg font-bold text-pink-700 mb-2">Créativité</h3> <p class="text-gray-600">Approche artistique personnalisée pour révéler votre beauté unique</p> </div> <div class="text-center"> <div class="text-4xl mb-4">💚</div> <h3 class="text-lg font-bold text-pink-700 mb-2">Bienveillance</h3> <p class="text-gray-600">Écoute, respect et accompagnement dans un climat de confiance</p> </div> <div class="text-center"> <div class="text-4xl mb-4">🌱</div> <h3 class="text-lg font-bold text-pink-700 mb-2">Qualité</h3> <p class="text-gray-600">Produits haut de gamme, hypoallergéniques et respectueux de votre peau</p> </div> </div> </div> <!-- Nos diplômes et certifications --> <div class="bg-pink-50 rounded-xl p-8 mb-16"> <h2 class="text-3xl font-bold text-pink-700 mb-6 text-center">Formations & Certifications</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> ${siteInfo.diplomePrincipal && renderTemplate`<div> <h3 class="text-lg font-semibold text-pink-700 mb-3">Diplôme principal</h3> <p class="text-gray-700">${siteInfo.diplomePrincipal}</p> </div>`} ${siteInfo.certifications && renderTemplate`<div> <h3 class="text-lg font-semibold text-pink-700 mb-3">Certifications</h3> <div class="text-gray-700 whitespace-pre-line">${siteInfo.certifications}</div> </div>`} </div> </div> <!-- Call to action --> <div class="bg-white rounded-xl shadow-lg p-8 text-center"> <h2 class="text-2xl font-bold text-pink-700 mb-4">Prêt·e à nous rencontrer ?</h2> <p class="text-gray-600 mb-6">
Nous serions ravies de discuter de votre projet beauté et de vous conseiller sur nos services et formations.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/contact" class="bg-pink-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-800 transition">
Nous contacter
</a> <a href="/reservations" class="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
Réserver maintenant
</a> </div> </div> </section> ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/equipe.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/equipe.astro";
const $$url = "/equipe";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Equipe,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
