/**
 * Generate URL-friendly slug from id and title
 * @param id - Gallery item ID
 * @param title - Gallery item title
 * @returns Formatted slug like "1-amoghapasa"
 */
export function generateSlug(id: string, title: string): string {
  const titleSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  
  return `${id}-${titleSlug}`;
}

/**
 * Extract ID from slug
 * @param slug - URL slug like "1-amoghapasa"
 * @returns Extracted ID
 */
export function getIdFromSlug(slug: string): string {
  const parts = slug.split('-');
  return parts[0];
}

/**
 * Validate if slug format is correct
 * @param slug - URL slug to validate
 * @returns Boolean indicating if slug is valid
 */
export function isValidSlug(slug: string): boolean {
  const slugPattern = /^\d+-[a-z0-9-]+$/;
  return slugPattern.test(slug);
} 