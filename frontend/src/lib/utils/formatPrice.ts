export function formatPrice(value: number): string {
  if (!value || isNaN(value)) return "0";

  return new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
