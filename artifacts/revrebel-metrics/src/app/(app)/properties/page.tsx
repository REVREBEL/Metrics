import { ProductAreaPage } from "@/app/(app)/product-area-page"

export default function PropertiesPage() {
  return (
    <ProductAreaPage
      title="Properties"
      description="Property profiles and hotel-level operating context."
      items={["Property Profiles", "Events", "Notes", "Tasks", "Campaigns", "Strategies"]}
    />
  )
}
