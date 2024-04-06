'use client'

import * as React from 'react'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import Textarea from 'react-textarea-autosize'
import ChatSendButton from '@/components/chat-send-button'

export interface ChatFormProps {
  input: string
  handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement>
  handleSubmit: React.FormEventHandler<HTMLFormElement>
}

export default function ChatForm({
  input,
  handleInputChange,
  handleSubmit
}: ChatFormProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background pr-8 sm:rounded-md sm:border sm:pr-12">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={handleInputChange}
        />
        <div className="absolute right-0 top-4 sm:right-4">
          <ChatSendButton input={input} />
        </div>
      </div>
    </form>
  )
}
