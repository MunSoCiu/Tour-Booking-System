export function maskBalance(amount: number): string {
  if (!amount || amount <= 0) return "0 đ";

  const raw = Math.floor(amount).toString(); // bỏ dấu .
  if (raw.length <= 3) return raw + " đ";

  const start = raw.slice(0, 3);
  const end = raw.slice(-3);

  return `${start}*** `;
}
