"use client"

import { useState } from "react"
import { Shield, ShieldAlert, ShieldCheck, ShieldOff } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type {
  EnforcementMode,
  PermissionDefinition,
  PermissionRiskLevel,
} from "@/lib/permissions/permissions-registry"
import {
  getPermissionsByGroup,
  permissionsRegistry,
} from "@/lib/permissions/permissions-registry"
import { cn } from "@/lib/utils"

type PermissionState = {
  enabled: boolean
  enforcementMode: EnforcementMode
}

function buildInitialState(): Record<string, PermissionState> {
  const state: Record<string, PermissionState> = {}
  for (const perm of permissionsRegistry) {
    state[perm.key] = {
      enabled: perm.defaultEnabledForDev,
      enforcementMode: perm.enforcementMode,
    }
  }
  return state
}

const riskLabels: Record<PermissionRiskLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
}

const riskVariants: Record<
  PermissionRiskLevel,
  "secondary" | "outline" | "default" | "destructive"
> = {
  low: "secondary",
  medium: "outline",
  high: "default",
  critical: "destructive",
}

const enforcementLabels: Record<EnforcementMode, string> = {
  disabled: "Disabled",
  audit_only: "Audit Only",
  warn_only: "Warn Only",
  enforced: "Enforced",
}

function EnforcementBadge({ mode }: { mode: EnforcementMode }) {
  const icons: Record<EnforcementMode, typeof Shield> = {
    disabled: ShieldOff,
    audit_only: Shield,
    warn_only: ShieldAlert,
    enforced: ShieldCheck,
  }
  const Icon = icons[mode]

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 font-normal",
        mode === "disabled" && "text-muted-foreground",
        mode === "audit_only" && "text-blue-600 border-blue-200",
        mode === "warn_only" && "text-amber-600 border-amber-300",
        mode === "enforced" && "text-green-600 border-green-300"
      )}
    >
      <Icon className="size-3" />
      {enforcementLabels[mode]}
    </Badge>
  )
}

function GroupSection({
  group,
  permissions,
  states,
  onToggle,
}: {
  group: string
  permissions: PermissionDefinition[]
  states: Record<string, PermissionState>
  onToggle: (key: string, enabled: boolean) => void
}) {
  return (
    <section className="rounded-lg border">
      <div className="border-b bg-muted/40 px-4 py-3">
        <h3 className="text-sm font-semibold">{group}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {permissions.length} permission{permissions.length !== 1 ? "s" : ""}
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">On</TableHead>
            <TableHead>Permission Key</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="hidden sm:table-cell">Scope</TableHead>
            <TableHead className="hidden sm:table-cell">Risk</TableHead>
            <TableHead>Enforcement</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map((perm) => {
            const state = states[perm.key]
            return (
              <TableRow key={perm.key} className={!state.enabled ? "opacity-60" : ""}>
                <TableCell className="text-center">
                  <Switch
                    checked={state.enabled}
                    onCheckedChange={(checked) => onToggle(perm.key, checked)}
                    aria-label={`Toggle ${perm.label}`}
                  />
                </TableCell>
                <TableCell>
                  <p className="font-medium text-sm">{perm.label}</p>
                  <p className="font-mono text-[11px] text-muted-foreground mt-0.5 truncate max-w-48">
                    {perm.key}
                  </p>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-64">
                  {perm.description}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline" className="text-xs capitalize font-normal">
                    {perm.scope}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant={riskVariants[perm.riskLevel]} className="text-xs">
                    {riskLabels[perm.riskLevel]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <EnforcementBadge mode={state.enforcementMode} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
  )
}

export function PermissionsPanel() {
  const [states, setStates] = useState<Record<string, PermissionState>>(
    buildInitialState
  )

  const groups = getPermissionsByGroup()

  function handleToggle(key: string, enabled: boolean) {
    setStates((prev) => ({
      ...prev,
      [key]: { ...prev[key], enabled },
    }))
  }

  const enabledCount = Object.values(states).filter((s) => s.enabled).length
  const totalCount = permissionsRegistry.length

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Permission Registry</h2>
          <p className="text-sm text-muted-foreground mt-1">
            All permission keys defined in the registry. Toggles affect this
            session only — enforcement mode stays at{" "}
            <span className="font-medium">audit_only</span> during development.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="size-4" />
          <span>
            {enabledCount} / {totalCount} enabled
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {Array.from(groups.entries()).map(([group, permissions]) => (
          <GroupSection
            key={group}
            group={group}
            permissions={permissions}
            states={states}
            onToggle={handleToggle}
          />
        ))}
      </div>

      <p className="text-xs text-muted-foreground border-t pt-4">
        Adding a new permission key to the registry automatically appears here
        without requiring any UI changes. All mapping table permissions default
        to <span className="font-mono">audit_only</span> enforcement — no access
        is blocked during development.
      </p>
    </div>
  )
}
