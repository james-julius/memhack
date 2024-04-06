'use client'

import { SubmitButton } from '@/components/submit-button'
import { createConnection } from '@/app/connections/create/actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

export default function CreateConnectionForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts

    try {
      if (!formData.get('email')) {
        throw new Error('Please enter an email address')
      }
      const email = formData.get('email') as string // Convert the value to a string
      if (!emailRegex.test(email)) {
        // Use the converted value
        throw new Error('Please enter a valid email address')
      }
      const response = await createConnection({
        email: email // Use the converted value
      })
      if ('error' in response) {
        throw new Error(response.error)
      }

      router.push('/connections')
      router.refresh()
    } catch (error: any) {
      // Capture the error message to display to the user
      setError(error?.message || 'Unknown error')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form action={onSubmit} className="flex flex-col">
      <Label htmlFor="user" className="mb-2">
        Enter their email
      </Label>
      <Input
        name="email"
        type="email"
        required
        placeholder="friend@mailprovider.com"
        className="border rounded-lg"
      />
      {error && <p className="text-red-500 mt-2 pl-1 text-xs">{error}</p>}
      <SubmitButton className="bg-gray-600">Send invitation</SubmitButton>
    </form>
  )
}
