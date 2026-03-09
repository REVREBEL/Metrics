"use client";

// src/components/ui/label.tsx
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/label.tsx
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

// src/components/ui/switch.tsx
import { Switch as SwitchPrimitive } from "radix-ui";
import { jsx } from "react/jsx-runtime";
function Switch({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SwitchPrimitive.Root,
    {
      "data-slot": "switch",
      "data-size": size,
      className: cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        SwitchPrimitive.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}

// src/components/edit-switch.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function EditSwitch({ defaultEditing, onCheckedChange }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 pb-4", children: [
    /* @__PURE__ */ jsx2(
      Switch,
      {
        id: "edit-mode",
        defaultChecked: defaultEditing,
        onCheckedChange
      }
    ),
    /* @__PURE__ */ jsx2(Label, { htmlFor: "edit-mode", children: "Edit Layout" })
  ] });
}
export {
  EditSwitch
};
