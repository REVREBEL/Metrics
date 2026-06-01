"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import {
  IconChevronDown,
  IconDeviceDesktop,
  IconDotsVertical,
  IconPlus,
  IconSearch,
  IconStack2,
  IconTrendingUp,
  IconWorld,
} from "@tabler/icons-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

import type { Initiative } from "../data/schema"

type TeamMember = {
  name: string
  role: string
  online: boolean
  lastActive: string
}

type GrowthPlanSidebarProps = {
  initiatives: Initiative[]
  selectedInitiative?: Initiative | null
  onInitiativeSelect: (initiative: Initiative) => void
  teamMembers?: TeamMember[]
}

const defaultTeamMembers: TeamMember[] = [
  { name: "Sarah Chen", role: "Product Lead", online: true, lastActive: "08:23:26" },
  { name: "Marcus Johnson", role: "Engineering", online: true, lastActive: "08:23:26" },
  { name: "Emily Rodriguez", role: "Marketing", online: false, lastActive: "2h ago" },
  { name: "David Kim", role: "Sales", online: true, lastActive: "08:23:26" },
  { name: "Lisa Thompson", role: "Customer Success", online: false, lastActive: "1d ago" },
]

const strategyIcons: Record<string, ReactNode> = {
  demand_generation: <IconWorld />,
  product_revenue: <IconStack2 />,
  retention_expansion: <IconTrendingUp />,
  operational_efficiency: <IconDeviceDesktop />,
}

export function GrowthPlanSidebar({
  initiatives,
  selectedInitiative,
  onInitiativeSelect,
  teamMembers = defaultTeamMembers,
}: GrowthPlanSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [teamExpanded, setTeamExpanded] = useState(true)

  const filteredInitiatives = initiatives.filter((initiative) =>
    initiative.title?.toLowerCase().includes(searchQuery.toLowerCase()),
 )

  return (
    <div className="flex h-full flex-col border-r border-border bg-card/50">
      <div className="border-b border-border p-4">
        <div className="relative">
          <IconSearch
           
           
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search"
            className="bg-background pl-9"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Initiatives</h3>
            <div className="space-y-1">
              {filteredInitiatives.map((initiative) => {
                const isSelected = selectedInitiative?.id === initiative.id
                const icon = strategyIcons[initiative.strategyType] ?? (
                  <IconStack2 />
               )

                return (
                  <div
                    key={initiative.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onInitiativeSelect(initiative)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        onInitiativeSelect(initiative)
                      }
                    }}
                    className={cn(
                      "group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                      isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                   )}
                 >
                    <div
                      className={cn(
                        "flex size-8 items-center justify-center rounded-lg",
                        isSelected ? "bg-primary-foreground/20" : "bg-muted",
                     )}
                   >
                      {icon}
                    </div>
                    <span className="flex-1 truncate text-sm font-medium">{initiative.title}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "size-6 opacity-0 group-hover:opacity-100",
                            isSelected ? "hover:bg-primary-foreground/20" : "",
                         )}
                          onClick={(event) => event.stopPropagation()}
                       >
                          <IconDotsVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
               )
              })}
            </div>

            <Button variant="outline" className="mt-3 w-full justify-start border-dashed">
              <IconPlus size={16} className="mr-2" />
              Add Initiative
            </Button>
          </div>

          <Collapsible open={teamExpanded} onOpenChange={setTeamExpanded}>
            <CollapsibleTrigger className="mb-3 flex w-full items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Team members</h3>
              <IconChevronDown
                size={16}
               
                className={cn(
                  "text-muted-foreground transition-transform",
                  teamExpanded ? "" : "-rotate-90",
               )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-1">
                {teamMembers.map((member) => (
                  <div
                    key={member.name}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted"
                 >
                    <div className="relative">
                      <Avatar className="size-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} />
                        <AvatarFallback className="text-xs">
                          {member.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {member.online ? (
                        <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-card bg-emerald-500" />
                     ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{member.name}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        {member.online ? (
                          <>
                            <>
                            <span className="text-emerald-500">Online</span>
                            <span>-</span>
                            <span>{member.lastActive}</span>
                          </>
                       ) : (
                          <span>{member.lastActive}</span>
                       )}
                      </p>
                    </div>
                    <IconChevronDown size={14} className="text-muted-foreground" />
                  </div>
               ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>

      <div className="border-t border-border p-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Time</h3>
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Total Hours</p>
          <p className="text-2xl font-bold text-foreground">23.7 hours</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
            <IconTrendingUp size={14} />
            2.5% from last week
          </p>
        </div>
      </div>
    </div>
 )
}