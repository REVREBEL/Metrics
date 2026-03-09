export function StatusBar() {
  return (
    <footer className="flex h-7 shrink-0 items-center justify-between border-t border-border bg-background px-3">
      <span className="text-[11px] text-muted-foreground">
        Playground runtime: Ready
      </span>
      <span className="text-[11px] text-muted-foreground">
        REVREBEL workshop
      </span>
    </footer>
  );
}
