'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  ChangeEvent,
  Fragment,
  MouseEventHandler,
  useEffect,
  useRef,
  useState
} from 'react'
import { toast } from 'sonner'
import {
  AvatarWithInstructions,
  getUserAvatar,
  updateAvatar
} from '@/app/avatars/actions'
import { redirect, useRouter } from 'next/navigation'
import { Avatar } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Cross1Icon } from '@radix-ui/react-icons'
import useSWR from 'swr'

export interface ChangeAvatarPayload extends Pick<Avatar, 'name'> {
  instructions: string[]
}

export default function UpdateAvatarForm({
  initialAvatar
}: {
  initialAvatar: AvatarWithInstructions
}) {
  const router = useRouter()
  const { data: userAvatar, mutate: updateUserAvatar } = useSWR(
    `/api/avatars/user`,
    async () => {
      const res = await getUserAvatar()
      if ('error' in res) {
        throw new Error(res.error)
      }
      return res
    },
    {
      fallbackData: initialAvatar
    }
  )

  const [avatarChanges, setAvatarChanges] = useState<ChangeAvatarPayload>({
    name: userAvatar.name,
    instructions:
      userAvatar.instructions.map(({ instructions }) => instructions) || []
  })

  const [serverResponse, setServerResponse] = useState<
    { error: string } | { message: string } | null
  >(null)
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault()
    const res = await updateAvatar(avatarChanges)
    setServerResponse(res)
  }

  useEffect(() => {
    console.log(serverResponse)
    if (serverResponse) {
      if ('error' in serverResponse) {
        toast.error(serverResponse.error)
      } else {
        toast.success(serverResponse.message)
        updateUserAvatar(userAvatar)
        router.push('/avatars')
        router.refresh()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverResponse, updateUserAvatar, router])

  const instructionContainer = useRef<HTMLDivElement>(null)

  const handleAddInstructionInput: React.MouseEventHandler<
    HTMLButtonElement
  > = e => {
    e.preventDefault()
    setAvatarChanges({
      ...avatarChanges,
      instructions: [...avatarChanges.instructions, '']
    })
  }

  const handleRemoveInstruction = (instructionIdx: number) => {
    const newInstructions = avatarChanges.instructions
    newInstructions.splice(instructionIdx, 1)
    setAvatarChanges({
      ...avatarChanges,
      instructions: newInstructions
    })
  }
  return (
    <form className="flex flex-col">
      <Label htmlFor="name" className="mb-2">
        Avatar Name
      </Label>
      <Input
        name="name"
        value={avatarChanges.name}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAvatarChanges({ ...avatarChanges, name: e.target.value })
        }
        placeholder="Avatar Name"
        className="mb-4 p-2 border rounded-lg"
      />
      <Label htmlFor="avatarImage" className="mb-2">
        Avatar Image
      </Label>
      <input
        type="file"
        name="avatarImage"
        className="mb-4 p-2 border rounded-lg"
      />
      <div
        ref={instructionContainer}
        className="flex flex-col gap-2 max-h-72 overflow-auto"
      >
        {avatarChanges.instructions.map((instruction, idx) => (
          <Fragment key={idx}>
            <div className="flex justify-between">
              <Label htmlFor="avatarInstruct" className="mb-2">
                {avatarChanges.instructions.length <= 1
                  ? 'Instruction'
                  : `Instruction ${idx + 1}`}
              </Label>
              {avatarChanges.instructions.length > 1 && (
                <Button
                  variant="icon"
                  onClick={e => {
                    e.preventDefault()
                    handleRemoveInstruction(idx)
                  }}
                >
                  <Cross1Icon />
                </Button>
              )}
            </div>
            <Textarea
              className="resize-none my-2 p-2 border rounded-lg"
              name={
                avatarChanges.instructions.length <= 1
                  ? 'Custom instruction'
                  : `Custom instruction ${idx + 1}`
              }
              value={instruction}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                const newInstructions = { ...avatarChanges }
                avatarChanges.instructions[idx] = e.target.value
                setAvatarChanges(newInstructions)
              }}
              placeholder="Instructions"
              rows={8}
            />
          </Fragment>
        ))}
      </div>

      <Button
        variant="outline"
        className="mr-auto mt-1"
        onClick={handleAddInstructionInput}
      >
        Add another instruction
      </Button>
      <Button className="mt-8" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  )
}
