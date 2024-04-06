'use client'
import { useChat } from 'ai/react'
import { nanoid } from 'nanoid'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import ChatForm from '@/components/chat-form'
import { ChatMessage } from '@/components/chat-message'

interface ChatPageContentProps {
  avatarId: string
  userId: string
}

export default function ChatPageContent({
  avatarId,
  userId
}: ChatPageContentProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    body: { avatarId, userId }
  })

  return (
    <div className="flex flex-row flex-nowrap relative size-full grow">
      <div className="relative w-2/3 flex grow h-[calc(100vh-4rem)] bg-green-50">
        <div className="bg-red-100 size-full mx-auto inset-x-2 bottom-0 pb-6 duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
          {messages.length ? (
            <>
              <div className="relative max-w-2xl px-4">
                {messages.map((message, index) => (
                  <ChatMessage key={nanoid()} message={message} />
                ))}
              </div>
              <ChatScrollAnchor trackVisibility={true} />
            </>
          ) : (
            <></>
          )}
          <ChatForm
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className="flex grow w-1/3 bg-yellow-400 h-full">Memory</div>
    </div>
  )
}
