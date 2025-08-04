import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, d as renderSlot } from './astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { tv } from 'tailwind-variants';

const $$Astro = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const { variant, size, class: className, ...rest } = Astro2.props;
  const button = tv({
    base: [
      "inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap",
      "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      "starwind-transition-colors",
      "focus-visible:outline-2 focus-visible:outline-offset-2",
      "disabled:pointer-events-none disabled:opacity-50"
    ],
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90 focus-visible:outline-outline",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:outline-secondary",
        outline: "border-border hover:bg-border hover:text-foreground focus-visible:outline-outline border",
        ghost: "hover:bg-foreground/10 hover:text-foreground focus-visible:outline-outline bg-transparent",
        info: "bg-info text-info-foreground hover:bg-info/90 focus-visible:outline-info",
        success: "bg-success text-success-foreground hover:bg-success/90 focus-visible:outline-success",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 focus-visible:outline-warning",
        error: "bg-error text-error-foreground hover:bg-error/90 focus-visible:outline-error"
      },
      size: {
        sm: "h-9 px-3 py-2 text-sm",
        md: "h-11 px-4 py-2 text-base",
        lg: "h-12 px-8 py-2 text-lg",
        icon: "h-11 w-11"
      }
    },
    defaultVariants: { variant: "default", size: "md" }
  });
  const Tag = Astro2.props.href ? "a" : "button";
  return renderTemplate`${renderComponent($$result, "Tag", Tag, { "class": button({ variant, size, class: className }), ...rest }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/starwind/button/Button.astro", void 0);

export { $$Button as $ };
