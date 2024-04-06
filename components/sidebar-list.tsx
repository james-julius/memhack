import Logo from '@/components/logo'
import NavMenu from '@/components/nav-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import SignOutButton from '@/components/sign-out-button'

export async function SidebarList() {
  return (
    <div className="flex flex-1 h-full flex-col overflow-hidden justify-between">
      <div className="w-full border-b p-2 ">
        <Logo />
      </div>
      <div className="flex-1 overflow-auto p-2 pt-4">
        <NavMenu className="flex-col px-4" />
      </div>
      <div className="flex items-center justify-between p-4">
        <SignOutButton />
        <ThemeToggle />
      </div>
    </div>
  )
}
