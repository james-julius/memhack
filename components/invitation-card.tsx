'use client'
import {
  deleteConnection,
  updateConnectionStatus
} from '@/app/connections/actions'
import ConfirmButton from '@/components/confirm-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Connection, ConnectionStatus, User } from '@prisma/client'
import { useRouter } from 'next/navigation'

type InvitationType = 'received' | 'sent'

export default function InvitationCard({
  connection,
  userToShow,
  type
}: {
  connection: Connection
  userToShow: User
  type: InvitationType
}) {
  const router = useRouter()

  const handleDeleteConnection = (connectionId: number) => {
    if (window.confirm('Are you sure you want to cancel this invitation?')) {
      deleteConnection({ connectionId })
      router.refresh()
    }
  }

  const handleUpdateConnectionStatus = (
    connectionId: number,
    status: ConnectionStatus
  ) => {
    if (window.confirm('Are you sure you want to accept this invitation?')) {
      updateConnectionStatus({ connectionId, status })
      router.refresh()
    }
  }

  return (
    <div
      key={connection.id}
      className="border rounded-md  overflow-hidden bg-card  w-64"
    >
      <div className="flex justify-between p-2 border-b">
        Invitation
        <Badge variant="secondary">{connection.status}</Badge>
      </div>

      <div className="p-4 dark:bg-gray-900">
        {userToShow.name}
        <br />
        {userToShow.email}
      </div>
      <div className="flex gap-2 p-2 bg-gray-200 dark:bg-gray-800">
        {type === 'received' ? (
          <>
            <Button
              className="bg-green-500"
              onClick={() =>
                handleUpdateConnectionStatus(
                  connection.id,
                  ConnectionStatus.ACCEPTED
                )
              }
            >
              Accept
            </Button>
            <ConfirmButton
              title="Are you sure you want to decline this invitation?"
              description="You'll have to re-invite to re-connect"
              variant="destructive"
              onConfirm={() =>
                handleUpdateConnectionStatus(
                  connection.id,
                  ConnectionStatus.REJECTED
                )
              }
            >
              Decline
            </ConfirmButton>
          </>
        ) : (
          <ConfirmButton
            title="Are you sure you want to cancel this invitation?"
            description="You'll have to re-send to re-connect"
            onConfirm={() => handleDeleteConnection(connection.id)}
            variant="destructive"
          >
            Cancel
          </ConfirmButton>
        )}
      </div>
    </div>
  )
}
