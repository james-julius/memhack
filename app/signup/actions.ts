'use server'

import { signIn } from '@/auth'
import { getStringFromBuffer } from '@/lib/utils'
import { z } from 'zod'
import { AuthResult } from '@/lib/types'
import prisma from '@/lib/prisma'

export async function signup(
  _prevState: AuthResult | undefined,
  formData: FormData
) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const parsedCredentials = z
    .object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6)
    })
    .safeParse({
      name,
      email,
      password
    })
  if (parsedCredentials.success) {
    const salt = crypto.randomUUID()

    const encoder = new TextEncoder()
    const saltedPassword = encoder.encode(password + salt)
    const hashedPasswordBuffer = await crypto.subtle.digest(
      'SHA-256',
      saltedPassword
    )
    const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            {
              email
            },
            {
              name
            }
          ]
        }
      })
      if (existingUser) {
        return { type: 'error', message: 'User already exists! Please log in.' }
      }
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          salt
        }
      })
      await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      return { type: 'success', message: 'Account created!' }
    } catch (error) {
      const { message } = error as Error

      if (
        message.startsWith('duplicate key value violates unique constraint')
      ) {
        return { type: 'error', message: 'User already exists! Please log in.' }
      } else {
        console.error(error)
        return {
          type: 'error',
          message: 'Something went wrong! Please try again.'
        }
      }
    }
  } else {
    return {
      type: 'error',
      message: 'Invalid entries, please try again!'
    }
  }
}
