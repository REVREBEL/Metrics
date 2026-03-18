"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Main } from "@/components/layout/main";

export default function Page() {
  return (
    <Main fluid>
      <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col justify-center gap-8 px-6 py-12">
        <div className="flex flex-col gap-3">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
            RevRebel Toolkit
          </p>
          <h1 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
            Choose a workspace
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            The main app lives under the authenticated `(app)` group. Builder and
            playground tools live separately so they do not inherit the app shell.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/ui-builder">Open UI Builder</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/playground">Open Playground</Link>
          </Button>
        </div>
      </div>
    </Main>
  );
}
