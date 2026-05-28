import { ProductAreaPage } from "@/app/(app)/product-area-page"

export default function StrategiesPage() {
  return (
    <ProductAreaPage
      title="Strategies"
      description="Reusable playbooks, trigger conditions, and recommended actions."
      items={["Strategy Library", "Playbooks", "Trigger Conditions", "Recommended Actions"]}
    />
  )
}
