// src/components/p-preview-card-1.tsx
import { CornerUpLeftIcon, StarIcon } from "lucide-react";

// src/components/ui/button.tsx
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/button.tsx
import { jsx } from "react/jsx-runtime";
var buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

// src/components/ui/preview-card.tsx
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { jsx as jsx2 } from "react/jsx-runtime";
var PreviewCard = PreviewCardPrimitive.Root;
function PreviewCardTrigger({ ...props }) {
  return /* @__PURE__ */ jsx2(PreviewCardPrimitive.Trigger, { "data-slot": "preview-card-trigger", ...props });
}
function PreviewCardPopup({
  className,
  children,
  align = "center",
  sideOffset = 4,
  anchor,
  ...props
}) {
  return /* @__PURE__ */ jsx2(PreviewCardPrimitive.Portal, { children: /* @__PURE__ */ jsx2(
    PreviewCardPrimitive.Positioner,
    {
      align,
      anchor,
      className: "z-50",
      "data-slot": "preview-card-positioner",
      sideOffset,
      children: /* @__PURE__ */ jsx2(
        PreviewCardPrimitive.Popup,
        {
          className: cn(
            "relative flex w-64 origin-(--transform-origin) text-balance rounded-lg border bg-popover not-dark:bg-clip-padding p-4 text-popover-foreground text-sm shadow-lg/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className
          ),
          "data-slot": "preview-card-content",
          ...props,
          children
        }
      )
    }
  ) });
}

// src/components/p-preview-card-1.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function Particle() {
  return /* @__PURE__ */ jsxs(PreviewCard, { children: [
    /* @__PURE__ */ jsx3(PreviewCardTrigger, { render: /* @__PURE__ */ jsx3(Button, { variant: "ghost" }), children: "coss.com/ui" }),
    /* @__PURE__ */ jsx3(PreviewCardPopup, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx3("h4", { className: "font-medium text-sm", children: "coss.com/ui" }),
        /* @__PURE__ */ jsx3("p", { className: "text-muted-foreground text-sm", children: "Beautifully designed components that you can copy and paste into your apps." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-muted-foreground text-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx3(
            "span",
            {
              "aria-hidden": "true",
              className: "size-2 rounded-full bg-blue-500"
            }
          ),
          /* @__PURE__ */ jsx3("span", { children: "TypeScript" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx3(StarIcon, { className: "size-3" }),
          /* @__PURE__ */ jsx3("span", { children: "58.2k" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx3(CornerUpLeftIcon, { className: "size-3" }),
          /* @__PURE__ */ jsx3("span", { children: "5.1k" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Particle as default
};
