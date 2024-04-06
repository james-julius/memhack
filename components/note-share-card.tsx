import { revokeNoteShare } from '@/app/(notes)/actions'
import ConfirmButton from '@/components/confirm-button'
import { Avatar } from '@/components/ui/avatar'
import { Prisma } from '@prisma/client'
import { toast } from 'sonner'

type NoteShareWithUser = Prisma.NoteShareGetPayload<{
  include: { user: true }
}>

export default function NoteShareCard({
  noteShare,
  mutateNoteShares
}: {
  noteShare: NoteShareWithUser
  mutateNoteShares: any
}) {
  const handleDeleteNoteShare = async () => {
    try {
      toast('Removing note share...')
      // TODO: Rollback optimistic UI
      mutateNoteShares((prev: NoteShareWithUser[]) => {
        return prev.filter(ns => ns.id !== noteShare.id)
      })
      // TODO: Fix UI
      await revokeNoteShare({ noteShareId: noteShare.id })
    } catch (e: any) {
      if ('error' in e) {
        toast(e.error)
      }
    }
  }

  return (
    <div className="p-2">
      <div className="flex align-center p-2 border rounded-lg">
        <Avatar className="size-12 bg-gray-400 dark:bg-gray-800 flex justify-center align-center">
          {/* <AvatarFallback>{noteShare.user?.name[0]}</AvatarFallback> */}
        </Avatar>
        <div className="ml-3">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {noteShare?.user?.name}
          </h4>
        </div>
        <div className="ml-auto mr-2 my-auto">
          <ConfirmButton
            title="Are you sure you want to remove this share?"
            description="This user will not be able to see this note in previous conversations any more"
            variant="destructive"
            onConfirm={handleDeleteNoteShare}
          >
            Remove
          </ConfirmButton>
        </div>
      </div>
    </div>
  )
}
