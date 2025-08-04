import { c as createComponent, a as createAstro, m as maybeRenderHead, b as renderTemplate, r as renderComponent, e as addAttribute } from '../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_yOR9iWGp.mjs';
import 'clsx';
import { $ as $$Alert } from '../chunks/Alert_D540qVAV.mjs';
import { $ as $$Button } from '../chunks/Button_COf-C2g_.mjs';
import db from '../chunks/db_DLs-JeiT.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$FormationAvisSummary = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FormationAvisSummary;
  const { formationId } = Astro2.props;
  let avis = [];
  let moyenne = null;
  let loading = true;
  try {
    const res = await fetch(`/api/avis-db?formationId=${formationId}`);
    if (res.ok) {
      avis = await res.json();
      if (avis.length) {
        moyenne = (avis.reduce((acc, a) => acc + (a.note || 0), 0) / avis.length).toFixed(1);
      }
    }
  } catch {
  }
  loading = false;
  return renderTemplate`${!loading && avis.length > 0 ? renderTemplate`${maybeRenderHead()}<div class="flex items-center gap-2 text-yellow-600 text-sm">${moyenne} / 5 (${avis.length} avis)</div>` : renderTemplate`<div class="text-gray-400 text-sm">Aucun avis</div>`}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/FormationAvisSummary.astro", void 0);

const $$FormationsAvisCarousel = createComponent(async ($$result, $$props, $$slots) => {
  let avis = [];
  let loading = true;
  try {
    const res = await fetch("/api/avis-db?formationsGlobal=1");
    if (res.ok) {
      avis = await res.json();
    }
  } catch {
  }
  loading = false;
  return renderTemplate`${!loading && avis.length > 0 ? renderTemplate`${maybeRenderHead()}<div class="w-full overflow-x-auto py-2"><div class="flex gap-4 min-w-full">${avis.map((a) => renderTemplate`<div class="bg-white rounded-xl shadow p-6 min-w-[320px] max-w-xs flex-shrink-0"><div class="font-semibold text-pink-700 mb-1">${a.utilisateur || a.nom}</div><div class="text-sm text-gray-600 mb-2">${a.commentaire}</div><div class="text-xs text-yellow-600">${a.note} / 5</div></div>`)}</div></div>` : !loading && avis.length === 0 ? renderTemplate`${renderComponent($$result, "Alert", $$Alert, { "variant": "info" }, { "default": async ($$result2) => renderTemplate`Aucun avis à afficher pour le moment.` })}` : null}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/FormationsAvisCarousel.astro", void 0);

const $$FormationsGalleryCarousel = createComponent(async ($$result, $$props, $$slots) => {
  let images = [];
  let loading = true;
  try {
    const res = await fetch("/api/galerie-db?formationsGlobal=1");
    if (res.ok) {
      images = await res.json();
    }
  } catch {
  }
  loading = false;
  return renderTemplate`${!loading && images.length > 0 ? renderTemplate`${maybeRenderHead()}<div class="w-full overflow-x-auto py-2"><div class="flex gap-4 min-w-full">${images.map((img) => renderTemplate`<div class="bg-white rounded-xl shadow p-2 min-w-[180px] max-w-xs flex-shrink-0 flex flex-col items-center"><img${addAttribute(img.imageUrl, "src")}${addAttribute(img.title, "alt")} class="w-40 h-32 object-cover rounded mb-2" loading="lazy"><div class="text-xs text-gray-700 text-center">${img.title}</div></div>`)}</div></div>` : !loading && images.length === 0 ? renderTemplate`${renderComponent($$result, "Alert", $$Alert, { "variant": "info" }, { "default": async ($$result2) => renderTemplate`Aucune image à afficher pour le moment.` })}` : null}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/FormationsGalleryCarousel.astro", void 0);

const $$FormationsFaqList = createComponent(async ($$result, $$props, $$slots) => {
  let faqs = [];
  let loading = true;
  try {
    const res = await fetch("/api/faq-db?formationsGlobal=1");
    if (res.ok) {
      faqs = await res.json();
    }
  } catch {
  }
  loading = false;
  return renderTemplate`${!loading && faqs.length > 0 ? renderTemplate`${maybeRenderHead()}<ul class="list-disc ml-6 text-left">${faqs.map((f) => renderTemplate`<li class="mb-2"><span class="font-semibold text-pink-700">${f.question}</span><br><span class="text-gray-700">${f.reponse}</span></li>`)}</ul>` : !loading && faqs.length === 0 ? renderTemplate`${renderComponent($$result, "Alert", $$Alert, { "variant": "info" }, { "default": async ($$result2) => renderTemplate`Aucune question fréquente à afficher pour le moment.` })}` : null}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/FormationsFaqList.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  let formations = [];
  try {
    formations = db.prepare("SELECT * FROM formations ORDER BY id ASC").all();
  } catch (e) {
    formations = [];
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<section class="relative bg-gradient-to-br from-pink-100 to-pink-300 py-16 mb-12"> <div class="container mx-auto flex flex-col md:flex-row items-center gap-10"> <div class="flex-1 text-center md:text-left"> <h1 class="text-5xl font-extrabold text-pink-700 mb-4">Formations maquillage à Annecy</h1> <p class="text-lg text-gray-700 mb-6 max-w-xl">Développez vos compétences ou découvrez l’art du maquillage avec des formations professionnelles, ludiques et adaptées à tous les niveaux. Inscrivez-vous ou demandez un devis personnalisé !</p> ${renderComponent($$result2, "Button", $$Button, { "href": "/contact", "variant": "primary", "size": "lg" }, { "default": ($$result3) => renderTemplate`Demander un devis` })} </div> <div class="flex-1 flex justify-center"> <img src="/assets/cours.jpg" alt="Formation maquillage Annecy" class="rounded-3xl shadow-2xl w-96 h-72 object-cover border-4 border-pink-200" loading="lazy"> </div> </div> </section> <section class="container mx-auto py-8"> <h2 class="text-3xl font-bold mb-8 text-pink-700 text-center">Nos Formations</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"> ${formations.length === 0 ? renderTemplate`<div class="bg-yellow-100 text-yellow-800 p-4 rounded col-span-3">Aucune formation trouvée.</div>` : formations.map((formation) => renderTemplate`<div class="bg-white rounded shadow p-6 flex flex-col"> ${formation.image ? renderTemplate`<img${addAttribute(formation.image, "src")}${addAttribute(formation.titre, "alt")} class="w-full h-40 object-cover rounded mb-4" loading="lazy">` : null} <h2 class="text-xl font-bold mb-2 text-pink-700">${formation.titre}</h2> <div class="mb-2 text-gray-600">${formation.duree ? `Dur\xE9e : ${formation.duree}` : ""} ${formation.niveau ? `| Niveau : ${formation.niveau}` : ""}</div> <p class="mb-2 text-gray-700 line-clamp-3">${formation.description || ""}</p> <div class="font-bold text-pink-700 text-lg mb-4">${formation.prix} €</div> ${renderComponent($$result2, "FormationAvisSummary", $$FormationAvisSummary, { "formationId": formation.id })} <a${addAttribute(`/formations/${formation.slug}`, "href")} class="bg-pink-700 text-white px-4 py-2 rounded hover:bg-pink-800 text-center mt-auto block mt-4">Voir la formation</a> </div>`)} </div> </section> <section class="container mx-auto py-12"> <h2 class="text-2xl font-bold mb-6 text-pink-700 text-center">Avis sur nos formations</h2> ${renderComponent($$result2, "FormationsAvisCarousel", $$FormationsAvisCarousel, {})} </section> <section class="container mx-auto py-12"> <h2 class="text-2xl font-bold mb-6 text-pink-700 text-center">Galerie des formations</h2> ${renderComponent($$result2, "FormationsGalleryCarousel", $$FormationsGalleryCarousel, {})} </section> <section class="container mx-auto py-12"> <h2 class="text-2xl font-bold mb-6 text-pink-700 text-center">Questions fréquentes sur les formations</h2> ${renderComponent($$result2, "FormationsFaqList", $$FormationsFaqList, {})} </section> <section class="container mx-auto py-12 flex flex-col items-center"> <div class="bg-pink-100 rounded-2xl shadow-lg p-10 flex flex-col items-center max-w-2xl"> <h3 class="text-2xl font-bold text-pink-700 mb-4 text-center">Prêt·e à vous former au maquillage ?</h3> <p class="text-gray-700 mb-6 text-center">Contactez-moi pour un devis personnalisé ou inscrivez-vous à la formation de votre choix à Annecy.</p> ${renderComponent($$result2, "Button", $$Button, { "href": "/contact", "variant": "primary", "size": "lg" }, { "default": ($$result3) => renderTemplate`Contact` })} </div> </section> ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/formations/index.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/formations/index.astro";
const $$url = "/formations";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
