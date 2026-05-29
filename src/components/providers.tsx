"use client"

import { ThemeProvider } from '@/context/theme-provider'
import { DirectionProvider } from '@/context/direction-provider'
import { LayoutProvider } from '@/context/layout-provider'
import { SearchProvider } from '@/context/search-provider'
import { FontProvider } from '@/context/font-provider'
import { PropertyProvider } from '@/context/property-context'

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <DirectionProvider>
                <FontProvider>
                    <LayoutProvider>
                        <SearchProvider>
                            <PropertyProvider>
                                {children}
                            </PropertyProvider>
                        </SearchProvider>
                    </LayoutProvider>
                </FontProvider>
            </DirectionProvider>
        </ThemeProvider>
    )
}
