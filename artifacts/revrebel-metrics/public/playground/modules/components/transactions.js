// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/table.tsx
import { jsx } from "react/jsx-runtime";
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/badge.tsx
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";
var badgeVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-sm border border-transparent font-medium outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-3.5 sm:[&_svg:not([class*='size-'])]:size-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [button&,a&]:cursor-pointer [button&,a&]:pointer-coarse:after:absolute [button&,a&]:pointer-coarse:after:size-full [button&,a&]:pointer-coarse:after:min-h-11 [button&,a&]:pointer-coarse:after:min-w-11",
  {
    defaultVariants: {
      size: "default",
      variant: "default"
    },
    variants: {
      size: {
        default: "h-5.5 min-w-5.5 px-[calc(--spacing(1)-1px)] text-sm sm:h-4.5 sm:min-w-4.5 sm:text-xs",
        lg: "h-6.5 min-w-6.5 px-[calc(--spacing(1.5)-1px)] text-base sm:h-5.5 sm:min-w-5.5 sm:text-sm",
        sm: "h-5 min-w-5 rounded-[.25rem] px-[calc(--spacing(1)-1px)] text-xs sm:h-4 sm:min-w-4 sm:text-[.625rem]"
      },
      variant: {
        default: "bg-primary text-primary-foreground [button&,a&]:hover:bg-primary/90",
        destructive: "bg-destructive text-white [button&,a&]:hover:bg-destructive/90",
        error: "bg-destructive/8 text-destructive-foreground dark:bg-destructive/16",
        info: "bg-info/8 text-info-foreground dark:bg-info/16",
        outline: "border-input bg-background text-foreground dark:bg-input/32 [button&,a&]:hover:bg-accent/50 dark:[button&,a&]:hover:bg-input/48",
        secondary: "bg-secondary text-secondary-foreground [button&,a&]:hover:bg-secondary/90",
        success: "bg-success/8 text-success-foreground dark:bg-success/16",
        warning: "bg-warning/8 text-warning-foreground dark:bg-warning/16"
      }
    }
  }
);
function Badge({ className, variant, size, render, ...props }) {
  const defaultProps = {
    className: cn(badgeVariants({ className, size, variant })),
    "data-slot": "badge"
  };
  return useRender({
    defaultTagName: "span",
    props: mergeProps(defaultProps, props),
    render
  });
}

// src/components/transactions.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
async function Transactions() {
  await new Promise((resolve) => setTimeout(resolve, 2e3));
  return /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsx2(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx2(TableHead, { children: "Customer" }),
      /* @__PURE__ */ jsx2(TableHead, { className: "hidden xl:table-column", children: "Type" }),
      /* @__PURE__ */ jsx2(TableHead, { className: "hidden xl:table-column", children: "Status" }),
      /* @__PURE__ */ jsx2(TableHead, { className: "hidden xl:table-column", children: "Date" }),
      /* @__PURE__ */ jsx2(TableHead, { className: "text-right", children: "Amount" })
    ] }) }),
    /* @__PURE__ */ jsxs(TableBody, { children: [
      /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxs(TableCell, { children: [
          /* @__PURE__ */ jsx2("div", { className: "font-medium", children: "Liam Johnson" }),
          /* @__PURE__ */ jsx2("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "liam@example.com" })
        ] }),
        /* @__PURE__ */ jsx2(TableCell, { className: "hidden xl:table-column", children: "Sale" }),
        /* @__PURE__ */ jsx2(TableCell, { className: "hidden xl:table-column", children: /* @__PURE__ */ jsx2(Badge, { className: "text-xs", variant: "outline", children: "Approved" }) }),
        /* @__PURE__ */ jsx2(TableCell, { className: "hidden md:table-cell lg:hidden xl:table-column", children: "2023-06-23" }),
        /* @__PURE__ */ jsx2(TableCell, { className: "text-right", children: "$250.00" })
      ] }),
      /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxs(TableCell, { children: [
          /* @__PURE__ */ jsx2("div", { className: "font-medium", children: "Olivia Smith" }),
          /* @__PURE__ */ jsx2("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "olivia@example.com" })
        ] }),
        /* @__PURE__ */ jsx2(TableCell, { className: "hidden xl:table-column", children: "Refund" }),
        /* @__PURE__ */ jsx2(TableCell, { className: "hidden xl:table-column", children: /* @__PURE__ */ jsx2(Badge, { className: "text-xs", variant: "outline", children: "Declined" }) }),
        /* @__PURE__ */ jsx2(TableCell, { className: "hidden md:table-cell lg:hidden xl:table-column", children: "2023-06-24" }),
        /* @__PURE__ */ jsx2(TableCell, { className: "text-right", children: "$150.00" })
      ] }),
      /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxs(TableCell, { children: [
          /* @__PURE__ */ jsx2("div", { className: "font-medium", children: "Noah Williams" }),
          /* @__PURE__ */ jsx2("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "noah@example.com" })
        ] }),
        /* @__PURE__ */ jsx2(TableCell, { className: "hidden xl:table-column", children: "Subscription" }),
        /* @__PURE__ */ jsx2(TableCell, { className: "hidden xl:table-column", children: /* @__PURE__ */ jsx2(Badge, { className: "text-xs", variant: "outline", children: "Approved" }) }),
        /* @__PURE__ */ jsx2(TableCell, { className: "hidden md:table-cell lg:hidden xl:table-column", children: "2023-06-25" }),
        /* @__PURE__ */ jsx2(TableCell, { className: "text-right", children: "$350.00" })
      ] }),
      /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxs(TableCell, { children: [
          /* @__PURE__ */ jsx2("div", { className: "font-medium", children: "Emma Brown" }),
          /* @__PURE__ */ jsx2("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "emma@example.com" })
        ] }),
        /* @__PURE__ */ jsx2(TableCell, { className: "hidden xl:table-column", children: "Sale" }),
        /* @__PURE__ */ jsx2(TableCell, { className: "hidden xl:table-column", children: /* @__PURE__ */ jsx2(Badge, { className: "text-xs", variant: "outline", children: "Approved" }) }),
        /* @__PURE__ */ jsx2(TableCell, { className: "hidden md:table-cell lg:hidden xl:table-column", children: "2023-06-26" }),
        /* @__PURE__ */ jsx2(TableCell, { className: "text-right", children: "$450.00" })
      ] })
    ] })
  ] });
}
export {
  Transactions
};
