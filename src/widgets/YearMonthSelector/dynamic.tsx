"use client"

import dynamic from "next/dynamic"

export const YearMonthSelector = dynamic(
  () => import("./index").then((mod) => mod.YearMonthSelector),
  { ssr: false }
)