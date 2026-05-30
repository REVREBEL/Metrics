import { describe, expect, it } from "vitest"

import { cn } from "./utils"

describe("cn utility", () => {
  it("merges simple string class names correctly", () => {
    expect(cn("bg-red-500", "text-white")).toBe("bg-red-500 text-white")
  })

  it("handles tailwind class conflicts correctly", () => {
    // twMerge should resolve 'bg-red-500' and 'bg-blue-500' to just 'bg-blue-500'
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500")
  })

  it("handles conditional classes correctly", () => {
    expect(cn("text-lg", true && "font-bold", false && "italic")).toBe(
      "text-lg font-bold"
    )
  })

  it("handles array inputs correctly", () => {
    expect(cn(["p-4", "m-2"])).toBe("p-4 m-2")
  })

  it("handles object inputs correctly", () => {
    expect(cn({ "bg-green-500": true, "text-black": false })).toBe(
      "bg-green-500"
    )
  })

  it("handles mixed inputs correctly", () => {
    expect(
      cn(
        "flex",
        ["items-center", "justify-center"],
        { "w-full": true },
        "bg-blue-500 bg-red-500"
      )
    ).toBe("flex items-center justify-center w-full bg-red-500")
  })

  it("ignores null and undefined values", () => {
    expect(cn("p-4", null, undefined, "m-2")).toBe("p-4 m-2")
  })
})
