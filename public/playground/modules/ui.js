// src/components/ui/accordion.tsx
import { Accordion as AccordionPrimitive } from "radix-ui";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// node_modules/.pnpm/@hugeicons+react@1.1.5_react@19.2.3/node_modules/@hugeicons/react/dist/esm/HugeiconsIcon.js
import { forwardRef, createElement } from "react";
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none"
};
var HugeiconsIcon = forwardRef(({ color = "currentColor", size = 24, strokeWidth, absoluteStrokeWidth = false, className = "", altIcon, showAlt = false, icon, primaryColor, secondaryColor, disableSecondaryOpacity = false, ...rest }, ref) => {
  const calculatedStrokeWidth = strokeWidth !== void 0 ? absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth : void 0;
  const strokeProps = calculatedStrokeWidth !== void 0 ? {
    strokeWidth: calculatedStrokeWidth,
    stroke: "currentColor"
  } : {};
  const elementProps = {
    ref,
    ...defaultAttributes,
    width: size,
    height: size,
    color: primaryColor || color,
    className,
    ...strokeProps,
    ...rest
  };
  const currentIcon = showAlt && altIcon ? altIcon : icon;
  const svgChildren = [...currentIcon].sort(([, a], [, b]) => {
    const hasOpacityA = a.opacity !== void 0;
    const hasOpacityB = b.opacity !== void 0;
    return hasOpacityB ? 1 : hasOpacityA ? -1 : 0;
  }).map(([tag, attrs]) => {
    const isSecondaryPath = attrs.opacity !== void 0;
    const pathOpacity = isSecondaryPath && !disableSecondaryOpacity ? attrs.opacity : void 0;
    const fillProps = secondaryColor ? {
      ...attrs.stroke !== void 0 ? {
        stroke: isSecondaryPath ? secondaryColor : primaryColor || color
      } : {
        fill: isSecondaryPath ? secondaryColor : primaryColor || color
      }
    } : {};
    return createElement(tag, {
      ...attrs,
      ...strokeProps,
      ...fillProps,
      opacity: pathOpacity,
      key: attrs.key
    });
  });
  return createElement("svg", elementProps, svgChildren);
});
HugeiconsIcon.displayName = "HugeiconsIcon";

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/Alert02Icon.js
var Alert02Icon = [
  ["path", { d: "M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 9V13.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M12 16.9922V17.0022", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.8", key: "2" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowDown01Icon.js
var ArrowDown01Icon = [
  ["path", { d: "M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowLeft01Icon.js
var ArrowLeft01Icon = [
  ["path", { d: "M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowRight01Icon.js
var ArrowRight01Icon = [
  ["path", { d: "M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowUp01Icon.js
var ArrowUp01Icon = [
  ["path", { d: "M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/Building02Icon.js
var Building02Icon = [
  ["path", { d: "M15 2H9C5.69067 2 5 2.69067 5 6V22H19V6C19 2.69067 18.3093 2 15 2Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M3 22H21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M15 22V19C15 17.3453 14.6547 17 13 17H11C9.34533 17 9 17.3453 9 19V22", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M13.5 6H10.5M13.5 9.5H10.5M13.5 13H10.5", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "3" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/Cancel01Icon.js
var Cancel01Icon = [
  ["path", { d: "M18 6L6.00081 17.9992M17.9992 18L6 6.00085", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/CheckmarkCircle02Icon.js
var CheckmarkCircle02Icon = [
  ["path", { d: "M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M8 12.5L10.5 15L16 9", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/CreditCardIcon.js
var CreditCardIcon = [
  ["path", { d: "M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M10 16H11.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M14.5 16L18 16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M2 9H22", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/Delete01Icon.js
var Delete01Icon = [
  ["path", { d: "M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/Edit02Icon.js
var Edit02Icon = [
  ["path", { d: "M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M13 4L20 11", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M14 22L22 22", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/InformationCircleIcon.js
var InformationCircleIcon = [
  ["circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 16V11.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M12 8.01172V8.00172", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.8", key: "2" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/Loading03Icon.js
var Loading03Icon = [
  ["path", { d: "M12 3V6", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 18V21", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M21 12L18 12", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M6 12L3 12", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M18.3635 5.63672L16.2422 7.75804", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "4" }],
  ["path", { d: "M7.75804 16.2422L5.63672 18.3635", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "5" }],
  ["path", { d: "M18.3635 18.3635L16.2422 16.2422", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "6" }],
  ["path", { d: "M7.75804 7.75804L5.63672 5.63672", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "7" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/Logout01Icon.js
var Logout01Icon = [
  ["path", { d: "M15.5 8.04045C15.4588 6.87972 15.3216 6.15451 14.8645 5.58671C14.2114 4.77536 13.0944 4.52064 10.8605 4.01121L9.85915 3.78286C6.4649 3.00882 4.76777 2.6218 3.63388 3.51317C2.5 4.40454 2.5 6.1257 2.5 9.56803V14.432C2.5 17.8743 2.5 19.5955 3.63388 20.4868C4.76777 21.3782 6.4649 20.9912 9.85915 20.2171L10.8605 19.9888C13.0944 19.4794 14.2114 19.2246 14.8645 18.4133C15.3216 17.8455 15.4588 17.1203 15.5 15.9595", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M18.5 9.01172C18.5 9.01172 21.5 11.2212 21.5 12.0117C21.5 12.8023 18.5 15.0117 18.5 15.0117M21 12.0117H8.49998", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/MinusSignIcon.js
var MinusSignIcon = [
  ["path", { d: "M20 12L4 12", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/MoreHorizontalCircle01Icon.js
var MoreHorizontalCircle01Icon = [
  ["path", { d: "M21 12C21 11.1716 20.3284 10.5 19.5 10.5C18.6716 10.5 18 11.1716 18 12C18 12.8284 18.6716 13.5 19.5 13.5C20.3284 13.5 21 12.8284 21 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5C12.8284 13.5 13.5 12.8284 13.5 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M6 12C6 11.1716 5.32843 10.5 4.5 10.5C3.67157 10.5 3 11.1716 3 12C3 12.8284 3.67157 13.5 4.5 13.5C5.32843 13.5 6 12.8284 6 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "2" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/MoreHorizontalIcon.js
var MoreHorizontalIcon = [
  ["path", { d: "M12.0045 11.5C12.5568 11.5 13.0045 11.9477 13.0045 12.5C13.0045 13.0523 12.5568 13.5 12.0045 13.5C11.4522 13.5 11.0045 13.0523 11.0045 12.5C11.0045 11.9477 11.4522 11.5 12.0045 11.5Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M18.0045 11.5C18.5568 11.5 19.0045 11.9477 19.0045 12.5C19.0045 13.0523 18.5568 13.5 18.0045 13.5C17.4522 13.5 17.0045 13.0523 17.0045 12.5C17.0045 11.9477 17.4522 11.5 18.0045 11.5Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M6.00449 11.5C6.55677 11.5 7.00449 11.9477 7.00449 12.5C7.00449 13.0523 6.55677 13.5 6.00449 13.5C5.4522 13.5 5.00449 13.0523 5.00449 12.5C5.00449 11.9477 5.4522 11.5 6.00449 11.5Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/MultiplicationSignCircleIcon.js
var MultiplicationSignCircleIcon = [
  ["path", { d: "M15.5 8.5L12 12M12 12L8.5 15.5M12 12L15.5 15.5M12 12L8.5 8.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "1.5", key: "1" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/Search01Icon.js
var Search01Icon = [
  ["path", { d: "M17 17L21 21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/Settings01Icon.js
var Settings01Icon = [
  ["path", { d: "M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "1" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/Share01Icon.js
var Share01Icon = [
  ["path", { d: "M9.39584 4.5H8.35417C5.40789 4.5 3.93475 4.5 3.01946 5.37868C2.10417 6.25736 2.10417 7.67157 2.10417 10.5V14.5C2.10417 17.3284 2.10417 18.7426 3.01946 19.6213C3.93475 20.5 5.40789 20.5 8.35417 20.5H12.5608C15.5071 20.5 16.9802 20.5 17.8955 19.6213C18.4885 19.052 18.6973 18.2579 18.7708 17", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M16.1667 7V3.85355C16.1667 3.65829 16.3316 3.5 16.535 3.5C16.6326 3.5 16.7263 3.53725 16.7954 3.60355L21.5275 8.14645C21.7634 8.37282 21.8958 8.67986 21.8958 9C21.8958 9.32014 21.7634 9.62718 21.5275 9.85355L16.7954 14.3964C16.7263 14.4628 16.6326 14.5 16.535 14.5C16.3316 14.5 16.1667 14.3417 16.1667 14.1464V11H13.1157C8.875 11 7.3125 14.5 7.3125 14.5V12C7.3125 9.23858 9.64435 7 12.5208 7H16.1667Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/SidebarLeftIcon.js
var SidebarLeftIcon = [
  ["path", { d: "M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M9.5 3L9.5 21", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M5 7H6M5 10H6", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/Tick02Icon.js
var Tick02Icon = [
  ["path", { d: "M5 14L8.5 17.5L19 6.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/UnfoldMoreIcon.js
var UnfoldMoreIcon = [
  ["path", { d: "M10.3483 10H13.6517C15.6822 10 16.6974 10 16.9501 9.39139C17.2028 8.78277 16.4849 8.06648 15.0491 6.63391L13.3974 4.9859L13.3974 4.9859C12.7387 4.32863 12.4093 4 12 4C11.5907 4 11.2613 4.32864 10.6026 4.9859L8.95091 6.63391L8.95091 6.63391C7.51513 8.06649 6.79724 8.78277 7.0499 9.39139C7.30256 10 8.31781 10 10.3483 10Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M10.3483 14H13.6517C15.6822 14 16.6974 14 16.9501 14.6086C17.2028 15.2172 16.4849 15.9335 15.0491 17.3661L13.3974 19.0141C12.7387 19.6714 12.4093 20 12 20C11.5907 20 11.2613 19.6714 10.6026 19.0141L8.95091 17.3661C7.51513 15.9335 6.79724 15.2172 7.0499 14.6086C7.30256 14 8.31781 14 10.3483 14Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/UserIcon.js
var UserIcon = [
  ["path", { d: "M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];

// node_modules/.pnpm/@hugeicons+core-free-icons@4.0.0/node_modules/@hugeicons/core-free-icons/dist/esm/Wallet01Icon.js
var Wallet01Icon = [
  ["path", { d: "M14 3H5C3.89543 3 3 3.89543 3 5C3 6.10457 3.89543 7 5 7H18C18 6.07003 18 5.60504 17.8978 5.22354C17.6204 4.18827 16.8117 3.37962 15.7765 3.10222C15.395 3 14.93 3 14 3Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M3 5V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15V13C21 10.1716 21 8.75736 20.1213 7.87868C19.2426 7 17.8284 7 15 7H7", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M21 12H19C18.535 12 18.3025 12 18.1118 12.0511C17.5941 12.1898 17.1898 12.5941 17.0511 13.1118C17 13.3025 17 13.535 17 14C17 14.465 17 14.6975 17.0511 14.8882C17.1898 15.4059 17.5941 15.8102 18.1118 15.9489C18.3025 16 18.535 16 19 16H21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];

// src/components/ui/accordion.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Accordion({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Root,
    {
      "data-slot": "accordion",
      className: cn("flex w-full flex-col", className),
      ...props
    }
  );
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Item,
    {
      "data-slot": "accordion-item",
      className: cn("not-last:border-b", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
    AccordionPrimitive.Trigger,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(HugeiconsIcon, { icon: ArrowDown01Icon, strokeWidth: 2, "data-slot": "accordion-trigger-icon", className: "pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" }),
        /* @__PURE__ */ jsx(HugeiconsIcon, { icon: ArrowUp01Icon, strokeWidth: 2, "data-slot": "accordion-trigger-icon", className: "pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Content,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up",
      ...props,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "h-(--radix-accordion-content-height) pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
            className
          ),
          children
        }
      )
    }
  );
}

// src/components/ui/alert-dialog.tsx
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

// src/components/ui/button.tsx
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import { jsx as jsx2 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx2(
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

// src/components/ui/alert-dialog.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsx3(AlertDialogPrimitive.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx3(AlertDialogPrimitive.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx3(AlertDialogPrimitive.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    AlertDialogPrimitive.Overlay,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxs2(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx3(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx3(
      AlertDialogPrimitive.Content,
      {
        "data-slot": "alert-dialog-content",
        "data-size": size,
        className: cn(
          "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-background p-4 ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      ),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogMedia({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    "div",
    {
      "data-slot": "alert-dialog-media",
      className: cn(
        "mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    AlertDialogPrimitive.Title,
    {
      "data-slot": "alert-dialog-title",
      className: cn(
        "text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      ),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    AlertDialogPrimitive.Description,
    {
      "data-slot": "alert-dialog-description",
      className: cn(
        "text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      ),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx3(Button, { variant, size, asChild: true, children: /* @__PURE__ */ jsx3(
    AlertDialogPrimitive.Action,
    {
      "data-slot": "alert-dialog-action",
      className: cn(className),
      ...props
    }
  ) });
}
function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx3(Button, { variant, size, asChild: true, children: /* @__PURE__ */ jsx3(
    AlertDialogPrimitive.Cancel,
    {
      "data-slot": "alert-dialog-cancel",
      className: cn(className),
      ...props
    }
  ) });
}

// src/components/ui/alert.tsx
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx4 } from "react/jsx-runtime";
var alertVariants = cva2(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    }
  );
}
function AlertTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      "data-slot": "alert-title",
      className: cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      ),
      ...props
    }
  );
}
function AlertDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      "data-slot": "alert-description",
      className: cn(
        "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className
      ),
      ...props
    }
  );
}
function AlertAction({ className, ...props }) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      "data-slot": "alert-action",
      className: cn("absolute top-2 right-2", className),
      ...props
    }
  );
}

// src/components/ui/aspect-ratio.tsx
import { AspectRatio as AspectRatioPrimitive } from "radix-ui";
import { jsx as jsx5 } from "react/jsx-runtime";
function AspectRatio({
  ...props
}) {
  return /* @__PURE__ */ jsx5(AspectRatioPrimitive.Root, { "data-slot": "aspect-ratio", ...props });
}

// src/components/ui/avatar.tsx
import { Avatar as AvatarPrimitive } from "radix-ui";
import { jsx as jsx6 } from "react/jsx-runtime";
function Avatar({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx6(
    AvatarPrimitive.Root,
    {
      "data-slot": "avatar",
      "data-size": size,
      className: cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx6(
    AvatarPrimitive.Image,
    {
      "data-slot": "avatar-image",
      className: cn(
        "aspect-square size-full rounded-full object-cover",
        className
      ),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx6(
    AvatarPrimitive.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className
      ),
      ...props
    }
  );
}
function AvatarBadge({ className, ...props }) {
  return /* @__PURE__ */ jsx6(
    "span",
    {
      "data-slot": "avatar-badge",
      className: cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      ),
      ...props
    }
  );
}
function AvatarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx6(
    "div",
    {
      "data-slot": "avatar-group",
      className: cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      ),
      ...props
    }
  );
}
function AvatarGroupCount({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx6(
    "div",
    {
      "data-slot": "avatar-group-count",
      className: cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/badge.tsx
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva as cva3 } from "class-variance-authority";
var badgeVariants = cva3(
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

// src/components/ui/breadcrumb.tsx
import { mergeProps as mergeProps2 } from "@base-ui/react/merge-props";
import { useRender as useRender2 } from "@base-ui/react/use-render";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
function Breadcrumb({ ...props }) {
  return /* @__PURE__ */ jsx7("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...props });
}
function BreadcrumbList({ className, ...props }) {
  return /* @__PURE__ */ jsx7(
    "ol",
    {
      className: cn(
        "wrap-break-word flex flex-wrap items-center gap-1.5 text-muted-foreground text-sm sm:gap-2.5",
        className
      ),
      "data-slot": "breadcrumb-list",
      ...props
    }
  );
}
function BreadcrumbItem({ className, ...props }) {
  return /* @__PURE__ */ jsx7(
    "li",
    {
      className: cn("inline-flex items-center gap-1.5", className),
      "data-slot": "breadcrumb-item",
      ...props
    }
  );
}
function BreadcrumbLink({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn("transition-colors hover:text-foreground", className),
    "data-slot": "breadcrumb-link"
  };
  return useRender2({
    defaultTagName: "a",
    props: mergeProps2(defaultProps, props),
    render
  });
}
function BreadcrumbPage({ className, ...props }) {
  return (
    // biome-ignore lint(a11y/useFocusableInteractive): known
    /* @__PURE__ */ jsx7(
      "span",
      {
        "aria-current": "page",
        "aria-disabled": "true",
        className: cn("font-normal text-foreground", className),
        "data-slot": "breadcrumb-page",
        role: "link",
        ...props
      }
    )
  );
}
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx7(
    "li",
    {
      "aria-hidden": "true",
      className: cn("opacity-80 [&>svg]:size-4", className),
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      ...props,
      children: children ?? /* @__PURE__ */ jsx7(ChevronRight, {})
    }
  );
}
function BreadcrumbEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs3(
    "span",
    {
      "aria-hidden": "true",
      className,
      "data-slot": "breadcrumb-ellipsis",
      role: "presentation",
      ...props,
      children: [
        /* @__PURE__ */ jsx7(MoreHorizontal, { className: "size-4" }),
        /* @__PURE__ */ jsx7("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}

// src/components/ui/button-default.tsx
import { jsx as jsx8 } from "react/jsx-runtime";

// src/components/ui/button-destructive.tsx
import { jsx as jsx9 } from "react/jsx-runtime";

// src/components/ui/button-ghost.tsx
import { jsx as jsx10 } from "react/jsx-runtime";

// src/components/ui/button-group.tsx
import { cva as cva4 } from "class-variance-authority";
import { Slot as Slot2 } from "radix-ui";

// src/components/ui/separator.tsx
import { Separator as SeparatorPrimitive } from "radix-ui";
import { jsx as jsx11 } from "react/jsx-runtime";
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx11(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/button-group.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var buttonGroupVariants = cva4(
  "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal: "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg!",
        vertical: "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg!"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
function ButtonGroup({
  className,
  orientation,
  ...props
}) {
  return /* @__PURE__ */ jsx12(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": orientation,
      className: cn(buttonGroupVariants({ orientation }), className),
      ...props
    }
  );
}
function ButtonGroupText({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot2.Root : "div";
  return /* @__PURE__ */ jsx12(
    Comp,
    {
      className: cn(
        "flex items-center gap-2 rounded-lg border bg-muted px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/dropdown-menu.tsx
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { jsx as jsx13, jsxs as jsxs4 } from "react/jsx-runtime";
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx13(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx13(DropdownMenuPrimitive.Portal, { "data-slot": "dropdown-menu-portal", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx13(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx13(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx13(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      align,
      className: cn("z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:overflow-hidden data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
      ...props
    }
  ) });
}
function DropdownMenuGroup({
  ...props
}) {
  return /* @__PURE__ */ jsx13(DropdownMenuPrimitive.Group, { "data-slot": "dropdown-menu-group", ...props });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx13(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsxs4(
    DropdownMenuPrimitive.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": inset,
      className: cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ jsx13(
          "span",
          {
            className: "pointer-events-none absolute right-2 flex items-center justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ jsx13(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx13(HugeiconsIcon, { icon: Tick02Icon, strokeWidth: 2 }) })
          }
        ),
        children
      ]
    }
  );
}
function DropdownMenuRadioGroup({
  ...props
}) {
  return /* @__PURE__ */ jsx13(
    DropdownMenuPrimitive.RadioGroup,
    {
      "data-slot": "dropdown-menu-radio-group",
      ...props
    }
  );
}
function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsxs4(
    DropdownMenuPrimitive.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": inset,
      className: cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx13(
          "span",
          {
            className: "pointer-events-none absolute right-2 flex items-center justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ jsx13(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx13(HugeiconsIcon, { icon: Tick02Icon, strokeWidth: 2 }) })
          }
        ),
        children
      ]
    }
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx13(
    DropdownMenuPrimitive.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx13(
    DropdownMenuPrimitive.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...props
    }
  );
}
function DropdownMenuShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx13(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSub({
  ...props
}) {
  return /* @__PURE__ */ jsx13(DropdownMenuPrimitive.Sub, { "data-slot": "dropdown-menu-sub", ...props });
}
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs4(
    DropdownMenuPrimitive.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": inset,
      className: cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx13(HugeiconsIcon, { icon: ArrowRight01Icon, strokeWidth: 2, className: "ml-auto" })
      ]
    }
  );
}
function DropdownMenuSubContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx13(
    DropdownMenuPrimitive.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: cn("z-50 min-w-[96px] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
      ...props
    }
  );
}

// src/components/ui/button-group-dropdown.tsx
import { jsx as jsx14, jsxs as jsxs5 } from "react/jsx-runtime";

// src/components/ui/button-group-input-group.tsx
import * as React2 from "react";

// src/components/ui/input-group.tsx
import { cva as cva5 } from "class-variance-authority";

// src/components/ui/input.tsx
import { jsx as jsx15 } from "react/jsx-runtime";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx15(
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

// src/components/ui/textarea.tsx
import { jsx as jsx16 } from "react/jsx-runtime";
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx16(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/input-group.tsx
import { jsx as jsx17 } from "react/jsx-runtime";
function InputGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx17(
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
var inputGroupAddonVariants = cva5(
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
  return /* @__PURE__ */ jsx17(
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
var inputGroupButtonVariants = cva5(
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
function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}) {
  return /* @__PURE__ */ jsx17(
    Button,
    {
      type,
      "data-size": size,
      variant,
      className: cn(inputGroupButtonVariants({ size }), className),
      ...props
    }
  );
}
function InputGroupText({ className, ...props }) {
  return /* @__PURE__ */ jsx17(
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
function InputGroupInput({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx17(
    Input,
    {
      "data-slot": "input-group-control",
      className: cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      ),
      ...props
    }
  );
}
function InputGroupTextarea({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx17(
    Textarea,
    {
      "data-slot": "input-group-control",
      className: cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/tooltip.tsx
import * as React from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { jsx as jsx18 } from "react/jsx-runtime";
var TooltipCreateHandle = TooltipPrimitive.createHandle;
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
function TooltipTrigger({
  asChild = false,
  children,
  ...props
}) {
  if (asChild && React.isValidElement(children)) {
    return /* @__PURE__ */ jsx18(
      TooltipPrimitive.Trigger,
      {
        "data-slot": "tooltip-trigger",
        render: children,
        ...props
      }
    );
  }
  return /* @__PURE__ */ jsx18(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props, children });
}
function TooltipPopup({
  className,
  align = "center",
  sideOffset = 4,
  side = "top",
  anchor,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx18(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx18(
    TooltipPrimitive.Positioner,
    {
      align,
      anchor,
      className: "z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] data-instant:transition-none",
      "data-slot": "tooltip-positioner",
      side,
      sideOffset,
      children: /* @__PURE__ */ jsx18(
        TooltipPrimitive.Popup,
        {
          className: cn(
            "relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) text-balance rounded-md border bg-popover not-dark:bg-clip-padding text-popover-foreground text-xs shadow-md/5 transition-[width,height,scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 data-instant:duration-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className
          ),
          "data-slot": "tooltip-popup",
          ...props,
          children: /* @__PURE__ */ jsx18(
            TooltipPrimitive.Viewport,
            {
              className: "relative size-full overflow-clip px-(--viewport-inline-padding) py-1 [--viewport-inline-padding:--spacing(2)] data-instant:transition-none **:data-current:data-ending-style:opacity-0 **:data-current:data-starting-style:opacity-0 **:data-previous:data-ending-style:opacity-0 **:data-previous:data-starting-style:opacity-0 **:data-current:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:truncate **:data-current:opacity-100 **:data-previous:opacity-100 **:data-current:transition-opacity **:data-previous:transition-opacity",
              "data-slot": "tooltip-viewport",
              children
            }
          )
        }
      )
    }
  ) });
}

// src/components/ui/button-group-input-group.tsx
import { AudioLinesIcon, PlusIcon } from "lucide-react";
import { jsx as jsx19, jsxs as jsxs6 } from "react/jsx-runtime";

// src/components/ui/button-group-input.tsx
import { SearchIcon } from "lucide-react";
import { jsx as jsx20, jsxs as jsxs7 } from "react/jsx-runtime";

// src/components/ui/button-group-nested.tsx
import { AudioLinesIcon as AudioLinesIcon2, PlusIcon as PlusIcon2 } from "lucide-react";
import { jsx as jsx21, jsxs as jsxs8 } from "react/jsx-runtime";
function ButtonGroupNested() {
  return /* @__PURE__ */ jsxs8(ButtonGroup, { children: [
    /* @__PURE__ */ jsx21(ButtonGroup, { children: /* @__PURE__ */ jsx21(Button, { variant: "outline", size: "icon", children: /* @__PURE__ */ jsx21(PlusIcon2, {}) }) }),
    /* @__PURE__ */ jsx21(ButtonGroup, { children: /* @__PURE__ */ jsxs8(InputGroup, { children: [
      /* @__PURE__ */ jsx21(InputGroupInput, { placeholder: "Send a message..." }),
      /* @__PURE__ */ jsxs8(Tooltip, { children: [
        /* @__PURE__ */ jsx21(TooltipTrigger, { render: /* @__PURE__ */ jsx21(InputGroupAddon, { align: "inline-end" }), children: /* @__PURE__ */ jsx21(AudioLinesIcon2, {}) }),
        /* @__PURE__ */ jsx21(TooltipPopup, { children: "Voice Mode" })
      ] })
    ] }) })
  ] });
}

// src/components/ui/button-group-orientation.tsx
import { MinusIcon, PlusIcon as PlusIcon3 } from "lucide-react";
import { jsx as jsx22, jsxs as jsxs9 } from "react/jsx-runtime";

// src/components/ui/field.tsx
import { useMemo } from "react";

// src/components/ui/label.tsx
import { mergeProps as mergeProps3 } from "@base-ui/react/merge-props";
import { useRender as useRender3 } from "@base-ui/react/use-render";
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
  return useRender3({
    defaultTagName: "label",
    props: mergeProps3(defaultProps, props),
    render
  });
}

// src/components/ui/field.tsx
import { cva as cva6 } from "class-variance-authority";
import { jsx as jsx23, jsxs as jsxs10 } from "react/jsx-runtime";
function FieldSet({ className, ...props }) {
  return /* @__PURE__ */ jsx23(
    "fieldset",
    {
      "data-slot": "field-set",
      className: cn(
        "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      ),
      ...props
    }
  );
}
function FieldLegend({
  className,
  variant = "legend",
  ...props
}) {
  return /* @__PURE__ */ jsx23(
    "legend",
    {
      "data-slot": "field-legend",
      "data-variant": variant,
      className: cn(
        "mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className
      ),
      ...props
    }
  );
}
function FieldGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx23(
    "div",
    {
      "data-slot": "field-group",
      className: cn(
        "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className
      ),
      ...props
    }
  );
}
var fieldVariants = cva6(
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
  return /* @__PURE__ */ jsx23(
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
function FieldContent({ className, ...props }) {
  return /* @__PURE__ */ jsx23(
    "div",
    {
      "data-slot": "field-content",
      className: cn(
        "group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
        className
      ),
      ...props
    }
  );
}
function FieldLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx23(
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
function FieldTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx23(
    "div",
    {
      "data-slot": "field-label",
      className: cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
        className
      ),
      ...props
    }
  );
}
function FieldDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx23(
    "p",
    {
      "data-slot": "field-description",
      className: cn(
        "text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
        "last:mt-0 nth-last-2:-mt-1",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      ),
      ...props
    }
  );
}
function FieldSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs10(
    "div",
    {
      "data-slot": "field-separator",
      "data-content": !!children,
      className: cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx23(Separator, { className: "absolute inset-0 top-1/2" }),
        children && /* @__PURE__ */ jsx23(
          "span",
          {
            className: "relative mx-auto block w-fit bg-background px-2 text-muted-foreground",
            "data-slot": "field-separator-content",
            children
          }
        )
      ]
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
    return /* @__PURE__ */ jsx23("ul", { className: "ml-4 flex list-disc flex-col gap-1", children: uniqueErrors.map(
      (error, index) => error?.message && /* @__PURE__ */ jsx23("li", { children: error.message }, index)
    ) });
  }, [children, errors]);
  if (!content) {
    return null;
  }
  return /* @__PURE__ */ jsx23(
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

// src/components/ui/popover.tsx
import * as React3 from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { jsx as jsx24 } from "react/jsx-runtime";
var PopoverCreateHandle = PopoverPrimitive.createHandle;
var Popover = PopoverPrimitive.Root;
function PopoverTrigger({ className, children, asChild = false, ...props }) {
  if (asChild && React3.isValidElement(children)) {
    return /* @__PURE__ */ jsx24(
      PopoverPrimitive.Trigger,
      {
        className,
        "data-slot": "popover-trigger",
        nativeButton: false,
        render: children,
        ...props
      }
    );
  }
  return /* @__PURE__ */ jsx24(
    PopoverPrimitive.Trigger,
    {
      className,
      "data-slot": "popover-trigger",
      ...props,
      children
    }
  );
}
function PopoverPopup({
  children,
  className,
  side = "bottom",
  align = "center",
  sideOffset = 4,
  alignOffset = 0,
  tooltipStyle = false,
  anchor,
  ...props
}) {
  return /* @__PURE__ */ jsx24(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx24(
    PopoverPrimitive.Positioner,
    {
      align,
      alignOffset,
      anchor,
      className: "z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] data-instant:transition-none",
      "data-slot": "popover-positioner",
      side,
      sideOffset,
      children: /* @__PURE__ */ jsx24(
        PopoverPrimitive.Popup,
        {
          className: cn("relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-[width,height,scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] has-data-[slot=calendar]:rounded-xl has-data-[slot=calendar]:before:rounded-[calc(var(--radius-xl)-1px)] data-starting-style:scale-98 data-starting-style:opacity-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]", tooltipStyle && "w-fit text-balance rounded-md text-xs shadow-md/5 before:rounded-[calc(var(--radius-md)-1px)]", className),
          "data-slot": "popover-popup",
          ...props,
          children: /* @__PURE__ */ jsx24(
            PopoverPrimitive.Viewport,
            {
              className: cn("relative size-full max-h-(--available-height) overflow-clip px-(--viewport-inline-padding) py-4 [--viewport-inline-padding:--spacing(4)] has-data-[slot=calendar]:p-2 data-instant:transition-none **:data-current:data-ending-style:opacity-0 **:data-current:data-starting-style:opacity-0 **:data-previous:data-ending-style:opacity-0 **:data-previous:data-starting-style:opacity-0 **:data-current:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-current:opacity-100 **:data-previous:opacity-100 **:data-current:transition-opacity **:data-previous:transition-opacity", tooltipStyle ? "py-1 [--viewport-inline-padding:--spacing(2)]" : "not-data-transitioning:overflow-y-auto"),
              "data-slot": "popover-viewport",
              children
            }
          )
        }
      )
    }
  ) });
}
function PopoverClose({ ...props }) {
  return /* @__PURE__ */ jsx24(
    PopoverPrimitive.Close,
    {
      "data-slot": "popover-close",
      ...props
    }
  );
}
function PopoverHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx24(
    "div",
    {
      "data-slot": "popover-header",
      className: cn("flex flex-col gap-0.5 text-sm", className),
      ...props
    }
  );
}
function PopoverTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx24(
    PopoverPrimitive.Title,
    {
      className: cn("font-semibold text-lg leading-none", className),
      "data-slot": "popover-title",
      ...props
    }
  );
}
function PopoverDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx24(
    PopoverPrimitive.Description,
    {
      className: cn("text-muted-foreground text-sm", className),
      "data-slot": "popover-description",
      ...props
    }
  );
}

// src/components/ui/button-group-popover.tsx
import { BotIcon, ChevronDownIcon } from "lucide-react";
import { jsx as jsx25, jsxs as jsxs11 } from "react/jsx-runtime";

// src/components/ui/button-group-select.tsx
import * as React4 from "react";

// src/components/ui/select.tsx
import { Select as SelectPrimitive } from "radix-ui";
import { jsx as jsx26, jsxs as jsxs12 } from "react/jsx-runtime";
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx26(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx26(
    SelectPrimitive.Group,
    {
      "data-slot": "select-group",
      className: cn("scroll-my-1 p-1", className),
      ...props
    }
  );
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx26(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs12(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx26(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx26(HugeiconsIcon, { icon: UnfoldMoreIcon, strokeWidth: 2, className: "pointer-events-none size-4 text-muted-foreground" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}) {
  return /* @__PURE__ */ jsx26(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs12(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      "data-align-trigger": position === "item-aligned",
      className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-36 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
      position,
      align,
      ...props,
      children: [
        /* @__PURE__ */ jsx26(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx26(
          SelectPrimitive.Viewport,
          {
            "data-position": position,
            className: cn(
              "data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)",
              position === "popper" && ""
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx26(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx26(
    SelectPrimitive.Label,
    {
      "data-slot": "select-label",
      className: cn("px-1.5 py-1 text-xs text-muted-foreground", className),
      ...props
    }
  );
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs12(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx26("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx26(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx26(HugeiconsIcon, { icon: Tick02Icon, strokeWidth: 2, className: "pointer-events-none" }) }) }),
        /* @__PURE__ */ jsx26(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx26(
    SelectPrimitive.Separator,
    {
      "data-slot": "select-separator",
      className: cn("pointer-events-none -mx-1 my-1 h-px bg-border", className),
      ...props
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx26(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx26(HugeiconsIcon, { icon: ArrowUp01Icon, strokeWidth: 2 })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx26(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx26(HugeiconsIcon, { icon: ArrowDown01Icon, strokeWidth: 2 })
    }
  );
}

// src/components/ui/button-group-select.tsx
import { jsx as jsx27, jsxs as jsxs13 } from "react/jsx-runtime";

// src/components/ui/button-group-separator.tsx
import { jsx as jsx28, jsxs as jsxs14 } from "react/jsx-runtime";

// src/components/ui/button-group-size.tsx
import { PlusIcon as PlusIcon4 } from "lucide-react";
import { jsx as jsx29, jsxs as jsxs15 } from "react/jsx-runtime";

// src/components/ui/button-group-split.tsx
import { IconPlus } from "@tabler/icons-react";
import { jsx as jsx30, jsxs as jsxs16 } from "react/jsx-runtime";

// src/components/ui/button-icon.tsx
import { CircleFadingArrowUpIcon } from "lucide-react";
import { jsx as jsx31 } from "react/jsx-runtime";

// src/components/ui/button-link.tsx
import { jsx as jsx32 } from "react/jsx-runtime";

// src/components/ui/button-outline.tsx
import { jsx as jsx33 } from "react/jsx-runtime";

// src/components/ui/button-render.tsx
import { jsx as jsx34 } from "react/jsx-runtime";

// src/components/ui/button-rounded.tsx
import { ArrowUpIcon } from "lucide-react";
import { jsx as jsx35, jsxs as jsxs17 } from "react/jsx-runtime";

// src/components/ui/button-secondary.tsx
import { jsx as jsx36 } from "react/jsx-runtime";

// src/components/ui/button-size.tsx
import { ArrowUpRightIcon } from "lucide-react";
import { jsx as jsx37, jsxs as jsxs18 } from "react/jsx-runtime";

// src/components/ui/spinner.tsx
import { Loader2Icon } from "lucide-react";
import { jsx as jsx38 } from "react/jsx-runtime";
function Spinner({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx38(
    Loader2Icon,
    {
      "aria-label": "Loading",
      className: cn("animate-spin", className),
      role: "status",
      ...props
    }
  );
}

// src/components/ui/button-spinner.tsx
import { jsx as jsx39, jsxs as jsxs19 } from "react/jsx-runtime";

// src/components/ui/button-with-icon.tsx
import { IconGitBranch, IconGitFork } from "@tabler/icons-react";
import { jsx as jsx40, jsxs as jsxs20 } from "react/jsx-runtime";

// src/components/ui/calendar.tsx
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import { jsx as jsx41 } from "react/jsx-runtime";
var buttonClassNames = "relative flex size-(--cell-size) text-base sm:text-sm items-center justify-center rounded-lg text-foreground not-in-data-selected:hover:bg-accent disabled:pointer-events-none disabled:opacity-64 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0";
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  mode = "single",
  ...props
}) {
  const defaultClassNames = {
    button_next: buttonClassNames,
    button_previous: buttonClassNames,
    caption_label: "text-base sm:text-sm font-medium flex items-center gap-2 h-full",
    day: "size-(--cell-size) text-sm py-px",
    day_button: cn(
      buttonClassNames,
      "in-[[data-selected]:not(.range-middle)]:transition-[color,background-color,border-radius,box-shadow] in-data-disabled:pointer-events-none focus-visible:z-1 in-data-selected:bg-primary in-data-selected:text-primary-foreground in-data-disabled:text-muted-foreground/70 in-data-disabled:line-through in-data-outside:text-muted-foreground/70 in-data-selected:in-data-outside:text-primary-foreground outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] in-[.range-start:not(.range-end)]:rounded-e-none in-[.range-end:not(.range-start)]:rounded-s-none in-[.range-middle]:rounded-none in-[.range-middle]:in-data-selected:bg-accent in-[.range-middle]:in-data-selected:text-foreground"
    ),
    dropdown: "absolute bg-popover inset-0 opacity-0",
    dropdown_root: "relative has-focus:border-ring has-focus:ring-ring/50 has-focus:ring-[3px] border border-input shadow-xs/5 rounded-lg px-[calc(--spacing(3)-1px)] h-9 sm:h-8 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-me-1",
    dropdowns: "w-full flex items-center text-base sm:text-sm justify-center h-(--cell-size) gap-1.5 *:[span]:font-medium",
    hidden: "invisible",
    month: "w-full",
    month_caption: "relative mx-(--cell-size) px-1 mb-1 flex h-(--cell-size) items-center justify-center z-2",
    months: "relative flex flex-col sm:flex-row gap-2",
    nav: "absolute top-0 flex w-full justify-between z-1",
    outside: "text-muted-foreground data-selected:bg-accent/50 data-selected:text-muted-foreground",
    range_end: "range-end",
    range_middle: "range-middle",
    range_start: "range-start",
    today: "*:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-1 *:after:size-[3px] *:after:-translate-x-1/2 *:after:rounded-full *:after:bg-primary [&[data-selected]:not(.range-middle)>*]:after:bg-background [&[data-disabled]>*]:after:bg-foreground/30 *:after:transition-colors",
    week_number: "size-(--cell-size) p-0 text-xs font-medium text-muted-foreground/70",
    weekday: "size-(--cell-size) p-0 text-xs font-medium text-muted-foreground/70"
  };
  const mergedClassNames = Object.keys(
    defaultClassNames
  ).reduce(
    (acc, key) => {
      const userClass = classNames?.[key];
      const baseClass = defaultClassNames[key];
      acc[key] = userClass ? cn(baseClass, userClass) : baseClass;
      return acc;
    },
    { ...defaultClassNames }
  );
  const defaultComponents = {
    Chevron: ({
      className: className2,
      orientation,
      ...props2
    }) => {
      if (orientation === "left") {
        return /* @__PURE__ */ jsx41(
          ChevronLeftIcon,
          {
            className: cn(className2, "rtl:rotate-180"),
            ...props2,
            "aria-hidden": "true"
          }
        );
      }
      if (orientation === "right") {
        return /* @__PURE__ */ jsx41(
          ChevronRightIcon,
          {
            className: cn(className2, "rtl:rotate-180"),
            ...props2,
            "aria-hidden": "true"
          }
        );
      }
      return /* @__PURE__ */ jsx41(
        ChevronsUpDownIcon,
        {
          className: className2,
          ...props2,
          "aria-hidden": "true"
        }
      );
    }
  };
  const mergedComponents = {
    ...defaultComponents,
    ...userComponents
  };
  const dayPickerProps = {
    className: cn(
      "w-fit [--cell-size:--spacing(10)] sm:[--cell-size:--spacing(9)]",
      className
    ),
    classNames: mergedClassNames,
    components: mergedComponents,
    "data-slot": "calendar",
    formatters: {
      formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" })
    },
    mode,
    showOutsideDays,
    ...props
  };
  return /* @__PURE__ */ jsx41(
    DayPicker,
    {
      ...dayPickerProps
    }
  );
}

// src/components/ui/card.tsx
import { jsx as jsx42 } from "react/jsx-runtime";
function Card({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx42(
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
  return /* @__PURE__ */ jsx42(
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
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx42(
    "div",
    {
      "data-slot": "card-title",
      className: cn(
        "text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      ),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx42(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}
function CardAction({ className, ...props }) {
  return /* @__PURE__ */ jsx42(
    "div",
    {
      "data-slot": "card-action",
      className: cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx42(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-4 group-data-[size=sm]/card:px-3", className),
      ...props
    }
  );
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx42(
    "div",
    {
      "data-slot": "card-footer",
      className: cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/carousel.tsx
import * as React5 from "react";
import useEmblaCarousel from "embla-carousel-react";
import { jsx as jsx43, jsxs as jsxs21 } from "react/jsx-runtime";
var CarouselContext = React5.createContext(null);
function useCarousel() {
  const context = React5.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React5.useState(false);
  const [canScrollNext, setCanScrollNext] = React5.useState(false);
  const onSelect = React5.useCallback((api2) => {
    if (!api2) return;
    setCanScrollPrev(api2.canScrollPrev());
    setCanScrollNext(api2.canScrollNext());
  }, []);
  const scrollPrev = React5.useCallback(() => {
    api?.scrollPrev();
  }, [api]);
  const scrollNext = React5.useCallback(() => {
    api?.scrollNext();
  }, [api]);
  const handleKeyDown = React5.useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );
  React5.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);
  React5.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);
  return /* @__PURE__ */ jsx43(
    CarouselContext.Provider,
    {
      value: {
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      },
      children: /* @__PURE__ */ jsx43(
        "div",
        {
          onKeyDownCapture: handleKeyDown,
          className: cn("relative", className),
          role: "region",
          "aria-roledescription": "carousel",
          "data-slot": "carousel",
          ...props,
          children
        }
      )
    }
  );
}
function CarouselContent({ className, ...props }) {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsx43(
    "div",
    {
      ref: carouselRef,
      className: "overflow-hidden",
      "data-slot": "carousel-content",
      children: /* @__PURE__ */ jsx43(
        "div",
        {
          className: cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className
          ),
          ...props
        }
      )
    }
  );
}
function CarouselItem({ className, ...props }) {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsx43(
    "div",
    {
      role: "group",
      "aria-roledescription": "slide",
      "data-slot": "carousel-item",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
}
function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsxs21(
    Button,
    {
      "data-slot": "carousel-previous",
      variant,
      size,
      className: cn(
        "absolute touch-manipulation rounded-full",
        orientation === "horizontal" ? "top-1/2 -left-12 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      ...props,
      children: [
        /* @__PURE__ */ jsx43(HugeiconsIcon, { icon: ArrowLeft01Icon, strokeWidth: 2 }),
        /* @__PURE__ */ jsx43("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
}
function CarouselNext({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return /* @__PURE__ */ jsxs21(
    Button,
    {
      "data-slot": "carousel-next",
      variant,
      size,
      className: cn(
        "absolute touch-manipulation rounded-full",
        orientation === "horizontal" ? "top-1/2 -right-12 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollNext,
      onClick: scrollNext,
      ...props,
      children: [
        /* @__PURE__ */ jsx43(HugeiconsIcon, { icon: ArrowRight01Icon, strokeWidth: 2 }),
        /* @__PURE__ */ jsx43("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
}

// src/components/ui/chart.tsx
import * as React6 from "react";
import * as RechartsPrimitive from "recharts";
import { Fragment, jsx as jsx44, jsxs as jsxs22 } from "react/jsx-runtime";
var THEMES = { light: "", dark: ".dark" };
var ChartContext = React6.createContext(null);
function useChart() {
  const context = React6.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}) {
  const uniqueId = React6.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsx44(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxs22(
    "div",
    {
      "data-slot": "chart",
      "data-chart": chartId,
      className: cn(
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx44(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsx44(RechartsPrimitive.ResponsiveContainer, { children })
      ]
    }
  ) });
}
var ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config2]) => config2.theme || config2.color
  );
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsx44(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            const color = itemConfig.theme?.[theme] || itemConfig.color;
            return color ? `  --color-${key}: ${color};` : null;
          }).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
var ChartTooltip = RechartsPrimitive.Tooltip;
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}) {
  const { config } = useChart();
  const tooltipLabel = React6.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }
    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label;
    if (labelFormatter) {
      return /* @__PURE__ */ jsx44("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
    }
    if (!value) {
      return null;
    }
    return /* @__PURE__ */ jsx44("div", { className: cn("font-medium", labelClassName), children: value });
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey
  ]);
  if (!active || !payload?.length) {
    return null;
  }
  const nestLabel = payload.length === 1 && indicator !== "dot";
  return /* @__PURE__ */ jsxs22(
    "div",
    {
      className: cn(
        "grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      ),
      children: [
        !nestLabel ? tooltipLabel : null,
        /* @__PURE__ */ jsx44("div", { className: "grid gap-1.5", children: payload.filter((item) => item.type !== "none").map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;
          return /* @__PURE__ */ jsx44(
            "div",
            {
              className: cn(
                "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                indicator === "dot" && "items-center"
              ),
              children: formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxs22(Fragment, { children: [
                itemConfig?.icon ? /* @__PURE__ */ jsx44(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx44(
                  "div",
                  {
                    className: cn(
                      "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5": indicator === "dot",
                        "w-1": indicator === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                        "my-0.5": nestLabel && indicator === "dashed"
                      }
                    ),
                    style: {
                      "--color-bg": indicatorColor,
                      "--color-border": indicatorColor
                    }
                  }
                ),
                /* @__PURE__ */ jsxs22(
                  "div",
                  {
                    className: cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ jsxs22("div", { className: "grid gap-1.5", children: [
                        nestLabel ? tooltipLabel : null,
                        /* @__PURE__ */ jsx44("span", { className: "text-muted-foreground", children: itemConfig?.label || item.name })
                      ] }),
                      item.value && /* @__PURE__ */ jsx44("span", { className: "font-mono font-medium text-foreground tabular-nums", children: item.value.toLocaleString() })
                    ]
                  }
                )
              ] })
            },
            item.dataKey
          );
        }) })
      ]
    }
  );
}
var ChartLegend = RechartsPrimitive.Legend;
function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey
}) {
  const { config } = useChart();
  if (!payload?.length) {
    return null;
  }
  return /* @__PURE__ */ jsx44(
    "div",
    {
      className: cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      ),
      children: payload.filter((item) => item.type !== "none").map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        return /* @__PURE__ */ jsxs22(
          "div",
          {
            className: cn(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            ),
            children: [
              itemConfig?.icon && !hideIcon ? /* @__PURE__ */ jsx44(itemConfig.icon, {}) : /* @__PURE__ */ jsx44(
                "div",
                {
                  className: "h-2 w-2 shrink-0 rounded-[2px]",
                  style: {
                    backgroundColor: item.color
                  }
                }
              ),
              itemConfig?.label
            ]
          },
          item.value
        );
      })
    }
  );
}
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}

// src/components/ui/checkbox.tsx
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { jsx as jsx45 } from "react/jsx-runtime";
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx45(
    CheckboxPrimitive.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx45(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none [&>svg]:size-3.5",
          children: /* @__PURE__ */ jsx45(HugeiconsIcon, { icon: Tick02Icon, strokeWidth: 2 })
        }
      )
    }
  );
}

// src/components/ui/collapsible.tsx
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { jsx as jsx46 } from "react/jsx-runtime";
function Collapsible({
  ...props
}) {
  return /* @__PURE__ */ jsx46(CollapsiblePrimitive.Root, { "data-slot": "collapsible", ...props });
}
function CollapsibleTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx46(
    CollapsiblePrimitive.CollapsibleTrigger,
    {
      "data-slot": "collapsible-trigger",
      ...props
    }
  );
}
function CollapsibleContent({
  ...props
}) {
  return /* @__PURE__ */ jsx46(
    CollapsiblePrimitive.CollapsibleContent,
    {
      "data-slot": "collapsible-content",
      ...props
    }
  );
}

// src/components/ui/combobox.tsx
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { ChevronsUpDownIcon as ChevronsUpDownIcon2, XIcon } from "lucide-react";
import * as React7 from "react";

// src/components/ui/scroll-area.tsx
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import { jsx as jsx47, jsxs as jsxs23 } from "react/jsx-runtime";
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs23(
    ScrollAreaPrimitive.Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx47(
          ScrollAreaPrimitive.Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsx47(ScrollBar, {}),
        /* @__PURE__ */ jsx47(ScrollAreaPrimitive.Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx47(
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
      children: /* @__PURE__ */ jsx47(
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
import { jsx as jsx48, jsxs as jsxs24 } from "react/jsx-runtime";
var ComboboxContext = React7.createContext({
  chipsRef: null,
  multiple: false
});
function Combobox(props) {
  const chipsRef = React7.useRef(null);
  return /* @__PURE__ */ jsx48(ComboboxContext.Provider, { value: { chipsRef, multiple: !!props.multiple }, children: /* @__PURE__ */ jsx48(ComboboxPrimitive.Root, { ...props }) });
}
function ComboboxChipsInput({
  className,
  size,
  ...props
}) {
  const sizeValue = size ?? "default";
  return /* @__PURE__ */ jsx48(
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
  return /* @__PURE__ */ jsxs24("div", { className: "relative not-has-[>*.w-full]:w-fit w-full text-foreground has-disabled:opacity-64", children: [
    startAddon && /* @__PURE__ */ jsx48(
      "div",
      {
        "aria-hidden": "true",
        className: "[&_svg]:-mx-0.5 pointer-events-none absolute inset-y-0 start-px z-10 flex items-center ps-[calc(--spacing(3)-1px)] opacity-80 has-[+[data-size=sm]]:ps-[calc(--spacing(2.5)-1px)] [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4",
        "data-slot": "combobox-start-addon",
        children: startAddon
      }
    ),
    /* @__PURE__ */ jsx48(
      ComboboxPrimitive.Input,
      {
        className: cn(
          startAddon && "data-[size=sm]:*:data-[slot=combobox-input]:ps-[calc(--spacing(7.5)-1px)] *:data-[slot=combobox-input]:ps-[calc(--spacing(8.5)-1px)] sm:data-[size=sm]:*:data-[slot=combobox-input]:ps-[calc(--spacing(7)-1px)] sm:*:data-[slot=combobox-input]:ps-[calc(--spacing(8)-1px)]",
          sizeValue === "sm" ? "has-[+[data-slot=combobox-trigger],+[data-slot=combobox-clear]]:*:data-[slot=combobox-input]:pe-6.5" : "has-[+[data-slot=combobox-trigger],+[data-slot=combobox-clear]]:*:data-[slot=combobox-input]:pe-7",
          className
        ),
        "data-slot": "combobox-input",
        render: /* @__PURE__ */ jsx48(
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
    showTrigger && /* @__PURE__ */ jsx48(
      ComboboxTrigger,
      {
        className: cn(
          "-translate-y-1/2 absolute top-1/2 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-opacity pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 has-[+[data-slot=combobox-clear]]:hidden sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
          sizeValue === "sm" ? "end-0" : "end-0.5"
        ),
        ...triggerProps,
        children: /* @__PURE__ */ jsx48(ComboboxPrimitive.Icon, { "data-slot": "combobox-icon", children: /* @__PURE__ */ jsx48(ChevronsUpDownIcon2, {}) })
      }
    ),
    showClear && /* @__PURE__ */ jsx48(
      ComboboxClear,
      {
        className: cn(
          "-translate-y-1/2 absolute top-1/2 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-opacity pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 has-[+[data-slot=combobox-clear]]:hidden sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
          sizeValue === "sm" ? "end-0" : "end-0.5"
        ),
        ...clearProps,
        children: /* @__PURE__ */ jsx48(XIcon, {})
      }
    )
  ] });
}
function ComboboxTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx48(
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
  const { chipsRef } = React7.useContext(ComboboxContext);
  const anchor = anchorProp ?? chipsRef;
  return /* @__PURE__ */ jsx48(ComboboxPrimitive.Portal, { children: /* @__PURE__ */ jsx48(
    ComboboxPrimitive.Positioner,
    {
      align,
      alignOffset,
      anchor,
      className: "z-50 select-none",
      "data-slot": "combobox-positioner",
      side,
      sideOffset,
      children: /* @__PURE__ */ jsx48(
        "span",
        {
          className: cn(
            "relative flex max-h-full min-w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className
          ),
          children: /* @__PURE__ */ jsx48(
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
  return /* @__PURE__ */ jsxs24(
    ComboboxPrimitive.Item,
    {
      className: cn(
        "grid min-h-8 in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      "data-slot": "combobox-item",
      ...props,
      children: [
        /* @__PURE__ */ jsx48(ComboboxPrimitive.ItemIndicator, { className: "col-start-1", children: /* @__PURE__ */ jsx48(
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
            children: /* @__PURE__ */ jsx48("path", { d: "M5.252 12.7 10.2 18.63 18.748 5.37" })
          }
        ) }),
        /* @__PURE__ */ jsx48("div", { className: "col-start-2", children })
      ]
    }
  );
}
function ComboboxSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx48(
    ComboboxPrimitive.Separator,
    {
      className: cn("mx-2 my-1 h-px bg-border last:hidden", className),
      "data-slot": "combobox-separator",
      ...props
    }
  );
}
function ComboboxGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx48(
    ComboboxPrimitive.Group,
    {
      className: cn("[[role=group]+&]:mt-1.5", className),
      "data-slot": "combobox-group",
      ...props
    }
  );
}
function ComboboxGroupLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx48(
    ComboboxPrimitive.GroupLabel,
    {
      className: cn(
        "px-2 py-1.5 font-medium text-muted-foreground text-xs",
        className
      ),
      "data-slot": "combobox-group-label",
      ...props
    }
  );
}
function ComboboxEmpty({ className, ...props }) {
  return /* @__PURE__ */ jsx48(
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
function ComboboxRow({ className, ...props }) {
  return /* @__PURE__ */ jsx48(
    ComboboxPrimitive.Row,
    {
      className,
      "data-slot": "combobox-row",
      ...props
    }
  );
}
function ComboboxValue({ ...props }) {
  return /* @__PURE__ */ jsx48(ComboboxPrimitive.Value, { "data-slot": "combobox-value", ...props });
}
function ComboboxList({ className, ...props }) {
  return /* @__PURE__ */ jsx48(ScrollArea, { scrollbarGutter: true, scrollFade: true, children: /* @__PURE__ */ jsx48(
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
  return /* @__PURE__ */ jsx48(
    ComboboxPrimitive.Clear,
    {
      className,
      "data-slot": "combobox-clear",
      ...props
    }
  );
}
function ComboboxStatus({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx48(
    ComboboxPrimitive.Status,
    {
      className: cn(
        "px-3 py-2 font-medium text-muted-foreground text-xs empty:m-0 empty:p-0",
        className
      ),
      "data-slot": "combobox-status",
      ...props
    }
  );
}
function ComboboxCollection(props) {
  return /* @__PURE__ */ jsx48(ComboboxPrimitive.Collection, { "data-slot": "combobox-collection", ...props });
}
function ComboboxChips({
  className,
  children,
  startAddon,
  ...props
}) {
  const { chipsRef } = React7.useContext(ComboboxContext);
  return /* @__PURE__ */ jsxs24(
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
        startAddon && /* @__PURE__ */ jsx48(
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
  return /* @__PURE__ */ jsxs24(
    ComboboxPrimitive.Chip,
    {
      className: "flex items-center rounded-[calc(var(--radius-md)-1px)] bg-accent ps-2 font-medium text-accent-foreground text-sm outline-none sm:text-xs/(--text-xs--line-height) [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
      "data-slot": "combobox-chip",
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx48(ComboboxChipRemove, { ...removeProps })
      ]
    }
  );
}
function ComboboxChipRemove(props) {
  return /* @__PURE__ */ jsx48(
    ComboboxPrimitive.ChipRemove,
    {
      "aria-label": "Remove",
      className: "h-full shrink-0 cursor-pointer px-1.5 opacity-80 hover:opacity-100 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
      "data-slot": "combobox-chip-remove",
      ...props,
      children: /* @__PURE__ */ jsx48(XIcon, {})
    }
  );
}
var useComboboxFilter = ComboboxPrimitive.useFilter;

// src/components/ui/command.tsx
import { Command as CommandPrimitive } from "cmdk";

// src/components/ui/dialog.tsx
import { Dialog as DialogPrimitive } from "radix-ui";
import { jsx as jsx49, jsxs as jsxs25 } from "react/jsx-runtime";
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx49(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx49(DialogPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx49(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogClose({
  ...props
}) {
  return /* @__PURE__ */ jsx49(DialogPrimitive.Close, { "data-slot": "dialog-close", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx49(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs25(DialogPortal, { children: [
    /* @__PURE__ */ jsx49(DialogOverlay, {}),
    /* @__PURE__ */ jsxs25(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-background p-4 text-sm ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsx49(DialogPrimitive.Close, { "data-slot": "dialog-close", asChild: true, children: /* @__PURE__ */ jsxs25(
            Button,
            {
              variant: "ghost",
              className: "absolute top-2 right-2",
              size: "icon-sm",
              children: [
                /* @__PURE__ */ jsx49(HugeiconsIcon, { icon: Cancel01Icon, strokeWidth: 2 }),
                /* @__PURE__ */ jsx49("span", { className: "sr-only", children: "Close" })
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx49(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs25(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      ),
      ...props,
      children: [
        children,
        showCloseButton && /* @__PURE__ */ jsx49(DialogPrimitive.Close, { asChild: true, children: /* @__PURE__ */ jsx49(Button, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx49(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-base leading-none font-medium", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx49(
    DialogPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/command.tsx
import { jsx as jsx50, jsxs as jsxs26 } from "react/jsx-runtime";
function Command({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx50(
    CommandPrimitive,
    {
      "data-slot": "command",
      className: cn(
        "flex size-full flex-col overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground",
        className
      ),
      ...props
    }
  );
}
function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}) {
  return /* @__PURE__ */ jsxs26(Dialog, { ...props, children: [
    /* @__PURE__ */ jsxs26(DialogHeader, { className: "sr-only", children: [
      /* @__PURE__ */ jsx50(DialogTitle, { children: title }),
      /* @__PURE__ */ jsx50(DialogDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsx50(
      DialogContent,
      {
        className: cn(
          "top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0",
          className
        ),
        showCloseButton,
        children
      }
    )
  ] });
}
function CommandInput({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx50("div", { "data-slot": "command-input-wrapper", className: "p-1 pb-0", children: /* @__PURE__ */ jsxs26(InputGroup, { className: "h-8! rounded-lg! border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:pl-2!", children: [
    /* @__PURE__ */ jsx50(
      CommandPrimitive.Input,
      {
        "data-slot": "command-input",
        className: cn(
          "w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ...props
      }
    ),
    /* @__PURE__ */ jsx50(InputGroupAddon, { children: /* @__PURE__ */ jsx50(HugeiconsIcon, { icon: Search01Icon, strokeWidth: 2, className: "size-4 shrink-0 opacity-50" }) })
  ] }) });
}
function CommandList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx50(
    CommandPrimitive.List,
    {
      "data-slot": "command-list",
      className: cn(
        "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none",
        className
      ),
      ...props
    }
  );
}
function CommandEmpty({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx50(
    CommandPrimitive.Empty,
    {
      "data-slot": "command-empty",
      className: cn("py-6 text-center text-sm", className),
      ...props
    }
  );
}
function CommandGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx50(
    CommandPrimitive.Group,
    {
      "data-slot": "command-group",
      className: cn(
        "overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground",
        className
      ),
      ...props
    }
  );
}
function CommandSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx50(
    CommandPrimitive.Separator,
    {
      "data-slot": "command-separator",
      className: cn("-mx-1 h-px bg-border", className),
      ...props
    }
  );
}
function CommandItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs26(
    CommandPrimitive.Item,
    {
      "data-slot": "command-item",
      className: cn(
        "group/command-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-selected:*:[svg]:text-foreground",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx50(HugeiconsIcon, { icon: Tick02Icon, strokeWidth: 2, className: "ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function CommandShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx50(
    "span",
    {
      "data-slot": "command-shortcut",
      className: cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/context-menu.tsx
import { ContextMenu as ContextMenuPrimitive } from "radix-ui";
import { jsx as jsx51, jsxs as jsxs27 } from "react/jsx-runtime";
function ContextMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx51(ContextMenuPrimitive.Root, { "data-slot": "context-menu", ...props });
}
function ContextMenuTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx51(
    ContextMenuPrimitive.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: cn("select-none", className),
      ...props
    }
  );
}
function ContextMenuGroup({
  ...props
}) {
  return /* @__PURE__ */ jsx51(ContextMenuPrimitive.Group, { "data-slot": "context-menu-group", ...props });
}
function ContextMenuPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx51(ContextMenuPrimitive.Portal, { "data-slot": "context-menu-portal", ...props });
}
function ContextMenuSub({
  ...props
}) {
  return /* @__PURE__ */ jsx51(ContextMenuPrimitive.Sub, { "data-slot": "context-menu-sub", ...props });
}
function ContextMenuRadioGroup({
  ...props
}) {
  return /* @__PURE__ */ jsx51(
    ContextMenuPrimitive.RadioGroup,
    {
      "data-slot": "context-menu-radio-group",
      ...props
    }
  );
}
function ContextMenuContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx51(ContextMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx51(
    ContextMenuPrimitive.Content,
    {
      "data-slot": "context-menu-content",
      className: cn("z-50 max-h-(--radix-context-menu-content-available-height) min-w-36 origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
      ...props
    }
  ) });
}
function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx51(
    ContextMenuPrimitive.Item,
    {
      "data-slot": "context-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "group/context-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive",
        className
      ),
      ...props
    }
  );
}
function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs27(
    ContextMenuPrimitive.SubTrigger,
    {
      "data-slot": "context-menu-sub-trigger",
      "data-inset": inset,
      className: cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7 data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx51(HugeiconsIcon, { icon: ArrowRight01Icon, strokeWidth: 2, className: "ml-auto" })
      ]
    }
  );
}
function ContextMenuSubContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx51(
    ContextMenuPrimitive.SubContent,
    {
      "data-slot": "context-menu-sub-content",
      className: cn("z-50 min-w-32 origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
      ...props
    }
  );
}
function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsxs27(
    ContextMenuPrimitive.CheckboxItem,
    {
      "data-slot": "context-menu-checkbox-item",
      "data-inset": inset,
      className: cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ jsx51("span", { className: "pointer-events-none absolute right-2", children: /* @__PURE__ */ jsx51(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx51(HugeiconsIcon, { icon: Tick02Icon, strokeWidth: 2 }) }) }),
        children
      ]
    }
  );
}
function ContextMenuRadioItem({
  className,
  children,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsxs27(
    ContextMenuPrimitive.RadioItem,
    {
      "data-slot": "context-menu-radio-item",
      "data-inset": inset,
      className: cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx51("span", { className: "pointer-events-none absolute right-2", children: /* @__PURE__ */ jsx51(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx51(HugeiconsIcon, { icon: Tick02Icon, strokeWidth: 2 }) }) }),
        children
      ]
    }
  );
}
function ContextMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx51(
    ContextMenuPrimitive.Label,
    {
      "data-slot": "context-menu-label",
      "data-inset": inset,
      className: cn(
        "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
        className
      ),
      ...props
    }
  );
}
function ContextMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx51(
    ContextMenuPrimitive.Separator,
    {
      "data-slot": "context-menu-separator",
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...props
    }
  );
}
function ContextMenuShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx51(
    "span",
    {
      "data-slot": "context-menu-shortcut",
      className: cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/context-menu-item:text-accent-foreground",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/direction.tsx
import { Direction } from "radix-ui";
import { jsx as jsx52 } from "react/jsx-runtime";
function DirectionProvider({
  dir,
  direction,
  children
}) {
  return /* @__PURE__ */ jsx52(Direction.DirectionProvider, { dir: direction ?? dir, children });
}
var useDirection = Direction.useDirection;

// src/components/ui/drawer.tsx
import { Drawer as DrawerPrimitive } from "vaul";
import { jsx as jsx53, jsxs as jsxs28 } from "react/jsx-runtime";
function Drawer({
  ...props
}) {
  return /* @__PURE__ */ jsx53(DrawerPrimitive.Root, { "data-slot": "drawer", ...props });
}
function DrawerTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx53(DrawerPrimitive.Trigger, { "data-slot": "drawer-trigger", ...props });
}
function DrawerPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx53(DrawerPrimitive.Portal, { "data-slot": "drawer-portal", ...props });
}
function DrawerClose({
  ...props
}) {
  return /* @__PURE__ */ jsx53(DrawerPrimitive.Close, { "data-slot": "drawer-close", ...props });
}
function DrawerOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx53(
    DrawerPrimitive.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: cn(
        "fixed inset-0 z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      ),
      ...props
    }
  );
}
function DrawerContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs28(DrawerPortal, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ jsx53(DrawerOverlay, {}),
    /* @__PURE__ */ jsxs28(
      DrawerPrimitive.Content,
      {
        "data-slot": "drawer-content",
        className: cn(
          "group/drawer-content fixed z-50 flex h-auto flex-col bg-background text-sm data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-xl data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:rounded-r-xl data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:rounded-l-xl data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-xl data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=right]:sm:max-w-sm",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx53("div", { className: "mx-auto mt-4 hidden h-1 w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block" }),
          children
        ]
      }
    )
  ] });
}
function DrawerHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx53(
    "div",
    {
      "data-slot": "drawer-header",
      className: cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-0.5 md:text-left",
        className
      ),
      ...props
    }
  );
}
function DrawerFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx53(
    "div",
    {
      "data-slot": "drawer-footer",
      className: cn("mt-auto flex flex-col gap-2 p-4", className),
      ...props
    }
  );
}
function DrawerTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx53(
    DrawerPrimitive.Title,
    {
      "data-slot": "drawer-title",
      className: cn("text-base font-medium text-foreground", className),
      ...props
    }
  );
}
function DrawerDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx53(
    DrawerPrimitive.Description,
    {
      "data-slot": "drawer-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}

// src/components/ui/dropdown-menu-avatar.tsx
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon as CreditCardIcon2,
  LogOutIcon
} from "lucide-react";
import { jsx as jsx54, jsxs as jsxs29 } from "react/jsx-runtime";
function DropdownMenuAvatar() {
  return /* @__PURE__ */ jsxs29(DropdownMenu, { children: [
    /* @__PURE__ */ jsx54(
      DropdownMenuTrigger,
      {
        render: /* @__PURE__ */ jsx54(Button, { variant: "ghost", size: "icon", className: "rounded-full" }),
        children: /* @__PURE__ */ jsxs29(Avatar, { children: [
          /* @__PURE__ */ jsx54(AvatarImage, { src: "https://github.com/shadcn.png", alt: "shadcn" }),
          /* @__PURE__ */ jsx54(AvatarFallback, { children: "LR" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs29(DropdownMenuContent, { align: "end", children: [
      /* @__PURE__ */ jsxs29(DropdownMenuGroup, { children: [
        /* @__PURE__ */ jsxs29(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsx54(BadgeCheckIcon, {}),
          "Account"
        ] }),
        /* @__PURE__ */ jsxs29(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsx54(CreditCardIcon2, {}),
          "Billing"
        ] }),
        /* @__PURE__ */ jsxs29(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsx54(BellIcon, {}),
          "Notifications"
        ] })
      ] }),
      /* @__PURE__ */ jsx54(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxs29(DropdownMenuItem, { children: [
        /* @__PURE__ */ jsx54(LogOutIcon, {}),
        "Sign Out"
      ] })
    ] })
  ] });
}

// src/components/ui/dropdown-menu-basic.tsx
import { jsx as jsx55, jsxs as jsxs30 } from "react/jsx-runtime";
function DropdownMenuBasic() {
  return /* @__PURE__ */ jsxs30(DropdownMenu, { children: [
    /* @__PURE__ */ jsx55(DropdownMenuTrigger, { render: /* @__PURE__ */ jsx55(Button, { variant: "outline" }), children: "Open" }),
    /* @__PURE__ */ jsxs30(DropdownMenuContent, { children: [
      /* @__PURE__ */ jsxs30(DropdownMenuGroup, { children: [
        /* @__PURE__ */ jsx55(DropdownMenuLabel, { children: "My Account" }),
        /* @__PURE__ */ jsx55(DropdownMenuItem, { children: "Profile" }),
        /* @__PURE__ */ jsx55(DropdownMenuItem, { children: "Billing" }),
        /* @__PURE__ */ jsx55(DropdownMenuItem, { children: "Settings" })
      ] }),
      /* @__PURE__ */ jsx55(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsx55(DropdownMenuItem, { children: "GitHub" }),
      /* @__PURE__ */ jsx55(DropdownMenuItem, { children: "Support" }),
      /* @__PURE__ */ jsx55(DropdownMenuItem, { disabled: true, children: "API" })
    ] })
  ] });
}

// src/components/ui/dropdown-menu-checkboxes-icons.tsx
import * as React8 from "react";
import { BellIcon as BellIcon2, MailIcon, MessageSquareIcon } from "lucide-react";
import { jsx as jsx56, jsxs as jsxs31 } from "react/jsx-runtime";
function DropdownMenuCheckboxesIcons() {
  const [notifications, setNotifications] = React8.useState({
    email: true,
    sms: false,
    push: true
  });
  return /* @__PURE__ */ jsxs31(DropdownMenu, { children: [
    /* @__PURE__ */ jsx56(DropdownMenuTrigger, { render: /* @__PURE__ */ jsx56(Button, { variant: "outline" }), children: "Notifications" }),
    /* @__PURE__ */ jsx56(DropdownMenuContent, { className: "w-48", children: /* @__PURE__ */ jsxs31(DropdownMenuGroup, { children: [
      /* @__PURE__ */ jsx56(DropdownMenuLabel, { children: "Notification Preferences" }),
      /* @__PURE__ */ jsxs31(
        DropdownMenuCheckboxItem,
        {
          checked: notifications.email,
          onCheckedChange: (checked) => setNotifications({ ...notifications, email: checked === true }),
          children: [
            /* @__PURE__ */ jsx56(MailIcon, {}),
            "Email notifications"
          ]
        }
      ),
      /* @__PURE__ */ jsxs31(
        DropdownMenuCheckboxItem,
        {
          checked: notifications.sms,
          onCheckedChange: (checked) => setNotifications({ ...notifications, sms: checked === true }),
          children: [
            /* @__PURE__ */ jsx56(MessageSquareIcon, {}),
            "SMS notifications"
          ]
        }
      ),
      /* @__PURE__ */ jsxs31(
        DropdownMenuCheckboxItem,
        {
          checked: notifications.push,
          onCheckedChange: (checked) => setNotifications({ ...notifications, push: checked === true }),
          children: [
            /* @__PURE__ */ jsx56(BellIcon2, {}),
            "Push notifications"
          ]
        }
      )
    ] }) })
  ] });
}

// src/components/ui/dropdown-menu-checkboxes.tsx
import * as React9 from "react";
import { jsx as jsx57, jsxs as jsxs32 } from "react/jsx-runtime";
function DropdownMenuCheckboxes() {
  const [showStatusBar, setShowStatusBar] = React9.useState(true);
  const [showActivityBar, setShowActivityBar] = React9.useState(false);
  const [showPanel, setShowPanel] = React9.useState(false);
  return /* @__PURE__ */ jsxs32(DropdownMenu, { children: [
    /* @__PURE__ */ jsx57(DropdownMenuTrigger, { render: /* @__PURE__ */ jsx57(Button, { variant: "outline" }), children: "Open" }),
    /* @__PURE__ */ jsx57(DropdownMenuContent, { className: "w-40", children: /* @__PURE__ */ jsxs32(DropdownMenuGroup, { children: [
      /* @__PURE__ */ jsx57(DropdownMenuLabel, { children: "Appearance" }),
      /* @__PURE__ */ jsx57(
        DropdownMenuCheckboxItem,
        {
          checked: showStatusBar ?? false,
          onCheckedChange: setShowStatusBar,
          children: "Status Bar"
        }
      ),
      /* @__PURE__ */ jsx57(
        DropdownMenuCheckboxItem,
        {
          checked: showActivityBar,
          onCheckedChange: setShowActivityBar,
          disabled: true,
          children: "Activity Bar"
        }
      ),
      /* @__PURE__ */ jsx57(
        DropdownMenuCheckboxItem,
        {
          checked: showPanel,
          onCheckedChange: setShowPanel,
          children: "Panel"
        }
      )
    ] }) })
  ] });
}

// src/components/ui/dropdown-menu-destructive.tsx
import { jsx as jsx58, jsxs as jsxs33 } from "react/jsx-runtime";
function DropdownMenuDestructive() {
  return /* @__PURE__ */ jsxs33(DropdownMenu, { children: [
    /* @__PURE__ */ jsx58(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx58(Button, { variant: "outline", children: "Actions" }) }),
    /* @__PURE__ */ jsxs33(DropdownMenuContent, { children: [
      /* @__PURE__ */ jsxs33(DropdownMenuGroup, { children: [
        /* @__PURE__ */ jsxs33(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsx58(HugeiconsIcon, { icon: Edit02Icon }),
          "Edit"
        ] }),
        /* @__PURE__ */ jsxs33(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsx58(HugeiconsIcon, { icon: Share01Icon }),
          "Share"
        ] })
      ] }),
      /* @__PURE__ */ jsx58(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsx58(DropdownMenuGroup, { children: /* @__PURE__ */ jsxs33(DropdownMenuItem, { variant: "destructive", children: [
        /* @__PURE__ */ jsx58(HugeiconsIcon, { icon: Delete01Icon }),
        "Delete"
      ] }) })
    ] })
  ] });
}

// src/components/ui/dropdown-menu-icons.tsx
import { jsx as jsx59, jsxs as jsxs34 } from "react/jsx-runtime";
function DropdownMenuIcons() {
  return /* @__PURE__ */ jsxs34(DropdownMenu, { children: [
    /* @__PURE__ */ jsx59(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx59(Button, { variant: "outline", children: "Open" }) }),
    /* @__PURE__ */ jsxs34(DropdownMenuContent, { children: [
      /* @__PURE__ */ jsxs34(DropdownMenuItem, { children: [
        /* @__PURE__ */ jsx59(HugeiconsIcon, { icon: UserIcon }),
        "Profile"
      ] }),
      /* @__PURE__ */ jsxs34(DropdownMenuItem, { children: [
        /* @__PURE__ */ jsx59(HugeiconsIcon, { icon: CreditCardIcon }),
        "Billing"
      ] }),
      /* @__PURE__ */ jsxs34(DropdownMenuItem, { children: [
        /* @__PURE__ */ jsx59(HugeiconsIcon, { icon: Settings01Icon }),
        "Settings"
      ] }),
      /* @__PURE__ */ jsx59(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxs34(DropdownMenuItem, { variant: "destructive", children: [
        /* @__PURE__ */ jsx59(HugeiconsIcon, { icon: Logout01Icon }),
        "Log out"
      ] })
    ] })
  ] });
}

// src/components/ui/dropdown-menu-radio-group.tsx
import * as React10 from "react";
import { jsx as jsx60, jsxs as jsxs35 } from "react/jsx-runtime";
function DropdownMenuRadioGroupDemo() {
  const [position, setPosition] = React10.useState("bottom");
  return /* @__PURE__ */ jsxs35(DropdownMenu, { children: [
    /* @__PURE__ */ jsx60(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx60(Button, { variant: "outline", children: "Open" }) }),
    /* @__PURE__ */ jsx60(DropdownMenuContent, { className: "w-32", children: /* @__PURE__ */ jsxs35(DropdownMenuGroup, { children: [
      /* @__PURE__ */ jsx60(DropdownMenuLabel, { children: "Panel Position" }),
      /* @__PURE__ */ jsxs35(DropdownMenuRadioGroup, { value: position, onValueChange: setPosition, children: [
        /* @__PURE__ */ jsx60(DropdownMenuRadioItem, { value: "top", children: "Top" }),
        /* @__PURE__ */ jsx60(DropdownMenuRadioItem, { value: "bottom", children: "Bottom" }),
        /* @__PURE__ */ jsx60(DropdownMenuRadioItem, { value: "right", children: "Right" })
      ] })
    ] }) })
  ] });
}

// src/components/ui/dropdown-menu-radio-icons.tsx
import * as React11 from "react";
import { jsx as jsx61, jsxs as jsxs36 } from "react/jsx-runtime";
function DropdownMenuRadioIcons() {
  const [paymentMethod, setPaymentMethod] = React11.useState("card");
  return /* @__PURE__ */ jsxs36(DropdownMenu, { children: [
    /* @__PURE__ */ jsx61(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx61(Button, { variant: "outline", children: "Payment Method" }) }),
    /* @__PURE__ */ jsx61(DropdownMenuContent, { className: "min-w-56", children: /* @__PURE__ */ jsxs36(DropdownMenuGroup, { children: [
      /* @__PURE__ */ jsx61(DropdownMenuLabel, { children: "Select Payment Method" }),
      /* @__PURE__ */ jsxs36(
        DropdownMenuRadioGroup,
        {
          value: paymentMethod,
          onValueChange: setPaymentMethod,
          children: [
            /* @__PURE__ */ jsxs36(DropdownMenuRadioItem, { value: "card", children: [
              /* @__PURE__ */ jsx61(HugeiconsIcon, { icon: CreditCardIcon }),
              "Credit Card"
            ] }),
            /* @__PURE__ */ jsxs36(DropdownMenuRadioItem, { value: "paypal", children: [
              /* @__PURE__ */ jsx61(HugeiconsIcon, { icon: Wallet01Icon }),
              "PayPal"
            ] }),
            /* @__PURE__ */ jsxs36(DropdownMenuRadioItem, { value: "bank", children: [
              /* @__PURE__ */ jsx61(HugeiconsIcon, { icon: Building02Icon }),
              "Bank Transfer"
            ] })
          ]
        }
      )
    ] }) })
  ] });
}

// src/components/ui/dropdown-menu-shortcuts.tsx
import { jsx as jsx62, jsxs as jsxs37 } from "react/jsx-runtime";
function DropdownMenuShortcuts() {
  return /* @__PURE__ */ jsxs37(DropdownMenu, { children: [
    /* @__PURE__ */ jsx62(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx62(Button, { variant: "outline", children: "Open" }) }),
    /* @__PURE__ */ jsxs37(DropdownMenuContent, { children: [
      /* @__PURE__ */ jsxs37(DropdownMenuGroup, { children: [
        /* @__PURE__ */ jsx62(DropdownMenuLabel, { children: "My Account" }),
        /* @__PURE__ */ jsxs37(DropdownMenuItem, { children: [
          "Profile",
          /* @__PURE__ */ jsx62(DropdownMenuShortcut, { children: "\u21E7\u2318P" })
        ] }),
        /* @__PURE__ */ jsxs37(DropdownMenuItem, { children: [
          "Billing",
          /* @__PURE__ */ jsx62(DropdownMenuShortcut, { children: "\u2318B" })
        ] }),
        /* @__PURE__ */ jsxs37(DropdownMenuItem, { children: [
          "Settings",
          /* @__PURE__ */ jsx62(DropdownMenuShortcut, { children: "\u2318S" })
        ] })
      ] }),
      /* @__PURE__ */ jsx62(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxs37(DropdownMenuItem, { children: [
        "Log out",
        /* @__PURE__ */ jsx62(DropdownMenuShortcut, { children: "\u21E7\u2318Q" })
      ] })
    ] })
  ] });
}

// src/components/ui/dropdown-menu-submenu.tsx
import { jsx as jsx63, jsxs as jsxs38 } from "react/jsx-runtime";
function DropdownMenuSubmenu() {
  return /* @__PURE__ */ jsxs38(DropdownMenu, { children: [
    /* @__PURE__ */ jsx63(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx63(Button, { variant: "outline", children: "Open" }) }),
    /* @__PURE__ */ jsx63(DropdownMenuContent, { children: /* @__PURE__ */ jsxs38(DropdownMenuGroup, { children: [
      /* @__PURE__ */ jsx63(DropdownMenuItem, { children: "Team" }),
      /* @__PURE__ */ jsxs38(DropdownMenuSub, { children: [
        /* @__PURE__ */ jsx63(DropdownMenuSubTrigger, { children: "Invite users" }),
        /* @__PURE__ */ jsx63(DropdownMenuPortal, { children: /* @__PURE__ */ jsxs38(DropdownMenuSubContent, { children: [
          /* @__PURE__ */ jsx63(DropdownMenuItem, { children: "Email" }),
          /* @__PURE__ */ jsx63(DropdownMenuItem, { children: "Message" }),
          /* @__PURE__ */ jsxs38(DropdownMenuSub, { children: [
            /* @__PURE__ */ jsx63(DropdownMenuSubTrigger, { children: "More options" }),
            /* @__PURE__ */ jsx63(DropdownMenuPortal, { children: /* @__PURE__ */ jsxs38(DropdownMenuSubContent, { children: [
              /* @__PURE__ */ jsx63(DropdownMenuItem, { children: "Calendly" }),
              /* @__PURE__ */ jsx63(DropdownMenuItem, { children: "Slack" }),
              /* @__PURE__ */ jsx63(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsx63(DropdownMenuItem, { children: "Webhook" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx63(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsx63(DropdownMenuItem, { children: "Advanced..." })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs38(DropdownMenuItem, { children: [
        "New Team",
        /* @__PURE__ */ jsx63(DropdownMenuShortcut, { children: "\u2318+T" })
      ] })
    ] }) })
  ] });
}

// src/components/ui/empty.tsx
import { cva as cva7 } from "class-variance-authority";
import { jsx as jsx64 } from "react/jsx-runtime";
function Empty({ className, ...props }) {
  return /* @__PURE__ */ jsx64(
    "div",
    {
      "data-slot": "empty",
      className: cn(
        "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed p-6 text-center text-balance",
        className
      ),
      ...props
    }
  );
}
function EmptyHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx64(
    "div",
    {
      "data-slot": "empty-header",
      className: cn("flex max-w-sm flex-col items-center gap-2", className),
      ...props
    }
  );
}
var emptyMediaVariants = cva7(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function EmptyMedia({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx64(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": variant,
      className: cn(emptyMediaVariants({ variant, className })),
      ...props
    }
  );
}
function EmptyTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx64(
    "div",
    {
      "data-slot": "empty-title",
      className: cn("text-sm font-medium tracking-tight", className),
      ...props
    }
  );
}
function EmptyDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx64(
    "div",
    {
      "data-slot": "empty-description",
      className: cn(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      ),
      ...props
    }
  );
}
function EmptyContent({ className, ...props }) {
  return /* @__PURE__ */ jsx64(
    "div",
    {
      "data-slot": "empty-content",
      className: cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm text-balance",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/field-group.tsx
import { jsx as jsx65, jsxs as jsxs39 } from "react/jsx-runtime";

// src/components/ui/filters.tsx
import { cva as cva8 } from "class-variance-authority";
import { AlertCircle, Check, Plus, X } from "lucide-react";
import {
  createContext as createContext4,
  useCallback as useCallback2,
  useContext as useContext4,
  useMemo as useMemo3,
  useState as useState8
} from "react";

// src/components/ui/switch.tsx
import { Switch as SwitchPrimitive } from "radix-ui";
import { jsx as jsx66 } from "react/jsx-runtime";
function Switch({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx66(
    SwitchPrimitive.Root,
    {
      "data-slot": "switch",
      "data-size": size,
      className: cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx66(
        SwitchPrimitive.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}

// src/components/ui/filters.tsx
import { Fragment as Fragment2, jsx as jsx67, jsxs as jsxs40 } from "react/jsx-runtime";
var DEFAULT_I18N = {
  // UI Labels
  addFilter: "Add filter",
  searchFields: "Search fields...",
  noFieldsFound: "No fields found.",
  noResultsFound: "No results found.",
  select: "Select...",
  true: "True",
  false: "False",
  min: "Min",
  max: "Max",
  to: "to",
  typeAndPressEnter: "Type and press Enter to add tag",
  selected: "selected",
  selectedCount: "selected",
  percent: "%",
  defaultCurrency: "$",
  defaultColor: "#000000",
  addFilterTitle: "Add filter",
  // Operators
  operators: {
    is: "is",
    isNot: "is not",
    isAnyOf: "is any of",
    isNotAnyOf: "is not any of",
    includesAll: "includes all",
    excludesAll: "excludes all",
    before: "before",
    after: "after",
    between: "between",
    notBetween: "not between",
    contains: "contains",
    notContains: "does not contain",
    startsWith: "starts with",
    endsWith: "ends with",
    isExactly: "is exactly",
    equals: "equals",
    notEquals: "not equals",
    greaterThan: "greater than",
    lessThan: "less than",
    overlaps: "overlaps",
    includes: "includes",
    excludes: "excludes",
    includesAllOf: "includes all of",
    includesAnyOf: "includes any of",
    empty: "is empty",
    notEmpty: "is not empty"
  },
  // Placeholders
  placeholders: {
    enterField: (fieldType) => `Enter ${fieldType}...`,
    selectField: "Select...",
    searchField: (fieldName) => `Search ${fieldName.toLowerCase()}...`,
    enterKey: "Enter key...",
    enterValue: "Enter value..."
  },
  // Helper functions
  helpers: {
    formatOperator: (operator) => operator.replace(/_/g, " ")
  },
  // Validation
  validation: {
    invalidEmail: "Invalid email format",
    invalidUrl: "Invalid URL format",
    invalidTel: "Invalid phone format",
    invalid: "Invalid input format"
  }
};
var FilterContext = createContext4({
  variant: "outline",
  size: "md",
  radius: "md",
  i18n: DEFAULT_I18N,
  cursorPointer: true,
  className: void 0,
  showAddButton: true,
  addButtonText: void 0,
  addButtonIcon: void 0,
  addButtonClassName: void 0,
  addButton: void 0,
  showSearchInput: true,
  trigger: void 0,
  allowMultiple: true
});
var useFilterContext = () => useContext4(FilterContext);
var filterInputVariants = cva8(
  [
    "transition shrink-0 outline-none text-foreground relative flex items-center",
    "has-[[data-slot=filters-input]:focus-visible]:ring-ring/30",
    "has-[[data-slot=filters-input]:focus-visible]:border-ring",
    "has-[[data-slot=filters-input]:focus-visible]:outline-none",
    "has-[[data-slot=filters-input]:focus-visible]:ring-[3px]",
    "has-[[data-slot=filters-input]:focus-visible]:z-1",
    "has-[[data-slot=filters-input][aria-invalid]]:border",
    "has-[[data-slot=filters-input][aria-invalid]]:border-solid",
    "has-[[data-slot=filters-input][aria-invalid]]:border-destructive/60",
    "has-[[data-slot=filters-input][aria-invalid]]:ring-destructive/10",
    "dark:has-[[data-slot=filters-input][aria-invalid]]:border-destructive",
    "dark:has-[[data-slot=filters-input][aria-invalid]]:ring-destructive/20"
  ],
  {
    variants: {
      variant: {
        solid: "border-0 bg-secondary",
        outline: "bg-background border border-border"
      },
      size: {
        lg: "h-10 text-sm px-2.5 has-[[data-slot=filters-prefix]]:ps-0 has-[[data-slot=filters-suffix]]:pe-0",
        md: "h-9 text-sm px-2 has-[[data-slot=filters-prefix]]:ps-0 has-[[data-slot=filters-suffix]]:pe-0",
        sm: "h-8 text-xs px-1.5 has-[[data-slot=filters-prefix]]:ps-0 has-[[data-slot=filters-suffix]]:pe-0"
      },
      cursorPointer: {
        true: "cursor-pointer",
        false: ""
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
      cursorPointer: true
    }
  }
);
var filterRemoveButtonVariants = cva8(
  [
    "inline-flex items-center shrink-0 justify-center transition shrink-0 text-muted-foreground hover:text-foreground"
  ],
  {
    variants: {
      variant: {
        solid: "bg-secondary",
        outline: "border border-border border-s-0 hover:bg-secondary"
      },
      size: {
        lg: "h-10 w-10 [&_svg:not([class*=size-])]:size-4",
        md: "h-9 w-9 [&_svg:not([class*=size-])]:size-3.5",
        sm: "h-8 w-8 [&_svg:not([class*=size-])]:size-3"
      },
      cursorPointer: {
        true: "cursor-pointer",
        false: ""
      },
      radius: {
        md: "rounded-e-md",
        full: "rounded-e-full"
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
      radius: "md",
      cursorPointer: true
    }
  }
);
var filterAddButtonVariants = cva8(
  [
    "inline-flex items-center shrink-0 justify-center transition shrink-0 text-foreground shadow-xs shadow-black/5",
    "[&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60"
  ],
  {
    variants: {
      variant: {
        solid: "border border-input hover:bg-secondary/60",
        outline: "border border-border hover:bg-secondary"
      },
      size: {
        lg: "h-10 px-4 text-sm gap-1.5 [&_svg:not([class*=size-])]:size-4",
        md: "h-9 px-3 gap-1.5 text-sm [&_svg:not([class*=size-])]:size-4",
        sm: "h-8 px-2.5 gap-1.25 text-xs [&_svg:not([class*=size-])]:size-3.5"
      },
      radius: {
        md: "rounded-md",
        full: "rounded-full"
      },
      cursorPointer: {
        true: "cursor-pointer",
        false: ""
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
      cursorPointer: true
    }
  }
);
var filterOperatorVariants = cva8(
  [
    "transition text-muted-foreground hover:text-foreground data-[state=open]:text-foreground shrink-0 flex items-center relative focus-visible:z-1"
  ],
  {
    variants: {
      variant: {
        solid: "bg-secondary",
        outline: "bg-background border border-border border-e-0 hover:bg-secondary data-[state=open]:bg-secondary [&+[data-slot=filters-remove]]:border-s"
      },
      size: {
        lg: "h-10 px-4 text-sm gap-1.5",
        md: "h-9 px-3 text-sm gap-1.25",
        sm: "h-8 px-2.5 text-xs gap-1"
      },
      cursorPointer: {
        true: "cursor-pointer",
        false: ""
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
      cursorPointer: true
    }
  }
);
var filterFieldLabelVariants = cva8(
  [
    "flex gap-1.5 shrink-0 px-1.5 py-1 items-center text-foreground",
    "[&_svg:not([class*=size-])]:size-3.5 [&_svg:not([class*=opacity-])]:opacity-60"
  ],
  {
    variants: {
      variant: {
        solid: "bg-secondary",
        outline: "border border-border border-e-0"
      },
      size: {
        lg: "h-10 px-4 text-sm gap-1.5 [&_svg:not([class*=size-])]:size-4",
        md: "h-9 px-3 gap-1.5 text-sm [&_svg:not([class*=size-])]:size-4",
        sm: "h-8 px-2.5 gap-1.25 text-xs [&_svg:not([class*=size-])]:size-3.5"
      },
      radius: {
        md: "rounded-s-md",
        full: "rounded-s-full"
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "md"
    }
  }
);
var filterFieldValueVariants = cva8(
  "text-foreground transition shrink-0 flex items-center gap-1 relative focus-visible:z-1",
  {
    variants: {
      variant: {
        solid: "bg-secondary",
        outline: "bg-background border border-border hover:bg-secondary has-[[data-slot=switch]]:hover:bg-transparent"
      },
      size: {
        lg: "h-10 px-4 text-sm gap-1.5 [&_svg:not([class*=size-])]:size-4",
        md: "h-9 px-3 gap-1.5 text-sm [&_svg:not([class*=size-])]:size-4",
        sm: "h-8 px-2.5 gap-1.25 text-xs [&_svg:not([class*=size-])]:size-3.5"
      },
      cursorPointer: {
        true: "cursor-pointer has-[[data-slot=switch]]:cursor-default",
        false: ""
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
      cursorPointer: true
    }
  }
);
var filterFieldAddonVariants = cva8(
  "text-foreground shrink-0 flex items-center justify-center",
  {
    variants: {
      variant: {
        solid: "",
        outline: ""
      },
      size: {
        lg: "h-10 px-4 text-sm",
        md: "h-9 px-3 text-sm",
        sm: "h-8 px-2.5 text-xs"
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "md"
    }
  }
);
var filterFieldBetweenVariants = cva8(
  "text-muted-foreground shrink-0 flex items-center",
  {
    variants: {
      variant: {
        solid: "bg-secondary",
        outline: "bg-background border border-border border-x-0"
      },
      size: {
        lg: "h-10 px-4 text-sm",
        md: "h-9 px-3 text-sm",
        sm: "h-8 px-2.5 text-xs"
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "md"
    }
  }
);
var filtersContainerVariants = cva8("flex flex-wrap items-center", {
  variants: {
    variant: {
      solid: "gap-2",
      outline: ""
    },
    size: {
      sm: "gap-1.5",
      md: "gap-2.5",
      lg: "gap-3.5"
    }
  },
  defaultVariants: {
    variant: "outline",
    size: "md"
  }
});
var filterItemVariants = cva8("flex items-center shadow-xs shadow-black/5", {
  variants: {
    variant: {
      solid: "gap-px",
      outline: ""
    }
  },
  defaultVariants: {
    variant: "outline"
  }
});
function FilterInput({
  field,
  onChange,
  onBlur,
  onKeyDown,
  onInputChange,
  className,
  ...props
}) {
  const context = useFilterContext();
  const [isValid, setIsValid] = useState8(true);
  const [validationMessage, setValidationMessage] = useState8("");
  const validateInput = (value, pattern) => {
    if (!pattern || !value) return true;
    const regex = new RegExp(pattern);
    return regex.test(value);
  };
  const getValidationMessage = (fieldType, hasCustomPattern = false) => {
    if ((fieldType === "text" || fieldType === "number") && hasCustomPattern) {
      return context.i18n.validation.invalid;
    }
    switch (fieldType) {
      case "email":
        return context.i18n.validation.invalidEmail;
      case "url":
        return context.i18n.validation.invalidUrl;
      case "tel":
        return context.i18n.validation.invalidTel;
      default:
        return context.i18n.validation.invalid;
    }
  };
  const handleChange = (e) => {
    onChange?.(e);
  };
  const handleBlur = (e) => {
    const value = e.target.value;
    const pattern = field?.pattern || props.pattern;
    if (value && pattern) {
      let valid = true;
      if (field?.validation) {
        valid = field.validation(value);
      } else {
        valid = validateInput(value, pattern);
      }
      setIsValid(valid);
      const hasCustomPattern = !!(field?.pattern || props.pattern);
      setValidationMessage(
        valid ? "" : getValidationMessage(field?.type || "", hasCustomPattern)
      );
    } else {
      setIsValid(true);
      setValidationMessage("");
    }
    if (onInputChange) {
      onInputChange(e);
    }
    onBlur?.(e);
  };
  const handleKeyDown = (e) => {
    if (!isValid && ![
      "Tab",
      "Escape",
      "Enter",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight"
    ].includes(e.key)) {
      setIsValid(true);
      setValidationMessage("");
    }
    if (e.key === "Enter" && onInputChange) {
      const syntheticEvent = {
        ...e,
        target: e.target,
        currentTarget: e.currentTarget
      };
      onInputChange(syntheticEvent);
    }
    onKeyDown?.(e);
  };
  return /* @__PURE__ */ jsxs40(
    "div",
    {
      className: cn(
        "w-36",
        filterInputVariants({ variant: context.variant, size: context.size }),
        className
      ),
      "data-slot": "filters-input-wrapper",
      children: [
        field?.prefix && /* @__PURE__ */ jsx67(
          "div",
          {
            "data-slot": "filters-prefix",
            className: filterFieldAddonVariants({
              variant: context.variant,
              size: context.size
            }),
            children: field.prefix
          }
        ),
        /* @__PURE__ */ jsxs40("div", { className: "w-full flex items-stretch", children: [
          /* @__PURE__ */ jsx67(
            "input",
            {
              className: "w-full outline-none",
              "aria-invalid": !isValid,
              "aria-describedby": !isValid && validationMessage ? `${field?.key || "input"}-error` : void 0,
              onChange: handleChange,
              onBlur: handleBlur,
              onKeyDown: handleKeyDown,
              "data-slot": "filters-input",
              ...props
            }
          ),
          !isValid && validationMessage && /* @__PURE__ */ jsxs40(Tooltip, { children: [
            /* @__PURE__ */ jsx67(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx67("div", { className: "absolute right-2 top-1/2 -translate-y-1/2 flex items-center", children: /* @__PURE__ */ jsx67(AlertCircle, { className: "size-3.5 text-destructive" }) }) }),
            /* @__PURE__ */ jsx67(TooltipPopup, { children: /* @__PURE__ */ jsx67("p", { className: "text-sm", children: validationMessage }) })
          ] })
        ] }),
        field?.suffix && /* @__PURE__ */ jsx67(
          "div",
          {
            "data-slot": "filters-suffix",
            className: cn(
              filterFieldAddonVariants({
                variant: context.variant,
                size: context.size
              })
            ),
            children: field.suffix
          }
        )
      ]
    }
  );
}
function FilterRemoveButton({
  className,
  icon = /* @__PURE__ */ jsx67(X, {}),
  ...props
}) {
  const context = useFilterContext();
  return /* @__PURE__ */ jsx67(
    "button",
    {
      "data-slot": "filters-remove",
      className: cn(
        filterRemoveButtonVariants({
          variant: context.variant,
          size: context.size,
          cursorPointer: context.cursorPointer,
          radius: context.radius
        }),
        className
      ),
      ...props,
      children: icon
    }
  );
}
var isFieldGroup = (item) => {
  return "fields" in item && Array.isArray(item.fields);
};
var isGroupLevelField = (field) => {
  return Boolean(field.group && field.fields);
};
var flattenFields = (fields) => {
  return fields.reduce((acc, item) => {
    if (isFieldGroup(item)) {
      return [...acc, ...item.fields];
    }
    if (isGroupLevelField(item)) {
      return [...acc, ...item.fields];
    }
    return [...acc, item];
  }, []);
};
var getFieldsMap = (fields) => {
  const flatFields = flattenFields(fields);
  return flatFields.reduce(
    (acc, field) => {
      if (field.key) {
        acc[field.key] = field;
      }
      return acc;
    },
    {}
  );
};
var createOperatorsFromI18n = (i18n) => ({
  select: [
    { value: "is", label: i18n.operators.is },
    { value: "is_not", label: i18n.operators.isNot },
    { value: "empty", label: i18n.operators.empty },
    { value: "not_empty", label: i18n.operators.notEmpty }
  ],
  multiselect: [
    { value: "is_any_of", label: i18n.operators.isAnyOf },
    { value: "is_not_any_of", label: i18n.operators.isNotAnyOf },
    { value: "includes_all", label: i18n.operators.includesAll },
    { value: "excludes_all", label: i18n.operators.excludesAll },
    { value: "empty", label: i18n.operators.empty },
    { value: "not_empty", label: i18n.operators.notEmpty }
  ],
  date: [
    { value: "before", label: i18n.operators.before },
    { value: "after", label: i18n.operators.after },
    { value: "is", label: i18n.operators.is },
    { value: "is_not", label: i18n.operators.isNot },
    { value: "empty", label: i18n.operators.empty },
    { value: "not_empty", label: i18n.operators.notEmpty }
  ],
  daterange: [
    { value: "between", label: i18n.operators.between },
    { value: "not_between", label: i18n.operators.notBetween },
    { value: "empty", label: i18n.operators.empty },
    { value: "not_empty", label: i18n.operators.notEmpty }
  ],
  text: [
    { value: "contains", label: i18n.operators.contains },
    { value: "not_contains", label: i18n.operators.notContains },
    { value: "starts_with", label: i18n.operators.startsWith },
    { value: "ends_with", label: i18n.operators.endsWith },
    { value: "is", label: i18n.operators.isExactly },
    { value: "empty", label: i18n.operators.empty },
    { value: "not_empty", label: i18n.operators.notEmpty }
  ],
  number: [
    { value: "equals", label: i18n.operators.equals },
    { value: "not_equals", label: i18n.operators.notEquals },
    { value: "greater_than", label: i18n.operators.greaterThan },
    { value: "less_than", label: i18n.operators.lessThan },
    { value: "between", label: i18n.operators.between },
    { value: "empty", label: i18n.operators.empty },
    { value: "not_empty", label: i18n.operators.notEmpty }
  ],
  numberrange: [
    { value: "between", label: i18n.operators.between },
    { value: "overlaps", label: i18n.operators.overlaps },
    { value: "contains", label: i18n.operators.contains },
    { value: "empty", label: i18n.operators.empty },
    { value: "not_empty", label: i18n.operators.notEmpty }
  ],
  boolean: [
    { value: "is", label: i18n.operators.is },
    { value: "is_not", label: i18n.operators.isNot },
    { value: "empty", label: i18n.operators.empty },
    { value: "not_empty", label: i18n.operators.notEmpty }
  ],
  email: [
    { value: "contains", label: i18n.operators.contains },
    { value: "not_contains", label: i18n.operators.notContains },
    { value: "starts_with", label: i18n.operators.startsWith },
    { value: "ends_with", label: i18n.operators.endsWith },
    { value: "is", label: i18n.operators.isExactly },
    { value: "empty", label: i18n.operators.empty },
    { value: "not_empty", label: i18n.operators.notEmpty }
  ],
  url: [
    { value: "contains", label: i18n.operators.contains },
    { value: "not_contains", label: i18n.operators.notContains },
    { value: "starts_with", label: i18n.operators.startsWith },
    { value: "ends_with", label: i18n.operators.endsWith },
    { value: "is", label: i18n.operators.isExactly },
    { value: "empty", label: i18n.operators.empty },
    { value: "not_empty", label: i18n.operators.notEmpty }
  ],
  tel: [
    { value: "contains", label: i18n.operators.contains },
    { value: "not_contains", label: i18n.operators.notContains },
    { value: "starts_with", label: i18n.operators.startsWith },
    { value: "ends_with", label: i18n.operators.endsWith },
    { value: "is", label: i18n.operators.isExactly },
    { value: "empty", label: i18n.operators.empty },
    { value: "not_empty", label: i18n.operators.notEmpty }
  ],
  time: [
    { value: "before", label: i18n.operators.before },
    { value: "after", label: i18n.operators.after },
    { value: "is", label: i18n.operators.is },
    { value: "between", label: i18n.operators.between },
    { value: "empty", label: i18n.operators.empty },
    { value: "not_empty", label: i18n.operators.notEmpty }
  ],
  datetime: [
    { value: "before", label: i18n.operators.before },
    { value: "after", label: i18n.operators.after },
    { value: "is", label: i18n.operators.is },
    { value: "between", label: i18n.operators.between },
    { value: "empty", label: i18n.operators.empty },
    { value: "not_empty", label: i18n.operators.notEmpty }
  ]
});
var DEFAULT_OPERATORS = createOperatorsFromI18n(DEFAULT_I18N);
var getOperatorsForField = (field, values, i18n) => {
  if (field.operators) return field.operators;
  const operators = createOperatorsFromI18n(i18n);
  let fieldType = field.type || "select";
  if (fieldType === "select" && values.length > 1) {
    fieldType = "multiselect";
  }
  if (fieldType === "multiselect" || field.type === "multiselect") {
    return operators.multiselect;
  }
  return operators[fieldType] || operators.select;
};
function FilterOperatorDropdown({
  field,
  operator,
  values,
  onChange
}) {
  const context = useFilterContext();
  const operators = getOperatorsForField(field, values, context.i18n);
  const operatorLabel = operators.find((op) => op.value === operator)?.label || context.i18n.helpers.formatOperator(operator);
  if (!operators.find((op) => op.value === operator)) {
    console.warn(
      `Operator "${operator}" not found in operators for field "${field.key}" (type: ${field.type}). Available operators:`,
      operators.map((op) => op.value)
    );
  }
  return /* @__PURE__ */ jsxs40(DropdownMenu, { children: [
    /* @__PURE__ */ jsx67(
      DropdownMenuTrigger,
      {
        className: filterOperatorVariants({
          variant: context.variant,
          size: context.size
        }),
        children: operatorLabel
      }
    ),
    /* @__PURE__ */ jsx67(DropdownMenuContent, { align: "start", className: "w-fit min-w-fit", children: operators.map((op) => /* @__PURE__ */ jsxs40(
      DropdownMenuItem,
      {
        onClick: () => onChange(op.value),
        className: "flex items-center justify-between",
        children: [
          /* @__PURE__ */ jsx67("span", { children: op.label }),
          /* @__PURE__ */ jsx67(
            Check,
            {
              className: `text-primary ms-auto ${op.value === operator ? "opacity-100" : "opacity-0"}`
            }
          )
        ]
      },
      op.value
    )) })
  ] });
}
function SelectOptionsPopover({
  field,
  values,
  onChange,
  onClose,
  inline = false
}) {
  const [open, setOpen] = useState8(false);
  const [searchInput, setSearchInput] = useState8("");
  const context = useFilterContext();
  const isMultiSelect = field.type === "multiselect" || values.length > 1;
  const effectiveValues = (field.value !== void 0 ? field.value : values) || [];
  const selectedOptions = field.options?.filter((opt) => effectiveValues.includes(opt.value)) || [];
  const unselectedOptions = field.options?.filter((opt) => !effectiveValues.includes(opt.value)) || [];
  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };
  if (inline) {
    return /* @__PURE__ */ jsx67("div", { className: "w-full", children: /* @__PURE__ */ jsxs40(Command, { children: [
      field.searchable !== false && /* @__PURE__ */ jsx67(
        CommandInput,
        {
          placeholder: context.i18n.placeholders.searchField(
            field.label || ""
          ),
          className: "h-8.5 text-sm",
          value: searchInput,
          onValueChange: setSearchInput
        }
      ),
      /* @__PURE__ */ jsxs40(CommandList, { children: [
        /* @__PURE__ */ jsx67(CommandEmpty, { children: context.i18n.noResultsFound }),
        selectedOptions.length > 0 && /* @__PURE__ */ jsx67(CommandGroup, { heading: field.label || "Selected", children: selectedOptions.map((option) => /* @__PURE__ */ jsxs40(
          CommandItem,
          {
            className: "group flex gap-2 items-center",
            onSelect: () => {
              if (isMultiSelect) {
                const next = effectiveValues.filter(
                  (v) => v !== option.value
                );
                if (field.onValueChange) {
                  field.onValueChange(next);
                } else {
                  onChange(next);
                }
              } else {
                if (field.onValueChange) {
                  field.onValueChange([]);
                } else {
                  onChange([]);
                }
              }
            },
            children: [
              option.icon && option.icon,
              /* @__PURE__ */ jsx67("span", { className: "text-accent-foreground truncate", children: option.label }),
              /* @__PURE__ */ jsx67(Check, { className: "text-primary ms-auto" })
            ]
          },
          String(option.value)
        )) }),
        unselectedOptions.length > 0 && /* @__PURE__ */ jsxs40(Fragment2, { children: [
          selectedOptions.length > 0 && /* @__PURE__ */ jsx67(CommandSeparator, {}),
          /* @__PURE__ */ jsx67(CommandGroup, { children: unselectedOptions.map((option) => /* @__PURE__ */ jsxs40(
            CommandItem,
            {
              className: "group flex gap-2 items-center",
              value: option.label,
              onSelect: () => {
                if (isMultiSelect) {
                  const newValues = [
                    ...effectiveValues,
                    option.value
                  ];
                  if (field.maxSelections && newValues.length > field.maxSelections) {
                    return;
                  }
                  if (field.onValueChange) {
                    field.onValueChange(newValues);
                  } else {
                    onChange(newValues);
                  }
                } else {
                  if (field.onValueChange) {
                    field.onValueChange([option.value]);
                  } else {
                    onChange([option.value]);
                  }
                  onClose?.();
                }
              },
              children: [
                option.icon && option.icon,
                /* @__PURE__ */ jsx67("span", { className: "text-accent-foreground truncate", children: option.label }),
                /* @__PURE__ */ jsx67(Check, { className: "text-primary ms-auto opacity-0" })
              ]
            },
            String(option.value)
          )) })
        ] })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxs40(
    Popover,
    {
      open,
      onOpenChange: (open2) => {
        setOpen(open2);
        if (!open2) {
          setTimeout(() => setSearchInput(""), 200);
        }
      },
      children: [
        /* @__PURE__ */ jsx67(
          PopoverTrigger,
          {
            className: filterFieldValueVariants({
              variant: context.variant,
              size: context.size,
              cursorPointer: context.cursorPointer
            }),
            children: /* @__PURE__ */ jsx67("div", { className: "flex gap-1.5 items-center", children: field.customValueRenderer ? field.customValueRenderer(values, field.options || []) : /* @__PURE__ */ jsxs40(Fragment2, { children: [
              selectedOptions.length > 0 && /* @__PURE__ */ jsx67(
                "div",
                {
                  className: cn(
                    "-space-x-1.5 flex items-center",
                    field.selectedOptionsClassName
                  ),
                  children: selectedOptions.slice(0, 3).map((option) => /* @__PURE__ */ jsx67("div", { children: option.icon }, String(option.value)))
                }
              ),
              selectedOptions.length === 1 ? selectedOptions[0].label : selectedOptions.length > 1 ? `${selectedOptions.length} ${context.i18n.selectedCount}` : context.i18n.select
            ] }) })
          }
        ),
        /* @__PURE__ */ jsx67(
          PopoverPopup,
          {
            align: "start",
            className: cn("w-[200px] p-0", field.className),
            children: /* @__PURE__ */ jsxs40(Command, { children: [
              field.searchable !== false && /* @__PURE__ */ jsx67(
                CommandInput,
                {
                  placeholder: context.i18n.placeholders.searchField(
                    field.label || ""
                  ),
                  className: "h-9 text-sm",
                  value: searchInput,
                  onValueChange: setSearchInput
                }
              ),
              /* @__PURE__ */ jsxs40(CommandList, { children: [
                /* @__PURE__ */ jsx67(CommandEmpty, { children: context.i18n.noResultsFound }),
                selectedOptions.length > 0 && /* @__PURE__ */ jsx67(CommandGroup, { children: selectedOptions.map((option) => /* @__PURE__ */ jsxs40(
                  CommandItem,
                  {
                    className: "group flex gap-2 items-center",
                    onSelect: () => {
                      if (isMultiSelect) {
                        onChange(
                          values.filter((v) => v !== option.value)
                        );
                      } else {
                        onChange([]);
                      }
                      if (!isMultiSelect) {
                        setOpen(false);
                        handleClose();
                      }
                    },
                    children: [
                      option.icon && option.icon,
                      /* @__PURE__ */ jsx67("span", { className: "text-accent-foreground truncate", children: option.label }),
                      /* @__PURE__ */ jsx67(Check, { className: "text-primary ms-auto" })
                    ]
                  },
                  String(option.value)
                )) }),
                unselectedOptions.length > 0 && /* @__PURE__ */ jsxs40(Fragment2, { children: [
                  selectedOptions.length > 0 && /* @__PURE__ */ jsx67(CommandSeparator, {}),
                  /* @__PURE__ */ jsx67(CommandGroup, { children: unselectedOptions.map((option) => /* @__PURE__ */ jsxs40(
                    CommandItem,
                    {
                      className: "group flex gap-2 items-center",
                      value: option.label,
                      onSelect: () => {
                        if (isMultiSelect) {
                          const newValues = [...values, option.value];
                          if (field.maxSelections && newValues.length > field.maxSelections) {
                            return;
                          }
                          onChange(newValues);
                        } else {
                          onChange([option.value]);
                          setOpen(false);
                          handleClose();
                        }
                      },
                      children: [
                        option.icon && option.icon,
                        /* @__PURE__ */ jsx67("span", { className: "text-accent-foreground truncate", children: option.label }),
                        /* @__PURE__ */ jsx67(Check, { className: "text-primary ms-auto opacity-0" })
                      ]
                    },
                    String(option.value)
                  )) })
                ] })
              ] })
            ] })
          }
        )
      ]
    }
  );
}
function FilterValueSelector({
  field,
  values,
  onChange,
  operator
}) {
  const [open, setOpen] = useState8(false);
  const [searchInput, setSearchInput] = useState8("");
  const context = useFilterContext();
  if (operator === "empty" || operator === "not_empty") {
    return null;
  }
  if (field.customRenderer) {
    return /* @__PURE__ */ jsx67(
      "div",
      {
        className: filterFieldValueVariants({
          variant: context.variant,
          size: context.size,
          cursorPointer: context.cursorPointer
        }),
        children: field.customRenderer({ field, values, onChange, operator })
      }
    );
  }
  if (field.type === "boolean") {
    const isChecked = values[0] === true;
    const onLabel = field.onLabel || context.i18n.true;
    const offLabel = field.offLabel || context.i18n.false;
    return /* @__PURE__ */ jsx67(
      "div",
      {
        className: filterFieldValueVariants({
          variant: context.variant,
          size: context.size,
          cursorPointer: context.cursorPointer
        }),
        children: /* @__PURE__ */ jsxs40("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx67(
            Switch,
            {
              checked: isChecked,
              onCheckedChange: (checked) => onChange([checked])
            }
          ),
          field.onLabel && field.offLabel && /* @__PURE__ */ jsx67("span", { className: "text-xs text-muted-foreground", children: isChecked ? onLabel : offLabel })
        ] })
      }
    );
  }
  if (field.type === "time") {
    if (operator === "between") {
      const startTime = values[0] || "";
      const endTime = values[1] || "";
      return /* @__PURE__ */ jsxs40("div", { className: "flex items-center", "data-slot": "filters-item", children: [
        /* @__PURE__ */ jsx67(
          FilterInput,
          {
            type: "time",
            value: startTime,
            onChange: (e) => onChange([e.target.value, endTime]),
            onInputChange: field.onInputChange,
            className: field.className,
            field
          }
        ),
        /* @__PURE__ */ jsx67(
          "div",
          {
            "data-slot": "filters-between",
            className: filterFieldBetweenVariants({
              variant: context.variant,
              size: context.size
            }),
            children: context.i18n.to
          }
        ),
        /* @__PURE__ */ jsx67(
          FilterInput,
          {
            type: "time",
            value: endTime,
            onChange: (e) => onChange([startTime, e.target.value]),
            onInputChange: field.onInputChange,
            className: field.className,
            field
          }
        )
      ] });
    }
    return /* @__PURE__ */ jsx67(
      FilterInput,
      {
        type: "time",
        value: values[0] || "",
        onChange: (e) => onChange([e.target.value]),
        onInputChange: field.onInputChange,
        field,
        className: field.className
      }
    );
  }
  if (field.type === "datetime") {
    if (operator === "between") {
      const startDateTime = values[0] || "";
      const endDateTime = values[1] || "";
      return /* @__PURE__ */ jsxs40("div", { className: "flex items-center", "data-slot": "filters-item", children: [
        /* @__PURE__ */ jsx67(
          FilterInput,
          {
            type: "datetime-local",
            value: startDateTime,
            onChange: (e) => onChange([e.target.value, endDateTime]),
            onInputChange: field.onInputChange,
            className: cn("w-36", field.className),
            field
          }
        ),
        /* @__PURE__ */ jsx67(
          "div",
          {
            "data-slot": "filters-between",
            className: filterFieldBetweenVariants({
              variant: context.variant,
              size: context.size
            }),
            children: context.i18n.to
          }
        ),
        /* @__PURE__ */ jsx67(
          FilterInput,
          {
            type: "datetime-local",
            value: endDateTime,
            onChange: (e) => onChange([startDateTime, e.target.value]),
            onInputChange: field.onInputChange,
            className: cn("w-36", field.className),
            field
          }
        )
      ] });
    }
    return /* @__PURE__ */ jsx67(
      FilterInput,
      {
        type: "datetime-local",
        value: values[0] || "",
        onChange: (e) => onChange([e.target.value]),
        onInputChange: field.onInputChange,
        className: cn("w-36", field.className),
        field
      }
    );
  }
  if (["email", "url", "tel"].includes(field.type || "")) {
    const getInputType = () => {
      switch (field.type) {
        case "email":
          return "email";
        case "url":
          return "url";
        case "tel":
          return "tel";
        default:
          return "text";
      }
    };
    const getPattern = () => {
      switch (field.type) {
        case "email":
          return "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$";
        case "url":
          return "^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$";
        case "tel":
          return "^[\\+]?[1-9][\\d]{0,15}$";
        default:
          return void 0;
      }
    };
    return /* @__PURE__ */ jsx67(
      FilterInput,
      {
        type: getInputType(),
        value: values[0] || "",
        onChange: (e) => onChange([e.target.value]),
        onInputChange: field.onInputChange,
        placeholder: field.placeholder || context.i18n.placeholders.enterField(field.type || "text"),
        pattern: field.pattern || getPattern(),
        className: field.className,
        field
      }
    );
  }
  if (field.type === "daterange") {
    const startDate = values[0] || "";
    const endDate = values[1] || "";
    return /* @__PURE__ */ jsxs40(
      "div",
      {
        className: filterFieldValueVariants({
          variant: context.variant,
          size: context.size,
          cursorPointer: context.cursorPointer
        }),
        children: [
          /* @__PURE__ */ jsx67(
            FilterInput,
            {
              type: "date",
              value: startDate,
              onChange: (e) => onChange([e.target.value, endDate]),
              onInputChange: field.onInputChange,
              className: cn("w-24", field.className),
              field
            }
          ),
          /* @__PURE__ */ jsx67(
            "div",
            {
              "data-slot": "filters-between",
              className: filterFieldBetweenVariants({
                variant: context.variant,
                size: context.size
              }),
              children: context.i18n.to
            }
          ),
          /* @__PURE__ */ jsx67(
            FilterInput,
            {
              type: "date",
              value: endDate,
              onChange: (e) => onChange([startDate, e.target.value]),
              onInputChange: field.onInputChange,
              className: cn("w-24", field.className),
              field
            }
          )
        ]
      }
    );
  }
  if (field.type === "text" || field.type === "number") {
    if (field.type === "number" && operator === "between") {
      const minVal = values[0] || "";
      const maxVal = values[1] || "";
      return /* @__PURE__ */ jsxs40("div", { className: "flex items-center", "data-slot": "filters-item", children: [
        /* @__PURE__ */ jsx67(
          FilterInput,
          {
            type: "number",
            value: minVal,
            onChange: (e) => onChange([e.target.value, maxVal]),
            onInputChange: field.onInputChange,
            placeholder: context.i18n.min,
            className: cn("w-16", field.className),
            min: field.min,
            max: field.max,
            step: field.step,
            pattern: field.pattern,
            field
          }
        ),
        /* @__PURE__ */ jsx67(
          "div",
          {
            "data-slot": "filters-between",
            className: filterFieldBetweenVariants({
              variant: context.variant,
              size: context.size
            }),
            children: context.i18n.to
          }
        ),
        /* @__PURE__ */ jsx67(
          FilterInput,
          {
            type: "number",
            value: maxVal,
            onChange: (e) => onChange([minVal, e.target.value]),
            onInputChange: field.onInputChange,
            placeholder: context.i18n.max,
            className: cn("w-16", field.className),
            min: field.min,
            max: field.max,
            step: field.step,
            pattern: field.pattern,
            field
          }
        )
      ] });
    }
    return /* @__PURE__ */ jsx67("div", { className: "flex items-center", "data-slot": "filters-item", children: /* @__PURE__ */ jsx67(
      FilterInput,
      {
        type: field.type === "number" ? "number" : "text",
        value: values[0] || "",
        onChange: (e) => onChange([e.target.value]),
        onInputChange: field.onInputChange,
        placeholder: field.placeholder,
        min: field.type === "number" ? field.min : void 0,
        max: field.type === "number" ? field.max : void 0,
        step: field.type === "number" ? field.step : void 0,
        pattern: field.pattern,
        field,
        className: cn("w-36", field.className)
      }
    ) });
  }
  if (field.type === "date") {
    return /* @__PURE__ */ jsx67(
      FilterInput,
      {
        type: "date",
        value: values[0] || "",
        onChange: (e) => onChange([e.target.value]),
        onInputChange: field.onInputChange,
        field,
        className: cn("w-16", field.className)
      }
    );
  }
  if (field.type === "select" || field.type === "multiselect") {
    return /* @__PURE__ */ jsx67(SelectOptionsPopover, { field, values, onChange });
  }
  const isMultiSelect = values.length > 1;
  const selectedOptions = field.options?.filter((opt) => values.includes(opt.value)) || [];
  const unselectedOptions = field.options?.filter((opt) => !values.includes(opt.value)) || [];
  return /* @__PURE__ */ jsxs40(
    Popover,
    {
      open,
      onOpenChange: (open2) => {
        setOpen(open2);
        if (!open2) {
          setTimeout(() => setSearchInput(""), 200);
        }
      },
      children: [
        /* @__PURE__ */ jsx67(
          PopoverTrigger,
          {
            className: filterFieldValueVariants({
              variant: context.variant,
              size: context.size,
              cursorPointer: context.cursorPointer
            }),
            children: /* @__PURE__ */ jsx67("div", { className: "flex gap-1.5 items-center", children: field.customValueRenderer ? field.customValueRenderer(values, field.options || []) : /* @__PURE__ */ jsxs40(Fragment2, { children: [
              selectedOptions.length > 0 && /* @__PURE__ */ jsx67("div", { className: "flex items-center -space-x-1.5", children: selectedOptions.slice(0, 3).map((option) => /* @__PURE__ */ jsx67("div", { children: option.icon }, String(option.value))) }),
              selectedOptions.length === 1 ? selectedOptions[0].label : selectedOptions.length > 1 ? `${selectedOptions.length} ${context.i18n.selectedCount}` : context.i18n.select
            ] }) })
          }
        ),
        /* @__PURE__ */ jsx67(PopoverPopup, { className: cn("w-36 p-0", field.popoverContentClassName), children: /* @__PURE__ */ jsxs40(Command, { children: [
          field.searchable !== false && /* @__PURE__ */ jsx67(
            CommandInput,
            {
              placeholder: context.i18n.placeholders.searchField(
                field.label || ""
              ),
              className: "h-9 text-sm",
              value: searchInput,
              onValueChange: setSearchInput
            }
          ),
          /* @__PURE__ */ jsxs40(CommandList, { children: [
            /* @__PURE__ */ jsx67(CommandEmpty, { children: context.i18n.noResultsFound }),
            selectedOptions.length > 0 && /* @__PURE__ */ jsx67(CommandGroup, { children: selectedOptions.map((option) => /* @__PURE__ */ jsxs40(
              CommandItem,
              {
                className: "group flex gap-2 items-center",
                onSelect: () => {
                  if (isMultiSelect) {
                    onChange(
                      values.filter((v) => v !== option.value)
                    );
                  } else {
                    onChange([]);
                  }
                  if (!isMultiSelect) setOpen(false);
                },
                children: [
                  option.icon && option.icon,
                  /* @__PURE__ */ jsx67("span", { className: "text-accent-foreground truncate", children: option.label }),
                  /* @__PURE__ */ jsx67(Check, { className: "text-primary ms-auto" })
                ]
              },
              String(option.value)
            )) }),
            unselectedOptions.length > 0 && /* @__PURE__ */ jsxs40(Fragment2, { children: [
              selectedOptions.length > 0 && /* @__PURE__ */ jsx67(CommandSeparator, {}),
              /* @__PURE__ */ jsx67(CommandGroup, { children: unselectedOptions.map((option) => /* @__PURE__ */ jsxs40(
                CommandItem,
                {
                  className: "group flex gap-2 items-center",
                  value: option.label,
                  onSelect: () => {
                    if (isMultiSelect) {
                      const newValues = [...values, option.value];
                      if (field.maxSelections && newValues.length > field.maxSelections) {
                        return;
                      }
                      onChange(newValues);
                    } else {
                      onChange([option.value]);
                      setOpen(false);
                    }
                  },
                  children: [
                    option.icon && option.icon,
                    /* @__PURE__ */ jsx67("span", { className: "text-accent-foreground truncate", children: option.label }),
                    /* @__PURE__ */ jsx67(Check, { className: "text-primary ms-auto opacity-0" })
                  ]
                },
                String(option.value)
              )) })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
var FiltersContent = ({
  filters,
  fields,
  onChange
}) => {
  const context = useFilterContext();
  const fieldsMap = useMemo3(() => getFieldsMap(fields), [fields]);
  const updateFilter = useCallback2(
    (filterId, updates) => {
      onChange(
        filters.map((filter) => {
          if (filter.id === filterId) {
            const updatedFilter = { ...filter, ...updates };
            if (updates.operator === "empty" || updates.operator === "not_empty") {
              updatedFilter.values = [];
            }
            return updatedFilter;
          }
          return filter;
        })
      );
    },
    [filters, onChange]
  );
  const removeFilter = useCallback2(
    (filterId) => {
      onChange(filters.filter((filter) => filter.id !== filterId));
    },
    [filters, onChange]
  );
  return /* @__PURE__ */ jsx67(
    "div",
    {
      className: cn(
        filtersContainerVariants({
          variant: context.variant,
          size: context.size
        }),
        context.className
      ),
      children: filters.map((filter) => {
        const field = fieldsMap[filter.field];
        if (!field) return null;
        return /* @__PURE__ */ jsxs40(
          "div",
          {
            className: filterItemVariants({ variant: context.variant }),
            "data-slot": "filter-item",
            children: [
              /* @__PURE__ */ jsxs40(
                "div",
                {
                  className: filterFieldLabelVariants({
                    variant: context.variant,
                    size: context.size,
                    radius: context.radius
                  }),
                  children: [
                    field.icon,
                    field.label
                  ]
                }
              ),
              /* @__PURE__ */ jsx67(
                FilterOperatorDropdown,
                {
                  field,
                  operator: filter.operator,
                  values: filter.values,
                  onChange: (operator) => updateFilter(filter.id, { operator })
                }
              ),
              /* @__PURE__ */ jsx67(
                FilterValueSelector,
                {
                  field,
                  values: filter.values,
                  onChange: (values) => updateFilter(filter.id, { values }),
                  operator: filter.operator
                }
              ),
              /* @__PURE__ */ jsx67(FilterRemoveButton, { onClick: () => removeFilter(filter.id) })
            ]
          },
          filter.id
        );
      })
    }
  );
};
function Filters({
  filters,
  fields,
  onChange,
  className,
  showAddButton = true,
  addButtonText,
  addButtonIcon,
  addButtonClassName,
  addButton,
  variant = "outline",
  size = "md",
  radius = "md",
  i18n,
  showSearchInput = true,
  cursorPointer = true,
  trigger,
  allowMultiple = true,
  popoverContentClassName
}) {
  const [addFilterOpen, setAddFilterOpen] = useState8(false);
  const [selectedFieldForOptions, setSelectedFieldForOptions] = useState8(null);
  const [tempSelectedValues, setTempSelectedValues] = useState8([]);
  const mergedI18n = {
    ...DEFAULT_I18N,
    ...i18n,
    operators: {
      ...DEFAULT_I18N.operators,
      ...i18n?.operators
    },
    placeholders: {
      ...DEFAULT_I18N.placeholders,
      ...i18n?.placeholders
    },
    validation: {
      ...DEFAULT_I18N.validation,
      ...i18n?.validation
    }
  };
  const fieldsMap = useMemo3(() => getFieldsMap(fields), [fields]);
  const updateFilter = useCallback2(
    (filterId, updates) => {
      onChange(
        filters.map((filter) => {
          if (filter.id === filterId) {
            const updatedFilter = { ...filter, ...updates };
            if (updates.operator === "empty" || updates.operator === "not_empty") {
              updatedFilter.values = [];
            }
            return updatedFilter;
          }
          return filter;
        })
      );
    },
    [filters, onChange]
  );
  const removeFilter = useCallback2(
    (filterId) => {
      onChange(filters.filter((filter) => filter.id !== filterId));
    },
    [filters, onChange]
  );
  const addFilter = useCallback2(
    (fieldKey) => {
      const field = fieldsMap[fieldKey];
      if (field?.key) {
        if (field.type === "select" || field.type === "multiselect") {
          setSelectedFieldForOptions(field);
          const existingFilter = filters.find((f) => f.field === fieldKey);
          const initialValues = field.type === "multiselect" && existingFilter ? existingFilter.values : [];
          setTempSelectedValues(initialValues);
          return;
        }
        const defaultOperator = field.defaultOperator || (field.type === "daterange" ? "between" : field.type === "numberrange" ? "between" : field.type === "boolean" ? "is" : "is");
        let defaultValues = [];
        if ([
          "text",
          "number",
          "date",
          "email",
          "url",
          "tel",
          "time",
          "datetime"
        ].includes(field.type || "")) {
          defaultValues = [""];
        } else if (field.type === "daterange") {
          defaultValues = ["", ""];
        } else if (field.type === "numberrange") {
          defaultValues = [field.min || 0, field.max || 100];
        } else if (field.type === "boolean") {
          defaultValues = [false];
        } else if (field.type === "time") {
          defaultValues = [""];
        } else if (field.type === "datetime") {
          defaultValues = [""];
        }
        const newFilter = createFilter(
          fieldKey,
          defaultOperator,
          defaultValues
        );
        const newFilters = [...filters, newFilter];
        onChange(newFilters);
        setAddFilterOpen(false);
      }
    },
    [fieldsMap, filters, onChange]
  );
  const addFilterWithOption = useCallback2(
    (field, values, closePopover = true) => {
      if (!field.key) return;
      const defaultOperator = field.defaultOperator || (field.type === "multiselect" ? "is_any_of" : "is");
      const existingFilterIndex = filters.findIndex(
        (f) => f.field === field.key
      );
      if (existingFilterIndex >= 0) {
        const updatedFilters = [...filters];
        updatedFilters[existingFilterIndex] = {
          ...updatedFilters[existingFilterIndex],
          values
        };
        onChange(updatedFilters);
      } else {
        const newFilter = createFilter(
          field.key,
          defaultOperator,
          values
        );
        const newFilters = [...filters, newFilter];
        onChange(newFilters);
      }
      if (closePopover) {
        setAddFilterOpen(false);
        setSelectedFieldForOptions(null);
        setTempSelectedValues([]);
      } else {
        setTempSelectedValues(values);
      }
    },
    [filters, onChange]
  );
  const selectableFields = useMemo3(() => {
    const flatFields = flattenFields(fields);
    return flatFields.filter((field) => {
      if (!field.key || field.type === "separator") {
        return false;
      }
      if (allowMultiple) {
        return true;
      }
      return !filters.some((filter) => filter.field === field.key);
    });
  }, [fields, filters, allowMultiple]);
  return /* @__PURE__ */ jsx67(
    FilterContext.Provider,
    {
      value: {
        variant,
        size,
        radius,
        i18n: mergedI18n,
        cursorPointer,
        className,
        showAddButton,
        addButtonText,
        addButtonIcon,
        addButtonClassName,
        addButton,
        showSearchInput,
        trigger,
        allowMultiple
      },
      children: /* @__PURE__ */ jsxs40(
        "div",
        {
          className: cn(filtersContainerVariants({ variant, size }), className),
          children: [
            showAddButton && selectableFields.length > 0 && /* @__PURE__ */ jsxs40(
              Popover,
              {
                open: addFilterOpen,
                onOpenChange: (open) => {
                  setAddFilterOpen(open);
                  if (!open) {
                    setSelectedFieldForOptions(null);
                    setTempSelectedValues([]);
                  }
                },
                children: [
                  /* @__PURE__ */ jsx67(PopoverTrigger, { asChild: true, children: addButton ? addButton : /* @__PURE__ */ jsxs40(
                    "button",
                    {
                      className: cn(
                        filterAddButtonVariants({
                          variant,
                          size,
                          cursorPointer,
                          radius
                        }),
                        addButtonClassName
                      ),
                      type: "button",
                      title: mergedI18n.addFilterTitle,
                      children: [
                        addButtonIcon || /* @__PURE__ */ jsx67(Plus, {}),
                        addButtonText || mergedI18n.addFilter
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx67(
                    PopoverPopup,
                    {
                      className: cn("w-[200px] p-0", popoverContentClassName),
                      align: "start",
                      children: /* @__PURE__ */ jsx67(Command, { children: selectedFieldForOptions ? (
                        // Show original select/multiselect rendering without back button
                        /* @__PURE__ */ jsx67(
                          SelectOptionsPopover,
                          {
                            field: selectedFieldForOptions,
                            values: tempSelectedValues,
                            onChange: (values) => {
                              const shouldClosePopover = selectedFieldForOptions.type === "select";
                              addFilterWithOption(
                                selectedFieldForOptions,
                                values,
                                shouldClosePopover
                              );
                            },
                            onClose: () => setAddFilterOpen(false),
                            inline: true
                          }
                        )
                      ) : (
                        // Show field selection
                        /* @__PURE__ */ jsxs40(Fragment2, { children: [
                          showSearchInput && /* @__PURE__ */ jsx67(
                            CommandInput,
                            {
                              placeholder: mergedI18n.searchFields,
                              className: "h-9"
                            }
                          ),
                          /* @__PURE__ */ jsxs40(CommandList, { children: [
                            /* @__PURE__ */ jsx67(CommandEmpty, { children: mergedI18n.noFieldsFound }),
                            fields.map((item, index) => {
                              if (isFieldGroup(item)) {
                                const groupFields = item.fields.filter((field2) => {
                                  if (field2.type === "separator") {
                                    return true;
                                  }
                                  if (allowMultiple) {
                                    return true;
                                  }
                                  return !filters.some(
                                    (filter) => filter.field === field2.key
                                  );
                                });
                                if (groupFields.length === 0) return null;
                                return /* @__PURE__ */ jsx67(
                                  CommandGroup,
                                  {
                                    heading: item.group || "Fields",
                                    children: groupFields.map((field2, fieldIndex) => {
                                      if (field2.type === "separator") {
                                        return /* @__PURE__ */ jsx67(
                                          CommandSeparator,
                                          {},
                                          `separator-${fieldIndex}`
                                        );
                                      }
                                      return /* @__PURE__ */ jsxs40(
                                        CommandItem,
                                        {
                                          onSelect: () => field2.key && addFilter(field2.key),
                                          children: [
                                            field2.icon,
                                            /* @__PURE__ */ jsx67("span", { children: field2.label })
                                          ]
                                        },
                                        field2.key
                                      );
                                    })
                                  },
                                  `group-${index}`
                                );
                              }
                              if (isGroupLevelField(item)) {
                                const groupFields = item.fields?.filter((field2) => {
                                  if (field2.type === "separator") {
                                    return true;
                                  }
                                  if (allowMultiple) {
                                    return true;
                                  }
                                  return !filters.some(
                                    (filter) => filter.field === field2.key
                                  );
                                });
                                if (!groupFields || groupFields.length === 0)
                                  return null;
                                return /* @__PURE__ */ jsx67(
                                  CommandGroup,
                                  {
                                    heading: item.group || "Fields",
                                    children: groupFields.map((field2, fieldIndex) => {
                                      if (field2.type === "separator") {
                                        return /* @__PURE__ */ jsx67(
                                          CommandSeparator,
                                          {},
                                          `separator-${fieldIndex}`
                                        );
                                      }
                                      return /* @__PURE__ */ jsxs40(
                                        CommandItem,
                                        {
                                          onSelect: () => field2.key && addFilter(field2.key),
                                          children: [
                                            field2.icon,
                                            /* @__PURE__ */ jsx67("span", { children: field2.label })
                                          ]
                                        },
                                        field2.key
                                      );
                                    })
                                  },
                                  `group-${index}`
                                );
                              }
                              const field = item;
                              if (field.type === "separator") {
                                return /* @__PURE__ */ jsx67(CommandSeparator, {}, `separator-${index}`);
                              }
                              return /* @__PURE__ */ jsxs40(
                                CommandItem,
                                {
                                  onSelect: () => field.key && addFilter(field.key),
                                  children: [
                                    field.icon,
                                    /* @__PURE__ */ jsx67("span", { children: field.label })
                                  ]
                                },
                                field.key
                              );
                            })
                          ] })
                        ] })
                      ) })
                    }
                  )
                ]
              }
            ),
            filters.map((filter) => {
              const field = fieldsMap[filter.field];
              if (!field) return null;
              return /* @__PURE__ */ jsxs40(
                "div",
                {
                  className: filterItemVariants({ variant }),
                  "data-slot": "filter-item",
                  children: [
                    /* @__PURE__ */ jsxs40(
                      "div",
                      {
                        className: filterFieldLabelVariants({
                          variant,
                          size,
                          radius
                        }),
                        children: [
                          field.icon,
                          field.label
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx67(
                      FilterOperatorDropdown,
                      {
                        field,
                        operator: filter.operator,
                        values: filter.values,
                        onChange: (operator) => updateFilter(filter.id, { operator })
                      }
                    ),
                    /* @__PURE__ */ jsx67(
                      FilterValueSelector,
                      {
                        field,
                        values: filter.values,
                        onChange: (values) => updateFilter(filter.id, { values }),
                        operator: filter.operator
                      }
                    ),
                    /* @__PURE__ */ jsx67(FilterRemoveButton, { onClick: () => removeFilter(filter.id) })
                  ]
                },
                filter.id
              );
            })
          ]
        }
      )
    }
  );
}
var createFilter = (field, operator, values = []) => ({
  id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
  field,
  operator: operator || "is",
  values
});
var createFilterGroup = (id, label, fields, initialFilters = []) => ({
  id,
  label,
  filters: initialFilters,
  fields
});

// src/components/ui/form.tsx
import { Form as FormPrimitive } from "@base-ui/react/form";
import { jsx as jsx68 } from "react/jsx-runtime";
function Form({ className, ...props }) {
  return /* @__PURE__ */ jsx68(
    FormPrimitive,
    {
      className: cn("flex w-full flex-col gap-4", className),
      "data-slot": "form",
      ...props
    }
  );
}

// src/components/ui/group.tsx
import { mergeProps as mergeProps4 } from "@base-ui/react/merge-props";
import { useRender as useRender4 } from "@base-ui/react/use-render";
import { cva as cva9 } from "class-variance-authority";
import { jsx as jsx69 } from "react/jsx-runtime";
var groupVariants = cva9(
  "flex w-fit *:focus-visible:z-1 has-[>[data-slot=group]]:gap-2 *:has-focus-visible:z-1 dark:*:[[data-slot=separator]:has(~button:hover):not(:has(~[data-slot=separator]~[data-slot]:hover)),[data-slot=separator]:has(~[data-slot][data-pressed]):not(:has(~[data-slot=separator]~[data-slot][data-pressed]))]:before:bg-input/64 dark:*:[button:hover~[data-slot=separator]:not([data-slot]:hover~[data-slot=separator]~[data-slot=separator]),[data-slot][data-pressed]~[data-slot=separator]:not([data-slot][data-pressed]~[data-slot=separator]~[data-slot=separator])]:before:bg-input/64",
  {
    defaultVariants: {
      orientation: "horizontal"
    },
    variants: {
      orientation: {
        horizontal: "*:[[data-slot]~[data-slot]:not([data-slot=separator])]:before:-start-[0.5px] *:data-slot:not-data-[slot=separator]:has-[~[data-slot]]:before:-end-[0.5px] *:pointer-coarse:after:min-w-auto *:data-slot:has-[~[data-slot]]:rounded-e-none *:data-slot:has-[~[data-slot]]:border-e-0 *:data-slot:has-[~[data-slot]]:before:rounded-e-none *:[[data-slot]~[data-slot]]:rounded-s-none *:[[data-slot]~[data-slot]]:border-s-0 *:[[data-slot]~[data-slot]]:before:rounded-s-none",
        vertical: "*:[[data-slot]~[data-slot]:not([data-slot=separator])]:before:-top-[0.5px] *:data-slot:not-data-[slot=separator]:has-[~[data-slot]]:before:-bottom-[0.5px] flex-col *:pointer-coarse:after:min-h-auto *:data-slot:has-[~[data-slot]]:rounded-b-none *:data-slot:has-[~[data-slot]]:border-b-0 *:data-slot:not-data-[slot=separator]:has-[~[data-slot]]:before:hidden *:data-slot:has-[~[data-slot]]:before:rounded-b-none dark:*:last:before:hidden dark:*:first:before:block *:[[data-slot]~[data-slot]]:rounded-t-none *:[[data-slot]~[data-slot]]:border-t-0 *:[[data-slot]~[data-slot]]:before:rounded-t-none"
      }
    }
  }
);
function Group({
  className,
  orientation,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx69(
    "div",
    {
      className: cn(groupVariants({ orientation }), className),
      "data-orientation": orientation,
      "data-slot": "group",
      role: "group",
      ...props,
      children
    }
  );
}
function GroupText({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "relative inline-flex items-center whitespace-nowrap gap-2 rounded-lg border border-input bg-muted not-dark:bg-clip-padding px-[calc(--spacing(3)-1px)] text-muted-foreground text-base sm:text-sm shadow-xs/5 outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/6%)] dark:bg-input/64 dark:before:shadow-[0_-1px_--theme(--color-white/6%)] [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 [&_svg]:-mx-0.5",
      className
    ),
    "data-slot": "group-text"
  };
  return useRender4({
    defaultTagName: "div",
    props: mergeProps4(defaultProps, props),
    render
  });
}
function GroupSeparator({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx69(
    Separator,
    {
      className: cn(
        "[[data-slot=input-control]:focus-within+&,[data-slot=input-group]:focus-within+&,[data-slot=select-trigger]:focus-visible+*+&,[data-slot=number-field]:focus-within+input+&]:-translate-x-px pointer-events-none relative z-2 bg-input before:absolute before:inset-0 has-[+[data-slot=input-control]:focus-within,+[data-slot=input-group]:focus-within,+[data-slot=select-trigger]:focus-visible+*,+[data-slot=number-field]:focus-within]:translate-x-px has-[+[data-slot=input-control]:focus-within,+[data-slot=input-group]:focus-within,+[data-slot=select-trigger]:focus-visible+*,+[data-slot=number-field]:focus-within]:bg-ring dark:before:bg-input/32 [[data-slot=input-control]:focus-within+&,[data-slot=input-group]:focus-within+&,[data-slot=select-trigger]:focus-visible+*+&,[data-slot=number-field]:focus-within+&,[data-slot=number-field]:focus-within+input+&]:bg-ring",
        className
      ),
      orientation,
      ...props
    }
  );
}

// src/components/ui/hover-card.tsx
import { HoverCard as HoverCardPrimitive } from "radix-ui";
import { jsx as jsx70 } from "react/jsx-runtime";
function HoverCard({
  ...props
}) {
  return /* @__PURE__ */ jsx70(HoverCardPrimitive.Root, { "data-slot": "hover-card", ...props });
}
function HoverCardTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx70(HoverCardPrimitive.Trigger, { "data-slot": "hover-card-trigger", ...props });
}
function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx70(HoverCardPrimitive.Portal, { "data-slot": "hover-card-portal", children: /* @__PURE__ */ jsx70(
    HoverCardPrimitive.Content,
    {
      "data-slot": "hover-card-content",
      align,
      sideOffset,
      className: cn(
        "z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      ),
      ...props
    }
  ) });
}

// src/components/ui/hover-card-sides.tsx
import { jsx as jsx71, jsxs as jsxs41 } from "react/jsx-runtime";
var HOVER_CARD_SIDES = ["left", "top", "bottom", "right"];
function HoverCardSides() {
  return /* @__PURE__ */ jsx71("div", { className: "flex flex-wrap justify-center gap-2", children: HOVER_CARD_SIDES.map((side) => /* @__PURE__ */ jsxs41(HoverCard, { openDelay: 100, closeDelay: 100, children: [
    /* @__PURE__ */ jsx71(HoverCardTrigger, { asChild: true, children: /* @__PURE__ */ jsx71(Button, { variant: "outline", className: "capitalize", children: side }) }),
    /* @__PURE__ */ jsx71(HoverCardContent, { side, children: /* @__PURE__ */ jsxs41("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsx71("h4", { className: "font-medium", children: "Hover Card" }),
      /* @__PURE__ */ jsxs41("p", { children: [
        "This hover card appears on the ",
        side,
        " side of the trigger."
      ] })
    ] }) })
  ] }, side)) });
}

// src/components/ui/input-badge.tsx
import { jsx as jsx72, jsxs as jsxs42 } from "react/jsx-runtime";
function InputBadge() {
  return /* @__PURE__ */ jsxs42(Field, { children: [
    /* @__PURE__ */ jsxs42(FieldLabel, { htmlFor: "input-badge", children: [
      "Webhook URL",
      " ",
      /* @__PURE__ */ jsx72(Badge, { variant: "secondary", className: "ml-auto", children: "Beta" })
    ] }),
    /* @__PURE__ */ jsx72(
      Input,
      {
        id: "input-badge",
        type: "url",
        placeholder: "https://api.example.com/webhook"
      }
    )
  ] });
}

// src/components/ui/input-basic.tsx
import { jsx as jsx73 } from "react/jsx-runtime";
function InputBasic() {
  return /* @__PURE__ */ jsx73(Input, { placeholder: "Enter text" });
}

// src/components/ui/input-button-group.tsx
import { jsx as jsx74, jsxs as jsxs43 } from "react/jsx-runtime";
function InputButtonGroup() {
  return /* @__PURE__ */ jsxs43(Field, { children: [
    /* @__PURE__ */ jsx74(FieldLabel, { htmlFor: "input-button-group", children: "Search" }),
    /* @__PURE__ */ jsxs43(ButtonGroup, { children: [
      /* @__PURE__ */ jsx74(Input, { id: "input-button-group", placeholder: "Type to search..." }),
      /* @__PURE__ */ jsx74(Button, { variant: "outline", children: "Search" })
    ] })
  ] });
}

// src/components/ui/input-disabled.tsx
import { jsx as jsx75, jsxs as jsxs44 } from "react/jsx-runtime";
function InputDisabled() {
  return /* @__PURE__ */ jsxs44(Field, { "data-disabled": true, children: [
    /* @__PURE__ */ jsx75(FieldLabel, { htmlFor: "input-demo-disabled", children: "Email" }),
    /* @__PURE__ */ jsx75(
      Input,
      {
        id: "input-demo-disabled",
        type: "email",
        placeholder: "Email",
        disabled: true
      }
    ),
    /* @__PURE__ */ jsx75(FieldDescription, { children: "This field is currently disabled." })
  ] });
}

// src/components/ui/input-field.tsx
import { jsx as jsx76, jsxs as jsxs45 } from "react/jsx-runtime";
function InputField() {
  return /* @__PURE__ */ jsxs45(Field, { children: [
    /* @__PURE__ */ jsx76(FieldLabel, { htmlFor: "input-field-username", children: "Username" }),
    /* @__PURE__ */ jsx76(
      Input,
      {
        id: "input-field-username",
        type: "text",
        placeholder: "Enter your username"
      }
    ),
    /* @__PURE__ */ jsx76(FieldDescription, { children: "Choose a unique username for your account." })
  ] });
}

// src/components/ui/input-fieldgroup.tsx
import { jsx as jsx77, jsxs as jsxs46 } from "react/jsx-runtime";
function InputFieldgroup() {
  return /* @__PURE__ */ jsxs46(FieldGroup, { children: [
    /* @__PURE__ */ jsxs46(Field, { children: [
      /* @__PURE__ */ jsx77(FieldLabel, { htmlFor: "fieldgroup-name", children: "Name" }),
      /* @__PURE__ */ jsx77(Input, { id: "fieldgroup-name", placeholder: "Jordan Lee" })
    ] }),
    /* @__PURE__ */ jsxs46(Field, { children: [
      /* @__PURE__ */ jsx77(FieldLabel, { htmlFor: "fieldgroup-email", children: "Email" }),
      /* @__PURE__ */ jsx77(
        Input,
        {
          id: "fieldgroup-email",
          type: "email",
          placeholder: "name@example.com"
        }
      ),
      /* @__PURE__ */ jsx77(FieldDescription, { children: "We'll send updates to this address." })
    ] }),
    /* @__PURE__ */ jsxs46(Field, { orientation: "horizontal", children: [
      /* @__PURE__ */ jsx77(Button, { type: "reset", variant: "outline", children: "Reset" }),
      /* @__PURE__ */ jsx77(Button, { type: "submit", children: "Submit" })
    ] })
  ] });
}

// src/components/ui/input-file.tsx
import { jsx as jsx78, jsxs as jsxs47 } from "react/jsx-runtime";
function InputFile() {
  return /* @__PURE__ */ jsxs47(Field, { children: [
    /* @__PURE__ */ jsx78(FieldLabel, { htmlFor: "picture", children: "Picture" }),
    /* @__PURE__ */ jsx78(Input, { id: "picture", type: "file" }),
    /* @__PURE__ */ jsx78(FieldDescription, { children: "Select a picture to upload." })
  ] });
}

// src/components/ui/input-form.tsx
import { jsx as jsx79, jsxs as jsxs48 } from "react/jsx-runtime";
function InputForm() {
  const countries = [
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" }
  ];
  return /* @__PURE__ */ jsx79("form", { className: "w-full max-w-sm", children: /* @__PURE__ */ jsxs48(FieldGroup, { children: [
    /* @__PURE__ */ jsxs48(Field, { children: [
      /* @__PURE__ */ jsx79(FieldLabel, { htmlFor: "form-name", children: "Name" }),
      /* @__PURE__ */ jsx79(
        Input,
        {
          id: "form-name",
          type: "text",
          placeholder: "Evil Rabbit",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs48(Field, { children: [
      /* @__PURE__ */ jsx79(FieldLabel, { htmlFor: "form-email", children: "Email" }),
      /* @__PURE__ */ jsx79(Input, { id: "form-email", type: "email", placeholder: "john@example.com" }),
      /* @__PURE__ */ jsx79(FieldDescription, { children: "We'll never share your email with anyone." })
    ] }),
    /* @__PURE__ */ jsxs48("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs48(Field, { children: [
        /* @__PURE__ */ jsx79(FieldLabel, { htmlFor: "form-phone", children: "Phone" }),
        /* @__PURE__ */ jsx79(Input, { id: "form-phone", type: "tel", placeholder: "+1 (555) 123-4567" })
      ] }),
      /* @__PURE__ */ jsxs48(Field, { children: [
        /* @__PURE__ */ jsx79(FieldLabel, { htmlFor: "form-country", children: "Country" }),
        /* @__PURE__ */ jsxs48(Select, { defaultValue: "us", children: [
          /* @__PURE__ */ jsx79(SelectTrigger, { id: "form-country", children: /* @__PURE__ */ jsx79(SelectValue, {}) }),
          /* @__PURE__ */ jsx79(SelectContent, { children: /* @__PURE__ */ jsx79(SelectGroup, { children: countries.map((country) => /* @__PURE__ */ jsx79(SelectItem, { value: country.value, children: country.label }, country.value)) }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs48(Field, { children: [
      /* @__PURE__ */ jsx79(FieldLabel, { htmlFor: "form-address", children: "Address" }),
      /* @__PURE__ */ jsx79(Input, { id: "form-address", type: "text", placeholder: "123 Main St" })
    ] }),
    /* @__PURE__ */ jsxs48(Field, { orientation: "horizontal", children: [
      /* @__PURE__ */ jsx79(Button, { type: "button", variant: "outline", children: "Cancel" }),
      /* @__PURE__ */ jsx79(Button, { type: "submit", children: "Submit" })
    ] })
  ] }) });
}

// src/components/ui/input-grid.tsx
import { jsx as jsx80, jsxs as jsxs49 } from "react/jsx-runtime";
function InputGrid() {
  return /* @__PURE__ */ jsxs49(FieldGroup, { className: "grid max-w-sm grid-cols-2", children: [
    /* @__PURE__ */ jsxs49(Field, { children: [
      /* @__PURE__ */ jsx80(FieldLabel, { htmlFor: "first-name", children: "First Name" }),
      /* @__PURE__ */ jsx80(Input, { id: "first-name", placeholder: "Jordan" })
    ] }),
    /* @__PURE__ */ jsxs49(Field, { children: [
      /* @__PURE__ */ jsx80(FieldLabel, { htmlFor: "last-name", children: "Last Name" }),
      /* @__PURE__ */ jsx80(Input, { id: "last-name", placeholder: "Lee" })
    ] })
  ] });
}

// src/components/ui/input-group-basic.tsx
import { jsx as jsx81, jsxs as jsxs50 } from "react/jsx-runtime";
function InputGroupBasic() {
  return /* @__PURE__ */ jsxs50(FieldGroup, { children: [
    /* @__PURE__ */ jsxs50(Field, { children: [
      /* @__PURE__ */ jsx81(FieldLabel, { htmlFor: "input-default-01", children: "Default (No Input Group)" }),
      /* @__PURE__ */ jsx81(Input, { placeholder: "Placeholder", id: "input-default-01" })
    ] }),
    /* @__PURE__ */ jsxs50(Field, { children: [
      /* @__PURE__ */ jsx81(FieldLabel, { htmlFor: "input-group-02", children: "Input Group" }),
      /* @__PURE__ */ jsx81(InputGroup, { children: /* @__PURE__ */ jsx81(InputGroupInput, { id: "input-group-02", placeholder: "Placeholder" }) })
    ] }),
    /* @__PURE__ */ jsxs50(Field, { "data-disabled": "true", children: [
      /* @__PURE__ */ jsx81(FieldLabel, { htmlFor: "input-disabled-03", children: "Disabled" }),
      /* @__PURE__ */ jsx81(InputGroup, { children: /* @__PURE__ */ jsx81(
        InputGroupInput,
        {
          id: "input-disabled-03",
          placeholder: "This field is disabled",
          disabled: true
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs50(Field, { "data-invalid": "true", children: [
      /* @__PURE__ */ jsx81(FieldLabel, { htmlFor: "input-invalid-04", children: "Invalid" }),
      /* @__PURE__ */ jsx81(InputGroup, { children: /* @__PURE__ */ jsx81(
        InputGroupInput,
        {
          id: "input-invalid-04",
          placeholder: "This field is invalid",
          "aria-invalid": "true"
        }
      ) })
    ] })
  ] });
}

// src/components/ui/input-group-block-end.tsx
import { jsx as jsx82, jsxs as jsxs51 } from "react/jsx-runtime";
function InputGroupBlockEnd() {
  return /* @__PURE__ */ jsxs51(FieldGroup, { className: "max-w-sm", children: [
    /* @__PURE__ */ jsxs51(Field, { children: [
      /* @__PURE__ */ jsx82(FieldLabel, { htmlFor: "block-end-input", children: "Input" }),
      /* @__PURE__ */ jsxs51(InputGroup, { className: "h-auto", children: [
        /* @__PURE__ */ jsx82(InputGroupInput, { id: "block-end-input", placeholder: "Enter amount" }),
        /* @__PURE__ */ jsx82(InputGroupAddon, { align: "block-end", children: /* @__PURE__ */ jsx82(InputGroupText, { children: "USD" }) })
      ] }),
      /* @__PURE__ */ jsx82(FieldDescription, { children: "Footer positioned below the input." })
    ] }),
    /* @__PURE__ */ jsxs51(Field, { children: [
      /* @__PURE__ */ jsx82(FieldLabel, { htmlFor: "block-end-textarea", children: "Textarea" }),
      /* @__PURE__ */ jsxs51(InputGroup, { children: [
        /* @__PURE__ */ jsx82(
          InputGroupTextarea,
          {
            id: "block-end-textarea",
            placeholder: "Write a comment..."
          }
        ),
        /* @__PURE__ */ jsxs51(InputGroupAddon, { align: "block-end", children: [
          /* @__PURE__ */ jsx82(InputGroupText, { children: "0/280" }),
          /* @__PURE__ */ jsx82(InputGroupButton, { variant: "default", size: "sm", className: "ml-auto", children: "Post" })
        ] })
      ] }),
      /* @__PURE__ */ jsx82(FieldDescription, { children: "Footer positioned below the textarea." })
    ] })
  ] });
}

// src/components/ui/input-group-block-start.tsx
import { CopyIcon, FileCodeIcon } from "lucide-react";
import { jsx as jsx83, jsxs as jsxs52 } from "react/jsx-runtime";
function InputGroupBlockStart() {
  return /* @__PURE__ */ jsxs52(FieldGroup, { className: "max-w-sm", children: [
    /* @__PURE__ */ jsxs52(Field, { children: [
      /* @__PURE__ */ jsx83(FieldLabel, { htmlFor: "block-start-input", children: "Input" }),
      /* @__PURE__ */ jsxs52(InputGroup, { className: "h-auto", children: [
        /* @__PURE__ */ jsx83(
          InputGroupInput,
          {
            id: "block-start-input",
            placeholder: "Enter your name"
          }
        ),
        /* @__PURE__ */ jsx83(InputGroupAddon, { align: "block-start", children: /* @__PURE__ */ jsx83(InputGroupText, { children: "Full Name" }) })
      ] }),
      /* @__PURE__ */ jsx83(FieldDescription, { children: "Header positioned above the input." })
    ] }),
    /* @__PURE__ */ jsxs52(Field, { children: [
      /* @__PURE__ */ jsx83(FieldLabel, { htmlFor: "block-start-textarea", children: "Textarea" }),
      /* @__PURE__ */ jsxs52(InputGroup, { children: [
        /* @__PURE__ */ jsx83(
          InputGroupTextarea,
          {
            id: "block-start-textarea",
            placeholder: "console.log('Hello, world!');",
            className: "font-mono text-sm"
          }
        ),
        /* @__PURE__ */ jsxs52(InputGroupAddon, { align: "block-start", children: [
          /* @__PURE__ */ jsx83(FileCodeIcon, { className: "text-muted-foreground" }),
          /* @__PURE__ */ jsx83(InputGroupText, { className: "font-mono", children: "script.js" }),
          /* @__PURE__ */ jsxs52(InputGroupButton, { size: "icon-xs", className: "ml-auto", children: [
            /* @__PURE__ */ jsx83(CopyIcon, {}),
            /* @__PURE__ */ jsx83("span", { className: "sr-only", children: "Copy" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx83(FieldDescription, { children: "Header positioned above the textarea." })
    ] })
  ] });
}

// src/components/ui/input-group-button-group.tsx
import { jsx as jsx84, jsxs as jsxs53 } from "react/jsx-runtime";

// src/components/ui/input-group-button.tsx
import * as React13 from "react";
import {
  IconCheck,
  IconCopy,
  IconInfoCircle,
  IconStar
} from "@tabler/icons-react";

// src/hooks/use-copy-to-clipboard.ts
import * as React12 from "react";

// src/components/ui/input-group-button.tsx
import { jsx as jsx85, jsxs as jsxs54 } from "react/jsx-runtime";

// src/components/ui/input-group-custom.tsx
import { jsx as jsx86, jsxs as jsxs55 } from "react/jsx-runtime";

// src/components/ui/input-group-dropdown.tsx
import { jsx as jsx87, jsxs as jsxs56 } from "react/jsx-runtime";
function InputGroupDropdown() {
  return /* @__PURE__ */ jsxs56("div", { className: "grid w-full max-w-sm gap-4", children: [
    /* @__PURE__ */ jsxs56(InputGroup, { children: [
      /* @__PURE__ */ jsx87(InputGroupInput, { placeholder: "Enter file name" }),
      /* @__PURE__ */ jsx87(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxs56(DropdownMenu, { children: [
        /* @__PURE__ */ jsx87(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx87(InputGroupButton, { variant: "ghost", "aria-label": "More", size: "icon-xs", children: /* @__PURE__ */ jsx87(HugeiconsIcon, { icon: MoreHorizontalIcon }) }) }),
        /* @__PURE__ */ jsx87(DropdownMenuContent, { align: "end", sideOffset: 8, alignOffset: -4, children: /* @__PURE__ */ jsxs56(DropdownMenuGroup, { children: [
          /* @__PURE__ */ jsx87(DropdownMenuItem, { children: "Settings" }),
          /* @__PURE__ */ jsx87(DropdownMenuItem, { children: "Copy path" }),
          /* @__PURE__ */ jsx87(DropdownMenuItem, { children: "Open location" })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs56(InputGroup, { children: [
      /* @__PURE__ */ jsx87(InputGroupInput, { placeholder: "Enter search query" }),
      /* @__PURE__ */ jsx87(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxs56(DropdownMenu, { children: [
        /* @__PURE__ */ jsx87(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs56(InputGroupButton, { variant: "ghost", className: "pr-1.5! text-xs", children: [
          "Search In... ",
          /* @__PURE__ */ jsx87(HugeiconsIcon, { icon: ArrowDown01Icon, className: "size-3" })
        ] }) }),
        /* @__PURE__ */ jsx87(DropdownMenuContent, { align: "end", sideOffset: 8, alignOffset: -4, children: /* @__PURE__ */ jsxs56(DropdownMenuGroup, { children: [
          /* @__PURE__ */ jsx87(DropdownMenuItem, { children: "Documentation" }),
          /* @__PURE__ */ jsx87(DropdownMenuItem, { children: "Blog Posts" }),
          /* @__PURE__ */ jsx87(DropdownMenuItem, { children: "Changelog" })
        ] }) })
      ] }) })
    ] })
  ] });
}

// src/components/ui/input-group-icon.tsx
import {
  CheckIcon,
  CreditCardIcon as CreditCardIcon3,
  InfoIcon,
  MailIcon as MailIcon2,
  SearchIcon as SearchIcon2,
  StarIcon
} from "lucide-react";
import { jsx as jsx88, jsxs as jsxs57 } from "react/jsx-runtime";

// src/components/ui/input-group-in-card.tsx
import { ExternalLinkIcon, MailIcon as MailIcon3 } from "lucide-react";
import { jsx as jsx89, jsxs as jsxs58 } from "react/jsx-runtime";
function InputGroupInCard() {
  return /* @__PURE__ */ jsxs58(Card, { className: "w-full", children: [
    /* @__PURE__ */ jsxs58(CardHeader, { children: [
      /* @__PURE__ */ jsx89(CardTitle, { children: "Card with Input Group" }),
      /* @__PURE__ */ jsx89(CardDescription, { children: "This is a card with an input group." })
    ] }),
    /* @__PURE__ */ jsx89(CardContent, { children: /* @__PURE__ */ jsxs58(FieldGroup, { children: [
      /* @__PURE__ */ jsxs58(Field, { children: [
        /* @__PURE__ */ jsx89(FieldLabel, { htmlFor: "email-input", children: "Email Address" }),
        /* @__PURE__ */ jsxs58(InputGroup, { children: [
          /* @__PURE__ */ jsx89(
            InputGroupInput,
            {
              id: "email-input",
              type: "email",
              placeholder: "you@example.com"
            }
          ),
          /* @__PURE__ */ jsx89(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx89(MailIcon3, {}) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs58(Field, { children: [
        /* @__PURE__ */ jsx89(FieldLabel, { htmlFor: "website-input", children: "Website URL" }),
        /* @__PURE__ */ jsxs58(InputGroup, { children: [
          /* @__PURE__ */ jsx89(InputGroupAddon, { children: /* @__PURE__ */ jsx89(InputGroupText, { children: "https://" }) }),
          /* @__PURE__ */ jsx89(InputGroupInput, { id: "website-input", placeholder: "example.com" }),
          /* @__PURE__ */ jsx89(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx89(ExternalLinkIcon, {}) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs58(Field, { children: [
        /* @__PURE__ */ jsx89(FieldLabel, { htmlFor: "feedback-textarea", children: "Feedback & Comments" }),
        /* @__PURE__ */ jsxs58(InputGroup, { children: [
          /* @__PURE__ */ jsx89(
            InputGroupTextarea,
            {
              id: "feedback-textarea",
              placeholder: "Share your thoughts...",
              className: "min-h-[100px]"
            }
          ),
          /* @__PURE__ */ jsx89(InputGroupAddon, { align: "block-end", children: /* @__PURE__ */ jsx89(InputGroupText, { children: "0/500 characters" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs58(CardFooter, { className: "justify-end gap-2", children: [
      /* @__PURE__ */ jsx89(Button, { variant: "outline", children: "Cancel" }),
      /* @__PURE__ */ jsx89(Button, { children: "Submit" })
    ] })
  ] });
}

// src/components/ui/input-group-inline-end.tsx
import { EyeOffIcon } from "lucide-react";
import { jsx as jsx90, jsxs as jsxs59 } from "react/jsx-runtime";
function InputGroupInlineEnd() {
  return /* @__PURE__ */ jsxs59(Field, { className: "max-w-sm", children: [
    /* @__PURE__ */ jsx90(FieldLabel, { htmlFor: "inline-end-input", children: "Input" }),
    /* @__PURE__ */ jsxs59(InputGroup, { children: [
      /* @__PURE__ */ jsx90(
        InputGroupInput,
        {
          id: "inline-end-input",
          type: "password",
          placeholder: "Enter password"
        }
      ),
      /* @__PURE__ */ jsx90(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx90(EyeOffIcon, {}) })
    ] }),
    /* @__PURE__ */ jsx90(FieldDescription, { children: "Icon positioned at the end." })
  ] });
}

// src/components/ui/input-group-inline-start.tsx
import { SearchIcon as SearchIcon3 } from "lucide-react";
import { jsx as jsx91, jsxs as jsxs60 } from "react/jsx-runtime";
function InputGroupInlineStart() {
  return /* @__PURE__ */ jsxs60(Field, { className: "max-w-sm", children: [
    /* @__PURE__ */ jsx91(FieldLabel, { htmlFor: "inline-start-input", children: "Input" }),
    /* @__PURE__ */ jsxs60(InputGroup, { children: [
      /* @__PURE__ */ jsx91(InputGroupInput, { id: "inline-start-input", placeholder: "Search..." }),
      /* @__PURE__ */ jsx91(InputGroupAddon, { align: "inline-start", children: /* @__PURE__ */ jsx91(SearchIcon3, { className: "text-muted-foreground" }) })
    ] }),
    /* @__PURE__ */ jsx91(FieldDescription, { children: "Icon positioned at the start." })
  ] });
}

// src/components/ui/kbd.tsx
import { jsx as jsx92 } from "react/jsx-runtime";
function Kbd({ className, ...props }) {
  return /* @__PURE__ */ jsx92(
    "kbd",
    {
      "data-slot": "kbd",
      className: cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*='size-'])]:size-3",
        className
      ),
      ...props
    }
  );
}
function KbdGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx92(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: cn("inline-flex items-center gap-1", className),
      ...props
    }
  );
}

// src/components/ui/input-group-kbd.tsx
import { SearchIcon as SearchIcon4 } from "lucide-react";
import { jsx as jsx93, jsxs as jsxs61 } from "react/jsx-runtime";
function InputGroupKbd() {
  return /* @__PURE__ */ jsxs61(InputGroup, { className: "max-w-sm", children: [
    /* @__PURE__ */ jsx93(InputGroupInput, { placeholder: "Search..." }),
    /* @__PURE__ */ jsx93(InputGroupAddon, { children: /* @__PURE__ */ jsx93(SearchIcon4, { className: "text-muted-foreground" }) }),
    /* @__PURE__ */ jsx93(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx93(Kbd, { children: "\u2318K" }) })
  ] });
}

// src/components/ui/input-group-label.tsx
import { InfoIcon as InfoIcon2 } from "lucide-react";
import { jsx as jsx94, jsxs as jsxs62 } from "react/jsx-runtime";

// src/components/ui/input-group-spinner.tsx
import { LoaderIcon } from "lucide-react";
import { jsx as jsx95, jsxs as jsxs63 } from "react/jsx-runtime";

// src/components/ui/input-group-text.tsx
import { jsx as jsx96, jsxs as jsxs64 } from "react/jsx-runtime";

// src/components/ui/input-group-textarea-examples.tsx
import {
  ArrowUpIcon as ArrowUpIcon2,
  CodeIcon,
  CopyIcon as CopyIcon2,
  InfoIcon as InfoIcon3,
  RefreshCwIcon
} from "lucide-react";
import { jsx as jsx97, jsxs as jsxs65 } from "react/jsx-runtime";
function InputGroupTextareaExamples() {
  return /* @__PURE__ */ jsxs65(FieldGroup, { children: [
    /* @__PURE__ */ jsxs65(Field, { children: [
      /* @__PURE__ */ jsx97(FieldLabel, { htmlFor: "textarea-header-footer-12", children: "Default Textarea (No Input Group)" }),
      /* @__PURE__ */ jsx97(
        Textarea,
        {
          id: "textarea-header-footer-12",
          placeholder: "Enter your text here..."
        }
      )
    ] }),
    /* @__PURE__ */ jsxs65(Field, { children: [
      /* @__PURE__ */ jsx97(FieldLabel, { htmlFor: "textarea-header-footer-13", children: "Input Group" }),
      /* @__PURE__ */ jsx97(InputGroup, { children: /* @__PURE__ */ jsx97(
        InputGroupTextarea,
        {
          id: "textarea-header-footer-13",
          placeholder: "Enter your text here..."
        }
      ) }),
      /* @__PURE__ */ jsx97(FieldDescription, { children: "This is a description of the input group." })
    ] }),
    /* @__PURE__ */ jsxs65(Field, { "data-invalid": "true", children: [
      /* @__PURE__ */ jsx97(FieldLabel, { htmlFor: "textarea-header-footer-14", children: "Invalid" }),
      /* @__PURE__ */ jsx97(InputGroup, { children: /* @__PURE__ */ jsx97(
        InputGroupTextarea,
        {
          id: "textarea-header-footer-14",
          placeholder: "Enter your text here...",
          "aria-invalid": "true"
        }
      ) }),
      /* @__PURE__ */ jsx97(FieldDescription, { children: "This is a description of the input group." })
    ] }),
    /* @__PURE__ */ jsxs65(Field, { "data-disabled": "true", children: [
      /* @__PURE__ */ jsx97(FieldLabel, { htmlFor: "textarea-header-footer-15", children: "Disabled" }),
      /* @__PURE__ */ jsx97(InputGroup, { children: /* @__PURE__ */ jsx97(
        InputGroupTextarea,
        {
          id: "textarea-header-footer-15",
          placeholder: "Enter your text here...",
          disabled: true
        }
      ) }),
      /* @__PURE__ */ jsx97(FieldDescription, { children: "This is a description of the input group." })
    ] }),
    /* @__PURE__ */ jsxs65(Field, { children: [
      /* @__PURE__ */ jsx97(FieldLabel, { htmlFor: "prompt-31", children: "Addon (block-start)" }),
      /* @__PURE__ */ jsxs65(InputGroup, { children: [
        /* @__PURE__ */ jsx97(InputGroupTextarea, { id: "prompt-31" }),
        /* @__PURE__ */ jsxs65(InputGroupAddon, { align: "block-start", children: [
          /* @__PURE__ */ jsx97(InputGroupText, { children: "Ask, Search or Chat..." }),
          /* @__PURE__ */ jsx97(InfoIcon3, { className: "ml-auto text-muted-foreground" })
        ] })
      ] }),
      /* @__PURE__ */ jsx97(FieldDescription, { children: "This is a description of the input group." })
    ] }),
    /* @__PURE__ */ jsxs65(Field, { children: [
      /* @__PURE__ */ jsx97(FieldLabel, { htmlFor: "textarea-header-footer-30", children: "Addon (block-end)" }),
      /* @__PURE__ */ jsxs65(InputGroup, { children: [
        /* @__PURE__ */ jsx97(
          InputGroupTextarea,
          {
            id: "textarea-header-footer-30",
            placeholder: "Enter your text here..."
          }
        ),
        /* @__PURE__ */ jsxs65(InputGroupAddon, { align: "block-end", children: [
          /* @__PURE__ */ jsx97(InputGroupText, { children: "0/280 characters" }),
          /* @__PURE__ */ jsxs65(
            InputGroupButton,
            {
              variant: "default",
              size: "icon-xs",
              className: "ml-auto rounded-full",
              children: [
                /* @__PURE__ */ jsx97(ArrowUpIcon2, {}),
                /* @__PURE__ */ jsx97("span", { className: "sr-only", children: "Send" })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs65(Field, { children: [
      /* @__PURE__ */ jsx97(FieldLabel, { htmlFor: "textarea-comment-31", children: "Addon (Buttons)" }),
      /* @__PURE__ */ jsxs65(InputGroup, { children: [
        /* @__PURE__ */ jsx97(
          InputGroupTextarea,
          {
            id: "textarea-comment-31",
            placeholder: "Share your thoughts...",
            className: "min-h-[120px]"
          }
        ),
        /* @__PURE__ */ jsxs65(InputGroupAddon, { align: "block-end", children: [
          /* @__PURE__ */ jsx97(InputGroupButton, { variant: "ghost", className: "ml-auto", size: "sm", children: "Cancel" }),
          /* @__PURE__ */ jsx97(InputGroupButton, { variant: "default", size: "sm", children: "Post Comment" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs65(Field, { children: [
      /* @__PURE__ */ jsx97(FieldLabel, { htmlFor: "textarea-code-32", children: "Code Editor" }),
      /* @__PURE__ */ jsxs65(InputGroup, { children: [
        /* @__PURE__ */ jsx97(
          InputGroupTextarea,
          {
            id: "textarea-code-32",
            placeholder: "console.log('Hello, world!');",
            className: "min-h-[300px] py-3"
          }
        ),
        /* @__PURE__ */ jsxs65(InputGroupAddon, { align: "block-start", className: "border-b", children: [
          /* @__PURE__ */ jsxs65(InputGroupText, { className: "font-mono font-medium", children: [
            /* @__PURE__ */ jsx97(CodeIcon, {}),
            "script.js"
          ] }),
          /* @__PURE__ */ jsx97(InputGroupButton, { size: "icon-xs", className: "ml-auto", children: /* @__PURE__ */ jsx97(RefreshCwIcon, {}) }),
          /* @__PURE__ */ jsx97(InputGroupButton, { size: "icon-xs", variant: "ghost", children: /* @__PURE__ */ jsx97(CopyIcon2, {}) })
        ] }),
        /* @__PURE__ */ jsxs65(InputGroupAddon, { align: "block-end", className: "border-t", children: [
          /* @__PURE__ */ jsx97(InputGroupText, { children: "Line 1, Column 1" }),
          /* @__PURE__ */ jsx97(InputGroupText, { className: "ml-auto", children: "JavaScript" })
        ] })
      ] })
    ] })
  ] });
}

// src/components/ui/input-group-textarea.tsx
import {
  IconBrandJavascript,
  IconCopy as IconCopy2,
  IconCornerDownLeft,
  IconRefresh
} from "@tabler/icons-react";
import { jsx as jsx98, jsxs as jsxs66 } from "react/jsx-runtime";

// src/components/ui/input-group-tooltip.tsx
import { HelpCircle, InfoIcon as InfoIcon4 } from "lucide-react";
import { jsx as jsx99, jsxs as jsxs67 } from "react/jsx-runtime";

// src/components/ui/input-group-with-addons.tsx
import {
  CopyIcon as CopyIcon3,
  EyeOffIcon as EyeOffIcon2,
  InfoIcon as InfoIcon5,
  MicIcon,
  RadioIcon,
  SearchIcon as SearchIcon5,
  StarIcon as StarIcon2
} from "lucide-react";
import { toast } from "sonner";
import { jsx as jsx100, jsxs as jsxs68 } from "react/jsx-runtime";
function InputGroupWithAddons() {
  return /* @__PURE__ */ jsxs68(FieldGroup, { children: [
    /* @__PURE__ */ jsxs68(Field, { children: [
      /* @__PURE__ */ jsx100(FieldLabel, { htmlFor: "input-icon-left-05", children: "Addon (inline-start)" }),
      /* @__PURE__ */ jsxs68(InputGroup, { children: [
        /* @__PURE__ */ jsx100(InputGroupInput, { id: "input-icon-left-05" }),
        /* @__PURE__ */ jsx100(InputGroupAddon, { children: /* @__PURE__ */ jsx100(SearchIcon5, { className: "text-muted-foreground" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs68(Field, { children: [
      /* @__PURE__ */ jsx100(FieldLabel, { htmlFor: "input-icon-right-07", children: "Addon (inline-end)" }),
      /* @__PURE__ */ jsxs68(InputGroup, { children: [
        /* @__PURE__ */ jsx100(InputGroupInput, { id: "input-icon-right-07" }),
        /* @__PURE__ */ jsx100(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx100(EyeOffIcon2, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs68(Field, { children: [
      /* @__PURE__ */ jsx100(FieldLabel, { htmlFor: "input-icon-both-09", children: "Addon (inline-start and inline-end)" }),
      /* @__PURE__ */ jsxs68(InputGroup, { children: [
        /* @__PURE__ */ jsx100(InputGroupInput, { id: "input-icon-both-09" }),
        /* @__PURE__ */ jsx100(InputGroupAddon, { children: /* @__PURE__ */ jsx100(MicIcon, { className: "text-muted-foreground" }) }),
        /* @__PURE__ */ jsx100(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx100(RadioIcon, { className: "animate-pulse text-red-500" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs68(Field, { children: [
      /* @__PURE__ */ jsx100(FieldLabel, { htmlFor: "input-addon-20", children: "Addon (block-start)" }),
      /* @__PURE__ */ jsxs68(InputGroup, { className: "h-auto", children: [
        /* @__PURE__ */ jsx100(InputGroupInput, { id: "input-addon-20" }),
        /* @__PURE__ */ jsxs68(InputGroupAddon, { align: "block-start", children: [
          /* @__PURE__ */ jsx100(InputGroupText, { children: "First Name" }),
          /* @__PURE__ */ jsx100(InfoIcon5, { className: "ml-auto text-muted-foreground" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs68(Field, { children: [
      /* @__PURE__ */ jsx100(FieldLabel, { htmlFor: "input-addon-21", children: "Addon (block-end)" }),
      /* @__PURE__ */ jsxs68(InputGroup, { className: "h-auto", children: [
        /* @__PURE__ */ jsx100(InputGroupInput, { id: "input-addon-21" }),
        /* @__PURE__ */ jsxs68(InputGroupAddon, { align: "block-end", children: [
          /* @__PURE__ */ jsx100(InputGroupText, { children: "20/240 characters" }),
          /* @__PURE__ */ jsx100(InfoIcon5, { className: "ml-auto text-muted-foreground" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs68(Field, { children: [
      /* @__PURE__ */ jsx100(FieldLabel, { htmlFor: "input-icon-both-10", children: "Multiple Icons" }),
      /* @__PURE__ */ jsxs68(InputGroup, { children: [
        /* @__PURE__ */ jsx100(InputGroupInput, { id: "input-icon-both-10" }),
        /* @__PURE__ */ jsxs68(InputGroupAddon, { align: "inline-end", children: [
          /* @__PURE__ */ jsx100(StarIcon2, {}),
          /* @__PURE__ */ jsx100(
            InputGroupButton,
            {
              size: "icon-xs",
              onClick: () => toast("Copied to clipboard"),
              children: /* @__PURE__ */ jsx100(CopyIcon3, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsx100(InputGroupAddon, { children: /* @__PURE__ */ jsx100(RadioIcon, { className: "animate-pulse text-red-500" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs68(Field, { children: [
      /* @__PURE__ */ jsx100(FieldLabel, { htmlFor: "input-description-10", children: "Description" }),
      /* @__PURE__ */ jsxs68(InputGroup, { children: [
        /* @__PURE__ */ jsx100(InputGroupInput, { id: "input-description-10" }),
        /* @__PURE__ */ jsx100(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx100(InfoIcon5, {}) })
      ] }),
      /* @__PURE__ */ jsx100(FieldDescription, { children: "This is a description of the input group." })
    ] }),
    /* @__PURE__ */ jsxs68(Field, { children: [
      /* @__PURE__ */ jsx100(FieldLabel, { htmlFor: "input-label-10", children: "Label" }),
      /* @__PURE__ */ jsxs68(InputGroup, { children: [
        /* @__PURE__ */ jsx100(InputGroupAddon, { children: /* @__PURE__ */ jsx100(FieldLabel, { htmlFor: "input-label-10", children: "Label" }) }),
        /* @__PURE__ */ jsx100(InputGroupInput, { id: "input-label-10" })
      ] }),
      /* @__PURE__ */ jsxs68(InputGroup, { children: [
        /* @__PURE__ */ jsx100(InputGroupInput, { id: "input-optional-12", "aria-label": "Optional" }),
        /* @__PURE__ */ jsx100(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx100(InputGroupText, { children: "(optional)" }) })
      ] })
    ] })
  ] });
}

// src/components/ui/input-group-with-buttons.tsx
import { CopyIcon as CopyIcon4, TrashIcon } from "lucide-react";
import { jsx as jsx101, jsxs as jsxs69 } from "react/jsx-runtime";
function InputGroupWithButtons() {
  return /* @__PURE__ */ jsx101(FieldGroup, { children: /* @__PURE__ */ jsxs69(Field, { children: [
    /* @__PURE__ */ jsx101(FieldLabel, { htmlFor: "input-button-13", children: "Button" }),
    /* @__PURE__ */ jsxs69(InputGroup, { children: [
      /* @__PURE__ */ jsx101(InputGroupInput, { id: "input-button-13" }),
      /* @__PURE__ */ jsx101(InputGroupAddon, { children: /* @__PURE__ */ jsx101(InputGroupButton, { children: "Default" }) })
    ] }),
    /* @__PURE__ */ jsxs69(InputGroup, { children: [
      /* @__PURE__ */ jsx101(InputGroupInput, { id: "input-button-14" }),
      /* @__PURE__ */ jsx101(InputGroupAddon, { children: /* @__PURE__ */ jsx101(InputGroupButton, { variant: "outline", children: "Outline" }) })
    ] }),
    /* @__PURE__ */ jsxs69(InputGroup, { children: [
      /* @__PURE__ */ jsx101(InputGroupInput, { id: "input-button-15" }),
      /* @__PURE__ */ jsx101(InputGroupAddon, { children: /* @__PURE__ */ jsx101(InputGroupButton, { variant: "secondary", children: "Secondary" }) })
    ] }),
    /* @__PURE__ */ jsxs69(InputGroup, { children: [
      /* @__PURE__ */ jsx101(InputGroupInput, { id: "input-button-16" }),
      /* @__PURE__ */ jsx101(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx101(InputGroupButton, { variant: "secondary", children: "Button" }) })
    ] }),
    /* @__PURE__ */ jsxs69(InputGroup, { children: [
      /* @__PURE__ */ jsx101(InputGroupInput, { id: "input-button-17" }),
      /* @__PURE__ */ jsx101(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx101(InputGroupButton, { size: "icon-xs", children: /* @__PURE__ */ jsx101(CopyIcon4, {}) }) })
    ] }),
    /* @__PURE__ */ jsxs69(InputGroup, { children: [
      /* @__PURE__ */ jsx101(InputGroupInput, { id: "input-button-18" }),
      /* @__PURE__ */ jsx101(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx101(InputGroupButton, { variant: "secondary", size: "icon-xs", children: /* @__PURE__ */ jsx101(TrashIcon, {}) }) })
    ] })
  ] }) });
}

// src/components/ui/input-group-with-kbd.tsx
import { CheckIcon as CheckIcon2, InfoIcon as InfoIcon6, SearchIcon as SearchIcon6, SparklesIcon } from "lucide-react";
import { jsx as jsx102, jsxs as jsxs70 } from "react/jsx-runtime";
function InputGroupWithKbd() {
  return /* @__PURE__ */ jsxs70(FieldGroup, { children: [
    /* @__PURE__ */ jsxs70(Field, { children: [
      /* @__PURE__ */ jsx102(FieldLabel, { htmlFor: "input-kbd-22", children: "Input Group with Kbd" }),
      /* @__PURE__ */ jsxs70(InputGroup, { children: [
        /* @__PURE__ */ jsx102(InputGroupInput, { id: "input-kbd-22" }),
        /* @__PURE__ */ jsx102(InputGroupAddon, { children: /* @__PURE__ */ jsx102(Kbd, { children: "\u2318K" }) })
      ] }),
      /* @__PURE__ */ jsxs70(InputGroup, { children: [
        /* @__PURE__ */ jsx102(InputGroupInput, { id: "input-kbd-23" }),
        /* @__PURE__ */ jsx102(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx102(Kbd, { children: "\u2318K" }) })
      ] }),
      /* @__PURE__ */ jsxs70(InputGroup, { children: [
        /* @__PURE__ */ jsx102(
          InputGroupInput,
          {
            id: "input-search-apps-24",
            placeholder: "Search for Apps..."
          }
        ),
        /* @__PURE__ */ jsx102(InputGroupAddon, { align: "inline-end", children: "Ask AI" }),
        /* @__PURE__ */ jsx102(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx102(Kbd, { children: "Tab" }) })
      ] }),
      /* @__PURE__ */ jsxs70(InputGroup, { children: [
        /* @__PURE__ */ jsx102(
          InputGroupInput,
          {
            id: "input-search-type-25",
            placeholder: "Type to search..."
          }
        ),
        /* @__PURE__ */ jsx102(InputGroupAddon, { align: "inline-start", children: /* @__PURE__ */ jsx102(SparklesIcon, {}) }),
        /* @__PURE__ */ jsx102(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxs70(KbdGroup, { children: [
          /* @__PURE__ */ jsx102(Kbd, { children: "Ctrl" }),
          /* @__PURE__ */ jsx102(Kbd, { children: "C" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs70(Field, { children: [
      /* @__PURE__ */ jsx102(FieldLabel, { htmlFor: "input-username-26", children: "Username" }),
      /* @__PURE__ */ jsxs70(InputGroup, { children: [
        /* @__PURE__ */ jsx102(InputGroupInput, { id: "input-username-26", defaultValue: "shadcn" }),
        /* @__PURE__ */ jsx102(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx102("div", { className: "flex size-4 items-center justify-center rounded-full bg-green-500 dark:bg-green-800", children: /* @__PURE__ */ jsx102(CheckIcon2, { className: "size-3 text-white" }) }) })
      ] }),
      /* @__PURE__ */ jsx102(FieldDescription, { className: "text-green-700", children: "This username is available." })
    ] }),
    /* @__PURE__ */ jsxs70(InputGroup, { children: [
      /* @__PURE__ */ jsx102(
        InputGroupInput,
        {
          id: "input-search-docs-27",
          placeholder: "Search documentation..."
        }
      ),
      /* @__PURE__ */ jsx102(InputGroupAddon, { children: /* @__PURE__ */ jsx102(SearchIcon6, {}) }),
      /* @__PURE__ */ jsx102(InputGroupAddon, { align: "inline-end", children: "12 results" })
    ] }),
    /* @__PURE__ */ jsxs70(InputGroup, { "data-disabled": "true", children: [
      /* @__PURE__ */ jsx102(
        InputGroupInput,
        {
          id: "input-search-disabled-28",
          placeholder: "Search documentation...",
          disabled: true
        }
      ),
      /* @__PURE__ */ jsx102(InputGroupAddon, { children: /* @__PURE__ */ jsx102(SearchIcon6, {}) }),
      /* @__PURE__ */ jsx102(InputGroupAddon, { align: "inline-end", children: "Disabled" })
    ] }),
    /* @__PURE__ */ jsxs70(FieldGroup, { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs70(Field, { children: [
        /* @__PURE__ */ jsx102(FieldLabel, { htmlFor: "input-group-11", children: "First Name" }),
        /* @__PURE__ */ jsxs70(InputGroup, { children: [
          /* @__PURE__ */ jsx102(InputGroupInput, { id: "input-group-11", placeholder: "First Name" }),
          /* @__PURE__ */ jsx102(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx102(InfoIcon6, {}) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs70(Field, { children: [
        /* @__PURE__ */ jsx102(FieldLabel, { htmlFor: "input-group-12", children: "Last Name" }),
        /* @__PURE__ */ jsxs70(InputGroup, { children: [
          /* @__PURE__ */ jsx102(InputGroupInput, { id: "input-group-12", placeholder: "Last Name" }),
          /* @__PURE__ */ jsx102(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx102(InfoIcon6, {}) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs70(Field, { "data-disabled": "true", children: [
      /* @__PURE__ */ jsx102(FieldLabel, { htmlFor: "input-group-29", children: 'Loading ("data-disabled="true")' }),
      /* @__PURE__ */ jsxs70(InputGroup, { children: [
        /* @__PURE__ */ jsx102(InputGroupInput, { id: "input-group-29", disabled: true, defaultValue: "shadcn" }),
        /* @__PURE__ */ jsx102(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx102(Spinner, {}) })
      ] }),
      /* @__PURE__ */ jsx102(FieldDescription, { children: "This is a description of the input group." })
    ] })
  ] });
}

// src/components/ui/input-group-with-tooltip.tsx
import { ChevronDownIcon as ChevronDownIcon2, InfoIcon as InfoIcon7, StarIcon as StarIcon3 } from "lucide-react";
import { toast as toast2 } from "sonner";
import { Fragment as Fragment3, jsx as jsx103, jsxs as jsxs71 } from "react/jsx-runtime";
function InputGroupWithTooltip({
  country,
  setCountry
}) {
  return /* @__PURE__ */ jsx103(Fragment3, { children: /* @__PURE__ */ jsxs71(FieldGroup, { children: [
    /* @__PURE__ */ jsxs71(Field, { children: [
      /* @__PURE__ */ jsx103(FieldLabel, { htmlFor: "input-tooltip-20", children: "Tooltip" }),
      /* @__PURE__ */ jsxs71(InputGroup, { children: [
        /* @__PURE__ */ jsx103(InputGroupInput, { id: "input-tooltip-20" }),
        /* @__PURE__ */ jsx103(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxs71(Tooltip, { children: [
          /* @__PURE__ */ jsx103(
            TooltipTrigger,
            {
              render: /* @__PURE__ */ jsx103(InputGroupButton, { className: "rounded-full", size: "icon-xs" }),
              children: /* @__PURE__ */ jsx103(InfoIcon7, {})
            }
          ),
          /* @__PURE__ */ jsx103(TooltipPopup, { children: "This is content in a tooltip." })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx103(FieldDescription, { children: "This is a description of the input group." })
    ] }),
    /* @__PURE__ */ jsxs71(Field, { children: [
      /* @__PURE__ */ jsx103(FieldLabel, { htmlFor: "input-dropdown-21", children: "Dropdown" }),
      /* @__PURE__ */ jsxs71(InputGroup, { children: [
        /* @__PURE__ */ jsx103(InputGroupInput, { id: "input-dropdown-21" }),
        /* @__PURE__ */ jsx103(InputGroupAddon, { children: /* @__PURE__ */ jsxs71(DropdownMenu, { children: [
          /* @__PURE__ */ jsxs71(
            DropdownMenuTrigger,
            {
              render: /* @__PURE__ */ jsx103(InputGroupButton, { className: "text-muted-foreground tabular-nums" }),
              children: [
                country,
                " ",
                /* @__PURE__ */ jsx103(ChevronDownIcon2, {})
              ]
            }
          ),
          /* @__PURE__ */ jsxs71(
            DropdownMenuContent,
            {
              align: "start",
              className: "min-w-16",
              sideOffset: 10,
              alignOffset: -8,
              children: [
                /* @__PURE__ */ jsx103(DropdownMenuItem, { onClick: () => setCountry("+1"), children: "+1" }),
                /* @__PURE__ */ jsx103(DropdownMenuItem, { onClick: () => setCountry("+44"), children: "+44" }),
                /* @__PURE__ */ jsx103(DropdownMenuItem, { onClick: () => setCountry("+46"), children: "+46" })
              ]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsx103(FieldDescription, { children: "This is a description of the input group." })
    ] }),
    /* @__PURE__ */ jsxs71(Field, { children: [
      /* @__PURE__ */ jsx103(FieldLabel, { htmlFor: "input-secure-19", children: "Popover" }),
      /* @__PURE__ */ jsxs71(InputGroup, { children: [
        /* @__PURE__ */ jsxs71(Popover, { children: [
          /* @__PURE__ */ jsx103(PopoverTrigger, { render: /* @__PURE__ */ jsx103(InputGroupAddon, {}), nativeButton: false, children: /* @__PURE__ */ jsx103(InputGroupButton, { variant: "secondary", size: "icon-xs", children: /* @__PURE__ */ jsx103(InfoIcon7, {}) }) }),
          /* @__PURE__ */ jsx103(PopoverPopup, { align: "start", children: /* @__PURE__ */ jsxs71(PopoverHeader, { children: [
            /* @__PURE__ */ jsx103(PopoverTitle, { children: "Your connection is not secure." }),
            /* @__PURE__ */ jsx103(PopoverDescription, { children: "You should not enter any sensitive information on this site." })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx103(InputGroupAddon, { className: "pl-1 text-muted-foreground", children: "https://" }),
        /* @__PURE__ */ jsx103(InputGroupInput, { id: "input-secure-19" }),
        /* @__PURE__ */ jsx103(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx103(
          InputGroupButton,
          {
            size: "icon-xs",
            onClick: () => toast2("Added to favorites"),
            children: /* @__PURE__ */ jsx103(StarIcon3, {})
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx103(FieldDescription, { children: "This is a description of the input group." })
    ] }),
    /* @__PURE__ */ jsxs71(Field, { children: [
      /* @__PURE__ */ jsx103(FieldLabel, { htmlFor: "url", children: "Button Group" }),
      /* @__PURE__ */ jsxs71(ButtonGroup, { children: [
        /* @__PURE__ */ jsx103(ButtonGroupText, { children: "https://" }),
        /* @__PURE__ */ jsxs71(InputGroup, { children: [
          /* @__PURE__ */ jsx103(InputGroupInput, { id: "url" }),
          /* @__PURE__ */ jsx103(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx103(InfoIcon7, {}) })
        ] }),
        /* @__PURE__ */ jsx103(ButtonGroupText, { children: ".com" })
      ] }),
      /* @__PURE__ */ jsx103(FieldDescription, { children: "This is a description of the input group." })
    ] })
  ] }) });
}

// src/components/ui/input-inline.tsx
import { jsx as jsx104, jsxs as jsxs72 } from "react/jsx-runtime";
function InputInline() {
  return /* @__PURE__ */ jsxs72(Field, { orientation: "horizontal", children: [
    /* @__PURE__ */ jsx104(Input, { type: "search", placeholder: "Search..." }),
    /* @__PURE__ */ jsx104(Button, { children: "Search" })
  ] });
}

// src/components/ui/input-input-group.tsx
import { InfoIcon as InfoIcon8 } from "lucide-react";
import { jsx as jsx105, jsxs as jsxs73 } from "react/jsx-runtime";
function InputInputGroup() {
  return /* @__PURE__ */ jsxs73(Field, { children: [
    /* @__PURE__ */ jsx105(FieldLabel, { htmlFor: "input-group-url", children: "Website URL" }),
    /* @__PURE__ */ jsxs73(InputGroup, { children: [
      /* @__PURE__ */ jsx105(InputGroupInput, { id: "input-group-url", placeholder: "example.com" }),
      /* @__PURE__ */ jsx105(InputGroupAddon, { children: /* @__PURE__ */ jsx105(InputGroupText, { children: "https://" }) }),
      /* @__PURE__ */ jsx105(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx105(InfoIcon8, {}) })
    ] })
  ] });
}

// src/components/ui/input-invalid.tsx
import { jsx as jsx106, jsxs as jsxs74 } from "react/jsx-runtime";
function InputInvalid() {
  return /* @__PURE__ */ jsxs74(Field, { "data-invalid": true, children: [
    /* @__PURE__ */ jsx106(FieldLabel, { htmlFor: "input-invalid", children: "Invalid Input" }),
    /* @__PURE__ */ jsx106(Input, { id: "input-invalid", placeholder: "Error", "aria-invalid": true }),
    /* @__PURE__ */ jsx106(FieldDescription, { children: "This field contains validation errors." })
  ] });
}

// src/components/ui/input-otp.tsx
import * as React14 from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { jsx as jsx107, jsxs as jsxs75 } from "react/jsx-runtime";
function InputOTP({
  className,
  containerClassName,
  ...props
}) {
  return /* @__PURE__ */ jsx107(
    OTPInput,
    {
      "data-slot": "input-otp",
      containerClassName: cn(
        "cn-input-otp flex items-center has-disabled:opacity-50",
        containerClassName
      ),
      spellCheck: false,
      className: cn("disabled:cursor-not-allowed", className),
      ...props
    }
  );
}
function InputOTPGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx107(
    "div",
    {
      "data-slot": "input-otp-group",
      className: cn(
        "flex items-center rounded-lg has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40",
        className
      ),
      ...props
    }
  );
}
function InputOTPSlot({
  index,
  className,
  ...props
}) {
  const inputOTPContext = React14.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};
  return /* @__PURE__ */ jsxs75(
    "div",
    {
      "data-slot": "input-otp-slot",
      "data-active": isActive,
      className: cn(
        "relative flex size-8 items-center justify-center border-y border-r border-input text-sm transition-all outline-none first:rounded-l-lg first:border-l last:rounded-r-lg aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-3 data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40",
        className
      ),
      ...props,
      children: [
        char,
        hasFakeCaret && /* @__PURE__ */ jsx107("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx107("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" }) })
      ]
    }
  );
}
function InputOTPSeparator({ ...props }) {
  return /* @__PURE__ */ jsx107(
    "div",
    {
      "data-slot": "input-otp-separator",
      className: "flex items-center [&_svg:not([class*='size-'])]:size-4",
      role: "separator",
      ...props,
      children: /* @__PURE__ */ jsx107(HugeiconsIcon, { icon: MinusSignIcon, strokeWidth: 2 })
    }
  );
}

// src/components/ui/input-otp-alphanumeric.tsx
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { jsx as jsx108, jsxs as jsxs76 } from "react/jsx-runtime";
function InputOTPAlphanumeric() {
  return /* @__PURE__ */ jsxs76(InputOTP, { maxLength: 6, pattern: REGEXP_ONLY_DIGITS_AND_CHARS, children: [
    /* @__PURE__ */ jsxs76(InputOTPGroup, { children: [
      /* @__PURE__ */ jsx108(InputOTPSlot, { index: 0 }),
      /* @__PURE__ */ jsx108(InputOTPSlot, { index: 1 }),
      /* @__PURE__ */ jsx108(InputOTPSlot, { index: 2 })
    ] }),
    /* @__PURE__ */ jsx108(InputOTPSeparator, {}),
    /* @__PURE__ */ jsxs76(InputOTPGroup, { children: [
      /* @__PURE__ */ jsx108(InputOTPSlot, { index: 3 }),
      /* @__PURE__ */ jsx108(InputOTPSlot, { index: 4 }),
      /* @__PURE__ */ jsx108(InputOTPSlot, { index: 5 })
    ] })
  ] });
}

// src/components/ui/input-otp-controlled.tsx
import * as React15 from "react";
import { Fragment as Fragment4, jsx as jsx109, jsxs as jsxs77 } from "react/jsx-runtime";

// src/components/ui/input-otp-disabled.tsx
import { jsx as jsx110, jsxs as jsxs78 } from "react/jsx-runtime";
function InputOTPDisabled() {
  return /* @__PURE__ */ jsxs78(InputOTP, { id: "disabled", maxLength: 6, disabled: true, value: "123456", children: [
    /* @__PURE__ */ jsxs78(InputOTPGroup, { children: [
      /* @__PURE__ */ jsx110(InputOTPSlot, { index: 0 }),
      /* @__PURE__ */ jsx110(InputOTPSlot, { index: 1 }),
      /* @__PURE__ */ jsx110(InputOTPSlot, { index: 2 })
    ] }),
    /* @__PURE__ */ jsx110(InputOTPSeparator, {}),
    /* @__PURE__ */ jsxs78(InputOTPGroup, { children: [
      /* @__PURE__ */ jsx110(InputOTPSlot, { index: 3 }),
      /* @__PURE__ */ jsx110(InputOTPSlot, { index: 4 }),
      /* @__PURE__ */ jsx110(InputOTPSlot, { index: 5 })
    ] })
  ] });
}

// src/components/ui/input-otp-form.tsx
import { RefreshCwIcon as RefreshCwIcon2 } from "lucide-react";
import { jsx as jsx111, jsxs as jsxs79 } from "react/jsx-runtime";
function InputOTPForm() {
  return /* @__PURE__ */ jsxs79(Card, { className: "mx-auto max-w-md", children: [
    /* @__PURE__ */ jsxs79(CardHeader, { children: [
      /* @__PURE__ */ jsx111(CardTitle, { children: "Verify your login" }),
      /* @__PURE__ */ jsxs79(CardDescription, { children: [
        "Enter the verification code we sent to your email address:",
        " ",
        /* @__PURE__ */ jsx111("span", { className: "font-medium", children: "m@example.com" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsx111(CardContent, { children: /* @__PURE__ */ jsxs79(Field, { children: [
      /* @__PURE__ */ jsxs79("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx111(FieldLabel, { htmlFor: "otp-verification", children: "Verification code" }),
        /* @__PURE__ */ jsxs79(Button, { variant: "outline", size: "xs", children: [
          /* @__PURE__ */ jsx111(RefreshCwIcon2, {}),
          "Resend Code"
        ] })
      ] }),
      /* @__PURE__ */ jsxs79(InputOTP, { maxLength: 6, id: "otp-verification", required: true, children: [
        /* @__PURE__ */ jsxs79(InputOTPGroup, { className: "*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl", children: [
          /* @__PURE__ */ jsx111(InputOTPSlot, { index: 0 }),
          /* @__PURE__ */ jsx111(InputOTPSlot, { index: 1 }),
          /* @__PURE__ */ jsx111(InputOTPSlot, { index: 2 })
        ] }),
        /* @__PURE__ */ jsx111(InputOTPSeparator, { className: "mx-2" }),
        /* @__PURE__ */ jsxs79(InputOTPGroup, { className: "*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl", children: [
          /* @__PURE__ */ jsx111(InputOTPSlot, { index: 3 }),
          /* @__PURE__ */ jsx111(InputOTPSlot, { index: 4 }),
          /* @__PURE__ */ jsx111(InputOTPSlot, { index: 5 })
        ] })
      ] }),
      /* @__PURE__ */ jsx111(FieldDescription, { children: /* @__PURE__ */ jsx111("a", { href: "#", children: "I no longer have access to this email address." }) })
    ] }) }),
    /* @__PURE__ */ jsx111(CardFooter, { children: /* @__PURE__ */ jsxs79(Field, { children: [
      /* @__PURE__ */ jsx111(Button, { type: "submit", className: "w-full", children: "Verify" }),
      /* @__PURE__ */ jsxs79("div", { className: "text-sm text-muted-foreground", children: [
        "Having trouble signing in?",
        " ",
        /* @__PURE__ */ jsx111(
          "a",
          {
            href: "#",
            className: "underline underline-offset-4 transition-colors hover:text-primary",
            children: "Contact support"
          }
        )
      ] })
    ] }) })
  ] });
}

// src/components/ui/input-otp-four-digits.tsx
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { jsx as jsx112, jsxs as jsxs80 } from "react/jsx-runtime";
function InputOTPFourDigits() {
  return /* @__PURE__ */ jsx112(InputOTP, { maxLength: 4, pattern: REGEXP_ONLY_DIGITS, children: /* @__PURE__ */ jsxs80(InputOTPGroup, { children: [
    /* @__PURE__ */ jsx112(InputOTPSlot, { index: 0 }),
    /* @__PURE__ */ jsx112(InputOTPSlot, { index: 1 }),
    /* @__PURE__ */ jsx112(InputOTPSlot, { index: 2 }),
    /* @__PURE__ */ jsx112(InputOTPSlot, { index: 3 })
  ] }) });
}

// src/components/ui/input-otp-invalid.tsx
import * as React16 from "react";
import { jsx as jsx113, jsxs as jsxs81 } from "react/jsx-runtime";
function InputOTPInvalid() {
  const [value, setValue] = React16.useState("000000");
  return /* @__PURE__ */ jsxs81(InputOTP, { maxLength: 6, value, onChange: setValue, children: [
    /* @__PURE__ */ jsxs81(InputOTPGroup, { children: [
      /* @__PURE__ */ jsx113(InputOTPSlot, { index: 0, "aria-invalid": true }),
      /* @__PURE__ */ jsx113(InputOTPSlot, { index: 1, "aria-invalid": true })
    ] }),
    /* @__PURE__ */ jsx113(InputOTPSeparator, {}),
    /* @__PURE__ */ jsxs81(InputOTPGroup, { children: [
      /* @__PURE__ */ jsx113(InputOTPSlot, { index: 2, "aria-invalid": true }),
      /* @__PURE__ */ jsx113(InputOTPSlot, { index: 3, "aria-invalid": true })
    ] }),
    /* @__PURE__ */ jsx113(InputOTPSeparator, {}),
    /* @__PURE__ */ jsxs81(InputOTPGroup, { children: [
      /* @__PURE__ */ jsx113(InputOTPSlot, { index: 4, "aria-invalid": true }),
      /* @__PURE__ */ jsx113(InputOTPSlot, { index: 5, "aria-invalid": true })
    ] })
  ] });
}

// src/components/ui/input-otp-pattern.tsx
import { REGEXP_ONLY_DIGITS as REGEXP_ONLY_DIGITS2 } from "input-otp";
import { jsx as jsx114, jsxs as jsxs82 } from "react/jsx-runtime";
function InputOTPPattern() {
  return /* @__PURE__ */ jsxs82(Field, { className: "w-fit", children: [
    /* @__PURE__ */ jsx114(FieldLabel, { htmlFor: "digits-only", children: "Digits Only" }),
    /* @__PURE__ */ jsx114(InputOTP, { id: "digits-only", maxLength: 6, pattern: REGEXP_ONLY_DIGITS2, children: /* @__PURE__ */ jsxs82(InputOTPGroup, { children: [
      /* @__PURE__ */ jsx114(InputOTPSlot, { index: 0 }),
      /* @__PURE__ */ jsx114(InputOTPSlot, { index: 1 }),
      /* @__PURE__ */ jsx114(InputOTPSlot, { index: 2 }),
      /* @__PURE__ */ jsx114(InputOTPSlot, { index: 3 }),
      /* @__PURE__ */ jsx114(InputOTPSlot, { index: 4 }),
      /* @__PURE__ */ jsx114(InputOTPSlot, { index: 5 })
    ] }) })
  ] });
}

// src/components/ui/input-otp-separator.tsx
import { jsx as jsx115, jsxs as jsxs83 } from "react/jsx-runtime";

// src/components/ui/item.tsx
import { cva as cva10 } from "class-variance-authority";
import { Slot as Slot3 } from "radix-ui";
import { jsx as jsx116 } from "react/jsx-runtime";
function ItemGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx116(
    "div",
    {
      role: "list",
      "data-slot": "item-group",
      className: cn(
        "group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2",
        className
      ),
      ...props
    }
  );
}
function ItemSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx116(
    Separator,
    {
      "data-slot": "item-separator",
      orientation: "horizontal",
      className: cn("my-2", className),
      ...props
    }
  );
}
var itemVariants = cva10(
  "group/item flex w-full flex-wrap items-center rounded-lg border text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-muted",
  {
    variants: {
      variant: {
        default: "border-transparent",
        outline: "border-border",
        muted: "border-transparent bg-muted/50"
      },
      size: {
        default: "gap-2.5 px-3 py-2.5",
        sm: "gap-2.5 px-3 py-2.5",
        xs: "gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot3.Root : "div";
  return /* @__PURE__ */ jsx116(
    Comp,
    {
      "data-slot": "item",
      "data-variant": variant,
      "data-size": size,
      className: cn(itemVariants({ variant, size, className })),
      ...props
    }
  );
}
var itemMediaVariants = cva10(
  "flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "[&_svg:not([class*='size-'])]:size-4",
        image: "size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function ItemMedia({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx116(
    "div",
    {
      "data-slot": "item-media",
      "data-variant": variant,
      className: cn(itemMediaVariants({ variant, className })),
      ...props
    }
  );
}
function ItemContent({ className, ...props }) {
  return /* @__PURE__ */ jsx116(
    "div",
    {
      "data-slot": "item-content",
      className: cn(
        "flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none",
        className
      ),
      ...props
    }
  );
}
function ItemTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx116(
    "div",
    {
      "data-slot": "item-title",
      className: cn(
        "line-clamp-1 flex w-fit items-center gap-2 text-sm leading-snug font-medium underline-offset-4",
        className
      ),
      ...props
    }
  );
}
function ItemDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx116(
    "p",
    {
      "data-slot": "item-description",
      className: cn(
        "line-clamp-2 text-left text-sm leading-normal font-normal text-muted-foreground group-data-[size=xs]/item:text-xs [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      ),
      ...props
    }
  );
}
function ItemActions({ className, ...props }) {
  return /* @__PURE__ */ jsx116(
    "div",
    {
      "data-slot": "item-actions",
      className: cn("flex items-center gap-2", className),
      ...props
    }
  );
}
function ItemHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx116(
    "div",
    {
      "data-slot": "item-header",
      className: cn(
        "flex basis-full items-center justify-between gap-2",
        className
      ),
      ...props
    }
  );
}
function ItemFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx116(
    "div",
    {
      "data-slot": "item-footer",
      className: cn(
        "flex basis-full items-center justify-between gap-2",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/menu.tsx
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { ChevronRightIcon as ChevronRightIcon2 } from "lucide-react";
import { Fragment as Fragment5, jsx as jsx117, jsxs as jsxs84 } from "react/jsx-runtime";
var MenuCreateHandle = MenuPrimitive.createHandle;
var Menu = MenuPrimitive.Root;
var MenuPortal = MenuPrimitive.Portal;
function MenuTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx117(
    MenuPrimitive.Trigger,
    {
      className,
      "data-slot": "menu-trigger",
      ...props,
      children
    }
  );
}
function MenuPopup({
  children,
  className,
  sideOffset = 4,
  align = "center",
  alignOffset,
  side = "bottom",
  anchor,
  ...props
}) {
  return /* @__PURE__ */ jsx117(MenuPrimitive.Portal, { children: /* @__PURE__ */ jsx117(
    MenuPrimitive.Positioner,
    {
      align,
      alignOffset,
      anchor,
      className: "z-50",
      "data-slot": "menu-positioner",
      side,
      sideOffset,
      children: /* @__PURE__ */ jsx117(
        MenuPrimitive.Popup,
        {
          className: cn(
            "relative flex not-[class*='w-']:min-w-32 origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] focus:outline-none dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className
          ),
          "data-slot": "menu-popup",
          ...props,
          children: /* @__PURE__ */ jsx117("div", { className: "max-h-(--available-height) w-full overflow-y-auto p-1", children })
        }
      )
    }
  ) });
}
function MenuGroup(props) {
  return /* @__PURE__ */ jsx117(MenuPrimitive.Group, { "data-slot": "menu-group", ...props });
}
function MenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx117(
    MenuPrimitive.Item,
    {
      className: cn(
        "[&>svg]:-mx-0.5 flex min-h-8 cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-inset:ps-8 data-[variant=destructive]:text-destructive-foreground data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&>svg:not([class*='opacity-'])]:opacity-80 [&>svg:not([class*='size-'])]:size-4.5 sm:[&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
        className
      ),
      "data-inset": inset,
      "data-slot": "menu-item",
      "data-variant": variant,
      ...props
    }
  );
}
function MenuCheckboxItem({
  className,
  children,
  checked,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx117(
    MenuPrimitive.CheckboxItem,
    {
      checked,
      className: cn(
        "grid min-h-8 in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default items-center gap-2 rounded-sm py-1 ps-2 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        variant === "switch" ? "grid-cols-[1fr_auto] gap-4 pe-1.5" : "grid-cols-[.75rem_1fr] pe-4",
        className
      ),
      "data-slot": "menu-checkbox-item",
      ...props,
      children: variant === "switch" ? /* @__PURE__ */ jsxs84(Fragment5, { children: [
        /* @__PURE__ */ jsx117("span", { className: "col-start-1", children }),
        /* @__PURE__ */ jsx117(
          MenuPrimitive.CheckboxItemIndicator,
          {
            className: "inset-shadow-[0_1px_--theme(--color-black/4%)] inline-flex h-[calc(var(--thumb-size)+2px)] w-[calc(var(--thumb-size)*2-2px)] shrink-0 items-center rounded-full p-px outline-none transition-[background-color,box-shadow] duration-200 [--thumb-size:--spacing(4)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-checked:bg-primary data-unchecked:bg-input data-disabled:opacity-64 sm:[--thumb-size:--spacing(3)]",
            keepMounted: true,
            children: /* @__PURE__ */ jsx117("span", { className: "pointer-events-none block aspect-square h-full in-[[data-slot=menu-checkbox-item][data-checked]]:origin-[var(--thumb-size)_50%] origin-left in-[[data-slot=menu-checkbox-item][data-checked]]:translate-x-[calc(var(--thumb-size)-4px)] in-[[data-slot=menu-checkbox-item]:active]:not-data-disabled:scale-x-110 in-[[data-slot=menu-checkbox-item]:active]:rounded-[var(--thumb-size)/calc(var(--thumb-size)*1.10)] rounded-(--thumb-size) bg-background shadow-sm/5 will-change-transform [transition:translate_.15s,border-radius_.15s,scale_.1s_.1s,transform-origin_.15s]" })
          }
        )
      ] }) : /* @__PURE__ */ jsxs84(Fragment5, { children: [
        /* @__PURE__ */ jsx117(MenuPrimitive.CheckboxItemIndicator, { className: "-ms-0.5 col-start-1", children: /* @__PURE__ */ jsx117(
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
            children: /* @__PURE__ */ jsx117("path", { d: "M5.252 12.7 10.2 18.63 18.748 5.37" })
          }
        ) }),
        /* @__PURE__ */ jsx117("span", { className: "col-start-2", children })
      ] })
    }
  );
}
function MenuRadioGroup(props) {
  return /* @__PURE__ */ jsx117(MenuPrimitive.RadioGroup, { "data-slot": "menu-radio-group", ...props });
}
function MenuRadioItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs84(
    MenuPrimitive.RadioItem,
    {
      className: cn(
        "grid min-h-8 in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default grid-cols-[.75rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      "data-slot": "menu-radio-item",
      ...props,
      children: [
        /* @__PURE__ */ jsx117(MenuPrimitive.RadioItemIndicator, { className: "-ms-0.5 col-start-1", children: /* @__PURE__ */ jsx117(
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
            children: /* @__PURE__ */ jsx117("path", { d: "M5.252 12.7 10.2 18.63 18.748 5.37" })
          }
        ) }),
        /* @__PURE__ */ jsx117("span", { className: "col-start-2", children })
      ]
    }
  );
}
function MenuGroupLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx117(
    MenuPrimitive.GroupLabel,
    {
      className: cn(
        "px-2 py-1.5 font-medium text-muted-foreground text-xs data-inset:ps-9 sm:data-inset:ps-8",
        className
      ),
      "data-inset": inset,
      "data-slot": "menu-label",
      ...props
    }
  );
}
function MenuSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx117(
    MenuPrimitive.Separator,
    {
      className: cn("mx-2 my-1 h-px bg-border", className),
      "data-slot": "menu-separator",
      ...props
    }
  );
}
function MenuShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsx117(
    "kbd",
    {
      className: cn(
        "ms-auto font-medium font-sans text-muted-foreground/72 text-xs tracking-widest",
        className
      ),
      "data-slot": "menu-shortcut",
      ...props
    }
  );
}
function MenuSub(props) {
  return /* @__PURE__ */ jsx117(MenuPrimitive.SubmenuRoot, { "data-slot": "menu-sub", ...props });
}
function MenuSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs84(
    MenuPrimitive.SubmenuTrigger,
    {
      className: cn(
        "[&>svg:not(:last-child)]:-mx-0.5 flex min-h-8 items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-popup-open:bg-accent data-inset:ps-8 data-highlighted:text-accent-foreground data-popup-open:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className
      ),
      "data-inset": inset,
      "data-slot": "menu-sub-trigger",
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx117(ChevronRightIcon2, { className: "-me-0.5 ms-auto opacity-80" })
      ]
    }
  );
}
function MenuSubPopup({
  className,
  sideOffset = 0,
  alignOffset,
  align = "start",
  ...props
}) {
  const defaultAlignOffset = align !== "center" ? -5 : void 0;
  return /* @__PURE__ */ jsx117(
    MenuPopup,
    {
      align,
      alignOffset: alignOffset ?? defaultAlignOffset,
      className,
      "data-slot": "menu-sub-content",
      side: "inline-end",
      sideOffset,
      ...props
    }
  );
}

// src/components/ui/menubar.tsx
import { Menubar as MenubarPrimitive } from "radix-ui";
import { jsx as jsx118, jsxs as jsxs85 } from "react/jsx-runtime";
function Menubar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx118(
    MenubarPrimitive.Root,
    {
      "data-slot": "menubar",
      className: cn(
        "flex h-8 items-center gap-0.5 rounded-lg border bg-background p-[3px]",
        className
      ),
      ...props
    }
  );
}
function MenubarMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx118(MenubarPrimitive.Menu, { "data-slot": "menubar-menu", ...props });
}
function MenubarGroup({
  ...props
}) {
  return /* @__PURE__ */ jsx118(MenubarPrimitive.Group, { "data-slot": "menubar-group", ...props });
}
function MenubarPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx118(MenubarPrimitive.Portal, { "data-slot": "menubar-portal", ...props });
}
function MenubarRadioGroup({
  ...props
}) {
  return /* @__PURE__ */ jsx118(MenubarPrimitive.RadioGroup, { "data-slot": "menubar-radio-group", ...props });
}
function MenubarTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx118(
    MenubarPrimitive.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: cn(
        "flex items-center rounded-sm px-1.5 py-[2px] text-sm font-medium outline-hidden select-none hover:bg-muted aria-expanded:bg-muted",
        className
      ),
      ...props
    }
  );
}
function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}) {
  return /* @__PURE__ */ jsx118(MenubarPortal, { children: /* @__PURE__ */ jsx118(
    MenubarPrimitive.Content,
    {
      "data-slot": "menubar-content",
      align,
      alignOffset,
      sideOffset,
      className: cn("z-50 min-w-36 origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95", className),
      ...props
    }
  ) });
}
function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx118(
    MenubarPrimitive.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "group/menubar-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      ),
      ...props
    }
  );
}
function MenubarCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsxs85(
    MenubarPrimitive.CheckboxItem,
    {
      "data-slot": "menubar-checkbox-item",
      "data-inset": inset,
      className: cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-1.5 pl-7 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ jsx118("span", { className: "pointer-events-none absolute left-1.5 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4", children: /* @__PURE__ */ jsx118(MenubarPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx118(HugeiconsIcon, { icon: Tick02Icon, strokeWidth: 2 }) }) }),
        children
      ]
    }
  );
}
function MenubarRadioItem({
  className,
  children,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsxs85(
    MenubarPrimitive.RadioItem,
    {
      "data-slot": "menubar-radio-item",
      "data-inset": inset,
      className: cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-1.5 pl-7 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx118("span", { className: "pointer-events-none absolute left-1.5 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4", children: /* @__PURE__ */ jsx118(MenubarPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx118(HugeiconsIcon, { icon: Tick02Icon, strokeWidth: 2 }) }) }),
        children
      ]
    }
  );
}
function MenubarLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx118(
    MenubarPrimitive.Label,
    {
      "data-slot": "menubar-label",
      "data-inset": inset,
      className: cn(
        "px-1.5 py-1 text-sm font-medium data-inset:pl-7",
        className
      ),
      ...props
    }
  );
}
function MenubarSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx118(
    MenubarPrimitive.Separator,
    {
      "data-slot": "menubar-separator",
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...props
    }
  );
}
function MenubarShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx118(
    "span",
    {
      "data-slot": "menubar-shortcut",
      className: cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/menubar-item:text-accent-foreground",
        className
      ),
      ...props
    }
  );
}
function MenubarSub({
  ...props
}) {
  return /* @__PURE__ */ jsx118(MenubarPrimitive.Sub, { "data-slot": "menubar-sub", ...props });
}
function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs85(
    MenubarPrimitive.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": inset,
      className: cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7 data-open:bg-accent data-open:text-accent-foreground [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx118(HugeiconsIcon, { icon: ArrowRight01Icon, strokeWidth: 2, className: "ml-auto size-4" })
      ]
    }
  );
}
function MenubarSubContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx118(
    MenubarPrimitive.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: cn("z-50 min-w-32 origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
      ...props
    }
  );
}

// src/components/ui/menubar-checkbox.tsx
import { jsx as jsx119, jsxs as jsxs86 } from "react/jsx-runtime";
function MenubarCheckbox() {
  return /* @__PURE__ */ jsxs86(Menubar, { className: "w-72", children: [
    /* @__PURE__ */ jsxs86(MenubarMenu, { children: [
      /* @__PURE__ */ jsx119(MenubarTrigger, { children: "View" }),
      /* @__PURE__ */ jsxs86(MenubarContent, { className: "w-64", children: [
        /* @__PURE__ */ jsx119(MenubarCheckboxItem, { children: "Always Show Bookmarks Bar" }),
        /* @__PURE__ */ jsx119(MenubarCheckboxItem, { checked: true, children: "Always Show Full URLs" }),
        /* @__PURE__ */ jsx119(MenubarSeparator, {}),
        /* @__PURE__ */ jsxs86(MenubarItem, { inset: true, children: [
          "Reload ",
          /* @__PURE__ */ jsx119(MenubarShortcut, { children: "\u2318R" })
        ] }),
        /* @__PURE__ */ jsxs86(MenubarItem, { disabled: true, inset: true, children: [
          "Force Reload ",
          /* @__PURE__ */ jsx119(MenubarShortcut, { children: "\u21E7\u2318R" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs86(MenubarMenu, { children: [
      /* @__PURE__ */ jsx119(MenubarTrigger, { children: "Format" }),
      /* @__PURE__ */ jsxs86(MenubarContent, { children: [
        /* @__PURE__ */ jsx119(MenubarCheckboxItem, { checked: true, children: "Strikethrough" }),
        /* @__PURE__ */ jsx119(MenubarCheckboxItem, { children: "Code" }),
        /* @__PURE__ */ jsx119(MenubarCheckboxItem, { children: "Superscript" })
      ] })
    ] })
  ] });
}

// src/components/ui/menubar-icons.tsx
import {
  FileIcon,
  FolderIcon,
  HelpCircleIcon,
  SaveIcon,
  SettingsIcon,
  TrashIcon as TrashIcon2
} from "lucide-react";
import { jsx as jsx120, jsxs as jsxs87 } from "react/jsx-runtime";
function MenubarIcons() {
  return /* @__PURE__ */ jsxs87(Menubar, { className: "w-72", children: [
    /* @__PURE__ */ jsxs87(MenubarMenu, { children: [
      /* @__PURE__ */ jsx120(MenubarTrigger, { children: "File" }),
      /* @__PURE__ */ jsxs87(MenubarContent, { children: [
        /* @__PURE__ */ jsxs87(MenubarItem, { children: [
          /* @__PURE__ */ jsx120(FileIcon, {}),
          "New File ",
          /* @__PURE__ */ jsx120(MenubarShortcut, { children: "\u2318N" })
        ] }),
        /* @__PURE__ */ jsxs87(MenubarItem, { children: [
          /* @__PURE__ */ jsx120(FolderIcon, {}),
          "Open Folder"
        ] }),
        /* @__PURE__ */ jsx120(MenubarSeparator, {}),
        /* @__PURE__ */ jsxs87(MenubarItem, { children: [
          /* @__PURE__ */ jsx120(SaveIcon, {}),
          "Save ",
          /* @__PURE__ */ jsx120(MenubarShortcut, { children: "\u2318S" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs87(MenubarMenu, { children: [
      /* @__PURE__ */ jsx120(MenubarTrigger, { children: "More" }),
      /* @__PURE__ */ jsx120(MenubarContent, { children: /* @__PURE__ */ jsxs87(MenubarGroup, { children: [
        /* @__PURE__ */ jsxs87(MenubarItem, { children: [
          /* @__PURE__ */ jsx120(SettingsIcon, {}),
          "Settings"
        ] }),
        /* @__PURE__ */ jsxs87(MenubarItem, { children: [
          /* @__PURE__ */ jsx120(HelpCircleIcon, {}),
          "Help"
        ] }),
        /* @__PURE__ */ jsx120(MenubarSeparator, {}),
        /* @__PURE__ */ jsxs87(MenubarItem, { variant: "destructive", children: [
          /* @__PURE__ */ jsx120(TrashIcon2, {}),
          "Delete"
        ] })
      ] }) })
    ] })
  ] });
}

// src/components/ui/menubar-radio.tsx
import * as React17 from "react";
import { jsx as jsx121, jsxs as jsxs88 } from "react/jsx-runtime";
function MenubarRadio() {
  const [user, setUser] = React17.useState("benoit");
  const [theme, setTheme] = React17.useState("system");
  return /* @__PURE__ */ jsxs88(Menubar, { className: "w-72", children: [
    /* @__PURE__ */ jsxs88(MenubarMenu, { children: [
      /* @__PURE__ */ jsx121(MenubarTrigger, { children: "Profiles" }),
      /* @__PURE__ */ jsxs88(MenubarContent, { children: [
        /* @__PURE__ */ jsxs88(MenubarRadioGroup, { value: user, onValueChange: setUser, children: [
          /* @__PURE__ */ jsx121(MenubarRadioItem, { value: "andy", children: "Andy" }),
          /* @__PURE__ */ jsx121(MenubarRadioItem, { value: "benoit", children: "Benoit" }),
          /* @__PURE__ */ jsx121(MenubarRadioItem, { value: "luis", children: "Luis" })
        ] }),
        /* @__PURE__ */ jsx121(MenubarSeparator, {}),
        /* @__PURE__ */ jsx121(MenubarItem, { inset: true, children: "Edit..." }),
        /* @__PURE__ */ jsx121(MenubarItem, { inset: true, children: "Add Profile..." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs88(MenubarMenu, { children: [
      /* @__PURE__ */ jsx121(MenubarTrigger, { children: "Theme" }),
      /* @__PURE__ */ jsx121(MenubarContent, { children: /* @__PURE__ */ jsxs88(MenubarRadioGroup, { value: theme, onValueChange: setTheme, children: [
        /* @__PURE__ */ jsx121(MenubarRadioItem, { value: "light", children: "Light" }),
        /* @__PURE__ */ jsx121(MenubarRadioItem, { value: "dark", children: "Dark" }),
        /* @__PURE__ */ jsx121(MenubarRadioItem, { value: "system", children: "System" })
      ] }) })
    ] })
  ] });
}

// src/components/ui/menubar-submenu.tsx
import { jsx as jsx122, jsxs as jsxs89 } from "react/jsx-runtime";
function MenubarSubmenu() {
  return /* @__PURE__ */ jsxs89(Menubar, { className: "w-72", children: [
    /* @__PURE__ */ jsxs89(MenubarMenu, { children: [
      /* @__PURE__ */ jsx122(MenubarTrigger, { children: "File" }),
      /* @__PURE__ */ jsxs89(MenubarContent, { children: [
        /* @__PURE__ */ jsxs89(MenubarSub, { children: [
          /* @__PURE__ */ jsx122(MenubarSubTrigger, { children: "Share" }),
          /* @__PURE__ */ jsxs89(MenubarSubContent, { children: [
            /* @__PURE__ */ jsx122(MenubarItem, { children: "Email link" }),
            /* @__PURE__ */ jsx122(MenubarItem, { children: "Messages" }),
            /* @__PURE__ */ jsx122(MenubarItem, { children: "Notes" })
          ] })
        ] }),
        /* @__PURE__ */ jsx122(MenubarSeparator, {}),
        /* @__PURE__ */ jsxs89(MenubarItem, { children: [
          "Print... ",
          /* @__PURE__ */ jsx122(MenubarShortcut, { children: "\u2318P" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs89(MenubarMenu, { children: [
      /* @__PURE__ */ jsx122(MenubarTrigger, { children: "Edit" }),
      /* @__PURE__ */ jsxs89(MenubarContent, { children: [
        /* @__PURE__ */ jsxs89(MenubarItem, { children: [
          "Undo ",
          /* @__PURE__ */ jsx122(MenubarShortcut, { children: "\u2318Z" })
        ] }),
        /* @__PURE__ */ jsxs89(MenubarItem, { children: [
          "Redo ",
          /* @__PURE__ */ jsx122(MenubarShortcut, { children: "\u21E7\u2318Z" })
        ] }),
        /* @__PURE__ */ jsx122(MenubarSeparator, {}),
        /* @__PURE__ */ jsxs89(MenubarSub, { children: [
          /* @__PURE__ */ jsx122(MenubarSubTrigger, { children: "Find" }),
          /* @__PURE__ */ jsxs89(MenubarSubContent, { children: [
            /* @__PURE__ */ jsx122(MenubarItem, { children: "Find..." }),
            /* @__PURE__ */ jsx122(MenubarItem, { children: "Find Next" }),
            /* @__PURE__ */ jsx122(MenubarItem, { children: "Find Previous" })
          ] })
        ] }),
        /* @__PURE__ */ jsx122(MenubarSeparator, {}),
        /* @__PURE__ */ jsx122(MenubarItem, { children: "Cut" }),
        /* @__PURE__ */ jsx122(MenubarItem, { children: "Copy" }),
        /* @__PURE__ */ jsx122(MenubarItem, { children: "Paste" })
      ] })
    ] })
  ] });
}

// src/components/ui/native-select.tsx
import { jsx as jsx123, jsxs as jsxs90 } from "react/jsx-runtime";
function NativeSelect({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxs90(
    "div",
    {
      className: cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        className
      ),
      "data-slot": "native-select-wrapper",
      "data-size": size,
      children: [
        /* @__PURE__ */ jsx123(
          "select",
          {
            "data-slot": "native-select",
            "data-size": size,
            className: "h-8 w-full min-w-0 appearance-none rounded-lg border border-input bg-transparent py-1 pr-8 pl-2.5 text-sm transition-colors outline-none select-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-[size=sm]:py-0.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
            ...props
          }
        ),
        /* @__PURE__ */ jsx123(HugeiconsIcon, { icon: UnfoldMoreIcon, strokeWidth: 2, className: "pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground select-none", "aria-hidden": "true", "data-slot": "native-select-icon" })
      ]
    }
  );
}
function NativeSelectOption({ ...props }) {
  return /* @__PURE__ */ jsx123("option", { "data-slot": "native-select-option", ...props });
}
function NativeSelectOptGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx123(
    "optgroup",
    {
      "data-slot": "native-select-optgroup",
      className: cn(className),
      ...props
    }
  );
}

// src/components/ui/navigation-menu.tsx
import { cva as cva11 } from "class-variance-authority";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import { jsx as jsx124, jsxs as jsxs91 } from "react/jsx-runtime";
function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs91(
    NavigationMenuPrimitive.Root,
    {
      "data-slot": "navigation-menu",
      "data-viewport": viewport,
      className: cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      ),
      ...props,
      children: [
        children,
        viewport && /* @__PURE__ */ jsx124(NavigationMenuViewport, {})
      ]
    }
  );
}
function NavigationMenuList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx124(
    NavigationMenuPrimitive.List,
    {
      "data-slot": "navigation-menu-list",
      className: cn(
        "group flex flex-1 list-none items-center justify-center gap-0",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx124(
    NavigationMenuPrimitive.Item,
    {
      "data-slot": "navigation-menu-item",
      className: cn("relative", className),
      ...props
    }
  );
}
var navigationMenuTriggerStyle = cva11(
  "group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-lg bg-background px-2.5 py-1.5 text-sm font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted"
);
function NavigationMenuTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs91(
    NavigationMenuPrimitive.Trigger,
    {
      "data-slot": "navigation-menu-trigger",
      className: cn(navigationMenuTriggerStyle(), "group", className),
      ...props,
      children: [
        children,
        " ",
        /* @__PURE__ */ jsx124(HugeiconsIcon, { icon: ArrowDown01Icon, strokeWidth: 2, className: "relative top-px ml-1 size-3 transition duration-300 group-data-popup-open/navigation-menu-trigger:rotate-180 group-data-open/navigation-menu-trigger:rotate-180", "aria-hidden": "true" })
      ]
    }
  );
}
function NavigationMenuContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx124(
    NavigationMenuPrimitive.Content,
    {
      "data-slot": "navigation-menu-content",
      className: cn(
        "top-0 left-0 w-full p-1 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-lg group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:ring-1 group-data-[viewport=false]/navigation-menu:ring-foreground/10 group-data-[viewport=false]/navigation-menu:duration-300 data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none md:absolute md:w-auto group-data-[viewport=false]/navigation-menu:data-open:animate-in group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-closed:animate-out group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuViewport({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx124(
    "div",
    {
      className: cn(
        "absolute top-full left-0 isolate z-50 flex justify-center"
      ),
      children: /* @__PURE__ */ jsx124(
        NavigationMenuPrimitive.Viewport,
        {
          "data-slot": "navigation-menu-viewport",
          className: cn(
            "origin-top-center relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden rounded-lg bg-popover text-popover-foreground shadow ring-1 ring-foreground/10 duration-100 md:w-(--radix-navigation-menu-viewport-width) data-open:animate-in data-open:zoom-in-90 data-closed:animate-out data-closed:zoom-out-95",
            className
          ),
          ...props
        }
      )
    }
  );
}
function NavigationMenuLink({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx124(
    NavigationMenuPrimitive.Link,
    {
      "data-slot": "navigation-menu-link",
      className: cn(
        "flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:rounded-md data-active:bg-muted/50 data-active:hover:bg-muted data-active:focus:bg-muted [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuIndicator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx124(
    NavigationMenuPrimitive.Indicator,
    {
      "data-slot": "navigation-menu-indicator",
      className: cn(
        "top-full z-1 flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx124("div", { className: "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" })
    }
  );
}

// src/components/ui/number-field.tsx
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { MinusIcon as MinusIcon2, PlusIcon as PlusIcon5 } from "lucide-react";
import * as React18 from "react";
import { jsx as jsx125, jsxs as jsxs92 } from "react/jsx-runtime";
var NumberFieldContext = React18.createContext(null);
function NumberField({
  id,
  className,
  size = "default",
  ...props
}) {
  const generatedId = React18.useId();
  const fieldId = id ?? generatedId;
  return /* @__PURE__ */ jsx125(NumberFieldContext.Provider, { value: { fieldId }, children: /* @__PURE__ */ jsx125(
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
function NumberFieldGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx125(
    NumberFieldPrimitive.Group,
    {
      className: cn(
        "relative flex w-full justify-between rounded-lg border border-input bg-background not-dark:bg-clip-padding text-base text-foreground shadow-xs/5 ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-data-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-within:border-ring focus-within:ring-[3px] has-aria-invalid:border-destructive/36 has-autofill:bg-foreground/4 focus-within:has-aria-invalid:border-destructive/64 focus-within:has-aria-invalid:ring-destructive/48 data-disabled:pointer-events-none data-disabled:opacity-64 sm:text-sm dark:bg-input/32 dark:has-autofill:bg-foreground/8 dark:has-aria-invalid:ring-destructive/24 dark:not-data-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)] [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [[data-disabled],:focus-within,[aria-invalid]]:shadow-none",
        className
      ),
      "data-slot": "number-field-group",
      ...props
    }
  );
}
function NumberFieldDecrement({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx125(
    NumberFieldPrimitive.Decrement,
    {
      className: cn(
        "relative flex shrink-0 cursor-pointer items-center justify-center rounded-s-[calc(var(--radius-lg)-1px)] in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] px-[calc(--spacing(3)-1px)] transition-colors pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:bg-accent",
        className
      ),
      "data-slot": "number-field-decrement",
      ...props,
      children: /* @__PURE__ */ jsx125(MinusIcon2, {})
    }
  );
}
function NumberFieldIncrement({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx125(
    NumberFieldPrimitive.Increment,
    {
      className: cn(
        "relative flex shrink-0 cursor-pointer items-center justify-center rounded-e-[calc(var(--radius-lg)-1px)] in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] px-[calc(--spacing(3)-1px)] transition-colors pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:bg-accent",
        className
      ),
      "data-slot": "number-field-increment",
      ...props,
      children: /* @__PURE__ */ jsx125(PlusIcon5, {})
    }
  );
}
function NumberFieldInput({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx125(
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
function NumberFieldScrubArea({
  className,
  label,
  ...props
}) {
  const context = React18.useContext(NumberFieldContext);
  if (!context) {
    throw new Error(
      "NumberFieldScrubArea must be used within a NumberField component for accessibility."
    );
  }
  return /* @__PURE__ */ jsxs92(
    NumberFieldPrimitive.ScrubArea,
    {
      className: cn("flex cursor-ew-resize", className),
      "data-slot": "number-field-scrub-area",
      ...props,
      children: [
        /* @__PURE__ */ jsx125(Label, { className: "cursor-ew-resize", htmlFor: context.fieldId, children: label }),
        /* @__PURE__ */ jsx125(NumberFieldPrimitive.ScrubAreaCursor, { className: "drop-shadow-[0_1px_1px_#0008] filter", children: /* @__PURE__ */ jsx125(CursorGrowIcon, {}) })
      ]
    }
  );
}
function CursorGrowIcon(props) {
  return /* @__PURE__ */ jsx125(
    "svg",
    {
      fill: "black",
      height: "14",
      stroke: "white",
      viewBox: "0 0 24 14",
      width: "26",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx125("path", { d: "M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" })
    }
  );
}

// src/components/ui/pagination.tsx
import { jsx as jsx126, jsxs as jsxs93 } from "react/jsx-runtime";
function Pagination({ className, ...props }) {
  return /* @__PURE__ */ jsx126(
    "nav",
    {
      role: "navigation",
      "aria-label": "pagination",
      "data-slot": "pagination",
      className: cn("mx-auto flex w-full justify-center", className),
      ...props
    }
  );
}
function PaginationContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx126(
    "ul",
    {
      "data-slot": "pagination-content",
      className: cn("flex items-center gap-0.5", className),
      ...props
    }
  );
}
function PaginationItem({ ...props }) {
  return /* @__PURE__ */ jsx126("li", { "data-slot": "pagination-item", ...props });
}
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}) {
  return /* @__PURE__ */ jsx126(
    Button,
    {
      asChild: true,
      variant: isActive ? "outline" : "ghost",
      size,
      className: cn(className),
      children: /* @__PURE__ */ jsx126(
        "a",
        {
          "aria-current": isActive ? "page" : void 0,
          "data-slot": "pagination-link",
          "data-active": isActive,
          ...props
        }
      )
    }
  );
}
function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}) {
  return /* @__PURE__ */ jsxs93(
    PaginationLink,
    {
      "aria-label": "Go to previous page",
      size: "default",
      className: cn("pl-1.5!", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx126(HugeiconsIcon, { icon: ArrowLeft01Icon, strokeWidth: 2, "data-icon": "inline-start" }),
        /* @__PURE__ */ jsx126("span", { className: "hidden sm:block", children: text })
      ]
    }
  );
}
function PaginationNext({
  className,
  text = "Next",
  ...props
}) {
  return /* @__PURE__ */ jsxs93(
    PaginationLink,
    {
      "aria-label": "Go to next page",
      size: "default",
      className: cn("pr-1.5!", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx126("span", { className: "hidden sm:block", children: text }),
        /* @__PURE__ */ jsx126(HugeiconsIcon, { icon: ArrowRight01Icon, strokeWidth: 2, "data-icon": "inline-end" })
      ]
    }
  );
}
function PaginationEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs93(
    "span",
    {
      "aria-hidden": true,
      "data-slot": "pagination-ellipsis",
      className: cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx126(HugeiconsIcon, { icon: MoreHorizontalCircle01Icon, strokeWidth: 2 }),
        /* @__PURE__ */ jsx126("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
}

// src/components/ui/pagination-icons-only.tsx
import { jsx as jsx127, jsxs as jsxs94 } from "react/jsx-runtime";
function PaginationIconsOnly() {
  return /* @__PURE__ */ jsxs94("div", { className: "flex items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxs94(Field, { orientation: "horizontal", className: "w-fit", children: [
      /* @__PURE__ */ jsx127(FieldLabel, { htmlFor: "select-rows-per-page", children: "Rows per page" }),
      /* @__PURE__ */ jsxs94(Select, { defaultValue: "25", children: [
        /* @__PURE__ */ jsx127(SelectTrigger, { className: "w-20", id: "select-rows-per-page", children: /* @__PURE__ */ jsx127(SelectValue, {}) }),
        /* @__PURE__ */ jsx127(SelectContent, { align: "start", children: /* @__PURE__ */ jsxs94(SelectGroup, { children: [
          /* @__PURE__ */ jsx127(SelectItem, { value: "10", children: "10" }),
          /* @__PURE__ */ jsx127(SelectItem, { value: "25", children: "25" }),
          /* @__PURE__ */ jsx127(SelectItem, { value: "50", children: "50" }),
          /* @__PURE__ */ jsx127(SelectItem, { value: "100", children: "100" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx127(Pagination, { className: "mx-0 w-auto", children: /* @__PURE__ */ jsxs94(PaginationContent, { children: [
      /* @__PURE__ */ jsx127(PaginationItem, { children: /* @__PURE__ */ jsx127(PaginationPrevious, { href: "#" }) }),
      /* @__PURE__ */ jsx127(PaginationItem, { children: /* @__PURE__ */ jsx127(PaginationNext, { href: "#" }) })
    ] }) })
  ] });
}

// src/components/ui/popover-alignments.tsx
import { Fragment as Fragment6, jsx as jsx128, jsxs as jsxs95 } from "react/jsx-runtime";
function PopoverAlignments() {
  return /* @__PURE__ */ jsx128(Fragment6, { children: /* @__PURE__ */ jsxs95("div", { className: "flex gap-6", children: [
    /* @__PURE__ */ jsxs95(Popover, { children: [
      /* @__PURE__ */ jsx128(PopoverTrigger, { render: /* @__PURE__ */ jsx128(Button, { variant: "outline", size: "sm" }), children: "Start" }),
      /* @__PURE__ */ jsx128(PopoverPopup, { align: "start", className: "w-40", children: "Aligned to start" })
    ] }),
    /* @__PURE__ */ jsxs95(Popover, { children: [
      /* @__PURE__ */ jsx128(PopoverTrigger, { render: /* @__PURE__ */ jsx128(Button, { variant: "outline", size: "sm" }), children: "Center" }),
      /* @__PURE__ */ jsx128(PopoverPopup, { align: "center", className: "w-40", children: "Aligned to center" })
    ] }),
    /* @__PURE__ */ jsxs95(Popover, { children: [
      /* @__PURE__ */ jsx128(PopoverTrigger, { render: /* @__PURE__ */ jsx128(Button, { variant: "outline", size: "sm" }), children: "End" }),
      /* @__PURE__ */ jsx128(PopoverPopup, { align: "end", className: "w-40", children: "Aligned to end" })
    ] })
  ] }) });
}

// src/components/ui/popover-basic.tsx
import { Fragment as Fragment7, jsx as jsx129, jsxs as jsxs96 } from "react/jsx-runtime";
function PopoverBasic() {
  return /* @__PURE__ */ jsx129(Fragment7, { children: /* @__PURE__ */ jsxs96(Popover, { children: [
    /* @__PURE__ */ jsx129(PopoverTrigger, { render: /* @__PURE__ */ jsx129(Button, { variant: "outline", className: "w-fit" }), children: "Open Popover" }),
    /* @__PURE__ */ jsx129(PopoverPopup, { align: "start", children: /* @__PURE__ */ jsxs96(PopoverHeader, { children: [
      /* @__PURE__ */ jsx129(PopoverTitle, { children: "Dimensions" }),
      /* @__PURE__ */ jsx129(PopoverDescription, { children: "Set the dimensions for the layer." })
    ] }) })
  ] }) });
}

// src/components/ui/popover-form.tsx
import { Fragment as Fragment8, jsx as jsx130, jsxs as jsxs97 } from "react/jsx-runtime";
function PopoverForm() {
  return /* @__PURE__ */ jsx130(Fragment8, { children: /* @__PURE__ */ jsxs97(Popover, { children: [
    /* @__PURE__ */ jsx130(PopoverTrigger, { render: /* @__PURE__ */ jsx130(Button, { variant: "outline" }), children: "Open Popover" }),
    /* @__PURE__ */ jsxs97(PopoverPopup, { className: "w-64", align: "start", children: [
      /* @__PURE__ */ jsxs97(PopoverHeader, { children: [
        /* @__PURE__ */ jsx130(PopoverTitle, { children: "Dimensions" }),
        /* @__PURE__ */ jsx130(PopoverDescription, { children: "Set the dimensions for the layer." })
      ] }),
      /* @__PURE__ */ jsxs97(FieldGroup, { className: "gap-4", children: [
        /* @__PURE__ */ jsxs97(Field, { orientation: "horizontal", children: [
          /* @__PURE__ */ jsx130(FieldLabel, { htmlFor: "width", className: "w-1/2", children: "Width" }),
          /* @__PURE__ */ jsx130(Input, { id: "width", defaultValue: "100%" })
        ] }),
        /* @__PURE__ */ jsxs97(Field, { orientation: "horizontal", children: [
          /* @__PURE__ */ jsx130(FieldLabel, { htmlFor: "height", className: "w-1/2", children: "Height" }),
          /* @__PURE__ */ jsx130(Input, { id: "height", defaultValue: "25px" })
        ] })
      ] })
    ] })
  ] }) });
}

// src/components/ui/preview-card.tsx
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { jsx as jsx131 } from "react/jsx-runtime";
var PreviewCard = PreviewCardPrimitive.Root;
function PreviewCardTrigger({ ...props }) {
  return /* @__PURE__ */ jsx131(PreviewCardPrimitive.Trigger, { "data-slot": "preview-card-trigger", ...props });
}
function PreviewCardPopup({
  className,
  children,
  align = "center",
  sideOffset = 4,
  anchor,
  ...props
}) {
  return /* @__PURE__ */ jsx131(PreviewCardPrimitive.Portal, { children: /* @__PURE__ */ jsx131(
    PreviewCardPrimitive.Positioner,
    {
      align,
      anchor,
      className: "z-50",
      "data-slot": "preview-card-positioner",
      sideOffset,
      children: /* @__PURE__ */ jsx131(
        PreviewCardPrimitive.Popup,
        {
          className: cn(
            "relative flex w-64 origin-(--transform-origin) text-balance rounded-lg border bg-popover not-dark:bg-clip-padding p-4 text-popover-foreground text-sm shadow-lg/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className
          ),
          "data-slot": "preview-card-content",
          ...props,
          children
        }
      )
    }
  ) });
}

// src/components/ui/progress.tsx
import { Progress as ProgressPrimitive } from "radix-ui";
import { jsx as jsx132 } from "react/jsx-runtime";
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsx132(
    ProgressPrimitive.Root,
    {
      "data-slot": "progress",
      className: cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx132(
        ProgressPrimitive.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "size-full flex-1 bg-primary transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}

// src/components/ui/radio-group.tsx
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { jsx as jsx133 } from "react/jsx-runtime";
function RadioGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx133(
    RadioGroupPrimitive.Root,
    {
      "data-slot": "radio-group",
      className: cn("grid w-full gap-2", className),
      ...props
    }
  );
}
function RadioGroupItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx133(
    RadioGroupPrimitive.Item,
    {
      "data-slot": "radio-group-item",
      className: cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx133(
        RadioGroupPrimitive.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "flex size-4 items-center justify-center",
          children: /* @__PURE__ */ jsx133("span", { className: "absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" })
        }
      )
    }
  );
}

// src/components/ui/rating.tsx
import * as React19 from "react";
import { cva as cva12 } from "class-variance-authority";
import { StarIcon as StarIcon4 } from "lucide-react";
import { Fragment as Fragment9, jsx as jsx134, jsxs as jsxs98 } from "react/jsx-runtime";
var ratingVariants = cva12("transition-colors", {
  variants: {
    variant: {
      default: "text-foreground fill-current",
      destructive: "text-destructive fill-current",
      outline: "text-muted-foreground fill-transparent stroke-current",
      secondary: "text-secondary-foreground fill-current",
      yellow: "fill-current text-amber-600 dark:text-amber-400"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
var RATING_DEFAULTS = {
  precision: 1,
  maxStars: 5,
  size: 20,
  variant: "default",
  icon: /* @__PURE__ */ jsx134(StarIcon4, {})
};
function RatingItem({
  size,
  variant = "default",
  value,
  point,
  hoveredValue,
  name,
  readOnly = false,
  disabled = false,
  precision,
  Icon,
  onMouseLeave,
  onValueChange,
  onValueHover,
  className,
  ...props
}) {
  const Comp = readOnly ? "span" : "label";
  const id = React19.useId();
  const ratingIconId = `rating-icon-${id}`;
  const isInteractive = !readOnly && !disabled;
  const partialPoint = point % 1;
  const isPartialPoint = partialPoint !== 0;
  const shouldShowFilled = (hoveredValue || value) >= point;
  const partialPointWidth = isPartialPoint && shouldShowFilled ? `${partialPoint * 100}%` : void 0;
  const icons = React19.useMemo(() => {
    const emptyIcon = React19.cloneElement(Icon, {
      size,
      className: cn(
        "fill-muted-foreground/20 stroke-muted-foreground/10",
        variant === "yellow" && "fill-amber-600/30 stroke-amber-600/10 dark:fill-amber-400/30 dark:stroke-amber-400/10"
      ),
      "aria-hidden": "true"
    });
    const fullIcon = React19.cloneElement(Icon, {
      size,
      className: cn(ratingVariants({ variant })),
      "aria-hidden": "true"
    });
    return { emptyIcon, fullIcon };
  }, [Icon, size, variant]);
  const getRatingPoint = React19.useCallback(
    (event) => {
      const { left, width } = event.currentTarget.getBoundingClientRect();
      if (width === 0 || precision <= 0 || precision > 1) return 0;
      const x = event.clientX - left;
      const fillRatio = x / width;
      const base = Math.ceil(point) - 1;
      return base + Math.ceil(fillRatio / precision) * precision;
    },
    [precision, point]
  );
  const handleMouseMove = React19.useCallback(
    (event) => {
      if (!isInteractive) return;
      onValueHover(getRatingPoint(event));
    },
    [isInteractive, onValueHover, getRatingPoint]
  );
  const handleClick = React19.useCallback(
    (event) => {
      if (!isInteractive) return;
      const newPoint = getRatingPoint(event);
      onValueHover(0);
      onValueChange?.(newPoint === value ? 0 : newPoint);
      event.currentTarget.blur();
    },
    [isInteractive, value, onValueChange, onValueHover, getRatingPoint]
  );
  return /* @__PURE__ */ jsxs98(Fragment9, { children: [
    /* @__PURE__ */ jsxs98(
      Comp,
      {
        "data-slot": "rating-item",
        htmlFor: readOnly ? void 0 : `${ratingIconId}-${point}`,
        "aria-label": `${point} Stars`,
        onClick: !readOnly ? handleClick : void 0,
        onMouseMove: !readOnly ? handleMouseMove : void 0,
        onMouseLeave: !readOnly ? onMouseLeave : void 0,
        "data-disabled": disabled,
        "data-readonly": readOnly,
        "data-filled": shouldShowFilled,
        className: cn(
          "[&_svg]:pointer-events-none",
          isPartialPoint && "pointer-events-none absolute top-0 left-0 overflow-hidden",
          isInteractive && "cursor-pointer hover:scale-105",
          disabled && "cursor-not-allowed opacity-50",
          className
        ),
        style: { width: partialPointWidth },
        ...props,
        children: [
          !isPartialPoint && !shouldShowFilled && icons.emptyIcon,
          shouldShowFilled && icons.fullIcon
        ]
      }
    ),
    !readOnly && /* @__PURE__ */ jsx134(
      "input",
      {
        type: "radio",
        id: `${ratingIconId}-${point}`,
        name,
        value: point,
        className: "sr-only",
        tabIndex: -1,
        "data-slot": "rating-input"
      }
    )
  ] });
}
function Rating({
  value: controlledValue,
  defaultValue = 0,
  name,
  max = RATING_DEFAULTS.maxStars,
  size = RATING_DEFAULTS.size,
  icon: Icon = RATING_DEFAULTS.icon,
  variant = RATING_DEFAULTS.variant,
  className,
  readOnly = false,
  disabled = false,
  precision = RATING_DEFAULTS.precision,
  onValueChange,
  onValueHover,
  ...props
}) {
  const id = React19.useId();
  const ratingName = name ?? `rating-${id}`;
  const [internalValue, setInternalValue] = React19.useState(defaultValue);
  const [hoveredValue, setHoveredValue] = React19.useState(0);
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? controlledValue : internalValue;
  const isInteractive = !readOnly && !disabled;
  const handleValueChange = React19.useCallback(
    (newValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );
  const handleValueHover = React19.useCallback(
    (point) => {
      setHoveredValue(point);
      onValueHover?.(point);
    },
    [onValueHover]
  );
  const handleKeyDown = React19.useCallback(
    (event) => {
      if (!isInteractive) return;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          event.preventDefault();
          if (value + precision > max) {
            handleValueChange(0);
          } else {
            handleValueChange(value + precision);
          }
          break;
        case "ArrowLeft":
        case "ArrowDown":
          event.preventDefault();
          if (value - precision < 0) {
            handleValueChange(max);
          } else {
            handleValueChange(value - precision);
          }
          break;
        case " ":
        case "Enter":
          event.preventDefault();
          if (value === 0) {
            handleValueChange(precision);
          } else {
            handleValueChange(0);
          }
          break;
        case "Home":
          event.preventDefault();
          handleValueChange(precision);
          break;
        case "End":
          event.preventDefault();
          handleValueChange(max);
          break;
        default:
          break;
      }
    },
    [isInteractive, value, max, precision, handleValueChange]
  );
  const handleMouseDown = React19.useCallback((event) => {
    event.preventDefault();
  }, []);
  const stars = React19.useMemo(() => {
    if (precision <= 0 || precision > 1) {
      console.warn("Rating: precision must be greater than 0 and less than or equal to 1");
      return [];
    }
    return Array.from({ length: max }, (_, index) => ({
      key: index,
      points: Array.from({ length: Math.floor(1 / precision) }, (_2, i) => index + precision * (i + 1))
    }));
  }, [max, precision]);
  return /* @__PURE__ */ jsx134(
    "div",
    {
      "data-slot": "rating",
      role: !readOnly ? "radiogroup" : "img",
      onKeyDown: !readOnly ? handleKeyDown : void 0,
      onMouseDown: !readOnly ? handleMouseDown : void 0,
      tabIndex: !readOnly && !disabled ? 0 : void 0,
      "data-disabled": disabled,
      "data-readonly": readOnly,
      className: cn(
        "focus-visible:ring-ring/50 flex gap-px focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        disabled && "opacity-50",
        className
      ),
      "aria-label": readOnly ? `${value} stars` : "Rating",
      "aria-valuemin": 0,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-valuetext": `${value} of ${max} stars`,
      ...props,
      children: stars.map(({ key, points }) => /* @__PURE__ */ jsx134(
        "span",
        {
          "data-slot": "rating-star",
          className: cn(
            "relative",
            isInteractive && "transition-transform hover:scale-110",
            disabled && "cursor-not-allowed"
          ),
          "aria-disabled": disabled,
          "aria-hidden": readOnly,
          children: points.map((point) => /* @__PURE__ */ jsx134(
            RatingItem,
            {
              name: ratingName,
              disabled,
              hoveredValue,
              point,
              precision,
              readOnly,
              size,
              value,
              variant,
              Icon,
              onMouseLeave: () => setHoveredValue(0),
              onValueHover: handleValueHover,
              onValueChange: handleValueChange
            },
            point
          ))
        },
        key
      ))
    }
  );
}

// src/components/ui/resizable.tsx
import * as ResizablePrimitive from "react-resizable-panels";
import { jsx as jsx135 } from "react/jsx-runtime";
function ResizablePanelGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx135(
    ResizablePrimitive.Group,
    {
      "data-slot": "resizable-panel-group",
      className: cn(
        "flex h-full w-full aria-[orientation=vertical]:flex-col",
        className
      ),
      ...props
    }
  );
}
function ResizablePanel({ ...props }) {
  return /* @__PURE__ */ jsx135(ResizablePrimitive.Panel, { "data-slot": "resizable-panel", ...props });
}
function ResizableHandle({
  withHandle,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx135(
    ResizablePrimitive.Separator,
    {
      "data-slot": "resizable-handle",
      className: cn(
        "relative flex w-px items-center justify-center bg-border ring-offset-background after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90",
        className
      ),
      ...props,
      children: withHandle && /* @__PURE__ */ jsx135("div", { className: "z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border" })
    }
  );
}

// src/components/ui/resizable-handle.tsx
import { jsx as jsx136, jsxs as jsxs99 } from "react/jsx-runtime";

// src/components/ui/resizable-vertical.tsx
import { jsx as jsx137, jsxs as jsxs100 } from "react/jsx-runtime";
function ResizableVertical() {
  return /* @__PURE__ */ jsxs100(
    ResizablePanelGroup,
    {
      orientation: "vertical",
      className: "min-h-[200px] max-w-sm rounded-lg border",
      children: [
        /* @__PURE__ */ jsx137(ResizablePanel, { defaultSize: "25%", children: /* @__PURE__ */ jsx137("div", { className: "flex h-full items-center justify-center p-6", children: /* @__PURE__ */ jsx137("span", { className: "font-semibold", children: "Header" }) }) }),
        /* @__PURE__ */ jsx137(ResizableHandle, {}),
        /* @__PURE__ */ jsx137(ResizablePanel, { defaultSize: "75%", children: /* @__PURE__ */ jsx137("div", { className: "flex h-full items-center justify-center p-6", children: /* @__PURE__ */ jsx137("span", { className: "font-semibold", children: "Content" }) }) })
      ]
    }
  );
}

// src/components/ui/sheet.tsx
import { Dialog as SheetPrimitive } from "radix-ui";
import { jsx as jsx138, jsxs as jsxs101 } from "react/jsx-runtime";
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx138(SheetPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx138(SheetPrimitive.Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetClose({
  ...props
}) {
  return /* @__PURE__ */ jsx138(SheetPrimitive.Close, { "data-slot": "sheet-close", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx138(SheetPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx138(
    SheetPrimitive.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "fixed inset-0 z-50 bg-black/10 duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs101(SheetPortal, { children: [
    /* @__PURE__ */ jsx138(SheetOverlay, {}),
    /* @__PURE__ */ jsxs101(
      SheetPrimitive.Content,
      {
        "data-slot": "sheet-content",
        "data-side": side,
        className: cn(
          "fixed z-50 flex flex-col gap-4 bg-background bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsx138(SheetPrimitive.Close, { "data-slot": "sheet-close", asChild: true, children: /* @__PURE__ */ jsxs101(
            Button,
            {
              variant: "ghost",
              className: "absolute top-3 right-3",
              size: "icon-sm",
              children: [
                /* @__PURE__ */ jsx138(HugeiconsIcon, { icon: Cancel01Icon, strokeWidth: 2 }),
                /* @__PURE__ */ jsx138("span", { className: "sr-only", children: "Close" })
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx138(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-0.5 p-4", className),
      ...props
    }
  );
}
function SheetFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx138(
    "div",
    {
      "data-slot": "sheet-footer",
      className: cn("mt-auto flex flex-col gap-2 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx138(
    SheetPrimitive.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-base font-medium text-foreground", className),
      ...props
    }
  );
}
function SheetDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx138(
    SheetPrimitive.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}

// src/components/ui/sidebar.tsx
import * as React21 from "react";
import { cva as cva13 } from "class-variance-authority";
import { Slot as Slot4 } from "radix-ui";

// src/hooks/use-mobile.ts
import * as React20 from "react";
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React20.useState(void 0);
  React20.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}

// src/components/ui/skeleton.tsx
import { jsx as jsx139 } from "react/jsx-runtime";
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx139(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("animate-pulse rounded-md bg-muted", className),
      ...props
    }
  );
}

// src/components/ui/sidebar.tsx
import { jsx as jsx140, jsxs as jsxs102 } from "react/jsx-runtime";
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = React21.createContext(null);
function useSidebar() {
  const context = React21.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React21.useState(false);
  const [_open, _setOpen] = React21.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React21.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );
  const toggleSidebar = React21.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React21.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React21.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );
  return /* @__PURE__ */ jsx140(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx140(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
        className
      ),
      ...props,
      children
    }
  ) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsx140(
      "div",
      {
        "data-slot": "sidebar",
        className: cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className
        ),
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsx140(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxs102(
      SheetContent,
      {
        dir,
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        "data-mobile": "true",
        className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ jsxs102(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ jsx140(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ jsx140(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ jsx140("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxs102(
    "div",
    {
      className: "group peer hidden text-sidebar-foreground md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ jsx140(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: cn(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsx140(
          "div",
          {
            "data-slot": "sidebar-container",
            "data-side": side,
            className: cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsx140(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarTrigger({
  className,
  onClick,
  ...props
}) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxs102(
    Button,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon-sm",
      className: cn(className),
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx140(HugeiconsIcon, { icon: SidebarLeftIcon, strokeWidth: 2 }),
        /* @__PURE__ */ jsx140("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function SidebarRail({ className, ...props }) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsx140(
    "button",
    {
      "data-sidebar": "rail",
      "data-slot": "sidebar-rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle Sidebar",
      className: cn(
        "absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      ),
      ...props
    }
  );
}
function SidebarInset({ className, ...props }) {
  return /* @__PURE__ */ jsx140(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: cn(
        "relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      ),
      ...props
    }
  );
}
function SidebarInput({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx140(
    Input,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: cn("h-8 w-full bg-background shadow-none", className),
      ...props
    }
  );
}
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx140(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx140(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx140(
    Separator,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: cn("mx-2 w-auto bg-sidebar-border", className),
      ...props
    }
  );
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsx140(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx140(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
}
function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot4.Root : "div";
  return /* @__PURE__ */ jsx140(
    Comp,
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        className
      ),
      ...props
    }
  );
}
function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot4.Root : "button";
  return /* @__PURE__ */ jsx140(
    Comp,
    {
      "data-slot": "sidebar-group-action",
      "data-sidebar": "group-action",
      className: cn(
        "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
        className
      ),
      ...props
    }
  );
}
function SidebarGroupContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx140(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className),
      ...props
    }
  );
}
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ jsx140(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-0", className),
      ...props
    }
  );
}
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ jsx140(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  );
}
var sidebarMenuButtonVariants = cva13(
  "peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot4.Root : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ jsx140(
    Comp,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxs102(Tooltip, { children: [
    /* @__PURE__ */ jsx140(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsx140(
      TooltipPopup,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      }
    )
  ] });
}
function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}) {
  const Comp = asChild ? Slot4.Root : "button";
  return /* @__PURE__ */ jsx140(
    Comp,
    {
      "data-slot": "sidebar-menu-action",
      "data-sidebar": "menu-action",
      className: cn(
        "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
        showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0",
        className
      ),
      ...props
    }
  );
}
function SidebarMenuBadge({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx140(
    "div",
    {
      "data-slot": "sidebar-menu-badge",
      "data-sidebar": "menu-badge",
      className: cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground",
        className
      ),
      ...props
    }
  );
}
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}) {
  const [width] = React21.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  });
  return /* @__PURE__ */ jsxs102(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
      ...props,
      children: [
        showIcon && /* @__PURE__ */ jsx140(
          Skeleton,
          {
            className: "size-4 rounded-md",
            "data-sidebar": "menu-skeleton-icon"
          }
        ),
        /* @__PURE__ */ jsx140(
          Skeleton,
          {
            className: "h-4 max-w-(--skeleton-width) flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": width
            }
          }
        )
      ]
    }
  );
}
function SidebarMenuSub({ className, ...props }) {
  return /* @__PURE__ */ jsx140(
    "ul",
    {
      "data-slot": "sidebar-menu-sub",
      "data-sidebar": "menu-sub",
      className: cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarMenuSubItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx140(
    "li",
    {
      "data-slot": "sidebar-menu-sub-item",
      "data-sidebar": "menu-sub-item",
      className: cn("group/menu-sub-item relative", className),
      ...props
    }
  );
}
function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}) {
  const Comp = asChild ? Slot4.Root : "a";
  return /* @__PURE__ */ jsx140(
    Comp,
    {
      "data-slot": "sidebar-menu-sub-button",
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/skeleton-avatar.tsx
import { jsx as jsx141, jsxs as jsxs103 } from "react/jsx-runtime";
function SkeletonAvatar() {
  return /* @__PURE__ */ jsxs103("div", { className: "flex w-fit items-center gap-4", children: [
    /* @__PURE__ */ jsx141(Skeleton, { className: "size-10 shrink-0 rounded-full" }),
    /* @__PURE__ */ jsxs103("div", { className: "grid gap-2", children: [
      /* @__PURE__ */ jsx141(Skeleton, { className: "h-4 w-[150px]" }),
      /* @__PURE__ */ jsx141(Skeleton, { className: "h-4 w-[100px]" })
    ] })
  ] });
}

// src/components/ui/skeleton-card.tsx
import { jsx as jsx142, jsxs as jsxs104 } from "react/jsx-runtime";
function SkeletonCard() {
  return /* @__PURE__ */ jsxs104(Card, { className: "w-full max-w-xs", children: [
    /* @__PURE__ */ jsxs104(CardHeader, { children: [
      /* @__PURE__ */ jsx142(Skeleton, { className: "h-4 w-2/3" }),
      /* @__PURE__ */ jsx142(Skeleton, { className: "h-4 w-1/2" })
    ] }),
    /* @__PURE__ */ jsx142(CardContent, { children: /* @__PURE__ */ jsx142(Skeleton, { className: "aspect-video w-full" }) })
  ] });
}

// src/components/ui/skeleton-demo.tsx
import { jsx as jsx143, jsxs as jsxs105 } from "react/jsx-runtime";
function SkeletonDemo() {
  return /* @__PURE__ */ jsxs105("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsx143(Skeleton, { className: "h-12 w-12 rounded-full" }),
    /* @__PURE__ */ jsxs105("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx143(Skeleton, { className: "h-4 w-[250px]" }),
      /* @__PURE__ */ jsx143(Skeleton, { className: "h-4 w-[200px]" })
    ] })
  ] });
}

// src/components/ui/skeleton-form.tsx
import { jsx as jsx144, jsxs as jsxs106 } from "react/jsx-runtime";
function SkeletonForm() {
  return /* @__PURE__ */ jsxs106("div", { className: "flex w-full max-w-xs flex-col gap-7", children: [
    /* @__PURE__ */ jsxs106("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsx144(Skeleton, { className: "h-4 w-20" }),
      /* @__PURE__ */ jsx144(Skeleton, { className: "h-8 w-full" })
    ] }),
    /* @__PURE__ */ jsxs106("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsx144(Skeleton, { className: "h-4 w-24" }),
      /* @__PURE__ */ jsx144(Skeleton, { className: "h-8 w-full" })
    ] }),
    /* @__PURE__ */ jsx144(Skeleton, { className: "h-8 w-24" })
  ] });
}

// src/components/ui/skeleton-table.tsx
import { jsx as jsx145, jsxs as jsxs107 } from "react/jsx-runtime";
function SkeletonTable() {
  return /* @__PURE__ */ jsx145("div", { className: "flex w-full max-w-sm flex-col gap-2", children: Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsxs107("div", { className: "flex gap-4", children: [
    /* @__PURE__ */ jsx145(Skeleton, { className: "h-4 flex-1" }),
    /* @__PURE__ */ jsx145(Skeleton, { className: "h-4 w-24" }),
    /* @__PURE__ */ jsx145(Skeleton, { className: "h-4 w-20" })
  ] }, index)) });
}

// src/components/ui/skeleton-text.tsx
import { jsx as jsx146, jsxs as jsxs108 } from "react/jsx-runtime";
function SkeletonText() {
  return /* @__PURE__ */ jsxs108("div", { className: "flex w-full max-w-xs flex-col gap-2", children: [
    /* @__PURE__ */ jsx146(Skeleton, { className: "h-4 w-full" }),
    /* @__PURE__ */ jsx146(Skeleton, { className: "h-4 w-full" }),
    /* @__PURE__ */ jsx146(Skeleton, { className: "h-4 w-3/4" })
  ] });
}

// src/components/ui/slider.tsx
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import * as React22 from "react";
import { jsx as jsx147, jsxs as jsxs109 } from "react/jsx-runtime";
function Slider({
  className,
  children,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const _values = React22.useMemo(() => {
    if (value !== void 0) {
      return Array.isArray(value) ? value : [value];
    }
    if (defaultValue !== void 0) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [min];
  }, [value, defaultValue, min]);
  return /* @__PURE__ */ jsxs109(
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
        /* @__PURE__ */ jsx147(
          SliderPrimitive.Control,
          {
            className: "flex touch-none select-none data-disabled:pointer-events-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:min-w-44 data-[orientation=vertical]:flex-col data-disabled:opacity-64",
            "data-slot": "slider-control",
            children: /* @__PURE__ */ jsxs109(
              SliderPrimitive.Track,
              {
                className: "relative grow select-none before:absolute before:rounded-full before:bg-input data-[orientation=horizontal]:h-1 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1 data-[orientation=horizontal]:before:inset-x-0.5 data-[orientation=vertical]:before:inset-x-0 data-[orientation=horizontal]:before:inset-y-0 data-[orientation=vertical]:before:inset-y-0.5",
                "data-slot": "slider-track",
                children: [
                  /* @__PURE__ */ jsx147(
                    SliderPrimitive.Indicator,
                    {
                      className: "select-none rounded-full bg-primary data-[orientation=horizontal]:ms-0.5 data-[orientation=vertical]:mb-0.5",
                      "data-slot": "slider-indicator"
                    }
                  ),
                  Array.from({ length: _values.length }, (_, index) => /* @__PURE__ */ jsx147(
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
function SliderValue({ className, ...props }) {
  return /* @__PURE__ */ jsx147(
    SliderPrimitive.Value,
    {
      className: cn("flex justify-end text-sm", className),
      "data-slot": "slider-value",
      ...props
    }
  );
}

// src/components/ui/sonner.tsx
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { jsx as jsx148 } from "react/jsx-runtime";
var Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx148(
    Sonner,
    {
      theme,
      className: "toaster group",
      icons: {
        success: /* @__PURE__ */ jsx148(HugeiconsIcon, { icon: CheckmarkCircle02Icon, strokeWidth: 2, className: "size-4" }),
        info: /* @__PURE__ */ jsx148(HugeiconsIcon, { icon: InformationCircleIcon, strokeWidth: 2, className: "size-4" }),
        warning: /* @__PURE__ */ jsx148(HugeiconsIcon, { icon: Alert02Icon, strokeWidth: 2, className: "size-4" }),
        error: /* @__PURE__ */ jsx148(HugeiconsIcon, { icon: MultiplicationSignCircleIcon, strokeWidth: 2, className: "size-4" }),
        loading: /* @__PURE__ */ jsx148(HugeiconsIcon, { icon: Loading03Icon, strokeWidth: 2, className: "size-4 animate-spin" })
      },
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)"
      },
      toastOptions: {
        classNames: {
          toast: "cn-toast"
        }
      },
      ...props
    }
  );
};

// src/components/ui/table.tsx
import { jsx as jsx149 } from "react/jsx-runtime";
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx149(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsx149(
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
  return /* @__PURE__ */ jsx149(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx149(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx149(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      ),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx149(
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
  return /* @__PURE__ */ jsx149(
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
  return /* @__PURE__ */ jsx149(
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
function TableCaption({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx149(
    "caption",
    {
      "data-slot": "table-caption",
      className: cn("mt-4 text-sm text-muted-foreground", className),
      ...props
    }
  );
}

// src/components/ui/table-actions.tsx
import { MoreHorizontalIcon as MoreHorizontalIcon2 } from "lucide-react";
import { jsx as jsx150, jsxs as jsxs110 } from "react/jsx-runtime";
function TableActions() {
  return /* @__PURE__ */ jsxs110(Table, { children: [
    /* @__PURE__ */ jsx150(TableHeader, { children: /* @__PURE__ */ jsxs110(TableRow, { children: [
      /* @__PURE__ */ jsx150(TableHead, { children: "Product" }),
      /* @__PURE__ */ jsx150(TableHead, { children: "Price" }),
      /* @__PURE__ */ jsx150(TableHead, { className: "text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxs110(TableBody, { children: [
      /* @__PURE__ */ jsxs110(TableRow, { children: [
        /* @__PURE__ */ jsx150(TableCell, { className: "font-medium", children: "Wireless Mouse" }),
        /* @__PURE__ */ jsx150(TableCell, { children: "$29.99" }),
        /* @__PURE__ */ jsx150(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs110(DropdownMenu, { children: [
          /* @__PURE__ */ jsxs110(
            DropdownMenuTrigger,
            {
              render: /* @__PURE__ */ jsx150(Button, { variant: "ghost", size: "icon", className: "size-8" }),
              children: [
                /* @__PURE__ */ jsx150(MoreHorizontalIcon2, {}),
                /* @__PURE__ */ jsx150("span", { className: "sr-only", children: "Open menu" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs110(DropdownMenuContent, { align: "end", children: [
            /* @__PURE__ */ jsx150(DropdownMenuItem, { children: "Edit" }),
            /* @__PURE__ */ jsx150(DropdownMenuItem, { children: "Duplicate" }),
            /* @__PURE__ */ jsx150(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsx150(DropdownMenuItem, { variant: "destructive", children: "Delete" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs110(TableRow, { children: [
        /* @__PURE__ */ jsx150(TableCell, { className: "font-medium", children: "Mechanical Keyboard" }),
        /* @__PURE__ */ jsx150(TableCell, { children: "$129.99" }),
        /* @__PURE__ */ jsx150(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs110(DropdownMenu, { children: [
          /* @__PURE__ */ jsxs110(
            DropdownMenuTrigger,
            {
              render: /* @__PURE__ */ jsx150(Button, { variant: "ghost", size: "icon", className: "size-8" }),
              children: [
                /* @__PURE__ */ jsx150(MoreHorizontalIcon2, {}),
                /* @__PURE__ */ jsx150("span", { className: "sr-only", children: "Open menu" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs110(DropdownMenuContent, { align: "end", children: [
            /* @__PURE__ */ jsx150(DropdownMenuItem, { children: "Edit" }),
            /* @__PURE__ */ jsx150(DropdownMenuItem, { children: "Duplicate" }),
            /* @__PURE__ */ jsx150(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsx150(DropdownMenuItem, { variant: "destructive", children: "Delete" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs110(TableRow, { children: [
        /* @__PURE__ */ jsx150(TableCell, { className: "font-medium", children: "USB-C Hub" }),
        /* @__PURE__ */ jsx150(TableCell, { children: "$49.99" }),
        /* @__PURE__ */ jsx150(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs110(DropdownMenu, { children: [
          /* @__PURE__ */ jsxs110(
            DropdownMenuTrigger,
            {
              render: /* @__PURE__ */ jsx150(Button, { variant: "ghost", size: "icon", className: "size-8" }),
              children: [
                /* @__PURE__ */ jsx150(MoreHorizontalIcon2, {}),
                /* @__PURE__ */ jsx150("span", { className: "sr-only", children: "Open menu" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs110(DropdownMenuContent, { align: "end", children: [
            /* @__PURE__ */ jsx150(DropdownMenuItem, { children: "Edit" }),
            /* @__PURE__ */ jsx150(DropdownMenuItem, { children: "Duplicate" }),
            /* @__PURE__ */ jsx150(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsx150(DropdownMenuItem, { variant: "destructive", children: "Delete" })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}

// src/components/ui/table-footer.tsx
import { jsx as jsx151, jsxs as jsxs111 } from "react/jsx-runtime";
var invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card"
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal"
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer"
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card"
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal"
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer"
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card"
  }
];
function TableFooterExample() {
  return /* @__PURE__ */ jsxs111(Table, { children: [
    /* @__PURE__ */ jsx151(TableCaption, { children: "A list of your recent invoices." }),
    /* @__PURE__ */ jsx151(TableHeader, { children: /* @__PURE__ */ jsxs111(TableRow, { children: [
      /* @__PURE__ */ jsx151(TableHead, { className: "w-[100px]", children: "Invoice" }),
      /* @__PURE__ */ jsx151(TableHead, { children: "Status" }),
      /* @__PURE__ */ jsx151(TableHead, { children: "Method" }),
      /* @__PURE__ */ jsx151(TableHead, { className: "text-right", children: "Amount" })
    ] }) }),
    /* @__PURE__ */ jsx151(TableBody, { children: invoices.slice(0, 3).map((invoice) => /* @__PURE__ */ jsxs111(TableRow, { children: [
      /* @__PURE__ */ jsx151(TableCell, { className: "font-medium", children: invoice.invoice }),
      /* @__PURE__ */ jsx151(TableCell, { children: invoice.paymentStatus }),
      /* @__PURE__ */ jsx151(TableCell, { children: invoice.paymentMethod }),
      /* @__PURE__ */ jsx151(TableCell, { className: "text-right", children: invoice.totalAmount })
    ] }, invoice.invoice)) }),
    /* @__PURE__ */ jsx151(TableFooter, { children: /* @__PURE__ */ jsxs111(TableRow, { children: [
      /* @__PURE__ */ jsx151(TableCell, { colSpan: 3, children: "Total" }),
      /* @__PURE__ */ jsx151(TableCell, { className: "text-right", children: "$2,500.00" })
    ] }) })
  ] });
}

// src/components/ui/tabs.tsx
import { cva as cva14 } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";
import { jsx as jsx152 } from "react/jsx-runtime";
function Tabs({
  className,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ jsx152(
    TabsPrimitive.Root,
    {
      "data-slot": "tabs",
      "data-orientation": orientation,
      className: cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      ),
      ...props
    }
  );
}
var tabsListVariants = cva14(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function TabsList({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx152(
    TabsPrimitive.List,
    {
      "data-slot": "tabs-list",
      "data-variant": variant,
      className: cn(tabsListVariants({ variant }), className),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx152(
    TabsPrimitive.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx152(
    TabsPrimitive.Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 text-sm outline-none", className),
      ...props
    }
  );
}

// src/components/ui/tabs-disabled.tsx
import { jsx as jsx153, jsxs as jsxs112 } from "react/jsx-runtime";
function TabsDisabled() {
  return /* @__PURE__ */ jsx153(Tabs, { defaultValue: "home", children: /* @__PURE__ */ jsxs112(TabsList, { children: [
    /* @__PURE__ */ jsx153(TabsTrigger, { value: "home", children: "Home" }),
    /* @__PURE__ */ jsx153(TabsTrigger, { value: "settings", disabled: true, children: "Disabled" })
  ] }) });
}

// src/components/ui/tabs-icons.tsx
import { AppWindowIcon, CodeIcon as CodeIcon2 } from "lucide-react";
import { jsx as jsx154, jsxs as jsxs113 } from "react/jsx-runtime";
function TabsIcons() {
  return /* @__PURE__ */ jsx154(Tabs, { defaultValue: "preview", children: /* @__PURE__ */ jsxs113(TabsList, { children: [
    /* @__PURE__ */ jsxs113(TabsTrigger, { value: "preview", children: [
      /* @__PURE__ */ jsx154(AppWindowIcon, {}),
      "Preview"
    ] }),
    /* @__PURE__ */ jsxs113(TabsTrigger, { value: "code", children: [
      /* @__PURE__ */ jsx154(CodeIcon2, {}),
      "Code"
    ] })
  ] }) });
}

// src/components/ui/tabs-line.tsx
import { jsx as jsx155, jsxs as jsxs114 } from "react/jsx-runtime";
function TabsLine() {
  return /* @__PURE__ */ jsx155(Tabs, { defaultValue: "overview", children: /* @__PURE__ */ jsxs114(TabsList, { variant: "line", children: [
    /* @__PURE__ */ jsx155(TabsTrigger, { value: "overview", children: "Overview" }),
    /* @__PURE__ */ jsx155(TabsTrigger, { value: "analytics", children: "Analytics" }),
    /* @__PURE__ */ jsx155(TabsTrigger, { value: "reports", children: "Reports" })
  ] }) });
}

// src/components/ui/tabs-vertical.tsx
import { jsx as jsx156, jsxs as jsxs115 } from "react/jsx-runtime";
function TabsVertical() {
  return /* @__PURE__ */ jsx156(Tabs, { defaultValue: "account", orientation: "vertical", children: /* @__PURE__ */ jsxs115(TabsList, { children: [
    /* @__PURE__ */ jsx156(TabsTrigger, { value: "account", children: "Account" }),
    /* @__PURE__ */ jsx156(TabsTrigger, { value: "password", children: "Password" }),
    /* @__PURE__ */ jsx156(TabsTrigger, { value: "notifications", children: "Notifications" })
  ] }) });
}

// src/components/ui/textarea-button.tsx
import { jsx as jsx157, jsxs as jsxs116 } from "react/jsx-runtime";
function TextareaButton() {
  return /* @__PURE__ */ jsxs116("div", { className: "grid w-full gap-2", children: [
    /* @__PURE__ */ jsx157(Textarea, { placeholder: "Type your message here." }),
    /* @__PURE__ */ jsx157(Button, { children: "Send message" })
  ] });
}

// src/components/ui/textarea-disabled.tsx
import { jsx as jsx158, jsxs as jsxs117 } from "react/jsx-runtime";
function TextareaDisabled() {
  return /* @__PURE__ */ jsxs117(Field, { "data-disabled": true, children: [
    /* @__PURE__ */ jsx158(FieldLabel, { htmlFor: "textarea-disabled", children: "Message" }),
    /* @__PURE__ */ jsx158(
      Textarea,
      {
        id: "textarea-disabled",
        placeholder: "Type your message here.",
        disabled: true
      }
    )
  ] });
}

// src/components/ui/textarea-field.tsx
import { jsx as jsx159, jsxs as jsxs118 } from "react/jsx-runtime";
function TextareaField() {
  return /* @__PURE__ */ jsxs118(Field, { children: [
    /* @__PURE__ */ jsx159(FieldLabel, { htmlFor: "textarea-message", children: "Message" }),
    /* @__PURE__ */ jsx159(FieldDescription, { children: "Enter your message below." }),
    /* @__PURE__ */ jsx159(Textarea, { id: "textarea-message", placeholder: "Type your message here." })
  ] });
}

// src/components/ui/textarea-invalid.tsx
import { jsx as jsx160, jsxs as jsxs119 } from "react/jsx-runtime";
function TextareaInvalid() {
  return /* @__PURE__ */ jsxs119(Field, { "data-invalid": true, children: [
    /* @__PURE__ */ jsx160(FieldLabel, { htmlFor: "textarea-invalid", children: "Message" }),
    /* @__PURE__ */ jsx160(
      Textarea,
      {
        id: "textarea-invalid",
        placeholder: "Type your message here.",
        "aria-invalid": true
      }
    ),
    /* @__PURE__ */ jsx160(FieldDescription, { children: "Please enter a valid message." })
  ] });
}

// src/components/ui/toast.tsx
import { Toast } from "@base-ui/react/toast";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon as InfoIcon9,
  LoaderCircleIcon,
  TriangleAlertIcon
} from "lucide-react";
import { jsx as jsx161, jsxs as jsxs120 } from "react/jsx-runtime";
var toastManager = Toast.createToastManager();
var anchoredToastManager = Toast.createToastManager();
var TOAST_ICONS = {
  error: CircleAlertIcon,
  info: InfoIcon9,
  loading: LoaderCircleIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon
};
function ToastProvider({
  children,
  position = "bottom-right",
  ...props
}) {
  return /* @__PURE__ */ jsxs120(Toast.Provider, { toastManager, ...props, children: [
    children,
    /* @__PURE__ */ jsx161(Toasts, { position })
  ] });
}
function Toasts({ position = "bottom-right" }) {
  const { toasts } = Toast.useToastManager();
  const isTop = position.startsWith("top");
  return /* @__PURE__ */ jsx161(Toast.Portal, { "data-slot": "toast-portal", children: /* @__PURE__ */ jsx161(
    Toast.Viewport,
    {
      className: cn(
        "fixed z-50 mx-auto flex w-[calc(100%-var(--toast-inset)*2)] max-w-90 [--toast-inset:--spacing(4)] sm:[--toast-inset:--spacing(8)]",
        // Vertical positioning
        "data-[position*=top]:top-(--toast-inset)",
        "data-[position*=bottom]:bottom-(--toast-inset)",
        // Horizontal positioning
        "data-[position*=left]:left-(--toast-inset)",
        "data-[position*=right]:right-(--toast-inset)",
        "data-[position*=center]:-translate-x-1/2 data-[position*=center]:left-1/2"
      ),
      "data-position": position,
      "data-slot": "toast-viewport",
      children: toasts.map((toast3) => {
        const Icon = toast3.type ? TOAST_ICONS[toast3.type] : null;
        return /* @__PURE__ */ jsx161(
          Toast.Root,
          {
            className: cn(
              "absolute z-[calc(9999-var(--toast-index))] h-(--toast-calc-height) w-full select-none rounded-lg border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 [transition:transform_.5s_cubic-bezier(.22,1,.36,1),opacity_.5s,height_.15s] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
              // Base positioning using data-position
              "data-[position*=right]:right-0 data-[position*=right]:left-auto",
              "data-[position*=left]:right-auto data-[position*=left]:left-0",
              "data-[position*=center]:right-0 data-[position*=center]:left-0",
              "data-[position*=top]:top-0 data-[position*=top]:bottom-auto data-[position*=top]:origin-top",
              "data-[position*=bottom]:top-auto data-[position*=bottom]:bottom-0 data-[position*=bottom]:origin-bottom",
              // Gap fill for hover
              "after:absolute after:left-0 after:h-[calc(var(--toast-gap)+1px)] after:w-full",
              "data-[position*=top]:after:top-full",
              "data-[position*=bottom]:after:bottom-full",
              // Define some variables
              "[--toast-calc-height:var(--toast-frontmost-height,var(--toast-height))] [--toast-gap:--spacing(3)] [--toast-peek:--spacing(3)] [--toast-scale:calc(max(0,1-(var(--toast-index)*.1)))] [--toast-shrink:calc(1-var(--toast-scale))]",
              // Define offset-y variable
              "data-[position*=top]:[--toast-calc-offset-y:calc(var(--toast-offset-y)+var(--toast-index)*var(--toast-gap)+var(--toast-swipe-movement-y))]",
              "data-[position*=bottom]:[--toast-calc-offset-y:calc(var(--toast-offset-y)*-1+var(--toast-index)*var(--toast-gap)*-1+var(--toast-swipe-movement-y))]",
              // Default state transform
              "data-[position*=top]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--toast-peek))+(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",
              "data-[position*=bottom]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--toast-peek))-(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",
              // Limited state
              "data-limited:opacity-0",
              // Expanded state
              "data-expanded:h-(--toast-height)",
              "data-position:data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--toast-calc-offset-y))]",
              // Starting and ending animations
              "data-[position*=top]:data-starting-style:transform-[translateY(calc(-100%-var(--toast-inset)))]",
              "data-[position*=bottom]:data-starting-style:transform-[translateY(calc(100%+var(--toast-inset)))]",
              "data-ending-style:opacity-0",
              // Ending animations (direction-aware)
              "data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(100%+var(--toast-inset)))]",
              "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
              "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
              "data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]",
              "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]",
              // Ending animations (expanded)
              "data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
              "data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
              "data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]",
              "data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]"
            ),
            "data-position": position,
            swipeDirection: position.includes("center") ? [isTop ? "up" : "down"] : position.includes("left") ? ["left", isTop ? "up" : "down"] : ["right", isTop ? "up" : "down"],
            toast: toast3,
            children: /* @__PURE__ */ jsxs120(Toast.Content, { className: "pointer-events-auto flex items-center justify-between gap-1.5 overflow-hidden px-3.5 py-3 text-sm transition-opacity duration-250 data-behind:not-data-expanded:pointer-events-none data-behind:opacity-0 data-expanded:opacity-100", children: [
              /* @__PURE__ */ jsxs120("div", { className: "flex gap-2", children: [
                Icon && /* @__PURE__ */ jsx161(
                  "div",
                  {
                    className: "[&>svg]:h-lh [&>svg]:w-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                    "data-slot": "toast-icon",
                    children: /* @__PURE__ */ jsx161(Icon, { className: "in-data-[type=loading]:animate-spin in-data-[type=error]:text-destructive in-data-[type=info]:text-info in-data-[type=success]:text-success in-data-[type=warning]:text-warning in-data-[type=loading]:opacity-80" })
                  }
                ),
                /* @__PURE__ */ jsxs120("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsx161(
                    Toast.Title,
                    {
                      className: "font-medium",
                      "data-slot": "toast-title"
                    }
                  ),
                  /* @__PURE__ */ jsx161(
                    Toast.Description,
                    {
                      className: "text-muted-foreground",
                      "data-slot": "toast-description"
                    }
                  )
                ] })
              ] }),
              toast3.actionProps && /* @__PURE__ */ jsx161(
                Toast.Action,
                {
                  className: buttonVariants({ size: "xs" }),
                  "data-slot": "toast-action",
                  children: toast3.actionProps.children
                }
              )
            ] })
          },
          toast3.id
        );
      })
    }
  ) });
}
function AnchoredToastProvider({ children, ...props }) {
  return /* @__PURE__ */ jsxs120(Toast.Provider, { toastManager: anchoredToastManager, ...props, children: [
    children,
    /* @__PURE__ */ jsx161(AnchoredToasts, {})
  ] });
}
function AnchoredToasts() {
  const { toasts } = Toast.useToastManager();
  return /* @__PURE__ */ jsx161(Toast.Portal, { "data-slot": "toast-portal-anchored", children: /* @__PURE__ */ jsx161(
    Toast.Viewport,
    {
      className: "outline-none",
      "data-slot": "toast-viewport-anchored",
      children: toasts.map((toast3) => {
        const Icon = toast3.type ? TOAST_ICONS[toast3.type] : null;
        const tooltipStyle = toast3.data?.tooltipStyle ?? false;
        const positionerProps = toast3.positionerProps;
        if (!positionerProps?.anchor) {
          return null;
        }
        return /* @__PURE__ */ jsx161(
          Toast.Positioner,
          {
            className: "z-50 max-w-[min(--spacing(64),var(--available-width))]",
            "data-slot": "toast-positioner",
            sideOffset: positionerProps.sideOffset ?? 4,
            toast: toast3,
            children: /* @__PURE__ */ jsx161(
              Toast.Root,
              {
                className: cn(
                  "relative text-balance border bg-popover not-dark:bg-clip-padding text-popover-foreground text-xs transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
                  tooltipStyle ? "rounded-md shadow-md/5 before:rounded-[calc(var(--radius-md)-1px)]" : "rounded-lg shadow-lg/5 before:rounded-[calc(var(--radius-lg)-1px)]"
                ),
                "data-slot": "toast-popup",
                toast: toast3,
                children: tooltipStyle ? /* @__PURE__ */ jsx161(Toast.Content, { className: "pointer-events-auto px-2 py-1", children: /* @__PURE__ */ jsx161(Toast.Title, { "data-slot": "toast-title" }) }) : /* @__PURE__ */ jsxs120(Toast.Content, { className: "pointer-events-auto flex items-center justify-between gap-1.5 overflow-hidden px-3.5 py-3 text-sm", children: [
                  /* @__PURE__ */ jsxs120("div", { className: "flex gap-2", children: [
                    Icon && /* @__PURE__ */ jsx161(
                      "div",
                      {
                        className: "[&>svg]:h-lh [&>svg]:w-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                        "data-slot": "toast-icon",
                        children: /* @__PURE__ */ jsx161(Icon, { className: "in-data-[type=loading]:animate-spin in-data-[type=error]:text-destructive in-data-[type=info]:text-info in-data-[type=success]:text-success in-data-[type=warning]:text-warning in-data-[type=loading]:opacity-80" })
                      }
                    ),
                    /* @__PURE__ */ jsxs120("div", { className: "flex flex-col gap-0.5", children: [
                      /* @__PURE__ */ jsx161(
                        Toast.Title,
                        {
                          className: "font-medium",
                          "data-slot": "toast-title"
                        }
                      ),
                      /* @__PURE__ */ jsx161(
                        Toast.Description,
                        {
                          className: "text-muted-foreground",
                          "data-slot": "toast-description"
                        }
                      )
                    ] })
                  ] }),
                  toast3.actionProps && /* @__PURE__ */ jsx161(
                    Toast.Action,
                    {
                      className: buttonVariants({ size: "xs" }),
                      "data-slot": "toast-action",
                      children: toast3.actionProps.children
                    }
                  )
                ] })
              }
            )
          },
          toast3.id
        );
      })
    }
  ) });
}

// src/components/ui/toggle-group.tsx
import * as React23 from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";

// src/components/ui/toggle.tsx
import { cva as cva15 } from "class-variance-authority";
import { Toggle as TogglePrimitive } from "radix-ui";
import { jsx as jsx162 } from "react/jsx-runtime";
var toggleVariants = cva15(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-muted"
      },
      size: {
        default: "h-8 min-w-8 px-2",
        sm: "h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-1.5 text-[0.8rem]",
        lg: "h-9 min-w-9 px-2.5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx162(
    TogglePrimitive.Root,
    {
      "data-slot": "toggle",
      className: cn(toggleVariants({ variant, size, className })),
      ...props
    }
  );
}

// src/components/ui/toggle-group.tsx
import { jsx as jsx163 } from "react/jsx-runtime";
var ToggleGroupContext = React23.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  orientation = "horizontal",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx163(
    ToggleGroupPrimitive.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": variant,
      "data-size": size,
      "data-spacing": spacing,
      "data-orientation": orientation,
      style: { "--gap": spacing },
      className: cn(
        "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-vertical:flex-col data-vertical:items-stretch",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx163(
        ToggleGroupContext.Provider,
        {
          value: { variant, size, spacing, orientation },
          children
        }
      )
    }
  );
}
function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}) {
  const context = React23.useContext(ToggleGroupContext);
  return /* @__PURE__ */ jsx163(
    ToggleGroupPrimitive.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": context.variant || variant,
      "data-size": context.size || size,
      "data-spacing": context.spacing,
      className: cn(
        "shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        className
      ),
      ...props,
      children
    }
  );
}

// src/components/ui/typography-blockquote.tsx
import { jsx as jsx164 } from "react/jsx-runtime";
function TypographyBlockquote() {
  return /* @__PURE__ */ jsx164("blockquote", { className: "mt-6 border-l-2 pl-6 italic", children: `"After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."` });
}

// src/components/ui/typography-h1.tsx
import { jsx as jsx165 } from "react/jsx-runtime";
function TypographyH1() {
  return /* @__PURE__ */ jsx165("h1", { className: "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance uppercase", children: "Taxing Laughter: The Joke Tax Chronicles" });
}

// src/components/ui/typography-h2.tsx
import { jsx as jsx166 } from "react/jsx-runtime";
function TypographyH2() {
  return /* @__PURE__ */ jsx166("h2", { className: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight uppercase first:mt-0", children: "The People of the Kingdom" });
}

// src/components/ui/typography-h3.tsx
import { jsx as jsx167 } from "react/jsx-runtime";
function TypographyH3() {
  return /* @__PURE__ */ jsx167("h3", { className: "scroll-m-20 text-2xl font-semibold tracking-tight uppercase", children: "The Joke Tax" });
}

// src/components/ui/typography-h4.tsx
import { jsx as jsx168 } from "react/jsx-runtime";
function TypographyH4() {
  return /* @__PURE__ */ jsx168("h4", { className: "scroll-m-20 text-xl font-semibold tracking-tight uppercase", children: "People stopped telling jokes" });
}

// src/components/ui/typography-inline-code.tsx
import { jsx as jsx169 } from "react/jsx-runtime";
function TypographyInlineCode() {
  return /* @__PURE__ */ jsx169("code", { className: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", children: "@radix-ui/react-alert-dialog" });
}

// src/components/ui/typography-large.tsx
import { jsx as jsx170 } from "react/jsx-runtime";
function TypographyLarge() {
  return /* @__PURE__ */ jsx170("div", { className: "text-lg font-semibold", children: "Are you absolutely sure?" });
}

// src/components/ui/typography-lead.tsx
import { jsx as jsx171 } from "react/jsx-runtime";
function TypographyLead() {
  return /* @__PURE__ */ jsx171("p", { className: "text-xl text-muted-foreground", children: "A modal dialog that interrupts the user with important content and expects a response." });
}

// src/components/ui/typography-list.tsx
import { jsx as jsx172, jsxs as jsxs121 } from "react/jsx-runtime";
function TypographyList() {
  return /* @__PURE__ */ jsxs121("ul", { className: "my-6 ml-6 list-disc [&>li]:mt-2", children: [
    /* @__PURE__ */ jsx172("li", { children: "1st level of puns: 5 gold coins" }),
    /* @__PURE__ */ jsx172("li", { children: "2nd level of jokes: 10 gold coins" }),
    /* @__PURE__ */ jsx172("li", { children: "3rd level of one-liners : 20 gold coins" })
  ] });
}

// src/components/ui/typography-muted.tsx
import { jsx as jsx173 } from "react/jsx-runtime";
function TypographyMuted() {
  return /* @__PURE__ */ jsx173("p", { className: "text-sm text-muted-foreground", children: "Enter your email address." });
}

// src/components/ui/typography-p.tsx
import { jsx as jsx174 } from "react/jsx-runtime";
function TypographyP() {
  return /* @__PURE__ */ jsx174("p", { className: "leading-7 [&:not(:first-child)]:mt-6", children: "The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax." });
}

// src/components/ui/typography-small.tsx
import { jsx as jsx175 } from "react/jsx-runtime";
function TypographySmall() {
  return /* @__PURE__ */ jsx175("small", { className: "text-sm leading-none font-medium", children: "Email address" });
}

// src/components/ui/typography-table.tsx
import { jsx as jsx176, jsxs as jsxs122 } from "react/jsx-runtime";
function TypographyTable() {
  return /* @__PURE__ */ jsx176("div", { className: "my-6 w-full overflow-y-auto", children: /* @__PURE__ */ jsxs122("table", { className: "w-full", children: [
    /* @__PURE__ */ jsx176("thead", { children: /* @__PURE__ */ jsxs122("tr", { className: "m-0 border-t p-0 even:bg-muted", children: [
      /* @__PURE__ */ jsx176("th", { className: "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right", children: "King's Treasury" }),
      /* @__PURE__ */ jsx176("th", { className: "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right", children: "People's happiness" })
    ] }) }),
    /* @__PURE__ */ jsxs122("tbody", { children: [
      /* @__PURE__ */ jsxs122("tr", { className: "m-0 border-t p-0 even:bg-muted", children: [
        /* @__PURE__ */ jsx176("td", { className: "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right", children: "Empty" }),
        /* @__PURE__ */ jsx176("td", { className: "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right", children: "Overflowing" })
      ] }),
      /* @__PURE__ */ jsxs122("tr", { className: "m-0 border-t p-0 even:bg-muted", children: [
        /* @__PURE__ */ jsx176("td", { className: "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right", children: "Modest" }),
        /* @__PURE__ */ jsx176("td", { className: "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right", children: "Satisfied" })
      ] }),
      /* @__PURE__ */ jsxs122("tr", { className: "m-0 border-t p-0 even:bg-muted", children: [
        /* @__PURE__ */ jsx176("td", { className: "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right", children: "Full" }),
        /* @__PURE__ */ jsx176("td", { className: "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right", children: "Ecstatic" })
      ] })
    ] })
  ] }) });
}
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertAction,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  AnchoredToastProvider,
  AspectRatio,
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroupNested,
  Calendar,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPrimitive,
  ComboboxRow,
  ComboboxSeparator,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxValue,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  DEFAULT_I18N,
  DEFAULT_OPERATORS,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DirectionProvider,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenuAvatar,
  DropdownMenuBasic,
  DropdownMenuCheckboxes,
  DropdownMenuCheckboxesIcons,
  MenuCreateHandle as DropdownMenuCreateHandle,
  DropdownMenuDestructive,
  DropdownMenuIcons,
  DropdownMenuRadioGroupDemo,
  DropdownMenuRadioIcons,
  DropdownMenuShortcuts,
  DropdownMenuSubmenu,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  Filters,
  FiltersContent,
  Form,
  FormPrimitive,
  Group,
  GroupSeparator,
  GroupText,
  HoverCardSides,
  Input,
  InputBadge,
  InputBasic,
  InputButtonGroup,
  InputDisabled,
  InputField,
  InputFieldgroup,
  InputFile,
  InputForm,
  InputGrid,
  InputGroup,
  InputGroupAddon,
  InputGroupBasic,
  InputGroupBlockEnd,
  InputGroupBlockStart,
  InputGroupButton,
  InputGroupDropdown,
  InputGroupInCard,
  InputGroupInlineEnd,
  InputGroupInlineStart,
  InputGroupInput,
  InputGroupKbd,
  InputGroupText,
  InputGroupTextarea,
  InputGroupTextareaExamples,
  InputGroupWithAddons,
  InputGroupWithButtons,
  InputGroupWithKbd,
  InputGroupWithTooltip,
  InputInline,
  InputInputGroup,
  InputInvalid,
  InputOTP,
  InputOTPAlphanumeric,
  InputOTPDisabled,
  InputOTPForm,
  InputOTPFourDigits,
  InputOTPGroup,
  InputOTPInvalid,
  InputOTPPattern,
  InputOTPSeparator,
  InputOTPSlot,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
  Kbd,
  KbdGroup,
  Label,
  Menu,
  MenuCheckboxItem,
  MenuCreateHandle,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPrimitive,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
  MenuTrigger,
  Menubar,
  MenubarCheckbox,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarIcons,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadio,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarSubmenu,
  MenubarTrigger,
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldPrimitive,
  NumberFieldScrubArea,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationIconsOnly,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverAlignments,
  PopoverBasic,
  PopoverClose,
  PopoverPopup as PopoverContent,
  PopoverCreateHandle,
  PopoverDescription,
  PopoverForm,
  PopoverHeader,
  PopoverPopup,
  PopoverPrimitive,
  PopoverTitle,
  PopoverTrigger,
  PreviewCard,
  PreviewCardPopup,
  PreviewCardPrimitive,
  PreviewCardTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Rating,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ResizableVertical,
  ScrollArea,
  ScrollBar,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  Skeleton,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonDemo,
  SkeletonForm,
  SkeletonTable,
  SkeletonText,
  Slider,
  SliderPrimitive,
  SliderValue,
  Spinner,
  Switch,
  Table,
  TableActions,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableFooterExample,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsDisabled,
  TabsIcons,
  TabsLine,
  TabsList,
  TabsTrigger,
  TabsVertical,
  Textarea,
  TextareaButton,
  TextareaDisabled,
  TextareaField,
  TextareaInvalid,
  Toast as ToastPrimitive,
  ToastProvider,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipPopup as TooltipContent,
  TooltipCreateHandle,
  TooltipPopup,
  TooltipPrimitive,
  TooltipProvider,
  TooltipTrigger,
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyInlineCode,
  TypographyLarge,
  TypographyLead,
  TypographyList,
  TypographyMuted,
  TypographyP,
  TypographySmall,
  TypographyTable,
  anchoredToastManager,
  badgeVariants,
  buttonGroupVariants,
  buttonVariants,
  createFilter,
  createFilterGroup,
  groupVariants,
  navigationMenuTriggerStyle,
  ratingVariants,
  tabsListVariants,
  toastManager,
  toggleVariants,
  useCarousel,
  useComboboxFilter,
  useDirection,
  useSidebar
};
