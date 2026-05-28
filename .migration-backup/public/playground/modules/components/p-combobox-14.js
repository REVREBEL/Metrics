"use client";

// src/components/p-combobox-14.tsx
import { SearchIcon } from "lucide-react";

// src/components/ui/combobox.tsx
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { ChevronsUpDownIcon, XIcon } from "lucide-react";
import * as React from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/input.tsx
import { jsx } from "react/jsx-runtime";

// src/components/ui/scroll-area.tsx
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    ScrollAreaPrimitive.Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx2(
          ScrollAreaPrimitive.Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsx2(ScrollBar, {}),
        /* @__PURE__ */ jsx2(ScrollAreaPrimitive.Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    ScrollAreaPrimitive.ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      "data-orientation": orientation,
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx2(
        ScrollAreaPrimitive.ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "relative flex-1 rounded-full bg-border"
        }
      )
    }
  );
}

// src/components/ui/combobox.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var ComboboxContext = React.createContext({
  chipsRef: null,
  multiple: false
});
function Combobox(props) {
  const chipsRef = React.useRef(null);
  return /* @__PURE__ */ jsx3(ComboboxContext.Provider, { value: { chipsRef, multiple: !!props.multiple }, children: /* @__PURE__ */ jsx3(ComboboxPrimitive.Root, { ...props }) });
}
function ComboboxChipsInput({
  className,
  size,
  ...props
}) {
  const sizeValue = size ?? "default";
  return /* @__PURE__ */ jsx3(
    ComboboxPrimitive.Input,
    {
      className: cn(
        "min-w-12 flex-1 text-base outline-none sm:text-sm [[data-slot=combobox-chip]+&]:ps-0.5",
        sizeValue === "sm" ? "ps-1.5" : "ps-2",
        className
      ),
      "data-size": typeof sizeValue === "string" ? sizeValue : void 0,
      "data-slot": "combobox-chips-input",
      size: typeof sizeValue === "number" ? sizeValue : void 0,
      ...props
    }
  );
}
function ComboboxPopup({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  alignOffset,
  align = "start",
  anchor: anchorProp,
  ...props
}) {
  const { chipsRef } = React.useContext(ComboboxContext);
  const anchor = anchorProp ?? chipsRef;
  return /* @__PURE__ */ jsx3(ComboboxPrimitive.Portal, { children: /* @__PURE__ */ jsx3(
    ComboboxPrimitive.Positioner,
    {
      align,
      alignOffset,
      anchor,
      className: "z-50 select-none",
      "data-slot": "combobox-positioner",
      side,
      sideOffset,
      children: /* @__PURE__ */ jsx3(
        "span",
        {
          className: cn(
            "relative flex max-h-full min-w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className
          ),
          children: /* @__PURE__ */ jsx3(
            ComboboxPrimitive.Popup,
            {
              className: "flex max-h-[min(var(--available-height),23rem)] flex-1 flex-col text-foreground",
              "data-slot": "combobox-popup",
              ...props,
              children
            }
          )
        }
      )
    }
  ) });
}
function ComboboxItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs2(
    ComboboxPrimitive.Item,
    {
      className: cn(
        "grid min-h-8 in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      "data-slot": "combobox-item",
      ...props,
      children: [
        /* @__PURE__ */ jsx3(ComboboxPrimitive.ItemIndicator, { className: "col-start-1", children: /* @__PURE__ */ jsx3(
          "svg",
          {
            fill: "none",
            height: "24",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            viewBox: "0 0 24 24",
            width: "24",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx3("path", { d: "M5.252 12.7 10.2 18.63 18.748 5.37" })
          }
        ) }),
        /* @__PURE__ */ jsx3("div", { className: "col-start-2", children })
      ]
    }
  );
}
function ComboboxEmpty({ className, ...props }) {
  return /* @__PURE__ */ jsx3(
    ComboboxPrimitive.Empty,
    {
      className: cn(
        "not-empty:p-2 text-center text-base text-muted-foreground sm:text-sm",
        className
      ),
      "data-slot": "combobox-empty",
      ...props
    }
  );
}
function ComboboxValue({ ...props }) {
  return /* @__PURE__ */ jsx3(ComboboxPrimitive.Value, { "data-slot": "combobox-value", ...props });
}
function ComboboxList({ className, ...props }) {
  return /* @__PURE__ */ jsx3(ScrollArea, { scrollbarGutter: true, scrollFade: true, children: /* @__PURE__ */ jsx3(
    ComboboxPrimitive.List,
    {
      className: cn(
        "not-empty:scroll-py-1 not-empty:px-1 not-empty:py-1 in-data-has-overflow-y:pe-3",
        className
      ),
      "data-slot": "combobox-list",
      ...props
    }
  ) });
}
function ComboboxChips({
  className,
  children,
  startAddon,
  ...props
}) {
  const { chipsRef } = React.useContext(ComboboxContext);
  return /* @__PURE__ */ jsxs2(
    ComboboxPrimitive.Chips,
    {
      className: cn(
        "relative inline-flex min-h-9 w-full flex-wrap gap-1 rounded-lg border border-input bg-background not-dark:bg-clip-padding p-[calc(--spacing(1)-1px)] text-base shadow-xs/5 outline-none ring-ring/24 transition-shadow *:min-h-7 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-within:border-ring focus-within:ring-[3px] has-disabled:pointer-events-none has-data-[size=lg]:min-h-10 has-data-[size=sm]:min-h-8 has-aria-invalid:border-destructive/36 has-autofill:bg-foreground/4 has-disabled:opacity-64 has-[:disabled,:focus-within,[aria-invalid]]:shadow-none focus-within:has-aria-invalid:border-destructive/64 focus-within:has-aria-invalid:ring-destructive/16 has-data-[size=lg]:*:min-h-8 has-data-[size=sm]:*:min-h-6 sm:min-h-8 sm:text-sm sm:has-data-[size=lg]:min-h-9 sm:has-data-[size=sm]:min-h-7 sm:*:min-h-6 sm:has-data-[size=lg]:*:min-h-7 sm:has-data-[size=sm]:*:min-h-5 dark:not-has-disabled:bg-input/32 dark:has-autofill:bg-foreground/8 dark:has-aria-invalid:ring-destructive/24 dark:not-has-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        className
      ),
      "data-slot": "combobox-chips",
      ref: chipsRef,
      ...props,
      children: [
        startAddon && /* @__PURE__ */ jsx3(
          "div",
          {
            "aria-hidden": "true",
            className: "[&_svg]:-ms-0.5 [&_svg]:-me-1.5 flex shrink-0 items-center ps-2 opacity-80 has-[~[data-size=sm]]:has-[+[data-slot=combobox-chip]]:pe-1.5 has-[~[data-size=sm]]:ps-1.5 has-[+[data-slot=combobox-chip]]:pe-2 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
            "data-slot": "combobox-start-addon",
            children: startAddon
          }
        ),
        children
      ]
    }
  );
}
function ComboboxChip({
  children,
  removeProps,
  ...props
}) {
  return /* @__PURE__ */ jsxs2(
    ComboboxPrimitive.Chip,
    {
      className: "flex items-center rounded-[calc(var(--radius-md)-1px)] bg-accent ps-2 font-medium text-accent-foreground text-sm outline-none sm:text-xs/(--text-xs--line-height) [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
      "data-slot": "combobox-chip",
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx3(ComboboxChipRemove, { ...removeProps })
      ]
    }
  );
}
function ComboboxChipRemove(props) {
  return /* @__PURE__ */ jsx3(
    ComboboxPrimitive.ChipRemove,
    {
      "aria-label": "Remove",
      className: "h-full shrink-0 cursor-pointer px-1.5 opacity-80 hover:opacity-100 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
      "data-slot": "combobox-chip-remove",
      ...props,
      children: /* @__PURE__ */ jsx3(XIcon, {})
    }
  );
}
var useComboboxFilter = ComboboxPrimitive.useFilter;

// src/components/p-combobox-14.tsx
import { Fragment, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var items = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
  { label: "Grape", value: "grape" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Mango", value: "mango" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Kiwi", value: "kiwi" },
  { label: "Peach", value: "peach" },
  { label: "Pear", value: "pear" }
];
function Particle() {
  return /* @__PURE__ */ jsxs3(Combobox, { defaultValue: [items[0], items[3]], items, multiple: true, children: [
    /* @__PURE__ */ jsx4(ComboboxChips, { startAddon: /* @__PURE__ */ jsx4(SearchIcon, {}), children: /* @__PURE__ */ jsx4(ComboboxValue, { children: (value) => /* @__PURE__ */ jsxs3(Fragment, { children: [
      value?.map((item) => /* @__PURE__ */ jsx4(ComboboxChip, { "aria-label": item.label, children: item.label }, item.value)),
      /* @__PURE__ */ jsx4(
        ComboboxChipsInput,
        {
          "aria-label": "Select a item",
          placeholder: value.length > 0 ? void 0 : "Select a item..."
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxs3(ComboboxPopup, { children: [
      /* @__PURE__ */ jsx4(ComboboxEmpty, { children: "No items found." }),
      /* @__PURE__ */ jsx4(ComboboxList, { children: (item) => /* @__PURE__ */ jsx4(ComboboxItem, { value: item, children: item.label }, item.value) })
    ] })
  ] });
}
export {
  Particle as default
};
