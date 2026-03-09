// src/components/p-breadcrumb-1.tsx
import Link from "next/link";

// src/components/ui/breadcrumb.tsx
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ChevronRight, MoreHorizontal } from "lucide-react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/breadcrumb.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Breadcrumb({ ...props }) {
  return /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...props });
}
function BreadcrumbList({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ol",
    {
      className: cn(
        "wrap-break-word flex flex-wrap items-center gap-1.5 text-muted-foreground text-sm sm:gap-2.5",
        className
      ),
      "data-slot": "breadcrumb-list",
      ...props
    }
  );
}
function BreadcrumbItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      className: cn("inline-flex items-center gap-1.5", className),
      "data-slot": "breadcrumb-item",
      ...props
    }
  );
}
function BreadcrumbLink({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn("transition-colors hover:text-foreground", className),
    "data-slot": "breadcrumb-link"
  };
  return useRender({
    defaultTagName: "a",
    props: mergeProps(defaultProps, props),
    render
  });
}
function BreadcrumbPage({ className, ...props }) {
  return (
    // biome-ignore lint(a11y/useFocusableInteractive): known
    /* @__PURE__ */ jsx(
      "span",
      {
        "aria-current": "page",
        "aria-disabled": "true",
        className: cn("font-normal text-foreground", className),
        "data-slot": "breadcrumb-page",
        role: "link",
        ...props
      }
    )
  );
}
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "aria-hidden": "true",
      className: cn("opacity-80 [&>svg]:size-4", className),
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      ...props,
      children: children ?? /* @__PURE__ */ jsx(ChevronRight, {})
    }
  );
}
function BreadcrumbEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      "aria-hidden": "true",
      className,
      "data-slot": "breadcrumb-ellipsis",
      role: "presentation",
      ...props,
      children: [
        /* @__PURE__ */ jsx(MoreHorizontal, { className: "size-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}

// src/components/ui/button.tsx
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import { jsx as jsx2 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx2(
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

// src/components/ui/menu.tsx
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { ChevronRightIcon } from "lucide-react";
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var MenuCreateHandle = MenuPrimitive.createHandle;
var Menu = MenuPrimitive.Root;
var MenuPortal = MenuPrimitive.Portal;
function MenuTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    MenuPrimitive.Trigger,
    {
      className,
      "data-slot": "menu-trigger",
      ...props,
      children
    }
  );
}
function MenuPopup({
  children,
  className,
  sideOffset = 4,
  align = "center",
  alignOffset,
  side = "bottom",
  anchor,
  ...props
}) {
  return /* @__PURE__ */ jsx3(MenuPrimitive.Portal, { children: /* @__PURE__ */ jsx3(
    MenuPrimitive.Positioner,
    {
      align,
      alignOffset,
      anchor,
      className: "z-50",
      "data-slot": "menu-positioner",
      side,
      sideOffset,
      children: /* @__PURE__ */ jsx3(
        MenuPrimitive.Popup,
        {
          className: cn(
            "relative flex not-[class*='w-']:min-w-32 origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] focus:outline-none dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className
          ),
          "data-slot": "menu-popup",
          ...props,
          children: /* @__PURE__ */ jsx3("div", { className: "max-h-(--available-height) w-full overflow-y-auto p-1", children })
        }
      )
    }
  ) });
}
function MenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    MenuPrimitive.Item,
    {
      className: cn(
        "[&>svg]:-mx-0.5 flex min-h-8 cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-inset:ps-8 data-[variant=destructive]:text-destructive-foreground data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&>svg:not([class*='opacity-'])]:opacity-80 [&>svg:not([class*='size-'])]:size-4.5 sm:[&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
        className
      ),
      "data-inset": inset,
      "data-slot": "menu-item",
      "data-variant": variant,
      ...props
    }
  );
}

// src/components/p-breadcrumb-1.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function Particle() {
  return /* @__PURE__ */ jsx4(Breadcrumb, { children: /* @__PURE__ */ jsxs3(BreadcrumbList, { children: [
    /* @__PURE__ */ jsx4(BreadcrumbItem, { children: /* @__PURE__ */ jsx4(BreadcrumbLink, { render: /* @__PURE__ */ jsx4(Link, { href: "/" }), children: "Home" }) }),
    /* @__PURE__ */ jsx4(BreadcrumbSeparator, {}),
    /* @__PURE__ */ jsx4(BreadcrumbItem, { children: /* @__PURE__ */ jsxs3(Menu, { children: [
      /* @__PURE__ */ jsx4(
        MenuTrigger,
        {
          render: /* @__PURE__ */ jsx4(
            Button,
            {
              className: "-m-1.5 text-muted-foreground",
              size: "icon-sm",
              variant: "ghost"
            }
          ),
          children: /* @__PURE__ */ jsx4(BreadcrumbEllipsis, {})
        }
      ),
      /* @__PURE__ */ jsxs3(MenuPopup, { align: "start", children: [
        /* @__PURE__ */ jsx4(MenuItem, { render: /* @__PURE__ */ jsx4(Link, { href: "/docs" }), children: "Docs" }),
        /* @__PURE__ */ jsx4(MenuItem, { render: /* @__PURE__ */ jsx4(Link, { href: "/particles" }), children: "Particles" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx4(BreadcrumbSeparator, {}),
    /* @__PURE__ */ jsx4(BreadcrumbItem, { children: /* @__PURE__ */ jsx4(BreadcrumbLink, { render: /* @__PURE__ */ jsx4(Link, { href: "/docs/" }), children: "Components" }) }),
    /* @__PURE__ */ jsx4(BreadcrumbSeparator, {}),
    /* @__PURE__ */ jsx4(BreadcrumbItem, { children: /* @__PURE__ */ jsx4(BreadcrumbPage, { children: "Breadcrumb" }) })
  ] }) });
}
export {
  Particle as default
};
