import { c as createComponent, a as createAstro, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, d as renderSlot, b as renderTemplate } from './astro/server_BiuKQx4Z.mjs';
import { tv } from 'tailwind-variants';
import 'clsx';

const $$Astro$2 = createAstro();
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Card;
  const card = tv({ base: "bg-card text-card-foreground rounded-2xl border shadow-sm" });
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(card({ class: className }), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/starwind/card/Card.astro", void 0);

const $$Astro$1 = createAstro();
const $$CardTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CardTitle;
  const cardTitle = tv({ base: "text-3xl leading-none font-semibold tracking-tight" });
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(cardTitle({ class: className }), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/starwind/card/CardTitle.astro", void 0);

const $$Astro = createAstro();
const $$CardContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CardContent;
  const cardContent = tv({ base: "p-8 pt-0" });
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(cardContent({ class: className }), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/starwind/card/CardContent.astro", void 0);

export { $$Card as $, $$CardContent as a, $$CardTitle as b };
