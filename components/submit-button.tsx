'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { IconSpinner } from '@/components/ui/icons'
import { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

interface SubmitButtonProps extends PropsWithChildren {
  className?: string
}
export function SubmitButton({ className = '', children }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      variant="outline"
      type="submit"
      className={cn('mt-8 p-2 border-2 rounded-lg text-white', className)}
    >
      {pending ? <IconSpinner /> : children}
    </Button>
  )
}
