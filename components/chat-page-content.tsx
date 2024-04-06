'use client'
import { useChat } from 'ai/react'
import { nanoid } from 'nanoid'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import ChatForm from '@/components/chat-form'
import { ChatMessage } from '@/components/chat-message'
import { useEffect } from 'react'

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

  useEffect(() => {
    console.log(messages)
  }, [messages])

  return (
    <>
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
    </>
  )
}
