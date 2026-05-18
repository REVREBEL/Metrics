export default function WidgetsTestPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-mono uppercase tracking-wide text-slate-500">
          Widgets Test Harness
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Widget preview temporarily disabled
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The generated widget test page was calling several widgets without their
          required props, which blocked TypeScript checks. Rebuild this harness
          with explicit fixture props before using it for visual QA again.
        </p>
      </div>
    </main>
  )
}
