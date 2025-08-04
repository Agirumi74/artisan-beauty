import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, e as addAttribute, f as renderScript } from '../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_yOR9iWGp.mjs';
import db from '../chunks/db_DLs-JeiT.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let services = [];
  let formations = [];
  try {
    services = db.prepare("SELECT id, nom, prix, duree FROM services WHERE isActive = 1 ORDER BY nom ASC").all();
    formations = db.prepare("SELECT id, titre, prix, duree FROM formations WHERE isActive = 1 ORDER BY titre ASC").all();
  } catch (error) {
    console.error("Database error:", error);
  }
  const url = new URL(Astro2.request.url);
  const serviceSlug = url.searchParams.get("service");
  const formationSlug = url.searchParams.get("formation");
  let preselectedService = null;
  let preselectedFormation = null;
  if (serviceSlug) {
    preselectedService = db.prepare("SELECT * FROM services WHERE slug = ?").get(serviceSlug);
  }
  if (formationSlug) {
    preselectedFormation = db.prepare("SELECT * FROM formations WHERE slug = ?").get(formationSlug);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container mx-auto py-12"> <div class="max-w-2xl mx-auto"> <h1 class="text-3xl font-bold mb-6 text-pink-700 text-center"> ${preselectedService ? `R\xE9server le service : ${preselectedService.nom}` : preselectedFormation ? `Inscription \xE0 la formation : ${preselectedFormation.titre}` : "R\xE9server une prestation"} </h1> ${(preselectedService || preselectedFormation) && renderTemplate`<div class="bg-pink-50 rounded-xl shadow p-6 mb-8 flex gap-6 items-center"> <img${addAttribute(preselectedService?.image || preselectedFormation?.image, "src")}${addAttribute(preselectedService?.nom || preselectedFormation?.titre, "alt")} class="w-32 h-32 object-cover rounded-xl border-2 border-pink-200" loading="lazy"> <div> <div class="font-bold text-lg text-pink-700 mb-1">${preselectedService?.nom || preselectedFormation?.titre}</div> <div class="text-gray-600 mb-1">${preselectedService?.categorie || preselectedFormation?.categorie}</div> <div class="text-gray-700 mb-2 line-clamp-2">${preselectedService?.description || preselectedFormation?.description}</div> <div class="font-bold text-pink-700 text-xl">${preselectedService?.prix || preselectedFormation?.prix} €</div> </div> </div>`} <form id="reservation-form" class="bg-white rounded shadow p-8 flex flex-col gap-4"${addAttribute(async (e) => {
    const form = e.target;
    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi en cours...";
    const data = {
      userId: form.elements.namedItem("userId")?.value,
      serviceId: service ? service.id : null,
      formationId: formation ? formation.id : null,
      date: form.elements.namedItem("date")?.value,
      time: form.elements.namedItem("time")?.value,
      status: "pending",
      notes: form.elements.namedItem("notes")?.value
    };
    const res = await fetch("/api/reservation-db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      const result = await res.json();
      window.location.href = `/reservations/confirmation?id=${result.id}`;
    } else {
      alert("Erreur lors de la r\xE9servation.");
    }
    submitBtn.disabled = false;
    submitBtn.textContent = service ? "Valider la r\xE9servation" : "Valider l\u2019inscription";
  }, "on:submit|preventDefault")}> <label class="font-semibold">Votre nom (obligatoire)
<input type="text" name="userId" required class="input input-bordered w-full" placeholder="Votre nom complet"> </label> <label class="font-semibold">Date souhaitée
<input type="date" name="date" required class="input input-bordered w-full"${addAttribute((/* @__PURE__ */ new Date()).toISOString().split("T")[0], "min")}> </label> <label class="font-semibold">Heure souhaitée
<input type="time" name="time" required class="input input-bordered w-full"> </label> <label class="font-semibold">Notes complémentaires
<textarea name="notes" class="input input-bordered w-full" placeholder="Précisez un besoin, une allergie, etc."></textarea> </label> <button type="submit" class="bg-pink-700 text-white px-6 py-3 rounded hover:bg-pink-800 transition">${preselectedService ? "Valider la r\xE9servation" : "Valider l\u2019inscription"}</button> <div id="reservation-success" style="display:none" class="bg-green-100 text-green-800 p-4 rounded mt-4 text-center font-semibold">Votre réservation a bien été enregistrée ! Vous recevrez une confirmation par email.</div> </form> </div> </section> ${renderScript($$result2, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/reservations/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/reservations/index.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/reservations/index.astro";
const $$url = "/reservations";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
