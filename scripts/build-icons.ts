#!/usr/bin/env tsx
import * as fs from "node:fs"
import * as path from "node:path"

const DIRECTORIES_TO_SCAN = [
  path.join(process.cwd(), "src/app"),
  path.join(process.cwd(), "src/components"),
  path.join(process.cwd(), "src/registry"),
  path.join(process.cwd(), "registry/bases")
]

function findTsxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  const files: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...findTsxFiles(fullPath))
    } else if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts"))) {
      files.push(fullPath)
    }
  }
  return files
}

function normalizeToTablerName(iconName: string): string {
  if (iconName.startsWith("Icon") && iconName.length > 4 && /[A-Z]/.test(iconName[4])) {
    return iconName
  }
  const cleanName = iconName
    .replace(/[-_]+/g, " ")
    .replace(/\s+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\s+/g, "")
  return `Icon${cleanName}`
}

function isValidTablerIconName(iconName: string): boolean {
  return /^Icon[A-Z][A-Za-z0-9]*$/.test(iconName.trim())
}

function enforceTablerJsxProperties(content: string, tablerIcons: string[]): string {
  let updatedContent = content
  for (const icon of tablerIcons) {
    const componentRegex = new RegExp(`<(${icon})\\b([^>]*?)\\/?>`, "g")
    updatedContent = updatedContent.replace(componentRegex, (fullMatch, tagName, existingProps) => {
      let props = existingProps.trim()

      // Handle stroke width safely
      if (props.includes("strokeWidth=")) {
        props = props.replace(/strokeWidth=\{[^}]+\}/g, "strokeWidth={1.5}")
        props = props.replace(/strokeWidth=["'][^"']+["']/g, "strokeWidth={1.5}")
      } else {
        props += " strokeWidth={1.5}"
      }

      // Handle size safely (ensuring at least 20px)
      if (props.includes("size=")) {
        props = props.replace(/size=\{([^}]+)\}/g, (_, val) => {
          const num = parseInt(val, 10)
          return `size={${isNaN(num) ? "20" : Math.max(num, 20)}}`
        })
        props = props.replace(/size=["']([^"']+)["']/g, (_, val) => {
          const num = parseInt(val, 10)
          return `size={${isNaN(num) ? "20" : Math.max(num, 20)}}`
        })
      } else {
        props += " size={20}"
      }

      return fullMatch.endsWith("/>") ? `<${tagName} ${props.trim()} />` : `<${tagName} ${props.trim()}>`
    })
  }
  return updatedContent
}

function main() {
  if (process.env.ENABLE_ICON_REWRITE !== "1") {
    return
  }
  const files = DIRECTORIES_TO_SCAN.flatMap(dir => findTsxFiles(dir))

  for (const file of files) {
    let content = fs.readFileSync(file, "utf-8")
    let hasChanges = false
    const fileTrackedTablerIcons: string[] = []

    // 1. Intercept other icon library imports and translate them
    const importRegex = /import\s+\{([^}]+)\}\s+from\s+["'](lucide-react|@hugeicons\/react)["']/g
    content = content.replace(importRegex, (_, iconExports, libraryName) => {
      hasChanges = true
      const individualIcons = iconExports
        .split(",")
        .map((i: string) => i.trim().split(/\s+as\s+/)[0])
        .filter(Boolean)
      const migratedTablerExports = individualIcons.map((icon: string) => {
        const tablerName = normalizeToTablerName(icon)
        if (isValidTablerIconName(tablerName)) {
          fileTrackedTablerIcons.push(tablerName)
        }
        return tablerName
      })
      return `import { ${Array.from(new Set(migratedTablerExports)).join(", ")} } from "@tabler/icons-react"`
    })

    // 2. Track existing Tabler elements to ensure their stroke/size are correct too
    const existingTablerImports = content.match(/import\s+\{([^}]+)\}\s+from\s+["']@tabler\/icons-react["']/)
    if (existingTablerImports) {
      const foundIcons = existingTablerImports[1]
        .split(",")
        .map(i => i.trim().split(/\s+as\s+/).pop()!)
        .filter((icon) => isValidTablerIconName(icon))
      fileTrackedTablerIcons.push(...foundIcons)
    }

    // 3. Clean up the properties
    if (fileTrackedTablerIcons.length > 0) {
      const cleanContent = enforceTablerJsxProperties(content, [...new Set(fileTrackedTablerIcons)])
      if (cleanContent !== content) {
        content = cleanContent
        hasChanges = true
      }
    }

    if (hasChanges) {
      fs.writeFileSync(file, content, "utf-8")
    }
  }
}

main()
