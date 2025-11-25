/**
 * Formats a URL by adding http:// protocol if not already present
 * @param url - The URL to format
 * @returns The formatted URL with protocol
 */
export const formatUrl = (url: string): string => {
  if (!url) return ''

  // Check if URL already has a protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // Add http:// protocol if missing
  return `http://${url}`
}
