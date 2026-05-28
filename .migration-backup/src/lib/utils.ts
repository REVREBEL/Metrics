import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPageNumbers(
  currentPage: number,
  totalPages: number
): Array<number | '...'> {
  if (totalPages <= 0) {
    return []
  }

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages]
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      '...',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
