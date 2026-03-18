'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type TopNavProps = React.HTMLAttributes<HTMLElement> & {
  links: {
    title: string
    href: string
    isActive?: boolean
    disabled?: boolean
    className?: string
  }[]
}

export function TopNav({ className, links, ...props }: TopNavProps) {
  const pathname = usePathname()

  const isLinkActive = (href: string) => {
    if (!pathname) return false

    const currentPath = pathname.replace(/\/$/, '') || '/'
    const targetPath = href.replace(/\/$/, '') || '/'

    if (targetPath === '/dashboard') {
      return currentPath === targetPath
    }

    return (
      currentPath === targetPath ||
      currentPath.startsWith(`${targetPath}/`)
    )
  }

  return (
    <>
      <div className='lg:hidden'>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size='icon' variant='outline' className='md:size-7'>
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='bottom' align='start'>
            {links.map(({ title, href, disabled, className }) => {
              const isActive = isLinkActive(href)

              return (
                <DropdownMenuItem key={`${title}-${href}`} asChild>
                  <Link
                    href={href}
                    className={cn(
                      'border-b-4 border-transparent text-sm font-medium transition-colors hover:text-foreground',
                      !isActive && 'text-muted-foreground',
                      isActive && 'border-current text-foreground',
                      disabled && 'pointer-events-none opacity-50',
                      className
                    )}
                    aria-disabled={disabled}
                    tabIndex={disabled ? -1 : undefined}
                    data-state={isActive ? 'on' : 'off'}
                  >
                    {title}
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav
        className={cn(
          'hidden items-center space-x-4 lg:flex lg:space-x-4 xl:space-x-6',
          className
        )}
        {...props}
      >
        {links.map(({ title, href, disabled, className }) => {
          const isActive = isLinkActive(href)

          return (
            <Link
              key={`${title}-${href}`}
              href={href}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : undefined}
              data-state={isActive ? 'on' : 'off'}
              className={cn(
                'border-b-4 border-transparent text-sm font-medium transition-colors hover:text-foreground',
                !isActive && 'text-muted-foreground',
                isActive && 'border-current text-foreground',
                disabled && 'pointer-events-none opacity-50',
                className
              )}
            >
              {title}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
