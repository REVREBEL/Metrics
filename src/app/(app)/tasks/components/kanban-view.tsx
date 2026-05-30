"use client"

import { useMemo } from 'react'
import { 
  IconDotsVertical,
  IconPlus,
  IconAlertTriangle,
  IconEye,
  IconMessage,
  IconLink,
  IconGripVertical,
  IconListCheck,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { initiativeStatuses, taskStatuses, strategyTypes } from '../data/data'
import type { Initiative, Task } from '../data/schema'
import { useTasks } from './tasks-provider'


type KanbanViewProps = {
  initiatives: Initiative[]
  tasks: Task[]
  mode: 'initiatives' | 'tasks'
  onInitiativeClick?: (initiative: Initiative) => void
  onTaskClick?: (task: Task) => void
}

// Status dot colors mapping
const statusDotColors: Record< string, string strokeWidth={1.5} size={20}> = {
  discussed: 'bg-red-500',
  planning: 'bg-blue-500',
  active: 'bg-emerald-500',
  blocked: 'bg-orange-500',
  complete: 'bg-emerald-600',
  not_started: 'bg-red-500',
  in_progress: 'bg-blue-500',
  waiting: 'bg-orange-500',
  completed: 'bg-emerald-500',
  canceled: 'bg-slate-400',
  at_risk: 'bg-orange-500',
  archived: 'bg-slate-400',
}

// Category badge colors - matching the reference design
const categoryColors: Record< string, { bg: string; text: string; label: string } strokeWidth={1.5} size={20}> = {
  'demand_generation': { bg: 'bg-teal-100 dark:bg-teal-900/40', text: 'text-teal-700 dark:text-teal-300', label: 'Demand Gen' },
  'product_revenue': { bg: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-700 dark:text-orange-300', label: 'Product Revenue' },
  'retention_expansion': { bg: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-700 dark:text-purple-300', label: 'Retention' },
  'operational_efficiency': { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-300', label: 'Operations' },
  'marketing': { bg: 'bg-yellow-100 dark:bg-yellow-900/40', text: 'text-yellow-800 dark:text-yellow-300', label: 'Marketing' },
  'sales': { bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-300', label: 'Sales' },
  'product': { bg: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-700 dark:text-purple-300', label: 'Product' },
  'operations': { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-700 dark:text-slate-300', label: 'Operations' },
  'finance': { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-300', label: 'Finance' },
  'customer_success': { bg: 'bg-teal-100 dark:bg-teal-900/40', text: 'text-teal-700 dark:text-teal-300', label: 'Customer Success' },
  // Department mappings
  'revenue_management': { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-300', label: 'Revenue' },
  'digital_agency': { bg: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-700 dark:text-purple-300', label: 'Agency' },
  'front_office': { bg: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-700 dark:text-orange-300', label: 'Front Office' },
  // Strategy type mappings
  'promotion': { bg: 'bg-teal-100 dark:bg-teal-900/40', text: 'text-teal-700 dark:text-teal-300', label: 'Promotion' },
  'rate_strategy': { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-300', label: 'Rate Strategy' },
  'content_update': { bg: 'bg-yellow-100 dark:bg-yellow-900/40', text: 'text-yellow-800 dark:text-yellow-300', label: 'Content' },
  'sales_push': { bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-300', label: 'Sales' },
  'campaign': { bg: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-700 dark:text-orange-300', label: 'Campaign' },
}

export function KanbanView({ 
  initiatives, 
  tasks, 
  mode,
  onInitiativeClick,
  onTaskClick,
}: KanbanViewProps) {
  const statuses = mode === 'initiatives' ? initiativeStatuses : taskStatuses

  const columns = useMemo(() => {
    if (mode === 'initiatives') {
      return statuses.map(status => ({
        ...status,
        items: initiatives.filter(i => i.status === status.value),
      }))
    } else {
      return statuses.map(status => ({
        ...status,
        items: tasks.filter(t => t.status === status.value),
      }))
    }
  }, [initiatives, tasks, mode, statuses])

  return (
    < ScrollArea className="w-full" strokeWidth={1.5} size={20}>
      < div className="flex gap-4 p-1 min-w-max pb-4" strokeWidth={1.5} size={20}>
        {columns.map((column) => {
          const items = column.items || []
          
          return (
            < div key={column.value} className="w-[320px] flex-shrink-0" strokeWidth={1.5} size={20}>
              {/* Column Header */}
              < div className="flex items-center justify-between mb-3 px-1" strokeWidth={1.5} size={20}>
                < div className="flex items-center gap-2" strokeWidth={1.5} size={20}>
                  < span className={cn("size-2.5 rounded-full", statusDotColors[column.value] || 'bg-slate-400')} strokeWidth={1.5} size={20} />
                  < span className="font-semibold text-foreground" strokeWidth={1.5} size={20}>{column.label}</span>
                  < span className="text-sm text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded-full" strokeWidth={1.5} size={20}>
                    {items.length}
                  </span>
                </div>
                < DropdownMenu strokeWidth={1.5} size={20}>
                  < DropdownMenuTrigger asChild strokeWidth={1.5} size={20}>
                    < Button variant="ghost" size={20} className="size-7" strokeWidth={1.5}>
                      < IconDotsVertical size={20} stroke={1.5} strokeWidth={1.5} />
                    </Button>
                  </DropdownMenuTrigger>
                  < DropdownMenuContent align="end" strokeWidth={1.5} size={20}>
                    < DropdownMenuItem strokeWidth={1.5} size={20}>Edit Column</DropdownMenuItem>
                    < DropdownMenuItem strokeWidth={1.5} size={20}>Add {mode === 'initiatives' ? 'Initiative' : 'Task'}</DropdownMenuItem>
                    < DropdownMenuItem className="text-destructive" strokeWidth={1.5} size={20}>Delete Column</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Add New Button */}
              < Button 
                variant="outline" 
                className="w-full mb-3 border-dashed border-border/60 text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/50" strokeWidth={1.5} size={20}>
                < IconPlus size={20} stroke={1.5} className="mr-2" strokeWidth={1.5} />
                Add New {mode === 'initiatives' ? 'Initiative' : 'Task'}
              </Button>

              {/* Cards */}
              < div className="space-y-3" strokeWidth={1.5} size={20}>
                {items.length === 0 ? (
                  < div className="rounded-xl border border-dashed border-border/50 bg-muted/30 p-8 text-center" strokeWidth={1.5} size={20}>
                    < div className="mx-auto size-10 rounded-full bg-muted flex items-center justify-center mb-3" strokeWidth={1.5} size={20}>
                      < IconPlus size={20} stroke={1.5} className="text-muted-foreground" strokeWidth={1.5} />
                    </div>
                    < p className="text-sm text-muted-foreground" strokeWidth={1.5} size={20}>No {mode === 'initiatives' ? 'initiatives' : 'tasks'} yet</p>
                    < p className="text-xs text-muted-foreground/70 mt-1" strokeWidth={1.5} size={20}>Add one to get started</p>
                  </div>
                ) : (
                  mode === 'initiatives' 
                    ? (items as Initiative[]).map(item => (
                        < InitiativeCard 
                          key={item.id} 
                          initiative={item} 
                          onClick={() = strokeWidth={1.5} size={20}> onInitiativeClick?.(item)}
                        />
                      ))
                    : (items as Task[]).map(item => (
                        < TaskCard 
                          key={item.id} 
                          task={item}
                          onClick={() = strokeWidth={1.5} size={20}> onTaskClick?.(item)}
                        />
                      ))
                )}
              </div>
            </div>
          )
        })}
      </div>
      < ScrollBar orientation="horizontal" strokeWidth={1.5} size={20} />
    </ScrollArea>
  )
}

function InitiativeCard({ initiative, onClick }: { initiative: Initiative; onClick?: () => void }) {
  const strategyType = strategyTypes.find(s => s.value === initiative.strategyType)
  const colors = categoryColors[initiative.strategyType] || { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-700 dark:text-slate-300', label: 'Uncategorized' }
  
  // Calculate progress
  const totalTasks = initiative.tasks?.length || 0
  const completedTasks = initiative.tasks?.filter(t => t.status === 'completed' || t.status === 'complete').length || 0
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  
  return (
    < div 
      className="group bg-card rounded-xl border border-border/60 p-4 hover:border-border transition-all cursor-pointer"
      onClick={onClick} strokeWidth={1.5} size={20}>
      {/* Drag Handle + Menu */}
        < div className="flex items-start justify-between mb-3" strokeWidth={1.5} size={20}>
        < div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} size={20}>
          < IconGripVertical size={20} stroke={1.5} className="text-muted-foreground cursor-grab" strokeWidth={1.5} />
        </div>
        < DropdownMenu strokeWidth={1.5} size={20}>
          < DropdownMenuTrigger asChild strokeWidth={1.5} size={20}>
            < Button variant="ghost" size={20} className="size-6 -mt-1 -mr-1" onClick={e = strokeWidth={1.5}> e.stopPropagation()}>
              < IconDotsVertical size={20} stroke={1.5} strokeWidth={1.5} />
            </Button>
          </DropdownMenuTrigger>
          < DropdownMenuContent align="end" strokeWidth={1.5} size={20}>
            < DropdownMenuItem strokeWidth={1.5} size={20}>Edit</DropdownMenuItem>
            < DropdownMenuItem strokeWidth={1.5} size={20}>Duplicate</DropdownMenuItem>
            < DropdownMenuItem className="text-destructive" strokeWidth={1.5} size={20}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Category Badge */}
      < Badge variant="secondary" className={cn("mb-3 font-medium border-0", colors.bg, colors.text)} strokeWidth={1.5} size={20}>
        {strategyType?.label || colors.label}
      </Badge>

      {/* Title */}
      < h4 className="font-semibold text-foreground mb-2 line-clamp-2 leading-snug" strokeWidth={1.5} size={20}>
        {initiative.title || initiative.name}
      </h4>

      {/* Description */}
      {initiative.objective && (
        < p className="text-sm text-muted-foreground line-clamp-2 mb-3" strokeWidth={1.5} size={20}>
          {initiative.objective}
        </p>
      )}

      {/* Task Progress */}
      {totalTasks > 0 && (
        < div className="flex items-center gap-2 mb-3" strokeWidth={1.5} size={20}>
          < IconListCheck size={20} stroke={1.5} className="text-muted-foreground" strokeWidth={1.5} />
          < span className={cn(
            "text-sm font-medium px-2 py-0.5 rounded",
            progress === 100 
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" 
              : progress strokeWidth={1.5} size={20}> 50 
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          )}>
            {completedTasks}/{totalTasks}
          </span>
        </div>
      )}

      {/* Risk Indicator */}
      {(initiative.hasRisk || initiative.risksBlockers) && (
        < div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 mb-3" strokeWidth={1.5} size={20}>
          < IconAlertTriangle size={20} stroke={1.5} strokeWidth={1.5} />
          < span className="text-xs font-medium line-clamp-1" strokeWidth={1.5} size={20}>
            {initiative.risksBlockers || 'At Risk'}
          </span>
        </div>
      )}

      {/* Footer: Avatars + Metrics */}
      < div className="flex items-center justify-between pt-3 border-t border-border/50" strokeWidth={1.5} size={20}>
        {/* Avatar Stack */}
        < div className="flex items-center" strokeWidth={1.5} size={20}>
          < div className="flex -space-x-2" strokeWidth={1.5} size={20}>
            {initiative.leadDepartment && (
              < Avatar className="size-7 border-2 border-card" strokeWidth={1.5} size={20}>
                < AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${initiative.leadDepartment}`} strokeWidth={1.5} size={20} />
                < AvatarFallback className="text-[10px] bg-primary/10 text-primary font-medium" strokeWidth={1.5} size={20}>
                  {initiative.leadDepartment.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            {totalTasks > 0 && (
              < Avatar className="size-7 border-2 border-card" strokeWidth={1.5} size={20}>
                < AvatarFallback className="text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-medium" strokeWidth={1.5} size={20}>
                  +{Math.min(totalTasks, 3)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>

        {/* Metrics */}
        < div className="flex items-center gap-3 text-muted-foreground" strokeWidth={1.5} size={20}>
          < span className="flex items-center gap-1 text-xs" strokeWidth={1.5} size={20}>
            < IconEye size={20} stroke={1.5} strokeWidth={1.5} />
            {(initiative.id.charCodeAt(initiative.id.length - 1) % 10) + 1}
          </span>
          < span className="flex items-center gap-1 text-xs" strokeWidth={1.5} size={20}>
            < IconMessage size={20} stroke={1.5} strokeWidth={1.5} />
            {initiative.id.charCodeAt(initiative.id.length - 1) % 5}
          </span>
          < span className="flex items-center gap-1 text-xs" strokeWidth={1.5} size={20}>
            < IconLink size={20} stroke={1.5} strokeWidth={1.5} />
            {initiative.id.charCodeAt(initiative.id.length - 1) % 3}
          </span>
        </div>
      </div>
    </div>
  )
}

function TaskCard({ task, onClick }: { task: Task; onClick?: () => void }) {
  const { setOpen, setCurrentRow } = useTasks()

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentRow(task)
    setOpen('update')
  }

  // Get category from department
  const categoryKey = task.assignedDepartment || 'operations'
  const colors = categoryColors[categoryKey] || { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-700 dark:text-slate-300', label: 'General' }
  
  // Mock subtask progress
  const total = (task.id.charCodeAt(task.id.length - 1) % 5) + 3
  const completed = task.status === 'completed' || task.status === 'complete' ? total : (task.id.charCodeAt(task.id.length - 1) % total)
  const isComplete = task.status === 'completed' || task.status === 'complete'
  
  return (
    < div 
      className="group bg-card rounded-xl border border-border/60 p-4 hover:border-border transition-all cursor-pointer"
      onClick={onClick} strokeWidth={1.5} size={20}>
      {/* Drag Handle + Menu */}
      < div className="flex items-start justify-between mb-3" strokeWidth={1.5} size={20}>
        < div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} size={20}>
          < IconGripVertical size={20} stroke={1.5} className="text-muted-foreground cursor-grab" strokeWidth={1.5} />
        </div>
        < DropdownMenu strokeWidth={1.5} size={20}>
          < DropdownMenuTrigger asChild strokeWidth={1.5} size={20}>
            < Button variant="ghost" size={20} className="size-6 -mt-1 -mr-1" onClick={e = strokeWidth={1.5}> e.stopPropagation()}>
              < IconDotsVertical size={20} stroke={1.5} strokeWidth={1.5} />
            </Button>
          </DropdownMenuTrigger>
          < DropdownMenuContent align="end" strokeWidth={1.5} size={20}>
            < DropdownMenuItem onClick={handleEdit} strokeWidth={1.5} size={20}>Edit</DropdownMenuItem>
            < DropdownMenuItem strokeWidth={1.5} size={20}>Duplicate</DropdownMenuItem>
            < DropdownMenuItem className="text-destructive" strokeWidth={1.5} size={20}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Category Badge */}
      < Badge variant="secondary" className={cn("mb-3 font-medium border-0", colors.bg, colors.text)} strokeWidth={1.5} size={20}>
        {colors.label}
      </Badge>

      {/* Title */}
      < h4 className="font-semibold text-foreground mb-2 line-clamp-2 leading-snug" strokeWidth={1.5} size={20}>
        {task.title}
      </h4>

      {/* Description */}
      {task.notes && (
        < p className="text-sm text-muted-foreground line-clamp-2 mb-3" strokeWidth={1.5} size={20}>
          {task.notes}
        </p>
      )}

      {/* Subtask Progress */}
      < div className="flex items-center gap-2 mb-3" strokeWidth={1.5} size={20}>
        < IconListCheck size={20} stroke={1.5} className="text-muted-foreground" strokeWidth={1.5} />
        < span className={cn(
          "text-sm font-medium px-2 py-0.5 rounded",
          isComplete 
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" 
            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
        )} strokeWidth={1.5} size={20}>
          {isComplete ? `${total}/${total}` : `${completed}/${total}`}
        </span>
      </div>

      {/* Blocker Note */}
      {task.blockerNotes && (
        < div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 mb-3" strokeWidth={1.5} size={20}>
          < IconAlertTriangle size={20} stroke={1.5} strokeWidth={1.5} />
          < span className="text-xs font-medium line-clamp-1" strokeWidth={1.5} size={20}>{task.blockerNotes}</span>
        </div>
      )}

      {/* Footer: Avatars + Metrics */}
      < div className="flex items-center justify-between pt-3 border-t border-border/50" strokeWidth={1.5} size={20}>
        {/* Avatar Stack */}
        < div className="flex items-center" strokeWidth={1.5} size={20}>
          < div className="flex -space-x-2" strokeWidth={1.5} size={20}>
            {task.assignedTo && (
              < Avatar className="size-7 border-2 border-card" strokeWidth={1.5} size={20}>
                < AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedTo}`} strokeWidth={1.5} size={20} />
                < AvatarFallback className="text-[10px] bg-primary/10 text-primary font-medium" strokeWidth={1.5} size={20}>
                  {task.assignedTo.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            )}
            {task.priority === 'critical' || task.priority === 'high' ? (
              < Avatar className="size-7 border-2 border-card" strokeWidth={1.5} size={20}>
                < AvatarFallback className="text-[10px] bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 font-medium" strokeWidth={1.5} size={20}>
                  +2
                </AvatarFallback>
              </Avatar>
            ) : null}
          </div>
        </div>

        {/* Metrics */}
        < div className="flex items-center gap-3 text-muted-foreground" strokeWidth={1.5} size={20}>
          < span className="flex items-center gap-1 text-xs" strokeWidth={1.5} size={20}>
            < IconEye size={20} stroke={1.5} strokeWidth={1.5} />
            {(task.id.charCodeAt(task.id.length - 1) % 10) + 1}
          </span>
          < span className="flex items-center gap-1 text-xs" strokeWidth={1.5} size={20}>
            < IconMessage size={20} stroke={1.5} strokeWidth={1.5} />
            {task.id.charCodeAt(task.id.length - 1) % 5}
          </span>
          < span className="flex items-center gap-1 text-xs" strokeWidth={1.5} size={20}>
            < IconLink size={20} stroke={1.5} strokeWidth={1.5} />
            {task.id.charCodeAt(task.id.length - 1) % 3}
          </span>
        </div>
      </div>
    </div>
  )
}
