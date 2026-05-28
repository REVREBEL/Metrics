// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/card.tsx
import { jsx } from "react/jsx-runtime";
function Card({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-4 group-data-[size=sm]/card:px-3", className),
      ...props
    }
  );
}

// src/components/ui/skeleton.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("animate-pulse rounded-md bg-muted", className),
      ...props
    }
  );
}

// src/components/transactions-loader.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function TransactionsLoader() {
  return /* @__PURE__ */ jsxs(Card, { className: "w-full h-full", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx3(Skeleton, { className: "h-6 w-[150px] mb-2" }),
      /* @__PURE__ */ jsx3(Skeleton, { className: "h-4 w-[200px]" })
    ] }),
    /* @__PURE__ */ jsx3(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx3("div", { className: "flex items-center justify-between", children: ["Customer", "Type", "Status", "Date", "Amount"].map((_, index) => /* @__PURE__ */ jsx3(Skeleton, { className: "h-4 w-[80px]" }, index)) }),
      [...Array(4)].map((_, rowIndex) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx3(Skeleton, { className: "h-4 w-[120px]" }),
        /* @__PURE__ */ jsx3(Skeleton, { className: "h-4 w-[60px]" }),
        /* @__PURE__ */ jsx3(Skeleton, { className: "h-4 w-[80px]" }),
        /* @__PURE__ */ jsx3(Skeleton, { className: "h-4 w-[80px]" }),
        /* @__PURE__ */ jsx3(Skeleton, { className: "h-4 w-[80px]" })
      ] }, rowIndex))
    ] }) })
  ] });
}
export {
  TransactionsLoader
};
