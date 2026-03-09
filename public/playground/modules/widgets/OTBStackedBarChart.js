"use client";

// src/widgets/OTBStackedBarChart/index.tsx
import { Bar, BarChart, ResponsiveContainer, XAxis, ReferenceArea, Tooltip } from "recharts";

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

// src/widgets/OTBStackedBarChart/index.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var OTBMixTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  const isDayView = payload.length > 0 && label.length === 2;
  return /* @__PURE__ */ jsxs("div", { className: "card shadow-primary p-6 bg-background border-2 border-primary min-w-[300px]", children: [
    /* @__PURE__ */ jsx2("h3", { className: "font-display text-3xl uppercase text-primary mb-4", children: isDayView ? `SATURDAY, JUNE ${label}` : "JUNE 1 - JUNE 30" }),
    /* @__PURE__ */ jsx2("div", { className: "flex gap-8 mb-6", children: isDayView ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx2("span", { className: "font-display text-xs uppercase text-muted-foreground", children: "Weekend" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx2("div", { className: "w-2 h-8 bg-[var(--chart-5)]" }),
        " ",
        /* @__PURE__ */ jsxs("div", { className: "font-sans text-lg font-bold", children: [
          "45 / 93% ",
          /* @__PURE__ */ jsx2("span", { className: "text-sm font-normal text-muted-foreground", children: "Transient" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx2("div", { className: "w-2 h-4 bg-[var(--chart-7)]" }),
        " ",
        /* @__PURE__ */ jsxs("div", { className: "font-sans text-lg font-bold", children: [
          "3 / 7% ",
          /* @__PURE__ */ jsx2("span", { className: "text-sm font-normal text-muted-foreground", children: "Group" })
        ] })
      ] })
    ] }) : (
      /* Month Summary View matching Screenshot 5.09.06 PM */
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between w-full", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx2("span", { className: "font-display text-xs uppercase", children: "Total" }),
          /* @__PURE__ */ jsxs("p", { className: "font-sans font-bold", children: [
            "78 / 85% ",
            /* @__PURE__ */ jsx2("span", { className: "text-xs font-normal", children: "Transient" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "font-sans font-bold", children: [
            "13 / 14% ",
            /* @__PURE__ */ jsx2("span", { className: "text-xs font-normal", children: "Group" })
          ] })
        ] }),
        /* @__PURE__ */ jsx2("div", { children: /* @__PURE__ */ jsx2("span", { className: "font-display text-xs uppercase text-[var(--chart-1)]", children: "Weekday" }) }),
        /* @__PURE__ */ jsx2("div", { children: /* @__PURE__ */ jsx2("span", { className: "font-display text-xs uppercase text-[var(--chart-6)]", children: "Weekend" }) })
      ] })
    ) }),
    /* @__PURE__ */ jsx2("div", { className: "w-full border-t border-primary pt-2", children: /* @__PURE__ */ jsx2("p", { className: "font-display text-2xl uppercase tracking-tighter", children: "OTB/% Mix Rooms By Day" }) })
  ] });
};
function OTBChart() {
  return /* @__PURE__ */ jsx2(Card, { className: "card shadow-primary p-8 bg-background border-2 border-primary overflow-hidden", children: /* @__PURE__ */ jsx2("div", { className: "h-[400px] w-full", children: /* @__PURE__ */ jsx2(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: chartData, children: [
    chartData.map((d, i) => d.isWeekend && /* @__PURE__ */ jsx2(ReferenceArea, { x1: d.day, x2: d.day, fill: "oklch(96% 0 0deg)", fillOpacity: 0.4 }, i)),
    /* @__PURE__ */ jsx2(
      XAxis,
      {
        dataKey: "day",
        axisLine: false,
        tickLine: false,
        tick: { fill: "var(--primary)", fontFamily: "var(--font-display)", fontSize: 14 }
      }
    ),
    /* @__PURE__ */ jsx2(Tooltip, { content: /* @__PURE__ */ jsx2(OTBMixTooltip, {}), cursor: { fill: "transparent" } }),
    /* @__PURE__ */ jsx2(Bar, { dataKey: "transient", stackId: "a", fill: "var(--chart-3)" }),
    /* @__PURE__ */ jsx2(Bar, { dataKey: "group", stackId: "a", fill: "var(--chart-6)" })
  ] }) }) }) });
}
export {
  OTBChart as default
};
