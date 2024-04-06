import { Button } from '@/components/ui/button'
import { signOut } from '@/auth'

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut({ redirectTo: '/login' })
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  )
}
