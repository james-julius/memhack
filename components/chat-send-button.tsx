'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { IconArrowElbow } from '@/components/ui/icons'
import { PropsWithChildren } from 'react'

interface ChatSendButtonProps extends PropsWithChildren {
  className?: string
  input: string
}
export default function ChatSendButton({
  className = '',
  input,
  children
}: ChatSendButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="icon" disabled={input === ''}>
      <IconArrowElbow />
      <span className="sr-only">Send message</span>
    </Button>
  )
}
