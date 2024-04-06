'use client'

import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { createAvatar } from '@/app/avatars/create/actions'
import { useFormState } from 'react-dom'
import { redirect } from 'next/navigation'

export default function CreateAvatarForm() {
  // @ts-ignore | TODO: Fix typing. Seems complex
  const [result, dispatch] = useFormState(createAvatar, undefined)

  useEffect(() => {
    if (result) {
      if ('error' in result) {
        toast.error(result.error)
      } else {
        toast.success(result.message)
        redirect('/avatars')
      }
    }
  }, [result])

  return (
    <form action={dispatch} className="flex flex-col">
      <Label htmlFor="avatarName" className="mb-2">
        Avatar Name
      </Label>
      <Input
        name="avatarName"
        placeholder="Avatar Name"
        className="mb-4 p-2 border rounded-lg"
      />
      {/* <Label htmlFor="avatarImage" className="mb-2">
            Avatar Image
          </Label>
          <input
            type="file"
            name="avatarImage"
            className="mb-4 p-2 border rounded-lg"
          /> */}
      <Label htmlFor="avatarInstruct" className="mb-2">
        Instructions
      </Label>
      <Textarea
        name="avatarInstruct"
        placeholder="Instructions"
        className="resize-none p-2 border rounded-lg"
        rows={8}
      />
      <SubmitButton>Create</SubmitButton>
    </form>
  )
}
