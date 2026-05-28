import { ProductAreaPage } from "@/app/(app)/product-area-page"

export default function MetricLibraryPage() {
  return (
    <ProductAreaPage
      title="Metric Library"
      description="Metric catalog, formulas, source fields, and allowed dimensions."
      items={["All Metrics", "Base Metrics", "Calculated Metrics"]}
    />
  )
}
