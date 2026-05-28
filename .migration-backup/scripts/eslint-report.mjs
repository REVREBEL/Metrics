#!/usr/bin/env node

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const REPORT_DIR = "reports";
const RAW_REPORT = path.join(REPORT_DIR, "eslint-report.json");
const ERROR_REPORT = path.join(REPORT_DIR, "eslint-errors.json");
const FIXQUEUE_REPORT = path.join(REPORT_DIR, "eslint-fixqueue.json");
const RULE_SUMMARY = path.join(REPORT_DIR, "eslint-rule-summary.txt");

const candidateDirs = ["src", "app", "components", "lib"];
const existingDirs = candidateDirs.filter((dir) => fs.existsSync(dir));

const args = process.argv.slice(2);
const mode = getFlagValue(args, "--mode") ?? "fullreport";

if (existingDirs.length === 0) {
  console.error("No lint target directories found. Expected one of: src, app, components, lib");
  process.exit(1);
}

fs.mkdirSync(REPORT_DIR, { recursive: true });

runEslint(existingDirs, RAW_REPORT);

if (!fs.existsSync(RAW_REPORT)) {
  console.error(`No ESLint report found at ${RAW_REPORT}`);
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(RAW_REPORT, "utf8"));

const errorOnly = raw
  .map((file) => ({
    filePath: file.filePath,
    messages: (file.messages || []).filter((msg) => msg.severity === 2),
    errorCount: file.errorCount ?? 0,
    fatalErrorCount: file.fatalErrorCount ?? 0,
    fixableErrorCount: file.fixableErrorCount ?? 0,
  }))
  .filter((file) => file.messages.length > 0);

const fixQueue = buildFixQueue(errorOnly);
const summaryText = buildRuleSummaryText(errorOnly);

fs.writeFileSync(ERROR_REPORT, JSON.stringify(errorOnly, null, 2));
fs.writeFileSync(FIXQUEUE_REPORT, JSON.stringify(fixQueue, null, 2));
fs.writeFileSync(RULE_SUMMARY, summaryText);

switch (mode) {
  case "fullreport":
    printFullReport(errorOnly, summaryText);
    break;

  case "errorreport":
    printErrorReport(errorOnly);
    break;

  case "fixqueue":
    printFixQueue(fixQueue);
    break;

  default:
    console.error(
      `Unknown mode "${mode}". Valid modes: fullreport, errorreport, fixqueue`
    );
    process.exit(1);
}

function getFlagValue(argv, flagName) {
  const index = argv.indexOf(flagName);
  if (index === -1) return null;
  return argv[index + 1] ?? null;
}

function runEslint(targets, outputFile) {
  const command = [
    "pnpm",
    "exec",
    "eslint",
    ...targets,
    "--quiet",
    "-f",
    "json",
    "-o",
    `"${outputFile}"`,
  ].join(" ");

  try {
    execSync(command, { stdio: "inherit" });
  } catch {
    // ESLint exits non-zero when errors are found.
    // That is expected here, so we continue processing the JSON report.
  }
}

function buildFixQueue(files) {
  const grouped = new Map();

  for (const file of files) {
    for (const msg of file.messages) {
      const rule = msg.ruleId ?? "unknown";
      if (!grouped.has(rule)) grouped.set(rule, []);

      grouped.get(rule).push({
        file: file.filePath,
        line: msg.line,
        column: msg.column,
        endLine: msg.endLine ?? null,
        endColumn: msg.endColumn ?? null,
        message: msg.message,
        fixable: Boolean(msg.fix),
      });
    }
  }

  return [...grouped.entries()]
    .map(([rule, occurrences]) => ({
      rule,
      count: occurrences.length,
      filesAffected: [...new Set(occurrences.map((x) => x.file))].length,
      occurrences,
    }))
    .sort((a, b) => b.count - a.count);
}

function buildRuleSummaryText(files) {
  const ruleCounts = new Map();

  for (const file of files) {
    for (const msg of file.messages) {
      const rule = msg.ruleId ?? "unknown";
      ruleCounts.set(rule, (ruleCounts.get(rule) ?? 0) + 1);
    }
  }

  const sorted = [...ruleCounts.entries()].sort((a, b) => b[1] - a[1]);

  if (sorted.length === 0) {
    return "No lint errors found.\n";
  }

  return sorted.map(([rule, count]) => `${String(count).padStart(4, " ")}  ${rule}`).join("\n") + "\n";
}

function printFullReport(files, summaryText) {
  const totalErrors = files.reduce((sum, file) => sum + file.messages.length, 0);

  console.log("\nESLint error summary\n");
  process.stdout.write(summaryText);
  console.log(`\nRaw report:      ${RAW_REPORT}`);
  console.log(`Error report:    ${ERROR_REPORT}`);
  console.log(`Fix queue:       ${FIXQUEUE_REPORT}`);
  console.log(`Rule summary:    ${RULE_SUMMARY}`);
  console.log(`Files w/errors:  ${files.length}`);
  console.log(`Total errors:    ${totalErrors}`);
}

function printErrorReport(files) {
  const compact = files.map((file) => ({
    file: file.filePath,
    errorCount: file.messages.length,
    errors: file.messages.map((msg) => ({
      line: msg.line,
      column: msg.column,
      rule: msg.ruleId ?? "unknown",
      message: msg.message,
    })),
  }));

  console.log(JSON.stringify(compact, null, 2));
  console.log(`\nSaved: ${ERROR_REPORT}`);
}

function printFixQueue(fixQueue) {
  console.log(JSON.stringify(fixQueue, null, 2));
  console.log(`\nSaved: ${FIXQUEUE_REPORT}`);
}