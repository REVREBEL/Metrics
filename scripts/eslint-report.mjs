import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const REPORT_DIR = "reports";
const RAW_REPORT = path.join(REPORT_DIR, "eslint-report.json");
const ERROR_REPORT = path.join(REPORT_DIR, "eslint-errors.json");

fs.mkdirSync(REPORT_DIR, { recursive: true });

try {
  execSync(
    `pnpm exec eslint src app components lib --quiet -f json -o "${RAW_REPORT}"`,
    { stdio: "inherit" }
  );
} catch (error) {
  // eslint exits non-zero when lint errors are found
  // that's expected, so we continue and process the report
}

if (!fs.existsSync(RAW_REPORT)) {
  console.error(`No ESLint report found at ${RAW_REPORT}`);
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(RAW_REPORT, "utf8"));

const errorOnly = raw
  .map((file) => ({
    file: file.filePath,
    errors: (file.messages || [])
      .filter((msg) => msg.severity === 2)
      .map((msg) => ({
        line: msg.line,
        column: msg.column,
        rule: msg.ruleId ?? "unknown",
        message: msg.message,
      })),
  }))
  .filter((file) => file.errors.length > 0);

fs.writeFileSync(ERROR_REPORT, JSON.stringify(errorOnly, null, 2));

const ruleCounts = new Map();

for (const file of errorOnly) {
  for (const err of file.errors) {
    const rule = err.rule;
    ruleCounts.set(rule, (ruleCounts.get(rule) ?? 0) + 1);
  }
}

const sortedRules = [...ruleCounts.entries()].sort((a, b) => b[1] - a[1]);

console.log("\nESLint error summary\n");

if (sortedRules.length === 0) {
  console.log("No lint errors found.");
} else {
  for (const [rule, count] of sortedRules) {
    console.log(`${String(count).padStart(4, " ")}  ${rule}`);
  }
}

console.log(`\nRaw report:    ${RAW_REPORT}`);
console.log(`Error report:  ${ERROR_REPORT}`);
console.log(`Files w/errors: ${errorOnly.length}`);
console.log(
  `Total errors:   ${sortedRules.reduce((sum, [, count]) => sum + count, 0)}`
);
