'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { type Chat } from '@/lib/types'
import { ConnectionStatus } from '@prisma/client'

// export async function removeAvatar({ id }: { id: number }) {
//   const session = await auth()

//   if (!session) {
//     return {
//       error: 'Unauthorized'
//     }
//   }

//   const avatar = await prisma.avatar.findUnique({
//     where: {
//       id
//     }
//   })

//   if (!avatar || avatar.forId !== session?.user?.id) {
//     return {
//       error: 'Unauthorized'
//     }
//   }

//   await prisma.avatar.delete({
//     where: {
//       id: id
//     }
//   })

//   return true
// }

export async function clearChats() {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  const chats: string[] = await kv.zrange(`user:chat:${session.user.id}`, 0, -1)
  if (!chats.length) {
    return redirect('/')
  }
  const pipeline = kv.pipeline()

  for (const chat of chats) {
    pipeline.del(chat)
    pipeline.zrem(`user:chat:${session.user.id}`, chat)
  }

  await pipeline.exec()

  revalidatePath('/')
  return redirect('/')
}

export async function saveChat(chat: Chat) {
  const session = await auth()

  if (session && session.user) {
    const pipeline = kv.pipeline()
    pipeline.hmset(`chat:${chat.id}`, chat)
    pipeline.zadd(`user:chat:${chat.userId}`, {
      score: Date.now(),
      member: `chat:${chat.id}`
    })
    await pipeline.exec()
  } else {
    return
  }
}

export async function refreshHistory(path: string) {
  redirect(path)
}
