import { forwardRef, PropsWithChildren, LegacyRef } from 'react'

import { BaseProps } from './types'
import clsx from 'clsx'

export const Icon = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: LegacyRef<HTMLSpanElement>
  ) => (
    <span {...props} ref={ref} className={clsx('material-icons', className)} />
  )
)
Icon.displayName = 'RichTextEditorIcon'

export default Icon
