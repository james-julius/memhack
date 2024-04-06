import NoteShareCard from '@/components/note-share-card'
import { NoteShare } from '@prisma/client'

export default function NoteShareDisplay({
  noteShares,
  mutateNoteShares
}: {
  noteShares: NoteShare[] | undefined
  // TODO: Fix typing
  mutateNoteShares: any
}) {
  if (!noteShares) {
    return <div>Loading...</div>
  }
  return noteShares?.length ? (
    <div className="h-full overflow-auto">
      {noteShares &&
        noteShares.map((share: NoteShare) => (
          // @ts-ignore: TODO Fix typing
          <NoteShareCard
            key={share.id}
            // @ts-ignore
            noteShare={share}
            mutateNoteShares={mutateNoteShares}
          />
        ))}
    </div>
  ) : (
    <div className="flex justify-center align-center p-4">
      <p>No shares found</p>
    </div>
  )
}
