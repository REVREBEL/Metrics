// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/skeleton.tsx
import { jsx } from "react/jsx-runtime";
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("animate-pulse rounded-md bg-muted", className),
      ...props
    }
  );
}

// src/components/ui/card.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Card({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "card",
      "data-size": size,
      className: cn(
        "group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-4 group-data-[size=sm]/card:px-3", className),
      ...props
    }
  );
}

// src/components/swap-layout-loader.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function SwapLayoutLoader() {
  return /* @__PURE__ */ jsxs("div", { className: "w-full grid grid-cols-2 grid-rows-5 gap-8", children: [
    /* @__PURE__ */ jsxs(Card, { className: "col-span-2 row-span-1 h-full w-full flex flex-col", children: [
      /* @__PURE__ */ jsx3(CardHeader, { children: /* @__PURE__ */ jsx3(Skeleton, { className: "h-6 w-1/4" }) }),
      /* @__PURE__ */ jsx3(CardContent, { className: "flex-grow", children: /* @__PURE__ */ jsx3(Skeleton, { className: "h-full w-full" }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "col-span-1 row-span-2 h-full w-full flex flex-col", children: [
      /* @__PURE__ */ jsx3(CardHeader, { children: /* @__PURE__ */ jsx3(Skeleton, { className: "h-6 w-1/3" }) }),
      /* @__PURE__ */ jsx3(CardContent, { className: "flex-grow", children: /* @__PURE__ */ jsx3(Skeleton, { className: "h-full w-full" }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "col-span-1 row-span-2 h-full w-full flex flex-col", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx3(Skeleton, { className: "h-6 w-1/3" }),
        /* @__PURE__ */ jsx3(Skeleton, { className: "h-4 w-2/3 mt-2" })
      ] }),
      /* @__PURE__ */ jsx3(CardContent, { className: "flex-grow", children: /* @__PURE__ */ jsx3(Skeleton, { className: "h-full w-full" }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "col-span-2 row-span-2 h-full w-full flex flex-col", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx3(Skeleton, { className: "h-6 w-1/4" }),
        /* @__PURE__ */ jsx3(Skeleton, { className: "h-4 w-1/2 mt-2" })
      ] }),
      /* @__PURE__ */ jsx3(CardContent, { className: "flex-grow", children: /* @__PURE__ */ jsx3(Skeleton, { className: "h-full w-full" }) })
    ] })
  ] });
}
export {
  SwapLayoutLoader
};
