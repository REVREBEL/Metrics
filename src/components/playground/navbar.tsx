"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  IconCircleHalf2,
  IconLayoutColumns,
  IconLayoutSidebarRight,
} from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { ShadcnExamplePicker } from "@/components/playground/shadcn-example-picker";
import { RegistryPicker } from "@/components/playground/registry-picker";
import type { RegistryGroup } from "@/lib/playground/registry-adapter";

const PresetPicker = dynamic(
  () =>
    import("@/components/playground/preset-picker").then(
      (m) => m.PresetPicker,
    ),
  { ssr: false },
);

export type LayoutMode = "horizontal" | "preview-only";

interface NavbarProps {
  layoutMode: LayoutMode;
  onLayoutModeChange: (mode: LayoutMode) => void;
  code: string;
  globalCode: string;
  registryGroups: RegistryGroup[];
  onReplaceCode: (nextCode: string) => void;
  onReplaceGlobalCSS: (css: string) => void;
}

export function Navbar({
  layoutMode,
  onLayoutModeChange,
  code,
  globalCode,
  registryGroups,
  onReplaceCode,
  onReplaceGlobalCSS,
}: NavbarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-background px-4">
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-base font-display uppercase font-bold text-foreground tracking-tight">
            revrebel playground
          </span>
        </div>
        <Separator orientation="vertical" className="mx-1 h-6 self-center font-serif text-color-primary" />
        <RegistryPicker
          groups={registryGroups}
          code={code}
          onReplaceCode={onReplaceCode}
        />
        <Separator orientation="vertical" className="mx-1 h-6 self-center" />
        <ShadcnExamplePicker code={code} onReplaceCode={onReplaceCode} />
        <Separator orientation="vertical" className="mx-1 h-6 self-center" />
        <PresetPicker
          globalCSS={globalCode}
          onApplyPreset={onReplaceGlobalCSS}
        />
      </div>

      <div className="flex items-center gap-1">
        <ToggleGroup
          type="single"
          value={layoutMode}
          onValueChange={(value) => {
            if (value) onLayoutModeChange(value as LayoutMode);
          }}
          variant="outline"
          size="sm"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem value="horizontal" aria-label="Side by side">
                <IconLayoutColumns className="size-3.5 font-serif text-color-primary" />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>Side by ide</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem value="preview-only" aria-label="Preview only">
                <IconLayoutSidebarRight className="size-3.5 font-serif text-color-primary" />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>Preview only</TooltipContent>
          </Tooltip>
        </ToggleGroup>

        <Separator orientation="vertical" className="mx-1 self-stretch" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
            >
              <IconCircleHalf2 className="size-3.5 text-black dark:text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Toggle Theme</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
