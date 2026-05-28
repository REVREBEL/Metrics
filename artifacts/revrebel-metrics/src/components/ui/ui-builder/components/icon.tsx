import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { HugeiconsIcon } from "@hugeicons/react";
import * as HugeIcons from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export type HugeIconName = keyof typeof HugeIcons;
type HugeIconDefinition = (typeof HugeIcons)[HugeIconName];

const iconVariants = cva("inline-flex shrink-0", {
  variants: {
    size: {
      small: "h-4 w-4",
      medium: "h-6 w-6",
      large: "h-8 w-8",
    },
    color: {
      accent: "text-accent",
      accentForeground: "text-accent-foreground",
      primary: "text-primary",
      primaryForeground: "text-primary-foreground",
      secondary: "text-secondary",
      secondaryForeground: "text-secondary-foreground",
      destructive: "text-destructive",
      destructiveForeground: "text-destructive-foreground",
      muted: "text-muted",
      mutedForeground: "text-muted-foreground",
      background: "text-background",
      foreground: "text-foreground",
    },
    rotate: {
      none: "rotate-0",
      "90": "rotate-90",
      "180": "rotate-180",
      "270": "rotate-[270deg]",
    },
  },
  defaultVariants: {
    size: "medium",
    color: "primary",
    rotate: "none",
  },
});

export interface IconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof iconVariants> {
  iconName: HugeIconName;
  strokeWidth?: number;
  filled?: boolean;
}

const sizeMap = {
  small: 16,
  medium: 24,
  large: 32,
} as const;

const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  (
    {
      className,
      iconName,
      size = "medium",
      color,
      rotate,
      strokeWidth = 1.5,
      filled,
      ...props
    },
    ref
  ) => {
    const iconDef = HugeIcons[iconName] as HugeIconDefinition | undefined;

    if (!iconDef) {
      console.error(`Icon "${iconName}" does not exist in Hugeicons`);
      return null;
    }

    return (
      <span
        ref={ref}
        className={cn(iconVariants({ size, color, rotate, className }))}
        aria-hidden={props["aria-label"] ? undefined : true}
      >
        <HugeiconsIcon
          icon={iconDef}
          size={sizeMap[size ?? "medium"]}
          strokeWidth={strokeWidth}
          {...(filled !== undefined ? { filled } : {})}
        />
      </span>
    );
  }
);

Icon.displayName = "Icon";

export const iconNames = Object.keys(HugeIcons)
  .filter((key) => key !== "default")
  .sort() as [HugeIconName, ...HugeIconName[]];

export { Icon, iconVariants };