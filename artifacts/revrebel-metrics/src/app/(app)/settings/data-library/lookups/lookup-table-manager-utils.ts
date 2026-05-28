export function sortLabel(sortKey: "rawCode" | "rawName" | "mappedValue" | "updatedAt") {
  const labels = {
    rawCode: "Sort: raw code",
    rawName: "Sort: raw name",
    mappedValue: "Sort: mapped value",
    updatedAt: "Sort: updated",
  }

  return labels[sortKey]
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value))
}
