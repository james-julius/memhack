import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar } from '@prisma/client'

interface AvatarCardProps {
  avatar: Avatar
}
export default function AvatarCard({ avatar }: AvatarCardProps) {
  return (
    <Link href={`/avatars/${avatar.id}/chat`} key={avatar.id}>
      <div className="flex flex-col w-64 rounded-lg border cursor-pointer bg-card/50 p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 mb-4">
        <Image
          className="mb-2"
          width={250}
          height={400}
          src="/avatar-placeholder.webp"
          alt={avatar.name}
        />
        <div className="flex justify-center mt-2">
          <h4 className="text-xl px-2 mb-2 font-bold">{avatar.name}</h4>
        </div>
        {/* <div className="p-2 grow">
                <p className="line-clamp-3">{avatar.personality}</p>
            </div> */}
        <div className="mt-auto p-2 flex justify-between">
          <Button className="w-full">Start Chat</Button>
        </div>
      </div>
    </Link>
  )
}
