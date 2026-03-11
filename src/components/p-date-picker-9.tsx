/** @format */

import * as React from "react";

const isComponentLike = (value: unknown) => typeof value === "function" || (typeof value === "object" && value !== null && "$$typeof" in (value as Record<string, unknown>));

const defaultProps = {};

export default function CenteredPreview() {
  const [Component, setComponent] = React.useState<React.ComponentType<any> | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let active = true;

    async function load() {
      try {
        const mod = (await import("@/components/p-date-picker-9")) as any;
        const previewComponent = mod["PDatePicker9"] ?? mod.default ?? Object.values(mod).find(isComponentLike);

        if (!isComponentLike(previewComponent)) {
          throw new Error('Could not resolve a component export for "p-date-picker-9".');
        }

        if (active) {
          setComponent(() => previewComponent as React.ComponentType<any>);
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
    return <div className="flex min-h-svh items-center justify-center p-6 text-sm text-destructive">Failed to load "p-date-picker-9": {error}</div>;
  }

  if (!Component) {
    return <div className="flex min-h-svh items-center justify-center p-6 text-sm text-muted-foreground">Loading "p-date-picker-9"...</div>;
  }

  const props = {
    ...(defaultProps as Record<string, any>),
    ...(defaultProps && typeof defaultProps === "object" && "children" in (defaultProps as Record<string, any>) ? {} : { children: "p-date-picker-9" }),
  };

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center gap-4 p-6">
      <p className="text-xs text-muted-foreground">Previewing: p-date-picker-9</p>
      <Component {...props} />
    </div>
  );
}
