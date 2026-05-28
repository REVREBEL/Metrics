import { ProductAreaPage } from "@/app/(app)/product-area-page"

export default function CampaignsPage() {
  return (
    <ProductAreaPage
      title="Campaigns"
      description="Campaign setup, coordination, and performance by property."
      items={["All Campaigns", "Active Campaigns", "Campaign Setup", "Performance"]}
    />
  )
}
