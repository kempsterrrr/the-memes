import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function sanitizeUndername(name) {
  // Convert to lowercase
  let sanitized = name.toLowerCase();
  
  // Replace apostrophes and other special characters with empty string
  sanitized = sanitized.replace(/['"]/g, '');
  
  // Replace spaces and other special characters with hyphens
  sanitized = sanitized.replace(/[^a-z0-9]+/g, '-');
  
  // Remove leading and trailing hyphens
  sanitized = sanitized.replace(/^-+|-+$/g, '');
  
  // Ensure the name is not too long (ArNS has a limit)
  const MAX_LENGTH = 63; // Standard DNS label length limit
  if (sanitized.length > MAX_LENGTH) {
      sanitized = sanitized.substring(0, MAX_LENGTH);
      // Remove trailing hyphen if it exists after truncation
      sanitized = sanitized.replace(/-+$/, '');
  }
  
  return sanitized;
} 