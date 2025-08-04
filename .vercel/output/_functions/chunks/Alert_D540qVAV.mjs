import { c as createComponent, a as createAstro, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, d as renderSlot, b as renderTemplate } from './astro/server_BiuKQx4Z.mjs';
import { tv } from 'tailwind-variants';
import 'clsx';

const $$Astro = createAstro();
const $$Alert = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Alert;
  const alert = tv({
    base: "text-foreground relative w-full rounded-lg border p-4",
    variants: {
      variant: {
        default: "bg-background [&>h5>svg]:text-foreground",
        primary: "border-primary bg-primary/7 [&>h5>svg]:text-primary",
        secondary: "border-secondary bg-secondary/7 [&>h5>svg]:text-secondary",
        info: "border-info bg-info/7 [&>h5>svg]:text-info",
        success: "border-success bg-success/7 [&>h5>svg]:text-success",
        warning: "border-warning bg-warning/7 [&>h5>svg]:text-warning",
        error: "border-error bg-error/7 [&>h5>svg]:text-error"
      }
    },
    defaultVariants: { variant: "default" }
  });
  const { variant, class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(alert({ variant, class: className }), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/starwind/alert/Alert.astro", void 0);

export { $$Alert as $ };
