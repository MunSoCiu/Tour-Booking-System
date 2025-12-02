import { type ClassValue, clsx } from "clsx";

/**
 * Merge class names with clsx
 * Useful for conditional classes and Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Usage examples:
// cn('text-red-500', 'font-bold')
// cn('text-red-500', isActive && 'bg-blue-500')
// cn({ 'text-red-500': isError, 'text-green-500': isSuccess })
