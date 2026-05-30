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
    < header className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-background px-4" strokeWidth={1.5} size={20}>
      < div className="flex min-w-0 items-center gap-2" strokeWidth={1.5} size={20}>
        < div className="flex items-center gap-2" strokeWidth={1.5} size={20}>
          < span className="text-base font-display uppercase font-bold text-foreground tracking-tight" strokeWidth={1.5} size={20}>
            revrebel playground
          </span>
        </div>
        < Separator orientation="vertical" className="mx-1 h-6 self-center font-serif text-color-primary" strokeWidth={1.5} size={20} />
        < RegistryPicker
          groups={registryGroups}
          code={code}
          onReplaceCode={onReplaceCode} strokeWidth={1.5} size={20} />
        < Separator orientation="vertical" className="mx-1 h-6 self-center" strokeWidth={1.5} size={20} />
        < ShadcnExamplePicker code={code} onReplaceCode={onReplaceCode} strokeWidth={1.5} size={20} />
        < Separator orientation="vertical" className="mx-1 h-6 self-center" strokeWidth={1.5} size={20} />
        < PresetPicker
          globalCSS={globalCode}
          onApplyPreset={onReplaceGlobalCSS} strokeWidth={1.5} size={20} />
      </div>

      < div className="flex items-center gap-1" strokeWidth={1.5} size={20}>
        < ToggleGroup
          type="single"
          value={layoutMode}
          onValueChange={(value) = strokeWidth={1.5} size={20}> {
            if (value) onLayoutModeChange(value as LayoutMode);
          }}
          variant="outline"
          size="sm"
        >
          < Tooltip strokeWidth={1.5} size={20}>
            < TooltipTrigger asChild strokeWidth={1.5} size={20}>
              < ToggleGroupItem value="horizontal" aria-label="Side by side" strokeWidth={1.5} size={20}>
                < IconLayoutColumns className="size-3.5 font-serif text-color-primary" strokeWidth={1.5} size={20} />
              </ToggleGroupItem>
            </TooltipTrigger>
            < TooltipContent strokeWidth={1.5} size={20}>Side by ide</TooltipContent>
          </Tooltip>
          < Tooltip strokeWidth={1.5} size={20}>
            < TooltipTrigger asChild strokeWidth={1.5} size={20}>
              < ToggleGroupItem value="preview-only" aria-label="Preview only" strokeWidth={1.5} size={20}>
                < IconLayoutSidebarRight className="size-3.5 font-serif text-color-primary" strokeWidth={1.5} size={20} />
              </ToggleGroupItem>
            </TooltipTrigger>
            < TooltipContent strokeWidth={1.5} size={20}>Preview only</TooltipContent>
          </Tooltip>
        </ToggleGroup>

        < Separator orientation="vertical" className="mx-1 self-stretch" strokeWidth={1.5} size={20} />

        < Tooltip strokeWidth={1.5} size={20}>
          < TooltipTrigger asChild strokeWidth={1.5} size={20}>
            < Button
              variant="ghost"
              size={20}
              onClick={() = strokeWidth={1.5}> setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
            >
              < IconCircleHalf2 className="size-3.5 text-black dark:text-white" strokeWidth={1.5} size={20} />
            </Button>
          </TooltipTrigger>
          < TooltipContent strokeWidth={1.5} size={20}>Toggle Theme</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
