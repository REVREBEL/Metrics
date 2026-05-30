import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  IconBrandJavascript,
  IconCopy,
  IconCornerDownLeft,
  IconRefresh,
} from "@tabler/icons-react"

export default function InputGroupTextareaExample() {
  return (
    < div className="grid w-full max-w-md gap-4" strokeWidth={1.5} size={20}>
      < InputGroup strokeWidth={1.5} size={20}>
        < InputGroupTextarea
          id="textarea-code-32"
          placeholder="console.log('Hello, world!');"
          className="min-h-[200px]" strokeWidth={1.5} size={20} />
        < InputGroupAddon align="block-end" className="border-t" strokeWidth={1.5} size={20}>
          < InputGroupText strokeWidth={1.5} size={20}>Line 1, Column 1</InputGroupText>
          < InputGroupButton size={20} className="ml-auto" variant="default" strokeWidth={1.5}>
            Run < IconCornerDownLeft strokeWidth={1.5} size={20} />
          </InputGroupButton>
        </InputGroupAddon>
        < InputGroupAddon align="block-start" className="border-b" strokeWidth={1.5} size={20}>
          < InputGroupText className="font-mono font-medium" strokeWidth={1.5} size={20}>
            < IconBrandJavascript strokeWidth={1.5} size={20} />
            script.js
          </InputGroupText>
          < InputGroupButton className="ml-auto" size={20} strokeWidth={1.5}>
            < IconRefresh strokeWidth={1.5} size={20} />
          </InputGroupButton>
          < InputGroupButton variant="ghost" size={20} strokeWidth={1.5}>
            < IconCopy strokeWidth={1.5} size={20} />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
