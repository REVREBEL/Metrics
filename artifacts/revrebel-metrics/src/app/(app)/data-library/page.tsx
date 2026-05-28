import { ProductAreaPage } from "@/app/(app)/product-area-page"

export default function DataLibraryPage() {
  return (
    <ProductAreaPage
      title="Data Library"
      description="Internal reference data, mappings, unmapped-code queues, and data health."
      items={["Lookup Tables", "Mapping Tables", "Unmapped Codes", "Data Health"]}
    />
  )
}
