import { Menu } from './menu'
import { BaseProps } from '@/components/rich-text-editor/types'
import { cx } from 'class-variance-authority'
import { forwardRef, PropsWithChildren, Ref } from 'react'

const Toolbar = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement> | undefined
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        'h-16 w-full flex grow pt-3 px-4 pb-1 overflow-y-hidden overflow-x-auto border-b sticky top-0 z-10 bg-gradient-base dark:bg-zinc-950 dark:border-zinc-800'
      )}
    />
  )
)
Toolbar.displayName = 'RichTextEditorToolbar'

export default Toolbar
