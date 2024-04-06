import { auth } from '@/auth'
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { StreamingTextResponse } from 'ai'
import { HttpResponseOutputParser } from 'langchain/output_parsers'
import { RunnableConfig } from '@langchain/core/runnables'
import { RemoteRunnable } from '@langchain/core/runnables/remote'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.redirect('/login')
  }

  const body = await req.json()

  const userId = session.user.id //body.userId
  const messages = body.messages ?? []
  const currentMessageContent = messages[messages.length - 1].content

  console.log(
    `Kinmi API Host: ${process.env.KINMI_API_HOST}, Kinmi API Key: ${process.env.KINMI_API_KEY}`
  )

  try {
    const remoteChain = new RemoteRunnable({
      url: `${process.env.KINMI_API_HOST}/kinmi-speak`,
      options: {
        headers: {
          'X-API-KEY': process.env.KINMI_API_KEY
        }
      }
    })

    const config: RunnableConfig = { configurable: { session_id: userId } }

    const stream = await remoteChain.stream(
      {
        input: currentMessageContent
      },
      config
    )

    const encoder = new TextEncoder()
    let first_entry_skipped = false
    const transformStream = new TransformStream({
      transform(chunk, controller) {
        if (!first_entry_skipped) {
          first_entry_skipped = true
        } else {
          console.log(chunk)
          controller.enqueue(encoder.encode(chunk))
        }
      } 
    })

    return new StreamingTextResponse(stream.pipeThrough(transformStream))
  } catch (e: unknown) {
    console.error(e)
    return new Response(e instanceof Error ? e?.message : 'Unknown error', {
      status: 500
    }) // Return a response with the error message and a 500 status code
  }
}
