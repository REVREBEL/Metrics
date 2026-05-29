"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { 
  MoreVertical, 
  Plus, 
  Clock,
  TrendingUp,
  ChevronDown,
  Search,
  Globe,
  Smartphone,
  Monitor,
  Layers
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import type { Initiative, Task } from '../data/schema'

type GrowthPlanSidebarProps = {
  initiatives: Initiative[]
  selectedInitiative?: Initiative | null
  onInitiativeSelect: (initiative: Initiative) => void
  teamMembers?: { name: string; role: string; online: boolean }[]
}

// Mock team members
const defaultTeamMembers = [
  { name: 'Sarah Chen', role: 'Product Lead', online: true },
  { name: 'Marcus Johnson', role: 'Engineering', online: true },
  { name: 'Emily Rodriguez', role: 'Marketing', online: false },
  { name: 'David Kim', role: 'Sales', online: true },
  { name: 'Lisa Thompson', role: 'Customer Success', online: false },
]

// Initiative icons based on strategy type
const strategyIcons: Record<string, React.ReactNode> = {
  'demand_generation': <Globe className="size-4" />,
  'product_revenue': <Layers className="size-4" />,
  'retention_expansion': <TrendingUp className="size-4" />,
  'operational_efficiency': <Monitor className="size-4" />,
}

export function GrowthPlanSidebar({ 
  initiatives, 
  selectedInitiative,
  onInitiativeSelect,
  teamMembers = defaultTeamMembers
}: GrowthPlanSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [teamExpanded, setTeamExpanded] = useState(true)
  
  const filteredInitiatives = initiatives.filter(i => 
    i.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Calculate overall progress
  const totalTasks = initiatives.reduce((acc, i) => acc + (i.tasks?.length || 0), 0)
  const completedTasks = initiatives.reduce((acc, i) => 
    acc + (i.tasks?.filter(t => t.status === 'completed' || t.status === 'complete').length || 0), 0
  )
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  
  return (
    <div className="flex flex-col h-full border-r border-border bg-card/50">
      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input 
            placeholder="Search" 
            className="pl-9 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* Initiatives Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Initiatives</h3>
            <div className="space-y-1">
              {filteredInitiatives.map((initiative) => {
                const isSelected = selectedInitiative?.id === initiative.id
                const icon = strategyIcons[initiative.strategyType] || <Layers className="size-4" />
                
                return (
                  <button
                    key={initiative.id}
                    onClick={() => onInitiativeSelect(initiative)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                      isSelected 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-muted"
                    )}
                  >
                    <div className={cn(
                      "flex items-center justify-center size-8 rounded-lg",
                      isSelected ? "bg-primary-foreground/20" : "bg-muted"
                    )}>
                      {icon}
                    </div>
                    <span className="flex-1 text-sm font-medium truncate">
                      {initiative.title || initiative.name}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={cn(
                            "size-6 opacity-0 group-hover:opacity-100",
                            isSelected ? "hover:bg-primary-foreground/20" : ""
                          )}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="size-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </button>
                )
              })}
            </div>
            
            {/* Add Initiative Button */}
            <Button 
              variant="outline" 
              className="w-full mt-3 border-dashed justify-start"
            >
              <Plus className="size-4 mr-2" />
              Add Initiative
            </Button>
          </div>

          {/* Team Members Section */}
          <Collapsible open={teamExpanded} onOpenChange={setTeamExpanded}>
            <CollapsibleTrigger className="flex items-center justify-between w-full mb-3">
              <h3 className="text-sm font-semibold text-foreground">Team members</h3>
              <ChevronDown className={cn(
                "size-4 text-muted-foreground transition-transform",
                teamExpanded ? "" : "-rotate-90"
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-1">
                {teamMembers.map((member, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="relative">
                      <Avatar className="size-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} />
                        <AvatarFallback className="text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {member.online && (
                        <span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        {member.online ? (
                          <>
                            <span className="text-emerald-500">Online</span>
                            <span>-</span>
                            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </>
                        ) : (
                          <span>Offline</span>
                        )}
                      </p>
                    </div>
                    <ChevronDown className="size-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>
      
      {/* Time Tracking Section */}
      <div className="p-4 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Time</h3>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Hours</p>
          <p className="text-2xl font-bold text-foreground">23.7 hours</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
            <TrendingUp className="size-3" />
            2.5% from last week
          </p>
        </div>
      </div>
    </div>
  )
}
