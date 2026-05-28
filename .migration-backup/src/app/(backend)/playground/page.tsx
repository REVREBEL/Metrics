import { Playground } from "@/components/playground/playground";
import { readFile } from "node:fs/promises";
import path from "node:path";

export default async function Page() {
  const globalsPath = path.join(process.cwd(), "src", "app", "globals.css");
  const projectGlobalCSS = await readFile(globalsPath, "utf8");

  return <Playground projectGlobalCSS={projectGlobalCSS} />;
}
