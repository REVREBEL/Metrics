export function StatusBar() {
  return (
    <footer className="flex h-7 shrink-0 items-center justify-between border-t border-border bg-background px-3">
      <span className="text-[11px] font-display uppercase font-bold text-muted-foreground">
        Playground runtime: Ready
      </span>
      <span className="text-[11px] text-[11px] font-display uppercase font-bold text-muted-foreground">
        REVREBEL workshop
      </span>
    </footer>
  );
}
