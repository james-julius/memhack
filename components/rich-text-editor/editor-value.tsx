import { BaseProps } from '@/components/rich-text-editor/types'
import { css } from '@emotion/css'
import { cx } from 'class-variance-authority'
import { forwardRef, LegacyRef, PropsWithChildren, Ref } from 'react'

export const EditorValue = forwardRef(
  (
    {
      className,
      value,
      ...props
    }: PropsWithChildren<
      {
        value: any
      } & BaseProps
    >,
    ref: LegacyRef<HTMLDivElement>
  ) => {
    // @ts-ignore: lackingSlate typing
    const textLines = value.document.nodes
      // @ts-ignore: lackingSlate typing
      .map(node => node.text)
      .toArray()
      .join('\n')
    return (
      <div
        ref={ref}
        {...props}
        className={cx(
          className,
          css`
            margin: 30px -20px 0;
          `
        )}
      >
        <div
          className={css`
            font-size: 14px;
            padding: 5px 20px;
            color: #404040;
            border-top: 2px solid #eeeeee;
            background: #f8f8f8;
          `}
        >
          Slate&nbsp;s value as text
        </div>
        <div
          className={css`
            color: #404040;
            font: 12px monospace;
            white-space: pre-wrap;
            padding: 10px 20px;
            div {
              margin: 0 0 0.5em;
            }
          `}
        >
          {textLines}
        </div>
      </div>
    )
  }
)

EditorValue.displayName = 'RichTextEditorEditorValue'
