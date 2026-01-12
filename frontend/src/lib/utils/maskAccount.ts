import { METHODS } from "http";

export function maskAccountNumber(acc: string) {
  if (!acc) return "";
  return acc.slice(0, 3) + "*".repeat(acc.length - 3);
}
