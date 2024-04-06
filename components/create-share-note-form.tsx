'use client'

import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useFormState } from 'react-dom'
import { Note, NoteShare } from '@prisma/client'
import { createNoteShare } from '@/app/(notes)/actions'

export default function CreateShareNoteForm({
  note,
  onCreate
}: {
  note: Note
  onCreate: (newNoteShare: NoteShare) => void
}) {
  // @ts-ignore | TODO: Fix typing. Seems complex
  const [result, dispatch] = useFormState(createNoteShare, undefined)

  useEffect(() => {
    if (result) {
      if ('error' in result) {
        toast.error(result.error)
      } else {
        onCreate(result)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  return (
    <form action={dispatch} className="flex flex-col">
      <Input type="hidden" name="noteId" value={note.id} />
      <Label htmlFor="email" className="mb-2">
        Email
      </Label>
      <Input
        name="email"
        placeholder="Enter their email"
        className="mb-4 p-2 border rounded-lg"
      />
      <SubmitButton>Share</SubmitButton>
    </form>
  )
}
