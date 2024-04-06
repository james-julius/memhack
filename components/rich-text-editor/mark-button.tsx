import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { Editor } from 'slate'
import { useSlate } from 'slate-react'

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor)
  // @ts-ignore: Slate typing issue
  return marks ? marks[format] === true : false
}

export const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

interface MarkButtonProps {
  format: string
  icon: React.ReactNode
}

export default function MarkButton({ format, icon }: MarkButtonProps) {
  const editor = useSlate()

  // TODO: Memoise this
  const markActive = isMarkActive(editor, format)

  return (
    <Button
      variant="editor"
      size="editor"
      className={clsx(
        markActive
          ? ' bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80'
          : 'dark:bg-black'
      )}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {icon}
    </Button>
  )
}
