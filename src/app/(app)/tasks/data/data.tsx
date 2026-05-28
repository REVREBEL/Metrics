import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  CircleAlert,
  AlertTriangle,
  Archive,
  MessageCircle,
  Timer,
  Clock,
  Ban,
} from 'lucide-react'

export const labels = [
  { value: 'bug', label: 'Bug' },
  { value: 'feature', label: 'Feature' },
  { value: 'documentation', label: 'Documentation' },
]

// Initiative statuses from spec
export const initiativeStatuses = [
  { value: 'discussed', label: 'Discussed', icon: MessageCircle },
  { value: 'planning', label: 'Planning', icon: Clock },
  { value: 'active', label: 'Active', icon: Timer },
  { value: 'blocked', label: 'Blocked', icon: Ban },
  { value: 'at_risk', label: 'At Risk', icon: AlertTriangle },
  { value: 'completed', label: 'Complete', icon: CheckCircle },
  { value: 'canceled', label: 'Canceled', icon: CircleOff },
  { value: 'archived', label: 'Archived', icon: Archive },
]

// Task statuses from spec
export const taskStatuses = [
  { value: 'not_started', label: 'Not Started', icon: Circle },
  { value: 'in_progress', label: 'In Progress', icon: Timer },
  { value: 'waiting', label: 'Waiting', icon: Clock },
  { value: 'blocked', label: 'Blocked', icon: CircleAlert },
  { value: 'complete', label: 'Complete', icon: CheckCircle },
  { value: 'canceled', label: 'Canceled', icon: CircleOff },
]

// Legacy statuses for backward compatibility
export const statuses = taskStatuses

export const priorities = [
  { value: 'low', label: 'Low', icon: ArrowDown },
  { value: 'medium', label: 'Medium', icon: ArrowRight },
  { value: 'high', label: 'High', icon: ArrowUp },
  { value: 'critical', label: 'Critical', icon: AlertTriangle },
]

// Strategy types from spec
export const strategyTypes = [
  { value: 'promotion', label: 'Promotion' },
  { value: 'rate_strategy', label: 'Rate Strategy' },
  { value: 'sales_push', label: 'Sales Push' },
  { value: 'distribution_fix', label: 'Distribution Fix' },
  { value: 'campaign', label: 'Campaign' },
  { value: 'operational', label: 'Operational' },
  { value: 'content_update', label: 'Content Update' },
  { value: 'other', label: 'Other' },
]

// Responsible entity types from spec
export const responsibleEntityTypes = [
  { value: 'internal_department', label: 'Internal Department' },
  { value: 'third_party_agency', label: 'Third-Party Agency' },
  { value: 'vendor', label: 'Vendor' },
  { value: 'ownership', label: 'Ownership' },
  { value: 'brand_corporate', label: 'Brand / Corporate' },
  { value: 'management_company', label: 'Management Company' },
  { value: 'hotel_team', label: 'Hotel Team' },
  { value: 'other', label: 'Other' },
]

// Departments
export const departments = [
  { value: 'revenue_management', label: 'Revenue Management' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'operations', label: 'Operations' },
  { value: 'front_office', label: 'Front Office' },
  { value: 'reservations', label: 'Reservations' },
  { value: 'finance', label: 'Finance' },
  { value: 'digital_agency', label: 'Digital Agency' },
  { value: 'ownership', label: 'Ownership' },
]

// Assignee types from spec
export const assigneeTypes = [
  { value: 'app_user', label: 'App User' },
  { value: 'external_assignee', label: 'External Assignee' },
  { value: 'department_placeholder', label: 'Department Placeholder' },
  { value: 'entity_placeholder', label: 'Entity Placeholder' },
]
