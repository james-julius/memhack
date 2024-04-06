'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { RecoilRoot } from 'recoil'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <SidebarProvider>
        <RecoilRoot>
          <TooltipProvider>{children}</TooltipProvider>
        </RecoilRoot>
      </SidebarProvider>
    </NextThemesProvider>
  )
}
