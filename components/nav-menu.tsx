'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const menu: any[] = [
  // { label: 'Journal', href: '/' },
  // { label: 'Avatars', href: '/avatars' },
  // { label: 'Connections', href: '/connections' }
]
export default function NavMenu({ className = '' }: { className?: string }) {
  return (
    <div className={cn(className, 'ml-auto justify-between gap-5 grow-1')}>
      {menu.map(({ label, href }) => (
        <Link key={href} href={href}>
          <h4 className="text-sm font-medium">{label}</h4>
        </Link>
      ))}
    </div>
  )
}
