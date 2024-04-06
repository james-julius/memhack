import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { auth } from '@/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.redirect('/login')
  }
  if (!params.id) {
    return NextResponse.json({ error: 'Invalid note id' }, { status: 400 })
  }

  const note = await prisma.note.findUnique({
    where: { id: Number(params.id) }
  })

  if (!note) {
    return NextResponse.json({ error: 'Note not found' }, { status: 404 })
  }

  if (!(note?.authorId === session?.user?.id)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  return NextResponse.json(note)
}
