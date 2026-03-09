import Link from 'next/link'
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
    isActive: boolean
    disabled?: boolean
    className?: string
  }[]
}

export function TopNav({ className, links, ...props }: TopNavProps) {
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
            {links.map(({ title, href, isActive, disabled, className }) => (
              <DropdownMenuItem key={`${title}-${href}`} asChild>
                <Link href={href}
                  className={cn(!isActive ? 'text-muted-foreground' : '', className)}
                  disabled={disabled}
                  data-state={isActive ? 'on' : 'off'}
                >
                  {title}
                </Link>
              </DropdownMenuItem>
            ))}
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
        {links.map(({ title, href, isActive, disabled, className }) => (
          <Link key={`${title}-${href}`}
            href={href}
            disabled={disabled}
            data-state={isActive ? 'on' : 'off'}
            className={cn(`text-sm font-medium transition-colors hover:text-primary ${isActive ? '' : 'text-muted-foreground'}`, className)}
          >
            {title}
          </Link>
        ))}
      </nav>
    </>
  )
}
