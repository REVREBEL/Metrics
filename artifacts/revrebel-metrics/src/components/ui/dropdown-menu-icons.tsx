"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreditCardIcon, Logout01Icon, Settings01Icon, UserIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function DropdownMenuIcons() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <HugeiconsIcon icon={UserIcon} />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HugeiconsIcon icon={CreditCardIcon} />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HugeiconsIcon icon={Settings01Icon} />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <HugeiconsIcon icon={Logout01Icon} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
