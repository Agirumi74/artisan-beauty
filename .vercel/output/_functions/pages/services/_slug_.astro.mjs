import { c as createComponent, a as createAstro, m as maybeRenderHead, b as renderTemplate, r as renderComponent, e as addAttribute, F as Fragment } from '../../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$Alert } from '../../chunks/Alert_D540qVAV.mjs';
import { $ as $$Layout } from '../../chunks/Layout_yOR9iWGp.mjs';
import db from '../../chunks/db_DLs-JeiT.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$3 = createAstro();
const $$ServiceAvis = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ServiceAvis;
  const { avis = [] } = Astro2.props;
  return renderTemplate`${avis.length > 0 ? renderTemplate`${maybeRenderHead()}<ul class="space-y-2">${avis.map((a) => renderTemplate`<li class="bg-gray-50 p-3 rounded shadow text-left"><div class="font-semibold">${a.utilisateur || a.nom}</div><div class="text-sm text-gray-600">${a.commentaire}</div><div class="text-xs text-yellow-600">${a.note} / 5</div></li>`)}</ul>` : renderTemplate`${renderComponent($$result, "Alert", $$Alert, { "variant": "info" }, { "default": ($$result2) => renderTemplate`Aucun avis pour ce service pour le moment.` })}`}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/ServiceAvis.astro", void 0);

const $$Astro$2 = createAstro();
const $$ServiceGallery = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ServiceGallery;
  const { images = [] } = Astro2.props;
  return renderTemplate`${images.length > 0 ? renderTemplate`${maybeRenderHead()}<div class="flex gap-2 mt-2">${images.slice(0, 3).map((img) => renderTemplate`<img${addAttribute(img.imageUrl, "src")}${addAttribute(img.title, "alt")} class="w-14 h-14 object-cover rounded" loading="lazy">`)}</div>` : renderTemplate`${renderComponent($$result, "Alert", $$Alert, { "variant": "info" }, { "default": ($$result2) => renderTemplate`Aucune image pour ce service pour le moment.` })}`}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/ServiceGallery.astro", void 0);

const $$Astro$1 = createAstro();
const $$ServiceFaq = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ServiceFaq;
  const { faqs = [] } = Astro2.props;
  return renderTemplate`${faqs.length > 0 ? renderTemplate`${maybeRenderHead()}<div class="mt-8"><h2 class="text-lg font-bold mb-3 text-pink-700">Questions fréquentes sur ce service</h2><ul class="list-disc ml-6 text-left">${faqs.map((f) => renderTemplate`<li class="mb-2"><span class="font-semibold text-pink-700">${f.question}</span><br><span class="text-gray-700">${f.reponse}</span></li>`)}</ul></div>` : renderTemplate`<div class="mt-8">${renderComponent($$result, "Alert", $$Alert, { "variant": "info" }, { "default": ($$result2) => renderTemplate`Aucune question fréquente pour ce service pour le moment.` })}</div>`}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/ServiceFaq.astro", void 0);

const $$Astro = createAstro();
async function getStaticPaths() {
  const services = db.prepare("SELECT slug FROM services").all();
  return services.map((s) => ({ params: { slug: String(s.slug) } }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  let service = null;
  let faqs = [];
  let avis = [];
  let images = [];
  try {
    service = db.prepare("SELECT * FROM services WHERE slug = ?").get(slug);
    if (service && service.id) {
      if (typeof service.tags === "string") service.tags = JSON.parse(service.tags);
      if (typeof service.steps === "string") service.steps = JSON.parse(service.steps);
      faqs = db.prepare("SELECT * FROM faq WHERE servicesGlobal = 1 OR serviceId = ? ORDER BY id ASC").all(service.id);
      avis = db.prepare("SELECT * FROM avis WHERE servicesGlobal = 1 OR serviceId = ? ORDER BY id ASC").all(service.id);
      images = db.prepare("SELECT * FROM galerie WHERE servicesGlobal = 1 OR serviceId = ? ORDER BY id ASC").all(service.id);
    }
  } catch (e) {
    service = null;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container mx-auto py-12"> ${service && service.nom ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <div class="flex flex-col md:flex-row gap-8 items-start"> ${service.image && renderTemplate`<img${addAttribute(service.image, "src")}${addAttribute(service.imageAlt || service.nom, "alt")} class="w-full md:w-1/3 rounded shadow mb-6 md:mb-0" loading="lazy">`} <div class="flex-1"> <h1 class="text-3xl font-bold mb-4 text-pink-700 flex items-center gap-2"> ${service.icon && renderTemplate`<span${addAttribute(`inline-block icon-${service.icon} text-2xl`, "class")} aria-hidden="true"></span>`} ${service.nom} ${service.isFeatured ? renderTemplate`<span class="ml-2 px-2 py-1 bg-yellow-200 text-yellow-800 rounded text-xs font-bold">En vedette</span>` : null} ${!service.isActive ? renderTemplate`<span class="ml-2 px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs font-bold">Inactif</span>` : null} </h1> <div class="flex gap-2 mb-2 flex-wrap"> ${service.categorie && renderTemplate`<span class="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold">${service.categorie}</span>`} ${service.duree && renderTemplate`<span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">${service.duree}</span>`} ${service.durationMinutes && renderTemplate`<span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">${service.durationMinutes} min</span>`} ${service.tags && service.tags.length > 0 && service.tags.map((tag) => renderTemplate`<span class="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">${tag}</span>`)} </div> <p class="mb-2 text-lg">${service.description}</p> ${service.content && renderTemplate`<div class="mb-2 text-base text-gray-700"><b>Contenu :</b> ${service.content}</div>`} ${service.notes && renderTemplate`<div class="mb-2 text-sm text-gray-500"><b>Notes :</b> ${service.notes}</div>`} ${service.steps && service.steps.length > 0 && renderTemplate`<ol class="list-decimal list-inside mb-2 text-sm text-gray-700"> ${service.steps.map((step) => renderTemplate`<li>${step}</li>`)} </ol>`} <div class="font-bold text-pink-700 text-2xl mb-8">${service.prix} €</div> <a${addAttribute(`/reservations?service=${service.slug}`, "href")} class="bg-pink-700 text-white px-6 py-3 rounded hover:bg-pink-800">Réserver ce service</a> <div class="mt-6"> ${renderComponent($$result3, "ServiceGallery", $$ServiceGallery, { "images": images })} </div> </div> </div> <div class="mt-12"> <h2 class="text-xl font-bold mb-4 text-pink-700">Avis sur ce service</h2> ${renderComponent($$result3, "ServiceAvis", $$ServiceAvis, { "avis": avis })} </div> <div class="mt-12"> ${renderComponent($$result3, "ServiceFaq", $$ServiceFaq, { "faqs": faqs })} </div> ` })}` : renderTemplate`<div class="bg-yellow-100 text-yellow-800 p-4 rounded">Service introuvable.</div>`} </section> ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/services/[slug].astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/services/[slug].astro";
const $$url = "/services/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
