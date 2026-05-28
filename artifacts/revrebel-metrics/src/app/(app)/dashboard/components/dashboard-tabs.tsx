'use client'

import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export type DashboardTabItem = {
  className?: string
  value: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

export type DashboardTabsPanelProps = {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  title: string
  value: string
}

type DashboardTabsProps = {
  children?: React.ReactNode
  className?: string
  contentClassName?: string
  defaultValue?: string
  globalSlot?: React.ReactNode
  listClassName?: string
  tabs?: DashboardTabItem[]
  title?: string
}

type DashboardTabsComponent = ((props: DashboardTabsProps) => React.ReactNode) & {
  Panel: typeof DashboardTabsPanel
}

function DashboardTabsPanel(_props: DashboardTabsPanelProps) {
  return null
}

DashboardTabsPanel.displayName = 'DashboardTabsPanel'

function isPanelElement(
  child: React.ReactNode
): child is React.ReactElement<DashboardTabsPanelProps> {
  return React.isValidElement(child) && child.type === DashboardTabsPanel
}

const DashboardTabsRoot = ({
  children,
  className,
  contentClassName,
  defaultValue,
  globalSlot,
  listClassName,
  tabs,
  title,
}: DashboardTabsProps) => {
  const childTabs = React.Children.toArray(children)
    .filter(isPanelElement)
    .map((child) => ({
      content: child.props.children,
      disabled: child.props.disabled,
      label: child.props.title,
      value: child.props.value,
      className: child.props.className,
    }))

  const items = tabs ?? childTabs
  const fallbackValue = items[0]?.value
  const initialValue = defaultValue ?? fallbackValue

  if (!initialValue || items.length === 0) {
    return null
  }

  return (
    <div className={cn('space-y-4', className)}>
      {title ? (
        <div className='mb-2 flex items-center justify-between pl-2'>
          <h1 className='font-display text-3xl font-bold uppercase tracking-tight text-dark-blue'>
            {title}
          </h1>
        </div>
      ) : null}

      <Tabs
        orientation='vertical'
        defaultValue={initialValue}
        className='gap-4 shadow-none'
      >
        <div className='overflow-x-auto'>
          <TabsList
            className={cn(
              'flex h-fit flex-row items-center rounded-sm bg-muted p-1 shadow-none',
              listClassName
            )}
          >
            {items.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                disabled={item.disabled}
                className='h-8 min-w-28 justify-center rounded-sm px-4 font-display text-sm font-semibold uppercase tracking-tight text-muted-foreground shadow-none transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-muted-foreground'
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {globalSlot ? <div className='pt-2'>{globalSlot}</div> : null}

        {items.map((item) => (
          <TabsContent
            key={item.value}
            value={item.value}
            className={cn('space-y-4', contentClassName, item.className)}
          >
            {item.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export const DashboardTabs = Object.assign(DashboardTabsRoot, {
  Panel: DashboardTabsPanel,
}) as DashboardTabsComponent
