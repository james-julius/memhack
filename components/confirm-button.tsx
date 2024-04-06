import {
  AlertDialogHeader,
  AlertDialogFooter
} from '@/components/ui/alert-dialog'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog'
import { Button, ButtonProps } from '@/components/ui/button'
import { PropsWithChildren } from 'react'

interface ConfirmButtonProps extends ButtonProps {
  onConfirm: () => void
  title: string
  description: string
  triggerClassName?: string
}

export default function ConfirmButton({
  onConfirm,
  title,
  description,
  triggerClassName,
  children,
  ...rest
}: ConfirmButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className={triggerClassName || ''}>
        <Button {...rest}>{children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
