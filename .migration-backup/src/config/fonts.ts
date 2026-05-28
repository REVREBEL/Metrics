export const fonts = [
  'Funnel Sans',
  'Khand',
  'Fira Code',
  'General Sans',
  'Supreme',
  'Barlow',
] as const

export type Font = (typeof fonts)[number]
