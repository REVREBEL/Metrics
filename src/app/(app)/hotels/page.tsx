import { ProductAreaPage } from "@/app/(app)/product-area-page"

export default function HotelsPage() {
  return (
    <ProductAreaPage
      title="Hotels"
      description="Property profiles and hotel-level operating context."
      items={["Hotel Profiles", "Events", "Notes", "Tasks", "Campaigns", "Strategies"]}
    />
  )
}
