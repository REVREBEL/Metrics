import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircle,
  IconCircleCheck,
  IconHelpCircleFilled,
  IconCircleX,
  IconClockHour1Filled,
} from "@tabler/icons-react"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const taskStatuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: IconHelpCircleFilled,
  },
  {
    value: "todo",
    label: "Todo",
    icon: IconCircle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: IconClockHour1Filled,
  },
  {
    value: "done",
    label: "Done",
    icon: IconCircleCheck,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: IconCircleX,
  },
]

export const priorities = [
  {
    value: "low",
    label: "Low",
    icon: IconArrowDown,
  },
  {
    value: "medium",
    label: "Medium",
    icon: IconArrowRight,
  },
  {
    value: "high",
    label: "High",
    icon: IconArrowUp,
  },
]
