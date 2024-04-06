import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Note, NoteShare } from '@prisma/client'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { getNoteShares } from '@/app/(notes)/actions'
import useSWR from 'swr'
import { useState } from 'react'
import NoteShareDisplay from '@/components/note-share-display'
import CreateShareNoteForm from '@/components/create-share-note-form'
import { DialogClose } from '@radix-ui/react-dialog'

export default function NoteShareSettings({ note }: { note: Note }) {
  const [createShareMode, setCreateShareMode] = useState<boolean>(false)
  const {
    data: noteShares,
    mutate: mutateNoteShares,
    isLoading
  } = useSWR(`/api/notes/${note.id}/shares`, async () => {
    const res = await getNoteShares({ noteId: note.id })
    if ('error' in res) {
      throw new Error(res.error)
    }
    return res
  })

  const handleNoteShareCreate = (newNote: NoteShare) => {
    // @ts-ignore | TODO: Fix
    mutateNoteShares([...noteShares, newNote], false)
    setCreateShareMode(false)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Share Note</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View who this note is currently shared with</DialogTitle>
          <DialogDescription>
            Shared notes will be accessible, and can be brought up in
            conversation by your avatar, with the people you&apos;e chosen to
            share them with.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-80">
          {isLoading ? (
            'Loading...'
          ) : createShareMode ? (
            <CreateShareNoteForm note={note} onCreate={handleNoteShareCreate} />
          ) : (
            <NoteShareDisplay
              noteShares={noteShares}
              mutateNoteShares={mutateNoteShares}
            />
          )}
        </div>
        <DialogFooter>
          {createShareMode ? (
            <Button variant="outline" onClick={() => setCreateShareMode(false)}>
              Go Back
            </Button>
          ) : (
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          )}
          {!createShareMode && (
            <Button onClick={() => setCreateShareMode(true)}>
              Share with someone new
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
