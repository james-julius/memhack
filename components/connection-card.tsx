'use client'

import { deleteConnection } from '@/app/connections/actions'
import ConfirmButton from '@/components/confirm-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Connection, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'

interface ConnectionCardProps extends PropsWithChildren {
  connection: Connection
  connectedUser: User
}
export default function ConnectionCard({
  connection,
  connectedUser
}: ConnectionCardProps) {
  const router = useRouter()

  const handleDeleteConnection = (connectionId: number) => {
    deleteConnection({ connectionId })
    router.refresh()
  }

  return (
    <div className="border rounded-md  overflow-hidden bg-gray-200 dark:bg-gray-900 w-64">
      <div className="flex justify-between bg-gray-800 font-bold text-white p-2 border-b">
        Connection
        <Badge variant="secondary" className="bg-green-500 text-white">
          {connection.status}
        </Badge>
      </div>
      <div className="p-4 dark:bg-gray-900">
        {connectedUser.name}
        <br />
        {connectedUser.email}
      </div>
      <div className="flex gap-2 p-2 bg-gray-200 dark:bg-gray-800">
        <ConfirmButton
          title="Are you sure you want to delete this connection?"
          description="You'll have to re-invite to re-connect"
          variant="destructive"
          onConfirm={() => handleDeleteConnection(connection.id)}
        >
          Remove
        </ConfirmButton>
      </div>
    </div>
  )
}
