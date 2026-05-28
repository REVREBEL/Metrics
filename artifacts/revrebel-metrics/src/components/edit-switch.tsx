"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface EditSwitchProps {
  defaultEditing: boolean
  onCheckedChange: (checked: boolean) => void
}

export function EditSwitch({ defaultEditing, onCheckedChange }: EditSwitchProps) {
  return (
    <div className="flex items-center space-x-2 pb-4">
      <Switch
        id="edit-mode"
        defaultChecked={defaultEditing}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor="edit-mode">Edit Layout</Label>
    </div>
  )
}