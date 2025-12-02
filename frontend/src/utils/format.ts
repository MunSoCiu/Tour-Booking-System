/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Convert string to slug
 * @param text - Text to convert
 * @returns Slugified text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Capitalize first letter of each word
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalizeWords(text: string): string {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Format phone number with spaces
 * @param phone - Phone number
 * @returns Formatted phone (e.g., "090 123 4567")
 */
export function formatPhoneDisplay(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }

  return phone;
}

/**
 * Format file size
 * @param bytes - File size in bytes
 * @returns Formatted size (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Format number with thousand separators
 * @param num - Number to format
 * @returns Formatted number (e.g., "1,000,000")
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("vi-VN").format(num);
}

/**
 * Get initials from name
 * @param name - Full name
 * @returns Initials (e.g., "NVA" from "Nguyen Van A")
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 3);
}

/**
 * Mask email address
 * @param email - Email to mask
 * @returns Masked email (e.g., "j***@example.com")
 */
export function maskEmail(email: string): string {
  const [username, domain] = email.split("@");
  if (!username || !domain) return email;

  const maskedUsername = username[0] + "***" + username[username.length - 1];
  return `${maskedUsername}@${domain}`;
}

/**
 * Mask phone number
 * @param phone - Phone to mask
 * @returns Masked phone (e.g., "090***4567")
 */
export function maskPhone(phone: string): string {
  if (phone.length < 7) return phone;

  const start = phone.substring(0, 3);
  const end = phone.substring(phone.length - 4);
  return `${start}***${end}`;
}

/**
 * Parse query string to object
 * @param queryString - Query string
 * @returns Object with query parameters
 */
export function parseQueryString(queryString: string): Record<string, string> {
  const params: Record<string, string> = {};
  const searchParams = new URLSearchParams(queryString);

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

/**
 * Build query string from object
 * @param params - Object with parameters
 * @returns Query string
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}
