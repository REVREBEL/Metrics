// src/components/ui/slider.tsx
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import * as React from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/slider.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Slider({
  className,
  children,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const _values = React.useMemo(() => {
    if (value !== void 0) {
      return Array.isArray(value) ? value : [value];
    }
    if (defaultValue !== void 0) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [min];
  }, [value, defaultValue, min]);
  return /* @__PURE__ */ jsxs(
    SliderPrimitive.Root,
    {
      className: cn("data-[orientation=horizontal]:w-full", className),
      defaultValue,
      max,
      min,
      thumbAlignment: "edge",
      value,
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(
          SliderPrimitive.Control,
          {
            className: "flex touch-none select-none data-disabled:pointer-events-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:min-w-44 data-[orientation=vertical]:flex-col data-disabled:opacity-64",
            "data-slot": "slider-control",
            children: /* @__PURE__ */ jsxs(
              SliderPrimitive.Track,
              {
                className: "relative grow select-none before:absolute before:rounded-full before:bg-input data-[orientation=horizontal]:h-1 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1 data-[orientation=horizontal]:before:inset-x-0.5 data-[orientation=vertical]:before:inset-x-0 data-[orientation=horizontal]:before:inset-y-0 data-[orientation=vertical]:before:inset-y-0.5",
                "data-slot": "slider-track",
                children: [
                  /* @__PURE__ */ jsx(
                    SliderPrimitive.Indicator,
                    {
                      className: "select-none rounded-full bg-primary data-[orientation=horizontal]:ms-0.5 data-[orientation=vertical]:mb-0.5",
                      "data-slot": "slider-indicator"
                    }
                  ),
                  Array.from({ length: _values.length }, (_, index) => /* @__PURE__ */ jsx(
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

// src/components/p-slider-1.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Particle() {
  return /* @__PURE__ */ jsx2(Slider, { defaultValue: 50 });
}
export {
  Particle as default
};
