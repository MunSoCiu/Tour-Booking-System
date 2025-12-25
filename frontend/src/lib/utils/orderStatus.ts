export const STATUS_MAP: Record<string, string> = {
  pending: "Chờ thanh toán",
  success: "Đã hoàn thành",
  cancelled: "Đã hủy",
};

export const STATUS_STYLE: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-600",
  success: "bg-green-100 text-green-600",
  cancelled: "bg-red-100 text-red-600",
};
