import * as React from 'react'
import { auth } from '@/auth'
import ChatPageContent from '@/components/chat-page-content'

export interface ChatPageProps {
  params: {
    id: number
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth()
  const userId = session?.user?.id

  return (
    <ChatPageContent avatarId={String(params.id)} userId={String(userId)} />
  )
}
