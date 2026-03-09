"use client";

import { useState, useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { ThemeProvider, useTheme } from "next-themes";
import type { ConsoleEntry } from "@/components/playground/preview-iframe";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar, type LayoutMode } from "@/components/playground/navbar";
import {
  EditorPanel,
  DEFAULT_TSX_CODE,
} from "@/components/playground/editor-panel";
import { PreviewPanel } from "@/components/playground/preview-panel";
import { StatusBar } from "@/components/playground/status-bar";
import { useTranspile } from "@/hooks/use-transpile";
import { useTailwindWorker } from "@/hooks/use-tailwind-worker";
import { DEFAULT_GLOBALS_CSS } from "@/lib/playground/theme";
import { adaptPlaygroundRegistry } from "@/lib/playground/registry-adapter";
import { PLAYGROUND_REGISTRY } from "@/lib/playground/registry";

interface PlaygroundProps {
  initialCode?: string;
  initialGlobalCSS?: string;
  projectGlobalCSS?: string;
}

const codeStorage = createJSONStorage<string>(() => globalThis.localStorage);

const playgroundCodeAtom = atomWithStorage<string>(
  "playground.code",
  DEFAULT_TSX_CODE,
  codeStorage,
  { getOnInit: true },
);

const playgroundGlobalCSSAtom = atomWithStorage<string>(
  "playground.globalCSS",
  DEFAULT_GLOBALS_CSS,
  codeStorage,
  { getOnInit: true },
);

function isLegacyPlaygroundCSS(value: string): boolean {
  return (
    value === DEFAULT_GLOBALS_CSS ||
    value.includes("Berkeley MonoVariable.woff2") ||
    value.includes('@import "shadcn/tailwind.css"')
  );
}

export function Playground({
  initialCode,
  initialGlobalCSS,
  projectGlobalCSS,
}: PlaygroundProps) {
  const registryGroups = adaptPlaygroundRegistry(PLAYGROUND_REGISTRY);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("horizontal");
  const [persistedCode, setPersistedCode] = useAtom(playgroundCodeAtom);
  const [persistedGlobalCSS, setPersistedGlobalCSS] = useAtom(
    playgroundGlobalCSSAtom,
  );
  const [sharedCode, setSharedCode] = useState(initialCode ?? DEFAULT_TSX_CODE);
  const [sharedGlobalCSS, setSharedGlobalCSS] = useState(
    initialGlobalCSS ?? DEFAULT_GLOBALS_CSS,
  );
  const isSharedSnippet = initialCode !== undefined;

  useEffect(() => {
    if (!projectGlobalCSS) return;
    if (isLegacyPlaygroundCSS(persistedGlobalCSS)) {
      setPersistedGlobalCSS(projectGlobalCSS);
    }
  }, [projectGlobalCSS, persistedGlobalCSS, setPersistedGlobalCSS]);

  useEffect(() => {
    const search = window.location.search;
    if (
      (initialCode && search.includes("code=")) ||
      (initialGlobalCSS && search.includes("css=")) ||
      search.includes("open=")
    ) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [initialCode, initialGlobalCSS]);
  const code = isSharedSnippet ? sharedCode : persistedCode;
  const setCode = isSharedSnippet ? setSharedCode : setPersistedCode;
  const globalCSS = isSharedSnippet ? sharedGlobalCSS : persistedGlobalCSS;
  const setGlobalCSS = isSharedSnippet
    ? setSharedGlobalCSS
    : setPersistedGlobalCSS;
  const compilationResult = useTranspile(code);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme ?? "light";

  const candidates =
    compilationResult && !("error" in compilationResult)
      ? compilationResult.candidates
      : [];
  const tailwindCSS = useTailwindWorker(candidates);

  const transpileError =
    compilationResult && "error" in compilationResult
      ? compilationResult.error
      : null;
  const [runtimeError, setRuntimeError] = useState("");

  const [consoleLogs, setConsoleLogs] = useState<ConsoleEntry[]>([]);
  const handleConsoleMessage = useCallback((entry: ConsoleEntry) => {
    setConsoleLogs((prev) => {
      const next = [...prev, entry];
      return next.length > 500 ? next.slice(-500) : next;
    });
  }, []);
  const handleClearConsole = useCallback(() => setConsoleLogs([]), []);

  const content = (
    <div className="font-funnel flex h-dvh flex-col bg-background">
      <Navbar
        layoutMode={layoutMode}
        onLayoutModeChange={setLayoutMode}
        code={code}
        globalCode={globalCSS}
        registryGroups={registryGroups}
        onReplaceCode={setCode}
        onReplaceGlobalCSS={setGlobalCSS}
      />

      <div className="flex-1 min-h-0">
        {layoutMode === "preview-only" ? (
          <PreviewPanel
            compilationResult={compilationResult}
            tailwindCSS={tailwindCSS}
            globalCSS={globalCSS}
            transpileError={transpileError}
            theme={theme}
            runtimeError={runtimeError}
            onRuntimeError={setRuntimeError}
            consoleLogs={consoleLogs}
            onClearConsole={handleClearConsole}
            onConsoleMessage={handleConsoleMessage}
          />
        ) : (
          <ResizablePanelGroup orientation="horizontal" className="h-full">
            <ResizablePanel defaultSize={40} minSize={25}>
              <EditorPanel
                code={code}
                onCodeChange={setCode}
                globalCode={globalCSS}
                onGlobalCodeChange={setGlobalCSS}
                error={transpileError}
                runtimeError={runtimeError}
                onReset={() => setCode(DEFAULT_TSX_CODE)}
                onGlobalReset={() => setGlobalCSS(DEFAULT_GLOBALS_CSS)}
              />
            </ResizablePanel>
            <ResizableHandle
              withHandle
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <ResizablePanel defaultSize={60} minSize={25}>
              <PreviewPanel
                compilationResult={compilationResult}
                tailwindCSS={tailwindCSS}
                globalCSS={globalCSS}
                transpileError={transpileError}
                theme={theme}
                runtimeError={runtimeError}
                onRuntimeError={setRuntimeError}
                consoleLogs={consoleLogs}
                onClearConsole={handleClearConsole}
                onConsoleMessage={handleConsoleMessage}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>

      <StatusBar />
    </div>
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider>{content}</TooltipProvider>
    </ThemeProvider>
  );
}
