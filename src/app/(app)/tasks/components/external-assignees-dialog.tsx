"use client"

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Building2, Mail, Pencil, Plus, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SelectDropdown } from '@/components/select-dropdown'
import { Badge } from '@/components/ui/badge'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type ExternalAssignee } from '../data/schema'
import { useTasks } from './tasks-provider'

const entityTypeOptions = [
  { label: 'Third-Party Agency', value: 'third_party_agency' },
  { label: 'Vendor', value: 'vendor' },
  { label: 'Ownership', value: 'ownership' },
  { label: 'Brand / Corporate', value: 'brand_corporate' },
  { label: 'Management Company', value: 'management_company' },
  { label: 'Hotel Team', value: 'hotel_team' },
  { label: 'Internal Department', value: 'internal_department' },
  { label: 'Other', value: 'other' },
]

const entityTypeLabels: Record<string, string> = {
  third_party_agency: 'Third-Party Agency',
  vendor: 'Vendor',
  ownership: 'Ownership',
  brand_corporate: 'Brand / Corporate',
  management_company: 'Management Company',
  hotel_team: 'Hotel Team',
  internal_department: 'Internal Department',
  other: 'Other',
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  entityType: z.string().optional(),
  contactEmail: z.string().email('Enter a valid email address.').optional().or(z.literal('')),
})

type AssigneeForm = z.infer<typeof formSchema>

type ExternalAssigneesDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExternalAssigneesDialog({ open, onOpenChange }: ExternalAssigneesDialogProps) {
  const { hotelId, externalAssignees, isLoadingAssignees, addExternalAssignee, updateExternalAssignee, deleteExternalAssignee } = useTasks()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<AssigneeForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', entityType: '', contactEmail: '' },
  })

  const startCreate = () => {
    setEditingId(null)
    setSubmitError(null)
    form.reset({ name: '', entityType: '', contactEmail: '' })
    setShowForm(true)
  }

  const startEdit = (assignee: ExternalAssignee) => {
    setEditingId(assignee.id)
    setSubmitError(null)
    form.reset({
      name: assignee.name,
      entityType: assignee.entityType ?? '',
      contactEmail: assignee.contactEmail ?? '',
    })
    setShowForm(true)
  }

  const cancelForm = () => {
    setShowForm(false)
    setEditingId(null)
    setSubmitError(null)
    form.reset()
  }

  const onSubmit = async (data: AssigneeForm) => {
    setIsSaving(true)
    setSubmitError(null)

    let result: { ok: boolean; message: string }

    if (editingId) {
      result = await updateExternalAssignee(editingId, {
        name: data.name,
        // Pass undefined (not '') so provider normalizes correctly
        entityType: (data.entityType || undefined) as ExternalAssignee['entityType'] | undefined,
        contactEmail: data.contactEmail || undefined,
      })
    } else {
      result = await addExternalAssignee({
        // hotelId comes from the provider's context — not hardcoded
        hotelId: hotelId ?? '',
        name: data.name,
        entityType: (data.entityType || undefined) as ExternalAssignee['entityType'] | undefined,
        contactEmail: data.contactEmail || undefined,
      })
    }

    setIsSaving(false)

    if (result.ok) {
      setShowForm(false)
      setEditingId(null)
      form.reset()
    } else {
      setSubmitError(result.message)
    }
  }

  const confirmDelete = async () => {
    if (deletingId) {
      await deleteExternalAssignee(deletingId)
      setDeletingId(null)
    }
  }

  const deletingAssignee = externalAssignees.find((a) => a.id === deletingId)

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Manage Vendors &amp; Agencies</DialogTitle>
            <DialogDescription>
              Add and manage external vendors, agencies, and partners who can be assigned Growth Plan tasks.
              {hotelId && (
                <span className="block mt-1 text-xs text-muted-foreground">
                  Scoped to the active property.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {/* Loading state */}
            {isLoadingAssignees && (
              <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
                Loading vendors...
              </div>
            )}

            {/* Empty state */}
            {!isLoadingAssignees && externalAssignees.length === 0 && !showForm && (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <Building2 className="mb-2 size-8 opacity-40" />
                <p className="text-sm">No external vendors or agencies yet.</p>
                <p className="text-xs">Add one to start assigning tasks to external parties.</p>
              </div>
            )}

            {/* Assignee List */}
            {!isLoadingAssignees && externalAssignees.length > 0 && (
              <ul className="divide-y divide-border rounded-md border">
                {externalAssignees.map((assignee) => (
                  <li key={assignee.id} className="flex items-center gap-3 px-3 py-2.5">
                    <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                      <Building2 className="size-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{assignee.name}</p>
                      <div className="mt-0.5 flex items-center gap-2">
                        {assignee.entityType && (
                          <Badge variant="secondary" className="text-xs">
                            {entityTypeLabels[assignee.entityType] ?? assignee.entityType}
                          </Badge>
                        )}
                        {assignee.contactEmail && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Mail className="size-3" />
                            {assignee.contactEmail}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={() => startEdit(assignee)}
                      >
                        <Pencil className="size-3.5" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-destructive hover:text-destructive"
                        onClick={() => setDeletingId(assignee.id)}
                      >
                        <Trash2 className="size-3.5" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Inline Form */}
            {showForm && (
              <div className="rounded-md border bg-muted/30 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium">{editingId ? 'Edit Vendor / Agency' : 'Add Vendor / Agency'}</p>
                  <Button variant="ghost" size="icon" className="size-6" onClick={cancelForm} disabled={isSaving}>
                    <X className="size-4" />
                  </Button>
                </div>
                {submitError && (
                  <p className="mb-3 rounded-sm bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    {submitError}
                  </p>
                )}
                <Form {...form}>
                  <form id="external-assignee-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. Digital Agency Co." disabled={isSaving} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="entityType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type (optional)</FormLabel>
                          <SelectDropdown
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            placeholder="Select entity type"
                            items={entityTypeOptions}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email (optional)</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="contact@example.com" disabled={isSaving} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end gap-2 pt-1">
                      <Button type="button" variant="outline" size="sm" onClick={cancelForm} disabled={isSaving}>
                        Cancel
                      </Button>
                      <Button type="submit" size="sm" disabled={isSaving}>
                        {isSaving ? 'Saving...' : editingId ? 'Save Changes' : 'Add'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}

            {/* Add Button */}
            {!showForm && !isLoadingAssignees && (
              <Button variant="outline" className="w-full gap-1.5" onClick={startCreate}>
                <Plus className="size-4" />
                Add Vendor / Agency
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        destructive
        open={!!deletingId}
        onOpenChange={(v) => { if (!v) setDeletingId(null) }}
        handleConfirm={confirmDelete}
        className="max-w-md"
        title={`Remove ${deletingAssignee?.name ?? 'this vendor'}?`}
        desc={
          <>
            This will remove <strong>{deletingAssignee?.name}</strong> from the list of
            assignable vendors and agencies. Existing task assignments will not be affected.
          </>
        }
        confirmText="Remove"
      />
    </>
  )
}
