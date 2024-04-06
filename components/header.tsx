import * as React from 'react'
import Link from 'next/link'

import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { IconSeparator } from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarExpandable } from '@/components/sidebar-expandable'

async function UserOrLogin() {
  const user = (await auth())?.user

  return (
    <>
      {user ? (
        <SidebarExpandable />
      ) : (
        <Link href="/" rel="nofollow">
          <h3 className="font-bold">Kinmi</h3>
        </Link>
      )}
      <div className="flex items-center w-full">
        <IconSeparator className="size-6 text-muted-foreground/50 md:hidden" />
        {user ? (
          <UserMenu user={user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-base backdrop-blur-xl">
      <div className="flex items-center w-full">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
    </header>
  )
}
