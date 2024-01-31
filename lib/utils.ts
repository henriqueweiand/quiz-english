import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeURL(url: string) {
  const sanitizedURL = url
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, "-");   // Replace spaces with hyphens

  const encodedURL = encodeURIComponent(sanitizedURL);
  return encodedURL;
}
