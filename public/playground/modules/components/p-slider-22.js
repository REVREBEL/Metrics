"use client";

// src/components/p-slider-22.tsx
import { useState } from "react";

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

// src/components/ui/input-group.tsx
import { cva as cva2 } from "class-variance-authority";

// src/components/ui/input.tsx
import { jsx as jsx2 } from "react/jsx-runtime";

// src/components/ui/textarea.tsx
import { jsx as jsx3 } from "react/jsx-runtime";

// src/components/ui/input-group.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function InputGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: cn(
        "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-lg border border-input transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-input/50 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className
      ),
      ...props
    }
  );
}
var inputGroupAddonVariants = cva2(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
        "inline-end": "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
        "block-start": "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end": "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2"
      }
    },
    defaultVariants: {
      align: "inline-start"
    }
  }
);
function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      role: "group",
      "data-slot": "input-group-addon",
      "data-align": align,
      className: cn(inputGroupAddonVariants({ align }), className),
      onClick: (e) => {
        if (e.target.closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      },
      ...props
    }
  );
}
var inputGroupButtonVariants = cva2(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "",
        "icon-xs": "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0"
      }
    },
    defaultVariants: {
      size: "xs"
    }
  }
);
function InputGroupText({ className, ...props }) {
  return /* @__PURE__ */ jsx4(
    "span",
    {
      className: cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/number-field.tsx
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { MinusIcon, PlusIcon } from "lucide-react";
import * as React from "react";

// src/components/ui/label.tsx
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

// src/components/ui/number-field.tsx
import { jsx as jsx5, jsxs } from "react/jsx-runtime";
var NumberFieldContext = React.createContext(null);
function NumberField({
  id,
  className,
  size = "default",
  ...props
}) {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  return /* @__PURE__ */ jsx5(NumberFieldContext.Provider, { value: { fieldId }, children: /* @__PURE__ */ jsx5(
    NumberFieldPrimitive.Root,
    {
      className: cn("flex w-full flex-col items-start gap-2", className),
      "data-size": size,
      "data-slot": "number-field",
      id: fieldId,
      ...props
    }
  ) });
}
function NumberFieldInput({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    NumberFieldPrimitive.Input,
    {
      className: cn(
        "h-8.5 in-data-[size=lg]:h-9.5 in-data-[size=sm]:h-7.5 w-full min-w-0 grow bg-transparent in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] px-[calc(--spacing(3)-1px)] text-center tabular-nums in-data-[size=lg]:leading-9.5 in-data-[size=sm]:leading-7.5 leading-8.5 outline-none [transition:background-color_5000000s_ease-in-out_0s] sm:h-7.5 sm:in-data-[size=lg]:h-8.5 sm:in-data-[size=sm]:h-6.5 sm:in-data-[size=lg]:leading-8.5 sm:in-data-[size=sm]:leading-8.5 sm:leading-7.5",
        className
      ),
      "data-slot": "number-field-input",
      ...props
    }
  );
}

// src/components/ui/slider.tsx
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import * as React2 from "react";
import { jsx as jsx6, jsxs as jsxs2 } from "react/jsx-runtime";
function Slider({
  className,
  children,
  defaultValue,
  value,
  min: min2 = 0,
  max: max2 = 100,
  ...props
}) {
  const _values = React2.useMemo(() => {
    if (value !== void 0) {
      return Array.isArray(value) ? value : [value];
    }
    if (defaultValue !== void 0) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [min2];
  }, [value, defaultValue, min2]);
  return /* @__PURE__ */ jsxs2(
    SliderPrimitive.Root,
    {
      className: cn("data-[orientation=horizontal]:w-full", className),
      defaultValue,
      max: max2,
      min: min2,
      thumbAlignment: "edge",
      value,
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx6(
          SliderPrimitive.Control,
          {
            className: "flex touch-none select-none data-disabled:pointer-events-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:min-w-44 data-[orientation=vertical]:flex-col data-disabled:opacity-64",
            "data-slot": "slider-control",
            children: /* @__PURE__ */ jsxs2(
              SliderPrimitive.Track,
              {
                className: "relative grow select-none before:absolute before:rounded-full before:bg-input data-[orientation=horizontal]:h-1 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1 data-[orientation=horizontal]:before:inset-x-0.5 data-[orientation=vertical]:before:inset-x-0 data-[orientation=horizontal]:before:inset-y-0 data-[orientation=vertical]:before:inset-y-0.5",
                "data-slot": "slider-track",
                children: [
                  /* @__PURE__ */ jsx6(
                    SliderPrimitive.Indicator,
                    {
                      className: "select-none rounded-full bg-primary data-[orientation=horizontal]:ms-0.5 data-[orientation=vertical]:mb-0.5",
                      "data-slot": "slider-indicator"
                    }
                  ),
                  Array.from({ length: _values.length }, (_, index) => /* @__PURE__ */ jsx6(
                    SliderPrimitive.Thumb,
                    {
                      className: "block size-5 shrink-0 select-none rounded-full border border-input bg-white not-dark:bg-clip-padding shadow-xs/5 outline-none transition-[box-shadow,scale] before:absolute before:inset-0 before:rounded-full before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:ring-[3px] has-focus-visible:ring-ring/24 data-dragging:scale-120 sm:size-4 dark:border-background dark:has-focus-visible:ring-ring/48 [:has(*:focus-visible),[data-dragging]]:shadow-none",
                      "data-slot": "slider-thumb",
                      index
                    },
                    String(index)
                  ))
                ]
              }
            )
          }
        )
      ]
    }
  );
}

// src/components/p-slider-22.tsx
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
var items = [
  { id: 1, price: 80 },
  { id: 2, price: 95 },
  { id: 3, price: 110 },
  { id: 4, price: 125 },
  { id: 5, price: 130 },
  { id: 6, price: 140 },
  { id: 7, price: 145 },
  { id: 8, price: 150 },
  { id: 9, price: 155 },
  { id: 10, price: 165 },
  { id: 11, price: 175 },
  { id: 12, price: 185 },
  { id: 13, price: 195 },
  { id: 14, price: 205 },
  { id: 15, price: 215 },
  { id: 16, price: 225 },
  { id: 17, price: 235 },
  { id: 18, price: 245 },
  { id: 19, price: 255 },
  { id: 20, price: 260 },
  { id: 21, price: 265 },
  { id: 22, price: 270 },
  { id: 23, price: 275 },
  { id: 24, price: 280 },
  { id: 25, price: 285 },
  { id: 26, price: 290 },
  { id: 27, price: 290 },
  { id: 28, price: 295 },
  { id: 29, price: 295 },
  { id: 30, price: 295 },
  { id: 31, price: 298 },
  { id: 32, price: 299 },
  { id: 33, price: 300 },
  { id: 34, price: 305 },
  { id: 35, price: 310 },
  { id: 36, price: 315 },
  { id: 37, price: 320 },
  { id: 38, price: 325 },
  { id: 39, price: 330 },
  { id: 40, price: 335 },
  { id: 41, price: 340 },
  { id: 42, price: 345 },
  { id: 43, price: 350 },
  { id: 44, price: 355 },
  { id: 45, price: 360 },
  { id: 46, price: 365 },
  { id: 47, price: 365 },
  { id: 48, price: 375 },
  { id: 49, price: 380 },
  { id: 50, price: 385 },
  { id: 51, price: 390 },
  { id: 52, price: 395 },
  { id: 53, price: 400 },
  { id: 54, price: 405 },
  { id: 55, price: 410 },
  { id: 56, price: 415 },
  { id: 57, price: 420 },
  { id: 58, price: 425 },
  { id: 59, price: 430 },
  { id: 60, price: 435 },
  { id: 61, price: 440 },
  { id: 62, price: 445 },
  { id: 63, price: 450 },
  { id: 64, price: 455 },
  { id: 65, price: 460 },
  { id: 66, price: 465 },
  { id: 67, price: 470 },
  { id: 68, price: 475 },
  { id: 69, price: 480 },
  { id: 70, price: 485 },
  { id: 71, price: 490 },
  { id: 72, price: 495 },
  { id: 73, price: 495 },
  { id: 74, price: 498 },
  { id: 75, price: 499 },
  { id: 76, price: 500 },
  { id: 77, price: 500 },
  { id: 78, price: 500 },
  { id: 79, price: 515 },
  { id: 80, price: 530 },
  { id: 81, price: 545 },
  { id: 82, price: 560 },
  { id: 83, price: 575 },
  { id: 84, price: 590 },
  { id: 85, price: 605 },
  { id: 86, price: 620 },
  { id: 87, price: 635 },
  { id: 88, price: 650 },
  { id: 89, price: 655 },
  { id: 90, price: 660 },
  { id: 91, price: 665 },
  { id: 92, price: 670 },
  { id: 93, price: 675 },
  { id: 94, price: 680 },
  { id: 95, price: 685 },
  { id: 96, price: 690 },
  { id: 97, price: 695 },
  { id: 98, price: 700 },
  { id: 99, price: 700 },
  { id: 100, price: 700 },
  { id: 101, price: 700 },
  { id: 102, price: 700 },
  { id: 103, price: 700 },
  { id: 104, price: 725 },
  { id: 105, price: 750 },
  { id: 106, price: 775 },
  { id: 107, price: 800 },
  { id: 108, price: 815 },
  { id: 109, price: 830 },
  { id: 110, price: 845 },
  { id: 111, price: 845 },
  { id: 112, price: 845 },
  { id: 113, price: 870 },
  { id: 114, price: 875 },
  { id: 115, price: 880 },
  { id: 116, price: 885 },
  { id: 117, price: 890 },
  { id: 118, price: 895 },
  { id: 119, price: 898 },
  { id: 120, price: 900 }
];
var tickCount = 40;
var min = Math.min(...items.map((item) => item.price));
var max = Math.max(...items.map((item) => item.price));
var priceStep = (max - min) / tickCount;
var itemCounts = Array.from({ length: tickCount }, (_, tick) => {
  const rangeMin = min + tick * priceStep;
  const rangeMax = min + (tick + 1) * priceStep;
  return items.filter((item) => item.price >= rangeMin && item.price < rangeMax).length;
});
var maxCount = Math.max(...itemCounts);
function Particle() {
  const [values, setValues] = useState([200, 780]);
  const updateValue = (index, newValue) => {
    const v = newValue ?? min;
    setValues((prev) => {
      const next = [...prev];
      if (index === 0) {
        next[0] = Math.min(v, prev[1] ?? max);
      } else {
        next[1] = Math.max(v, prev[0] ?? min);
      }
      return next;
    });
  };
  const countItemsInRange = () => items.filter(
    (item) => item.price >= (values[0] ?? min) && item.price <= (values[1] ?? max)
  ).length;
  const isBarInSelectedRange = (index) => {
    const rangeMin = min + index * priceStep;
    const rangeMax = min + (index + 1) * priceStep;
    return countItemsInRange() > 0 && rangeMin <= (values[1] ?? max) && rangeMax >= (values[0] ?? min);
  };
  return /* @__PURE__ */ jsxs3("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxs3("div", { children: [
      /* @__PURE__ */ jsx7("div", { "aria-hidden": "true", className: "flex h-12 w-full items-end px-3", children: itemCounts.map((count, i) => /* @__PURE__ */ jsx7(
        "div",
        {
          className: "flex flex-1 justify-center",
          style: { height: `${count / maxCount * 100}%` },
          children: /* @__PURE__ */ jsx7(
            "span",
            {
              className: "mx-px size-full bg-primary/20 data-[selected=true]:bg-primary/50",
              "data-selected": isBarInSelectedRange(i)
            }
          )
        },
        String(i)
      )) }),
      /* @__PURE__ */ jsx7(
        Slider,
        {
          "aria-label": "Price range",
          className: "*:min-w-0!",
          max,
          min,
          onValueChange: (v) => setValues(Array.isArray(v) ? [...v] : [v]),
          value: values
        }
      )
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs3(InputGroup, { children: [
        /* @__PURE__ */ jsx7(
          NumberField,
          {
            "aria-label": "Minimum price",
            max: values[1],
            min,
            onValueChange: (v) => updateValue(0, v),
            value: values[0],
            children: /* @__PURE__ */ jsx7(NumberFieldInput, { className: "text-left" })
          }
        ),
        /* @__PURE__ */ jsx7(InputGroupAddon, { children: /* @__PURE__ */ jsx7(InputGroupText, { children: "$" }) })
      ] }),
      /* @__PURE__ */ jsxs3(InputGroup, { children: [
        /* @__PURE__ */ jsx7(
          NumberField,
          {
            "aria-label": "Maximum price",
            max,
            min: values[0],
            onValueChange: (v) => updateValue(1, v),
            value: values[1],
            children: /* @__PURE__ */ jsx7(NumberFieldInput, { className: "text-left" })
          }
        ),
        /* @__PURE__ */ jsx7(InputGroupAddon, { children: /* @__PURE__ */ jsx7(InputGroupText, { children: "$" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs3(Button, { className: "w-full", variant: "outline", children: [
      "Show ",
      countItemsInRange(),
      " items"
    ] })
  ] });
}
export {
  Particle as default
};
