const fs = require('fs');

const code = fs.readFileSync('src/app/widgets-test/page.tsx', 'utf8');

// We want to replace static imports with dynamic imports.
// Example 1: import Default_widgetsAnalyticsOverview from "@/widgets/AnalyticsOverview";
// Replace with: const Default_widgetsAnalyticsOverview = dynamic(() => import("@/widgets/AnalyticsOverview"), { ssr: false });

// Example 2: import { ChartAreaInteractive as Named_ChartAreaInteractive_widgetsAreaChartInterActive } from "@/widgets/AreaChartInterActive";
// Replace with: const Named_ChartAreaInteractive_widgetsAreaChartInterActive = dynamic(() => import("@/widgets/AreaChartInterActive").then(mod => mod.ChartAreaInteractive), { ssr: false });

let newCode = code.replace(/import\s+Default_([a-zA-Z0-9_]+)\s+from\s+"([^"]+)";/g, 
  'const Default_$1 = dynamic(() => import("$2"), { ssr: false });');

newCode = newCode.replace(/import\s+\{\s*([a-zA-Z0-9_]+)\s+as\s+([a-zA-Z0-9_]+)\s*\}\s+from\s+"([^"]+)";/g,
  'const $2 = dynamic(() => import("$3").then(mod => mod.$1), { ssr: false });');

newCode = newCode.replace(/import\s+\{\s*([^\}]+)\s*\}\s+from\s+"([^"]+)";/g, (match, inner, path) => {
  // If there are multiple named imports in one line, we split them
  if (!inner.includes(',')) return match; // already handled by previous or not matching
  
  const parts = inner.split(',').map(s => s.trim()).filter(Boolean);
  let res = '';
  for (const part of parts) {
    const match2 = part.match(/([a-zA-Z0-9_]+)\s+as\s+([a-zA-Z0-9_]+)/);
    if (match2) {
      res += `const ${match2[2]} = dynamic(() => import("${path}").then(mod => mod.${match2[1]}), { ssr: false });\n`;
    }
  }
  return res;
});

if (!newCode.includes('import dynamic from "next/dynamic";')) {
  newCode = newCode.replace('import React, { Component, ErrorInfo, ReactNode } from "react";', 
  'import React, { Component, ErrorInfo, ReactNode } from "react";\nimport dynamic from "next/dynamic";');
}

fs.writeFileSync('src/app/widgets-test/page.tsx', newCode);
console.log("Imports updated!");
