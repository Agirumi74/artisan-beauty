import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, g as defineScriptVars, e as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_yOR9iWGp.mjs';
import db from '../chunks/db_DLs-JeiT.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Galerie = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Galerie;
  let services = [];
  let galerie = [];
  try {
    services = db.prepare("SELECT id, nom FROM services ORDER BY nom ASC").all();
    galerie = db.prepare("SELECT * FROM galerie ORDER BY createdAt DESC").all();
  } catch (error) {
    console.error("Database error:", error);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", '<section class="relative w-full min-h-[320px] flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-300 overflow-hidden"> <img src="/assets/shooting-annecy.jpg" alt="Galerie Maquillage shooting \xE0 Annecy" class="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" loading="lazy"> <div class="relative z-10 text-center py-16"> <h1 class="text-4xl md:text-5xl font-bold text-pink-800 drop-shadow mb-4">Galerie</h1> <p class="text-lg md:text-xl text-pink-900 mb-2">Parcourez nos r\xE9alisations et inspirations maquillage</p> </div> </section> <section class="container mx-auto py-10"> <div class="flex flex-col md:flex-row md:items-center gap-4 mb-8"> <label for="service-select" class="font-semibold text-pink-700">Filtrer par service :</label> <select id="service-select" name="service" class="border rounded px-3 py-2 w-full md:w-64"> <option value="">Tous les services</option> ', ' </select> </div> <div id="gallery-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> ', ' </div> <dialog id="lightbox-dialog" class="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden"> <form method="dialog"> <button id="close-lightbox" class="absolute top-4 right-4 bg-pink-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-pink-800" aria-label="Fermer">&times;</button> </form> <div class="flex flex-col items-center relative"> <button id="prev-img" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 text-pink-700 rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-pink-100" aria-label="Image pr\xE9c\xE9dente">&#8592;</button> <img id="lightbox-img" src="" alt="" class="max-h-80 max-w-full rounded shadow-lg mx-8"> <button id="next-img" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 text-pink-700 rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-pink-100" aria-label="Image suivante">&#8594;</button> <div id="lightbox-title" class="mt-4 text-center text-pink-800 font-semibold"></div> <div id="lightbox-desc" class="text-gray-600 text-sm mt-1"></div> </div> </dialog> <script type="module">', `
      const galerieData = galerie;
      let filtered = galerieData;
      let currentIdx = 0;
      const select = document.getElementById('service-select');
      const grid = document.getElementById('gallery-grid');
      const dialog = document.getElementById('lightbox-dialog');
      const imgEl = document.getElementById('lightbox-img');
      const titleEl = document.getElementById('lightbox-title');
      const descEl = document.getElementById('lightbox-desc');
      const prevBtn = document.getElementById('prev-img');
      const nextBtn = document.getElementById('next-img');

      function renderGrid() {
        grid.innerHTML = '';
        if (filtered.length === 0) {
          grid.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-4 rounded col-span-full">Aucune image \xE0 afficher pour ce filtre.</div>';
          return;
        }
        filtered.forEach((img, idx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'group relative focus:outline-none';
          btn.setAttribute('data-idx', idx);
          btn.tabIndex = 0;
          btn.innerHTML = \`<img src="\${img.imageUrl}" alt="\${img.title}" class="w-full h-48 object-cover rounded shadow group-hover:scale-105 transition-transform" loading="lazy" /><span class="absolute bottom-2 left-2 bg-white/80 text-pink-800 text-xs px-2 py-1 rounded shadow">\${img.title}</span>\`;
          btn.addEventListener('click', () => openLightbox(idx));
          grid.appendChild(btn);
        });
      }

      function openLightbox(idx) {
        currentIdx = idx;
        updateLightbox();
        dialog.showModal();
      }
      function updateLightbox() {
        const img = filtered[currentIdx];
        imgEl.src = img.imageUrl;
        imgEl.alt = img.title;
        titleEl.textContent = img.title;
        descEl.textContent = img.description || '';
      }
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentIdx = (currentIdx - 1 + filtered.length) % filtered.length;
        updateLightbox();
      });
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentIdx = (currentIdx + 1) % filtered.length;
        updateLightbox();
      });
      select.addEventListener('change', (e) => {
        const val = select.value;
        filtered = val ? galerieData.filter(img => String(img.serviceId) === val || img.servicesGlobal == 1) : galerieData;
        renderGrid();
      });
      // Initial render
      renderGrid();
    <\/script> </section> `], [" ", '<section class="relative w-full min-h-[320px] flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-300 overflow-hidden"> <img src="/assets/shooting-annecy.jpg" alt="Galerie Maquillage shooting \xE0 Annecy" class="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" loading="lazy"> <div class="relative z-10 text-center py-16"> <h1 class="text-4xl md:text-5xl font-bold text-pink-800 drop-shadow mb-4">Galerie</h1> <p class="text-lg md:text-xl text-pink-900 mb-2">Parcourez nos r\xE9alisations et inspirations maquillage</p> </div> </section> <section class="container mx-auto py-10"> <div class="flex flex-col md:flex-row md:items-center gap-4 mb-8"> <label for="service-select" class="font-semibold text-pink-700">Filtrer par service :</label> <select id="service-select" name="service" class="border rounded px-3 py-2 w-full md:w-64"> <option value="">Tous les services</option> ', ' </select> </div> <div id="gallery-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> ', ' </div> <dialog id="lightbox-dialog" class="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden"> <form method="dialog"> <button id="close-lightbox" class="absolute top-4 right-4 bg-pink-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-pink-800" aria-label="Fermer">&times;</button> </form> <div class="flex flex-col items-center relative"> <button id="prev-img" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 text-pink-700 rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-pink-100" aria-label="Image pr\xE9c\xE9dente">&#8592;</button> <img id="lightbox-img" src="" alt="" class="max-h-80 max-w-full rounded shadow-lg mx-8"> <button id="next-img" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 text-pink-700 rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-pink-100" aria-label="Image suivante">&#8594;</button> <div id="lightbox-title" class="mt-4 text-center text-pink-800 font-semibold"></div> <div id="lightbox-desc" class="text-gray-600 text-sm mt-1"></div> </div> </dialog> <script type="module">', `
      const galerieData = galerie;
      let filtered = galerieData;
      let currentIdx = 0;
      const select = document.getElementById('service-select');
      const grid = document.getElementById('gallery-grid');
      const dialog = document.getElementById('lightbox-dialog');
      const imgEl = document.getElementById('lightbox-img');
      const titleEl = document.getElementById('lightbox-title');
      const descEl = document.getElementById('lightbox-desc');
      const prevBtn = document.getElementById('prev-img');
      const nextBtn = document.getElementById('next-img');

      function renderGrid() {
        grid.innerHTML = '';
        if (filtered.length === 0) {
          grid.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-4 rounded col-span-full">Aucune image \xE0 afficher pour ce filtre.</div>';
          return;
        }
        filtered.forEach((img, idx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'group relative focus:outline-none';
          btn.setAttribute('data-idx', idx);
          btn.tabIndex = 0;
          btn.innerHTML = \\\`<img src="\\\${img.imageUrl}" alt="\\\${img.title}" class="w-full h-48 object-cover rounded shadow group-hover:scale-105 transition-transform" loading="lazy" /><span class="absolute bottom-2 left-2 bg-white/80 text-pink-800 text-xs px-2 py-1 rounded shadow">\\\${img.title}</span>\\\`;
          btn.addEventListener('click', () => openLightbox(idx));
          grid.appendChild(btn);
        });
      }

      function openLightbox(idx) {
        currentIdx = idx;
        updateLightbox();
        dialog.showModal();
      }
      function updateLightbox() {
        const img = filtered[currentIdx];
        imgEl.src = img.imageUrl;
        imgEl.alt = img.title;
        titleEl.textContent = img.title;
        descEl.textContent = img.description || '';
      }
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentIdx = (currentIdx - 1 + filtered.length) % filtered.length;
        updateLightbox();
      });
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentIdx = (currentIdx + 1) % filtered.length;
        updateLightbox();
      });
      select.addEventListener('change', (e) => {
        const val = select.value;
        filtered = val ? galerieData.filter(img => String(img.serviceId) === val || img.servicesGlobal == 1) : galerieData;
        renderGrid();
      });
      // Initial render
      renderGrid();
    <\/script> </section> `])), maybeRenderHead(), services.map((s) => renderTemplate`<option${addAttribute(s.id, "value")}>${s.nom}</option>`), galerie.length === 0 ? renderTemplate`<div class="bg-yellow-100 text-yellow-800 p-4 rounded col-span-full">Aucune image à afficher pour ce filtre.</div>` : galerie.map((img, idx) => renderTemplate`<button type="button" class="group relative focus:outline-none"${addAttribute(idx, "data-idx")} tabindex="0"> <img${addAttribute(img.imageUrl, "src")}${addAttribute(img.title, "alt")} class="w-full h-48 object-cover rounded shadow group-hover:scale-105 transition-transform" loading="lazy"> <span class="absolute bottom-2 left-2 bg-white/80 text-pink-800 text-xs px-2 py-1 rounded shadow">${img.title}</span> </button>`), defineScriptVars({ galerie })) })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/galerie.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/galerie.astro";
const $$url = "/galerie";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Galerie,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
