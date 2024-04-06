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
    <>
      {/* <div className="flex justify-end items-start h-screen p-4 bg-gradient-to-b from-gradient-base pb-6 from-0% to-gradient-accent to-50% ">
      </div> */}
      <div className="mx-auto fixed inset-x-0 bottom-0 w-full max-w-2xl pb-6 duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
        <ChatPageContent avatarId={String(params.id)} userId={String(userId)} />
      </div>
    </>
  )
}
