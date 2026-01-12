// src/lib/utils/resolveImage.ts
export function resolveImage(image?: string | null) {
  if (!image) return "/images/default-tour.jpg";
  if (image.startsWith("http")) return image;

  const base = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");

  return `${base}${image}`;
}
