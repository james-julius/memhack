import React, { forwardRef, PropsWithChildren, LegacyRef } from 'react'
import { cx, css } from '@emotion/css'
import { BaseProps } from './types'

export const Instruction = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: LegacyRef<HTMLDivElement>
  ) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          white-space: pre-wrap;
          margin: 0 -20px 10px;
          padding: 10px 20px;
          font-size: 14px;
          background: #f8f8e8;
        `
      )}
    />
  )
)

Instruction.displayName = 'RichTextEditorInstruction'
