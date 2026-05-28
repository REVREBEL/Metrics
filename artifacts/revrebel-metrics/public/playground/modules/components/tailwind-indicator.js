// src/components/tailwind-indicator.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var SHOW = true;
function TailwindIndicator({
  forceMount = false
}) {
  if (!SHOW && !forceMount) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-tailwind-indicator": "",
      className: "fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white",
      children: [
        /* @__PURE__ */ jsx("div", { className: "block sm:hidden", children: "xs" }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:block md:hidden", children: "sm" }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:block lg:hidden", children: "md" }),
        /* @__PURE__ */ jsx("div", { className: "hidden lg:block xl:hidden", children: "lg" }),
        /* @__PURE__ */ jsx("div", { className: "hidden xl:block 2xl:hidden", children: "xl" }),
        /* @__PURE__ */ jsx("div", { className: "hidden 2xl:block", children: "2xl" })
      ]
    }
  );
}
export {
  TailwindIndicator
};
