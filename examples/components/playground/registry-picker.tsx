"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { IconChevronDown } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmReplaceDialog } from "@/components/playground/confirm-replace-dialog";
import type { RegistryGroup, RegistryItem } from "@/lib/workshop/registry-adapter";

type RegistryPickerProps = {
  groups: RegistryGroup[];
  code: string;
  onReplaceCode: (nextCode: string) => void;
};

function getImportPath(item: RegistryItem): string {
  if (item.type === "widget") return `@/widgets/${item.name}/index`;
  if (item.type === "ui-primitive") return "@/components/ui";
  return `@/components/${item.name}`;
}

function buildRegistrySnippet(item: RegistryItem): string {
  const importPath = getImportPath(item);
  const pascalName = item.name
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
  const metadataRecord =
    item.metadata && typeof item.metadata === "object"
      ? (item.metadata as Record<string, unknown>)
      : {};
  const defaultProps =
    metadataRecord.defaultProps && typeof metadataRecord.defaultProps === "object"
      ? metadataRecord.defaultProps
      : {};

  const propsJSON = JSON.stringify(defaultProps, null, 2) ?? "{}";
  const title = metadataRecord.name ? String(metadataRecord.name) : item.name;

  return `import * as React from "react";

const isComponentLike = (value: unknown) =>
  typeof value === "function" ||
  (typeof value === "object" &&
    value !== null &&
    "$$typeof" in (value as Record<string, unknown>));

const defaultProps = ${propsJSON};

export default function CenteredPreview() {
  const [Component, setComponent] = React.useState<React.ComponentType<Record<string, unknown>> | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let active = true;

    async function load() {
      try {
        const mod = (await import("${importPath}")) as Record<string, unknown>;
        const previewComponent =
          mod["${pascalName}"] ?? mod.default ?? Object.values(mod).find(isComponentLike);

        if (!isComponentLike(previewComponent)) {
          throw new Error('Could not resolve a component export for "${item.name}".');
        }

        if (active) {
          setComponent(() => previewComponent as React.ComponentType<Record<string, unknown>>);
          setError("");
        }
      } catch (err) {
        if (active) {
          const message = err instanceof Error ? err.message : String(err);
          setError(message);
          setComponent(null);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6 text-sm text-destructive">
        Failed to load "${item.name}": {error}
      </div>
    );
  }

  if (!Component) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6 text-sm text-muted-foreground">
        Loading "${item.name}"...
      </div>
    );
  }

  const props = {
    ...(defaultProps as Record<string, unknown>),
    ...(defaultProps && typeof defaultProps === "object" && "children" in (defaultProps as Record<string, unknown>)
      ? {}
      : { children: "${title}" }),
  };

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center gap-4 p-6">
      <p className="text-xs text-muted-foreground">Previewing: ${title}</p>
      <Component {...props} />
    </div>
  );
}
`;
}

export function RegistryPicker({ groups, code, onReplaceCode }: RegistryPickerProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState<RegistryItem | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");

  const selectedLabel = useMemo(() => {
    for (const group of groups) {
      const item = group.items.find((candidate) => candidate.id === selectedId);
      if (item) return `${group.label} - ${item.name}`;
    }
    return "Insert registry component";
  }, [groups, selectedId]);

  const applyItem = (item: RegistryItem) => {
    onReplaceCode(buildRegistrySnippet(item));
    setSelectedId(item.id);
    toast.success(`Inserted ${item.name}`);
  };

  const handleSelect = (item: RegistryItem) => {
    if (code.trim().length > 0) {
      setPendingItem(item);
      setConfirmOpen(true);
      return;
    }
    applyItem(item);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <span className="truncate max-w-[260px]">{selectedLabel}</span>
            <IconChevronDown className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="max-h-[66vh] overflow-y-auto">
          {groups.map((group) => (
            <DropdownMenuSub key={group.label}>
              <DropdownMenuSubTrigger>{group.label}</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="max-h-[66vh] overflow-y-auto">
                  {group.items.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      data-checked={item.id === selectedId}
                      onClick={() => handleSelect(item)}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmReplaceDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Replace current component.tsx?"
        description="Your current code will be replaced with the selected registry component preview."
        onConfirm={() => {
          if (pendingItem) applyItem(pendingItem);
          setPendingItem(null);
          setConfirmOpen(false);
        }}
        onCancel={() => setPendingItem(null)}
      />
    </>
  );
}
