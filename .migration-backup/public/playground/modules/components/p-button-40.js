"use client";

// src/components/p-button-40.tsx
import { DownloadIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

// src/components/ui/group.tsx
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva as cva2 } from "class-variance-authority";

// src/components/ui/separator.tsx
import { Separator as SeparatorPrimitive } from "radix-ui";
import { jsx as jsx2 } from "react/jsx-runtime";
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx2(
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

// src/components/ui/group.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var groupVariants = cva2(
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
  return /* @__PURE__ */ jsx3(
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
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function GroupSeparator({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
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

// src/components/ui/spinner.tsx
import { Loader2Icon } from "lucide-react";
import { jsx as jsx4 } from "react/jsx-runtime";
function Spinner({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    Loader2Icon,
    {
      "aria-label": "Loading",
      className: cn("animate-spin", className),
      role: "status",
      ...props
    }
  );
}

// src/components/ui/toast.tsx
import { Toast } from "@base-ui/react/toast";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  LoaderCircleIcon,
  TriangleAlertIcon
} from "lucide-react";
import { jsx as jsx5, jsxs } from "react/jsx-runtime";
var toastManager = Toast.createToastManager();
var anchoredToastManager = Toast.createToastManager();

// src/components/ui/tooltip.tsx
import * as React from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { jsx as jsx6 } from "react/jsx-runtime";
var TooltipCreateHandle = TooltipPrimitive.createHandle;
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
function TooltipTrigger({
  asChild = false,
  children,
  ...props
}) {
  if (asChild && React.isValidElement(children)) {
    return /* @__PURE__ */ jsx6(
      TooltipPrimitive.Trigger,
      {
        "data-slot": "tooltip-trigger",
        render: children,
        ...props
      }
    );
  }
  return /* @__PURE__ */ jsx6(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props, children });
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
  return /* @__PURE__ */ jsx6(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx6(
    TooltipPrimitive.Positioner,
    {
      align,
      anchor,
      className: "z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] data-instant:transition-none",
      "data-slot": "tooltip-positioner",
      side,
      sideOffset,
      children: /* @__PURE__ */ jsx6(
        TooltipPrimitive.Popup,
        {
          className: cn(
            "relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) text-balance rounded-md border bg-popover not-dark:bg-clip-padding text-popover-foreground text-xs shadow-md/5 transition-[width,height,scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 data-instant:duration-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className
          ),
          "data-slot": "tooltip-popup",
          ...props,
          children: /* @__PURE__ */ jsx6(
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

// src/components/p-button-40.tsx
import { jsx as jsx7, jsxs as jsxs2 } from "react/jsx-runtime";
function Particle() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const abortControllerRef = useRef(null);
  const infoToastIdRef = useRef(null);
  useEffect(() => {
    if (!isDownloading) return;
    const interval = setInterval(() => {
      setProgress(
        (prev) => Math.min(99, prev + Math.round(Math.random() * 8 + 2))
      );
    }, 300);
    return () => clearInterval(interval);
  }, [isDownloading]);
  async function handleDownload() {
    if (isDownloading) return;
    setIsDownloading(true);
    setProgress(0);
    abortControllerRef.current = new AbortController();
    infoToastIdRef.current = toastManager.add({
      description: "Your download will begin once ready.",
      title: "Generating report\u2026",
      type: "info"
    });
    try {
      await new Promise((resolve, reject) => {
        const shouldSucceed = Math.random() > 0.2;
        const timeoutId = setTimeout(() => {
          if (shouldSucceed) {
            resolve("Download complete");
          } else {
            reject(new Error("Download failed"));
          }
        }, 4e3);
        abortControllerRef.current?.signal.addEventListener("abort", () => {
          clearTimeout(timeoutId);
          reject(new DOMException("Cancelled", "AbortError"));
        });
      });
    } catch (err) {
      if (infoToastIdRef.current) {
        toastManager.close(infoToastIdRef.current);
        infoToastIdRef.current = null;
      }
      if (err instanceof DOMException && err.name === "AbortError") {
        toastManager.add({
          description: "Report generation was cancelled.",
          title: "Cancelled",
          type: "error"
        });
      } else {
        toastManager.add({
          description: "Please try again later.",
          title: "Failed to generate report",
          type: "error"
        });
      }
    } finally {
      setIsDownloading(false);
      setProgress(0);
      abortControllerRef.current = null;
      infoToastIdRef.current = null;
    }
  }
  function handleCancel() {
    abortControllerRef.current?.abort();
  }
  return /* @__PURE__ */ jsx7(TooltipProvider, { delay: 0, children: isDownloading ? /* @__PURE__ */ jsxs2(Group, { children: [
    /* @__PURE__ */ jsxs2(
      GroupText,
      {
        "aria-live": "polite",
        className: "cursor-default gap-2",
        role: "status",
        children: [
          /* @__PURE__ */ jsx7(Spinner, {}),
          /* @__PURE__ */ jsxs2(
            "span",
            {
              "aria-hidden": "true",
              className: "font-medium text-foreground tabular-nums",
              children: [
                progress.toString().padStart(2, "\u2007"),
                "%"
              ]
            }
          ),
          /* @__PURE__ */ jsxs2("span", { className: "sr-only", children: [
            "Generating report, ",
            progress,
            "% complete"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx7(GroupSeparator, {}),
    /* @__PURE__ */ jsxs2(Tooltip, { children: [
      /* @__PURE__ */ jsx7(
        TooltipTrigger,
        {
          render: /* @__PURE__ */ jsx7(
            Button,
            {
              "aria-label": "Cancel download",
              onClick: handleCancel,
              size: "icon",
              variant: "outline"
            }
          ),
          children: /* @__PURE__ */ jsx7(XIcon, { "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ jsx7(TooltipPopup, { children: "Cancel" })
    ] })
  ] }) : /* @__PURE__ */ jsxs2(Button, { onClick: handleDownload, variant: "outline", children: [
    /* @__PURE__ */ jsx7(DownloadIcon, { "aria-hidden": "true" }),
    "Download"
  ] }) });
}
export {
  Particle as default
};
