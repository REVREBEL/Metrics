"use client"

import * as React from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  IconCheck,
  IconCopy,
  IconInfoCircle,
  IconStar,
} from "@tabler/icons-react"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

export default function InputGroupButtonExample() {
  const { copyToClipboard, isCopied } = useCopyToClipboard()
  const [isFavorite, setIsFavorite] = React.useState(false)

  return (
    < div className="grid w-full max-w-sm gap-6" strokeWidth={1.5} size={20}>
      < InputGroup strokeWidth={1.5} size={20}>
        < InputGroupInput placeholder="https://x.com/shadcn" readOnly strokeWidth={1.5} size={20} />
        < InputGroupAddon align="inline-end" strokeWidth={1.5} size={20}>
          < InputGroupButton
            aria-label="Copy"
            title="Copy"
            size={20}
            onClick={() = strokeWidth={1.5}> {
              copyToClipboard("https://x.com/shadcn")
            }}
          >
            {isCopied ? < IconCheck strokeWidth={1.5} size={20} /> : < IconCopy strokeWidth={1.5} size={20} />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      < InputGroup className="[--radius:9999px]" strokeWidth={1.5} size={20}>
        < Popover strokeWidth={1.5} size={20}>
          < PopoverTrigger render={< InputGroupAddon strokeWidth={1.5} size={20} />}>
            < InputGroupButton variant="secondary" size={20} strokeWidth={1.5}>
              < IconInfoCircle strokeWidth={1.5} size={20} />
            </InputGroupButton>
          </PopoverTrigger>
          < PopoverContent
            align="start"
            className="flex flex-col gap-1 rounded-xl text-sm" strokeWidth={1.5} size={20}>
            < p className="font-medium" strokeWidth={1.5} size={20}>Your connection is not secure.</p>
            < p strokeWidth={1.5} size={20}>You should not enter any sensitive information on this site.</p>
          </PopoverContent>
        </Popover>
        < InputGroupAddon className="pl-1.5 text-muted-foreground" strokeWidth={1.5} size={20}>
          https://
        </InputGroupAddon>
        < InputGroupInput id="input-secure-19" strokeWidth={1.5} size={20} />
        < InputGroupAddon align="inline-end" strokeWidth={1.5} size={20}>
          < InputGroupButton
            onClick={() = strokeWidth={1.5} size={20}> setIsFavorite(!isFavorite)}
            size="icon-xs"
          >
            < IconStar data-favorite={isFavorite}
              className="data-[favorite=true]:fill-blue-600 data-[favorite=true]:stroke-blue-600" strokeWidth={1.5} size={20} />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      < InputGroup strokeWidth={1.5} size={20}>
        < InputGroupInput placeholder="Type to search..." strokeWidth={1.5} size={20} />
        < InputGroupAddon align="inline-end" strokeWidth={1.5} size={20}>
          < InputGroupButton variant="secondary" strokeWidth={1.5} size={20}>Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
