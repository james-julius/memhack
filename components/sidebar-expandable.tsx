import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { auth } from '@/auth'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'

import { IconSidebar } from '@/components/ui/icons'
import { SidebarList } from '@/components/sidebar-list'

export async function SidebarExpandable() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" className="-ml-2 flex size-9 p-0">
          <IconSidebar className="size-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="inset-y-0 flex h-auto w-[300px] flex-col p-0"
      >
        <Sidebar className="flex">
          <SidebarList />
        </Sidebar>
      </SheetContent>
    </Sheet>
  )
}
