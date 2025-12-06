export function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
