/**
 * Ensures a URL has a proper protocol prefix (http:// or https://)
 * @param url The URL to format
 * @returns Properly formatted URL with protocol
 */
export function formatUrl(url: string | undefined): string {
    if (!url) return '';
    
    // Return empty string for empty URLs
    if (url.trim() === '') return '';
    
    // Check if URL already has a protocol
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // Add https:// as the default protocol
    return `https://${url}`;
  }