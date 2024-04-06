import { put } from '@vercel/blob'
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.redirect('/login')
  }

  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename')

  if (filename === null) {
    return NextResponse.json(
      { error: 'filename parameter is missing' },
      { status: 400 }
    )
  }

  if (request.body === null) {
    return NextResponse.json(
      { error: 'request body is missing' },
      { status: 400 }
    )
  }

  const { url } = await put(filename, request.body, {
    access: 'public'
  })

  return NextResponse.json({ url: url })
}
