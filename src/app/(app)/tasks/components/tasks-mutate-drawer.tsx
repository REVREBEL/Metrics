"use client"

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { SelectDropdown } from '@/components/select-dropdown'
import { type Task } from '../data/schema'
import { useTasks } from './tasks-provider'

type TaskMutateDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Task
}

const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  status: z.string().min(1, 'Please select a status.'),
  label: z.string().min(1, 'Please select a label.'),
  priority: z.string().min(1, 'Please choose a priority.'),
  assigneeType: z.enum(['app_user', 'external_assignee', 'department_placeholder', 'entity_placeholder', '']).optional(),
  assigneeExternalId: z.string().optional(),
  assignedTo: z.string().optional(),
})
type TaskForm = z.infer<typeof formSchema>

export function TasksMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: TaskMutateDrawerProps) {
  const isUpdate = !!currentRow
  const { externalAssignees } = useTasks()

  const form = useForm<TaskForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow
      ? {
          title: currentRow.title,
          status: currentRow.status,
          label: currentRow.label ?? '',
          priority: currentRow.priority,
          assigneeType: currentRow.assigneeType ?? '',
          assigneeExternalId: '',
          assignedTo: currentRow.assignedTo ?? '',
        }
      : {
          title: '',
          status: '',
          label: '',
          priority: '',
          assigneeType: '',
          assigneeExternalId: '',
          assignedTo: '',
        },
  })

  const assigneeType = form.watch('assigneeType')

  const onSubmit = (data: TaskForm) => {
    onOpenChange(false)
    form.reset()
    showSubmittedData(data)
  }

  const externalAssigneeItems = externalAssignees.map((a) => ({
    label: a.name,
    value: a.id,
  }))

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col w-full sm:max-w-lg'>
        <SheetHeader className='text-start'>
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Task</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the task by providing necessary info.'
              : 'Add a new task by providing necessary info.'}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='tasks-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-6 overflow-y-auto px-4'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a title' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select status'
                    items={[
                      { label: 'Not Started', value: 'not_started' },
                      { label: 'In Progress', value: 'in_progress' },
                      { label: 'Waiting', value: 'waiting' },
                      { label: 'Blocked', value: 'blocked' },
                      { label: 'Complete', value: 'complete' },
                      { label: 'Canceled', value: 'canceled' },
                    ]}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='documentation' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          Documentation
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='feature' />
                        </FormControl>
                        <FormLabel className='font-normal'>Feature</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='bug' />
                        </FormControl>
                        <FormLabel className='font-normal'>Bug</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='high' />
                        </FormControl>
                        <FormLabel className='font-normal'>High</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='medium' />
                        </FormControl>
                        <FormLabel className='font-normal'>Medium</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='low' />
                        </FormControl>
                        <FormLabel className='font-normal'>Low</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Assignee Section */}
            <div className='space-y-3'>
              <FormField
                control={form.control}
                name='assigneeType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee Type</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value ?? ''}
                      onValueChange={(val) => {
                        field.onChange(val)
                        form.setValue('assigneeExternalId', '')
                        form.setValue('assignedTo', '')
                      }}
                      placeholder='Select assignee type'
                      items={[
                        { label: 'App User', value: 'app_user' },
                        { label: 'External Vendor / Agency', value: 'external_assignee' },
                        { label: 'Department', value: 'department_placeholder' },
                        { label: 'Other Entity', value: 'entity_placeholder' },
                      ]}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {assigneeType === 'external_assignee' && (
                <FormField
                  control={form.control}
                  name='assigneeExternalId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vendor / Agency</FormLabel>
                      {externalAssigneeItems.length > 0 ? (
                        <SelectDropdown
                          defaultValue={field.value ?? ''}
                          onValueChange={field.onChange}
                          placeholder='Select a vendor or agency'
                          items={externalAssigneeItems}
                        />
                      ) : (
                        <p className='text-xs text-muted-foreground'>
                          No vendors or agencies added yet. Use the Manage Vendors button to add some.
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {(assigneeType === 'app_user' ||
                assigneeType === 'department_placeholder' ||
                assigneeType === 'entity_placeholder') && (
                <FormField
                  control={form.control}
                  name='assignedTo'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {assigneeType === 'app_user'
                          ? 'Assignee Name'
                          : assigneeType === 'department_placeholder'
                          ? 'Department Name'
                          : 'Entity Name'}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={
                            assigneeType === 'app_user'
                              ? 'e.g. Jane Smith'
                              : assigneeType === 'department_placeholder'
                              ? 'e.g. Revenue Management'
                              : 'e.g. Brand Corporate'
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          <Button form='tasks-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
