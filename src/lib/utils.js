/**
 * Utility: cn()
 * Merges Tailwind CSS classes safely, resolving conflicts.
 * Equivalent to the shadcn/ui `@/lib/utils` helper.
 * 
 * Uses:
 *  - clsx  → conditionally joins class names
 *  - tailwind-merge → resolves Tailwind class conflicts (e.g. p-2 + p-4 = p-4)
 */
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
