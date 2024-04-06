import { BaseProps } from '@/components/rich-text-editor/types'
import { css } from '@emotion/css'
import { cx } from 'class-variance-authority'
import { forwardRef, LegacyRef, PropsWithChildren } from 'react'

export const Menu = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: LegacyRef<HTMLDivElement> | undefined
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `
      )}
    />
  )
)

Menu.displayName = 'RichTextEditorMenu'
