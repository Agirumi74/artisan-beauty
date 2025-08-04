import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, d as renderSlot, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_yOR9iWGp.mjs';
import { $ as $$Card, a as $$CardContent, b as $$CardTitle } from '../chunks/CardContent_B7GO-Mjw.mjs';
import { tv } from 'tailwind-variants';
import { $ as $$Button } from '../chunks/Button_COf-C2g_.mjs';
import 'clsx';
import { $ as $$Alert } from '../chunks/Alert_D540qVAV.mjs';
import db from '../chunks/db_DLs-JeiT.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$4 = createAstro();
const $$Badge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Badge;
  const badge = tv({
    base: "starwind-badge starwind-transition-colors inline-flex items-center rounded-full font-semibold focus-visible:outline-2 focus-visible:outline-offset-2",
    variants: {
      variant: {
        default: "bg-foreground text-background",
        primary: "bg-primary text-primary-foreground focus-visible:outline-primary",
        secondary: "bg-secondary text-secondary-foreground focus-visible:outline-secondary",
        outline: "border-border focus-visible:outline-outline border",
        ghost: "bg-foreground/10 text-foreground focus-visible:outline-outline",
        info: "bg-info text-info-foreground focus-visible:outline-info",
        success: "bg-success text-success-foreground focus-visible:outline-success",
        warning: "bg-warning text-warning-foreground focus-visible:outline-warning",
        error: "bg-error text-error-foreground focus-visible:outline-error"
      },
      size: { sm: "px-2.5 py-0.5 text-xs", md: "px-3 py-0.5 text-sm", lg: "px-4 py-1 text-base" },
      isLink: { true: "cursor-pointer", false: "" }
    },
    compoundVariants: [
      { isLink: true, variant: "default", className: "hover:bg-foreground/80" },
      { isLink: true, variant: "primary", className: "hover:bg-primary/80" },
      { isLink: true, variant: "secondary", className: "hover:bg-secondary/80" },
      { isLink: true, variant: "outline", className: "hover:border-border/80" },
      { isLink: true, variant: "ghost", className: "hover:bg-foreground/7" },
      { isLink: true, variant: "info", className: "hover:bg-info/80" },
      { isLink: true, variant: "success", className: "hover:bg-success/80" },
      { isLink: true, variant: "warning", className: "hover:bg-warning/80" },
      { isLink: true, variant: "error", className: "hover:bg-error/80" }
    ],
    defaultVariants: { variant: "default", size: "md", isLink: false }
  });
  const { variant, size, class: className, ...rest } = Astro2.props;
  const isLink = Astro2.props.href ? true : false;
  const Tag = Astro2.props.href ? "a" : "div";
  return renderTemplate`${renderComponent($$result, "Tag", Tag, { "class": badge({ variant, size, isLink, class: className }), ...rest }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/starwind/badge/Badge.astro", void 0);

const $$Astro$3 = createAstro();
const $$ServiceAvisSummary = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ServiceAvisSummary;
  const { serviceId } = Astro2.props;
  let avis = [];
  let moyenne = null;
  let loading = true;
  try {
    const res = await fetch(`/api/avis-db?serviceId=${serviceId}`);
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
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/ServiceAvisSummary.astro", void 0);

const $$Astro$2 = createAstro();
const $$ServicesAvisCarousel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ServicesAvisCarousel;
  const { avis = [] } = Astro2.props;
  return renderTemplate`${avis.length > 0 ? renderTemplate`${maybeRenderHead()}<div class="w-full overflow-x-auto py-2"><div class="flex gap-4 min-w-full">${avis.map((a) => renderTemplate`<div class="bg-white rounded-xl shadow p-6 min-w-[320px] max-w-xs flex-shrink-0"><div class="font-semibold text-pink-700 mb-1">${a.utilisateur || a.nom}</div><div class="text-sm text-gray-600 mb-2">${a.commentaire}</div><div class="text-xs text-yellow-600">${a.note} / 5</div></div>`)}</div></div>` : renderTemplate`${renderComponent($$result, "Alert", $$Alert, { "variant": "info" }, { "default": ($$result2) => renderTemplate`Aucun avis à afficher pour le moment.` })}`}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/ServicesAvisCarousel.astro", void 0);

const $$Astro$1 = createAstro();
const $$ServicesGalleryCarousel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ServicesGalleryCarousel;
  const { images = [] } = Astro2.props;
  return renderTemplate`${images.length > 0 ? renderTemplate`${maybeRenderHead()}<div class="w-full overflow-x-auto py-2"><div class="flex gap-4 min-w-full">${images.map((img) => renderTemplate`<div class="bg-white rounded-xl shadow p-2 min-w-[180px] max-w-xs flex-shrink-0 flex flex-col items-center"><img${addAttribute(img.imageUrl, "src")}${addAttribute(img.title, "alt")} class="w-40 h-32 object-cover rounded mb-2" loading="lazy"><div class="text-xs text-gray-700 text-center">${img.title}</div></div>`)}</div></div>` : renderTemplate`${renderComponent($$result, "Alert", $$Alert, { "variant": "info" }, { "default": ($$result2) => renderTemplate`Aucune image à afficher pour le moment.` })}`}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/ServicesGalleryCarousel.astro", void 0);

const $$Astro = createAstro();
const $$ServicesFaqList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ServicesFaqList;
  const { faqs = [] } = Astro2.props;
  return renderTemplate`${faqs.length > 0 ? renderTemplate`${maybeRenderHead()}<ul class="list-disc ml-6 text-left">${faqs.map((f) => renderTemplate`<li class="mb-2"><span class="font-semibold text-pink-700">${f.question}</span><br><span class="text-gray-700">${f.reponse}</span></li>`)}</ul>` : renderTemplate`${renderComponent($$result, "Alert", $$Alert, { "variant": "info" }, { "default": ($$result2) => renderTemplate`Aucune question fréquente à afficher pour le moment.` })}`}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/ServicesFaqList.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  let services = [];
  try {
    services = db.prepare("SELECT * FROM services ORDER BY id ASC").all();
  } catch (e) {
    services = [];
  }
  let allServiceFaqs = [];
  let allServiceAvis = [];
  let allServiceImages = [];
  try {
    allServiceFaqs = db.prepare("SELECT * FROM faq WHERE servicesGlobal = 1 ORDER BY id ASC").all();
    allServiceAvis = db.prepare("SELECT * FROM avis WHERE servicesGlobal = 1 ORDER BY id ASC").all();
    allServiceImages = db.prepare("SELECT * FROM galerie WHERE servicesGlobal = 1 ORDER BY id ASC").all();
  } catch {
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<section class="relative bg-gradient-to-br from-pink-100 to-pink-300 py-16 mb-12"> <div class="container mx-auto flex flex-col md:flex-row items-center gap-10"> <div class="flex-1 text-center md:text-left"> <h1 class="text-5xl font-extrabold text-pink-700 mb-4">Découvrez nos services de maquillage à Annecy</h1> <p class="text-lg text-gray-700 mb-6 max-w-xl">Maquillage professionnel, artistique, événementiel ou formation : sublimez chaque moment avec l’expertise d’une maquilleuse passionnée. Réservez votre séance ou demandez un devis personnalisé !</p> ${renderComponent($$result2, "Button", $$Button, { "href": "/contact", "variant": "primary", "size": "lg" }, { "default": ($$result3) => renderTemplate`Demander un devis` })} </div> <div class="flex-1 flex justify-center"> <img src="/assets/mariee-annecy.jpg" alt="Maquillage professionnel Annecy à Annecy" class="rounded-3xl shadow-2xl w-96 h-72 object-cover border-4 border-pink-200" loading="lazy"> </div> </div> </section> <section class="container mx-auto py-8"> <h2 class="text-3xl font-bold mb-8 text-pink-700 text-center">Nos Services</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"> ${services.map((service) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { "class": "flex flex-col h-full" }, { "default": ($$result3) => renderTemplate`${service.image ? renderTemplate`<img${addAttribute(service.image, "src")}${addAttribute(service.nom, "alt")} class="w-full h-48 object-cover rounded-t-2xl" loading="lazy">` : renderTemplate`<div class="h-48 flex items-center justify-center bg-gray-100 rounded-t-2xl text-gray-400">Aucune image</div>`}${renderComponent($$result3, "CardContent", $$CardContent, { "class": "flex-1 flex flex-col justify-between" }, { "default": ($$result4) => renderTemplate` <div> ${renderComponent($$result4, "CardTitle", $$CardTitle, { "class": "mb-2" }, { "default": ($$result5) => renderTemplate`${service.nom}` })} <div class="flex gap-2 mb-2"> ${service.categorie && renderTemplate`${renderComponent($$result4, "Badge", $$Badge, { "variant": "primary" }, { "default": ($$result5) => renderTemplate`${service.categorie}` })}`} ${service.duree && renderTemplate`${renderComponent($$result4, "Badge", $$Badge, { "variant": "secondary" }, { "default": ($$result5) => renderTemplate`${service.duree}` })}`} </div> <p class="mb-3 text-gray-700 line-clamp-3">${service.description}</p> </div> <div class="flex items-center justify-between mt-4"> <span class="font-bold text-pink-700 text-xl">${service.prix} €</span> ${renderComponent($$result4, "Button", $$Button, { "href": `/services/${service.slug}`, "variant": "primary" }, { "default": ($$result5) => renderTemplate`Voir le service` })} </div> ` })} <div class="px-8 pb-4"> ${renderComponent($$result3, "ServiceAvisSummary", $$ServiceAvisSummary, { "serviceId": service.id })} </div> ` })}`)} </div> </section> <section class="container mx-auto py-12"> <h2 class="text-3xl font-bold mb-6 text-pink-700 text-center">Avis sur nos services</h2> ${renderComponent($$result2, "ServicesAvisCarousel", $$ServicesAvisCarousel, { "avis": allServiceAvis })} </section> <section class="container mx-auto py-12"> <h2 class="text-3xl font-bold mb-6 text-pink-700 text-center">Galerie des services</h2> ${renderComponent($$result2, "ServicesGalleryCarousel", $$ServicesGalleryCarousel, { "images": allServiceImages })} </section> <section class="container mx-auto py-12"> <h2 class="text-3xl font-bold mb-6 text-pink-700 text-center">Questions fréquentes sur les services</h2> ${renderComponent($$result2, "ServicesFaqList", $$ServicesFaqList, { "faqs": allServiceFaqs })} </section> <section class="container mx-auto py-12 flex flex-col items-center"> <div class="bg-pink-100 rounded-2xl shadow-lg p-10 flex flex-col items-center max-w-2xl"> <h3 class="text-2xl font-bold text-pink-700 mb-4 text-center">Prête à sublimer votre beauté ?</h3> <p class="text-gray-700 mb-6 text-center">Contactez-moi pour un devis personnalisé ou réservez directement votre séance de maquillage à Annecy.</p> <div class="flex gap-4"> ${renderComponent($$result2, "Button", $$Button, { "href": "/contact", "variant": "primary", "size": "lg" }, { "default": ($$result3) => renderTemplate`Contact` })} ${renderComponent($$result2, "Button", $$Button, { "href": "/reservations", "variant": "secondary", "size": "lg" }, { "default": ($$result3) => renderTemplate`Réserver` })} </div> </div> </section> ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/services/index.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/services/index.astro";
const $$url = "/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
