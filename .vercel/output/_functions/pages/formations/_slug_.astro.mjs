import { c as createComponent, a as createAstro, m as maybeRenderHead, b as renderTemplate, r as renderComponent, e as addAttribute, F as Fragment } from '../../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_yOR9iWGp.mjs';
import db from '../../chunks/db_DLs-JeiT.mjs';
import { $ as $$Alert } from '../../chunks/Alert_D540qVAV.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$3 = createAstro();
const $$FormationFaq = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$FormationFaq;
  const { faqs = [] } = Astro2.props;
  return renderTemplate`${faqs.length > 0 ? renderTemplate`${maybeRenderHead()}<div class="mt-8"><h2 class="text-lg font-bold mb-3 text-pink-700">Questions fréquentes sur cette formation</h2><ul class="list-disc ml-6 text-left">${faqs.map((f) => renderTemplate`<li class="mb-2"><span class="font-semibold text-pink-700">${f.question}</span><br><span class="text-gray-700">${f.reponse}</span></li>`)}</ul></div>` : renderTemplate`<div class="mt-8">${renderComponent($$result, "Alert", $$Alert, { "variant": "info" }, { "default": ($$result2) => renderTemplate`Aucune question fréquente pour cette formation pour le moment.` })}</div>`}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/FormationFaq.astro", void 0);

const $$Astro$2 = createAstro();
const $$FormationAvis = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$FormationAvis;
  const { avis = [] } = Astro2.props;
  return renderTemplate`${avis.length > 0 ? renderTemplate`${maybeRenderHead()}<ul class="space-y-2">${avis.map((a) => renderTemplate`<li class="bg-gray-50 p-3 rounded shadow text-left"><div class="font-semibold">${a.utilisateur || a.nom}</div><div class="text-sm text-gray-600">${a.commentaire}</div><div class="text-xs text-yellow-600">${a.note} / 5</div></li>`)}</ul>` : renderTemplate`${renderComponent($$result, "Alert", $$Alert, { "variant": "info" }, { "default": ($$result2) => renderTemplate`Aucun avis pour cette formation pour le moment.` })}`}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/FormationAvis.astro", void 0);

const $$Astro$1 = createAstro();
const $$FormationGallery = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FormationGallery;
  const { images = [] } = Astro2.props;
  return renderTemplate`${images.length > 0 ? renderTemplate`${maybeRenderHead()}<div class="flex gap-2 mt-2">${images.slice(0, 3).map((img) => renderTemplate`<img${addAttribute(img.imageUrl, "src")}${addAttribute(img.title, "alt")} class="w-14 h-14 object-cover rounded" loading="lazy">`)}</div>` : renderTemplate`${renderComponent($$result, "Alert", $$Alert, { "variant": "info" }, { "default": ($$result2) => renderTemplate`Aucune image pour cette formation pour le moment.` })}`}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/FormationGallery.astro", void 0);

const $$Astro = createAstro();
async function getStaticPaths() {
  const formations = db.prepare("SELECT slug FROM formations").all();
  return formations.map((f) => ({ params: { slug: String(f.slug) } }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  let formation = null;
  let faqs = [];
  let avis = [];
  let images = [];
  try {
    formation = db.prepare("SELECT * FROM formations WHERE slug = ?").get(slug);
    if (formation) {
      if (typeof formation.tags === "string") formation.tags = JSON.parse(formation.tags);
      if (typeof formation.steps === "string") formation.steps = JSON.parse(formation.steps);
      faqs = db.prepare("SELECT * FROM faq WHERE formationsGlobal = 1 OR formationId = ? ORDER BY id ASC").all(formation.id);
      avis = db.prepare("SELECT * FROM avis WHERE formationsGlobal = 1 OR formationId = ? ORDER BY id ASC").all(formation.id);
      images = db.prepare("SELECT * FROM galerie WHERE formationsGlobal = 1 OR formationId = ? ORDER BY id ASC").all(formation.id);
    }
  } catch (e) {
    formation = null;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container mx-auto py-12"> ${formation && formation.titre ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <h1 class="text-3xl font-bold mb-4 flex items-center gap-2"> ${formation.icon && renderTemplate`<span${addAttribute(`inline-block icon-${formation.icon} text-2xl`, "class")} aria-hidden="true"></span>`} ${formation.titre} ${formation.isFeatured ? renderTemplate`<span class="ml-2 px-2 py-1 bg-yellow-200 text-yellow-800 rounded text-xs font-bold">En vedette</span>` : null} ${!formation.isActive ? renderTemplate`<span class="ml-2 px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs font-bold">Inactif</span>` : null} </h1> <div class="flex gap-2 mb-2 flex-wrap"> ${formation.categorie && renderTemplate`<span class="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold">${formation.categorie}</span>`} ${formation.duree && renderTemplate`<span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">${formation.duree}</span>`} ${formation.durationMinutes && renderTemplate`<span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">${formation.durationMinutes} min</span>`} ${formation.tags && formation.tags.length > 0 && formation.tags.map((tag) => renderTemplate`<span class="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">${tag}</span>`)} </div> <p class="mb-2 text-lg">${formation.description}</p> ${formation.content && renderTemplate`<div class="mb-2 text-base text-gray-700"><b>Contenu :</b> ${formation.content}</div>`}${formation.notes && renderTemplate`<div class="mb-2 text-sm text-gray-500"><b>Notes :</b> ${formation.notes}</div>`}${formation.steps && formation.steps.length > 0 && renderTemplate`<ol class="list-decimal list-inside mb-2 text-sm text-gray-700"> ${formation.steps.map((step) => renderTemplate`<li>${step}</li>`)} </ol>`}${formation.certification && renderTemplate`<div class="mb-2 text-sm text-green-700"><b>Certification :</b> ${formation.certification}</div>`}<div class="font-bold text-pink-700 text-2xl mb-8">${formation.prix} €</div> <a${addAttribute(`/reservations?formation=${formation.slug}`, "href")} class="bg-pink-700 text-white px-6 py-3 rounded hover:bg-pink-800">S'inscrire à cette formation</a> <div class="mt-6"> ${renderComponent($$result3, "FormationGallery", $$FormationGallery, { "images": images })} </div> <div class="mt-12"> <h2 class="text-xl font-bold mb-4 text-pink-700">Avis sur cette formation</h2> ${renderComponent($$result3, "FormationAvis", $$FormationAvis, { "avis": avis })} </div> <div class="mt-12"> ${renderComponent($$result3, "FormationFaq", $$FormationFaq, { "faqs": faqs })} </div> ` })}` : renderTemplate`<div class="bg-yellow-100 text-yellow-800 p-4 rounded">Formation introuvable.</div>`} </section> ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/formations/[slug].astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/formations/[slug].astro";
const $$url = "/formations/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
