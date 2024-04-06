import * as React from 'react'
import { auth } from '@/auth'
import ChatPageContent from '@/components/chat-page-content'
import MemoryDisplay from '@/components/memory-display'

export interface ChatPageProps {
  params: {
    id: number
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth()
  const userId = session?.user?.id

  return (
    <div className="flex justify-end items-start p-4 bg-gradient-to-b from-gradient-base pb-6 from-0% to-gradient-accent to-50% h-[calc(100vh-4rem)]">
      <div className="flex h-full max-h-full justify-end grow flex-col w-2/3 mx-auto inset-x-0 bottom-0 px-8 xl:px-20 pb-6 duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80">
        <ChatPageContent avatarId={String(params.id)} userId={String(userId)} />
      </div>
      <MemoryDisplay />
    </div>
  )
}
