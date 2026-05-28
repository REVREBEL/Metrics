import type { ModeSettings } from '@/contexts/settingsContext'

export const getSettingsFromCookie = (): ModeSettings => {
  try {
    const raw = document.cookie
      .split('; ')
      .find((c) => c.startsWith('shadcn-studio-mode='))
      ?.split('=')[1]

    if (!raw) return { mode: 'light' }

    return JSON.parse(decodeURIComponent(raw)) as ModeSettings
  } catch {
    return { mode: 'light' }
  }
}
