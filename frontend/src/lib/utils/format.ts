import { format } from "date-fns";
import { vi } from "date-fns/locale";

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const formatDate = (
  date: string | Date,
  formatStr: string = "dd/MM/yyyy"
): string => {
  return format(new Date(date), formatStr, { locale: vi });
};

export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), "dd/MM/yyyy HH:mm", { locale: vi });
};

export const calculateDiscount = (
  original: number,
  discounted: number
): number => {
  return Math.round(((original - discounted) / original) * 100);
};

export const cn = (
  ...classes: (string | undefined | null | boolean)[]
): string => {
  return classes.filter(Boolean).join(" ");
};
