"use client";

// src/components/p-combobox-11.tsx
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

// src/components/ui/combobox.tsx
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { ChevronsUpDownIcon, XIcon } from "lucide-react";
import * as React from "react";

// src/components/ui/input.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx2(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/scroll-area.tsx
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
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
        /* @__PURE__ */ jsx3(
          ScrollAreaPrimitive.Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsx3(ScrollBar, {}),
        /* @__PURE__ */ jsx3(ScrollAreaPrimitive.Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
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
      children: /* @__PURE__ */ jsx3(
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
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var ComboboxContext = React.createContext({
  chipsRef: null,
  multiple: false
});
function Combobox(props) {
  const chipsRef = React.useRef(null);
  return /* @__PURE__ */ jsx4(ComboboxContext.Provider, { value: { chipsRef, multiple: !!props.multiple }, children: /* @__PURE__ */ jsx4(ComboboxPrimitive.Root, { ...props }) });
}
function ComboboxInput({
  className,
  showTrigger = true,
  showClear = false,
  startAddon,
  size,
  triggerProps,
  clearProps,
  ...props
}) {
  const sizeValue = size ?? "default";
  return /* @__PURE__ */ jsxs2("div", { className: "relative not-has-[>*.w-full]:w-fit w-full text-foreground has-disabled:opacity-64", children: [
    startAddon && /* @__PURE__ */ jsx4(
      "div",
      {
        "aria-hidden": "true",
        className: "[&_svg]:-mx-0.5 pointer-events-none absolute inset-y-0 start-px z-10 flex items-center ps-[calc(--spacing(3)-1px)] opacity-80 has-[+[data-size=sm]]:ps-[calc(--spacing(2.5)-1px)] [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4",
        "data-slot": "combobox-start-addon",
        children: startAddon
      }
    ),
    /* @__PURE__ */ jsx4(
      ComboboxPrimitive.Input,
      {
        className: cn(
          startAddon && "data-[size=sm]:*:data-[slot=combobox-input]:ps-[calc(--spacing(7.5)-1px)] *:data-[slot=combobox-input]:ps-[calc(--spacing(8.5)-1px)] sm:data-[size=sm]:*:data-[slot=combobox-input]:ps-[calc(--spacing(7)-1px)] sm:*:data-[slot=combobox-input]:ps-[calc(--spacing(8)-1px)]",
          sizeValue === "sm" ? "has-[+[data-slot=combobox-trigger],+[data-slot=combobox-clear]]:*:data-[slot=combobox-input]:pe-6.5" : "has-[+[data-slot=combobox-trigger],+[data-slot=combobox-clear]]:*:data-[slot=combobox-input]:pe-7",
          className
        ),
        "data-slot": "combobox-input",
        render: /* @__PURE__ */ jsx4(
          Input,
          {
            className: "has-disabled:opacity-100",
            nativeInput: true,
            size: sizeValue
          }
        ),
        ...props
      }
    ),
    showTrigger && /* @__PURE__ */ jsx4(
      ComboboxTrigger,
      {
        className: cn(
          "-translate-y-1/2 absolute top-1/2 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-opacity pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 has-[+[data-slot=combobox-clear]]:hidden sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
          sizeValue === "sm" ? "end-0" : "end-0.5"
        ),
        ...triggerProps,
        children: /* @__PURE__ */ jsx4(ComboboxPrimitive.Icon, { "data-slot": "combobox-icon", children: /* @__PURE__ */ jsx4(ChevronsUpDownIcon, {}) })
      }
    ),
    showClear && /* @__PURE__ */ jsx4(
      ComboboxClear,
      {
        className: cn(
          "-translate-y-1/2 absolute top-1/2 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-opacity pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 has-[+[data-slot=combobox-clear]]:hidden sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
          sizeValue === "sm" ? "end-0" : "end-0.5"
        ),
        ...clearProps,
        children: /* @__PURE__ */ jsx4(XIcon, {})
      }
    )
  ] });
}
function ComboboxTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    ComboboxPrimitive.Trigger,
    {
      className,
      "data-slot": "combobox-trigger",
      ...props,
      children
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
  return /* @__PURE__ */ jsx4(ComboboxPrimitive.Portal, { children: /* @__PURE__ */ jsx4(
    ComboboxPrimitive.Positioner,
    {
      align,
      alignOffset,
      anchor,
      className: "z-50 select-none",
      "data-slot": "combobox-positioner",
      side,
      sideOffset,
      children: /* @__PURE__ */ jsx4(
        "span",
        {
          className: cn(
            "relative flex max-h-full min-w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className
          ),
          children: /* @__PURE__ */ jsx4(
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
        /* @__PURE__ */ jsx4(ComboboxPrimitive.ItemIndicator, { className: "col-start-1", children: /* @__PURE__ */ jsx4(
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
            children: /* @__PURE__ */ jsx4("path", { d: "M5.252 12.7 10.2 18.63 18.748 5.37" })
          }
        ) }),
        /* @__PURE__ */ jsx4("div", { className: "col-start-2", children })
      ]
    }
  );
}
function ComboboxEmpty({ className, ...props }) {
  return /* @__PURE__ */ jsx4(
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
function ComboboxList({ className, ...props }) {
  return /* @__PURE__ */ jsx4(ScrollArea, { scrollbarGutter: true, scrollFade: true, children: /* @__PURE__ */ jsx4(
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
function ComboboxClear({ className, ...props }) {
  return /* @__PURE__ */ jsx4(
    ComboboxPrimitive.Clear,
    {
      className,
      "data-slot": "combobox-clear",
      ...props
    }
  );
}
var useComboboxFilter = ComboboxPrimitive.useFilter;

// src/components/ui/field.tsx
import { useMemo } from "react";

// src/components/ui/label.tsx
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
function Label({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "inline-flex items-center gap-2 text-base/4.5 sm:text-sm/4 font-medium text-foreground",
      className
    ),
    "data-slot": "label"
  };
  return useRender({
    defaultTagName: "label",
    props: mergeProps(defaultProps, props),
    render
  });
}

// src/components/ui/separator.tsx
import { Separator as SeparatorPrimitive } from "radix-ui";
import { jsx as jsx5 } from "react/jsx-runtime";

// src/components/ui/field.tsx
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
var fieldVariants = cva2(
  "group/field flex w-full gap-2 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
        horizontal: "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        responsive: "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  }
);
function Field({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx6(
    "div",
    {
      role: "group",
      "data-slot": "field",
      "data-orientation": orientation,
      className: cn(fieldVariants({ orientation }), className),
      ...props
    }
  );
}
function FieldLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx6(
    Label,
    {
      "data-slot": "field-label",
      className: cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className
      ),
      ...props
    }
  );
}
function FieldError({
  className,
  children,
  errors,
  ...props
}) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }
    if (!errors?.length) {
      return null;
    }
    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values()
    ];
    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }
    return /* @__PURE__ */ jsx6("ul", { className: "ml-4 flex list-disc flex-col gap-1", children: uniqueErrors.map(
      (error, index) => error?.message && /* @__PURE__ */ jsx6("li", { children: error.message }, index)
    ) });
  }, [children, errors]);
  if (!content) {
    return null;
  }
  return /* @__PURE__ */ jsx6(
    "div",
    {
      role: "alert",
      "data-slot": "field-error",
      className: cn("text-sm font-normal text-destructive", className),
      ...props,
      children: content
    }
  );
}

// src/components/ui/form.tsx
import { Form as FormPrimitive } from "@base-ui/react/form";
import { jsx as jsx7 } from "react/jsx-runtime";
function Form({ className, ...props }) {
  return /* @__PURE__ */ jsx7(
    FormPrimitive,
    {
      className: cn("flex w-full flex-col gap-4", className),
      "data-slot": "form",
      ...props
    }
  );
}

// src/components/p-combobox-11.tsx
import { jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
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
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedItem = formData.get("item");
    const itemValue = items.find((item) => item.label === selectedItem)?.value || selectedItem;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    alert(`Favorite item: ${itemValue || ""}`);
  };
  return /* @__PURE__ */ jsxs4(Form, { className: "max-w-64", onSubmit, children: [
    /* @__PURE__ */ jsxs4(Field, { name: "item", children: [
      /* @__PURE__ */ jsx8(FieldLabel, { children: "Favorite item" }),
      /* @__PURE__ */ jsxs4(Combobox, { disabled: loading, items, required: true, children: [
        /* @__PURE__ */ jsx8(ComboboxInput, { placeholder: "Select an item..." }),
        /* @__PURE__ */ jsxs4(ComboboxPopup, { children: [
          /* @__PURE__ */ jsx8(ComboboxEmpty, { children: "No results found." }),
          /* @__PURE__ */ jsx8(ComboboxList, { children: (item) => /* @__PURE__ */ jsx8(ComboboxItem, { value: item, children: item.label }, item.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsx8(FieldError, { children: "Please select a item." })
    ] }),
    /* @__PURE__ */ jsx8(Button, { disabled: loading, type: "submit", children: "Submit" })
  ] });
}
export {
  Particle as default
};
