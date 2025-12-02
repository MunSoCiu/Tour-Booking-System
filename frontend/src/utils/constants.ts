// API URLs
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export const API_ENDPOINTS = {
  TOURS: "/api/tours",
  BOOKINGS: "/api/bookings",
  AUTH: "/api/auth",
  CHAT: "/api/chat",
  USERS: "/api/users",
};

// App Configuration
export const APP_NAME = "Traveloka";
export const APP_DESCRIPTION = "Đặt tour du lịch trực tuyến";
export const APP_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Tour Categories
export const TOUR_CATEGORIES = [
  { value: "adventure", label: "Phiêu lưu" },
  { value: "cultural", label: "Văn hóa" },
  { value: "beach", label: "Biển" },
  { value: "mountain", label: "Núi" },
  { value: "city", label: "Thành phố" },
  { value: "countryside", label: "Nông thôn" },
  { value: "historical", label: "Lịch sử" },
  { value: "food", label: "Ẩm thực" },
];

// Tour Status
export const TOUR_STATUS = {
  AVAILABLE: "available",
  SOLDOUT: "soldout",
  UPCOMING: "upcoming",
  DRAFT: "draft",
  INACTIVE: "inactive",
} as const;

// Booking Status
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
} as const;

// Payment Methods
export const PAYMENT_METHODS = [
  { value: "credit_card", label: "Thẻ tín dụng/ghi nợ" },
  { value: "bank_transfer", label: "Chuyển khoản ngân hàng" },
  { value: "wallet", label: "Ví điện tử" },
  { value: "cash", label: "Tiền mặt" },
];

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

// User Roles
export const USER_ROLES = {
  CUSTOMER: "customer",
  ADMIN: "admin",
  TOUR_GUIDE: "tour_guide",
} as const;

// Cancellation Policy
export const CANCELLATION_POLICY = {
  FULL_REFUND_DAYS: 30,
  PARTIAL_REFUND_DAYS: 15,
  PARTIAL_REFUND_PERCENT: 50,
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "dd/MM/yyyy",
  DISPLAY_TIME: "dd/MM/yyyy HH:mm",
  INPUT: "yyyy-MM-dd",
  API: "yyyy-MM-dd",
  FULL: "EEEE, dd MMMM yyyy",
};

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 50,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  PHONE_LENGTH: 10,
  MIN_GUESTS: 1,
  MAX_GUESTS: 50,
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  ALLOWED_DOCUMENT_TYPES: ["application/pdf", "application/msword"],
};

// Toast Notifications
export const TOAST_DURATION = 3000;

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
  CART: "cart",
  THEME: "theme",
  LANGUAGE: "language",
};

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: "https://facebook.com/traveloka",
  INSTAGRAM: "https://instagram.com/traveloka",
  TWITTER: "https://twitter.com/traveloka",
  YOUTUBE: "https://youtube.com/@traveloka",
};

// Contact Info
export const CONTACT_INFO = {
  HOTLINE: "1900 1234",
  EMAIL: "hotro@traveloka.com",
  ADDRESS: "Tòa nhà Capital Place, 29 Liễu Giai, Ba Đình, Hà Nội",
  WORKING_HOURS: "Thứ 2 - Thứ 6: 8:00 - 18:00",
};

// Popular Destinations
export const POPULAR_DESTINATIONS = [
  { id: "hanoi", name: "Hà Nội" },
  { id: "halong", name: "Vịnh Hạ Long" },
  { id: "danang", name: "Đà Nẵng" },
  { id: "hoian", name: "Hội An" },
  { id: "sapa", name: "Sapa" },
  { id: "phuquoc", name: "Phú Quốc" },
  { id: "dalat", name: "Đà Lạt" },
  { id: "nhatrang", name: "Nha Trang" },
];

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Lỗi kết nối mạng. Vui lòng thử lại.",
  SERVER_ERROR: "Lỗi server. Vui lòng thử lại sau.",
  UNAUTHORIZED: "Bạn cần đăng nhập để tiếp tục.",
  FORBIDDEN: "Bạn không có quyền truy cập.",
  NOT_FOUND: "Không tìm thấy dữ liệu.",
  VALIDATION_ERROR: "Dữ liệu không hợp lệ.",
  UNKNOWN_ERROR: "Đã có lỗi xảy ra.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: "Đăng nhập thành công!",
  REGISTER: "Đăng ký thành công!",
  BOOKING_CREATED: "Đặt tour thành công!",
  BOOKING_CANCELLED: "Hủy đơn hàng thành công!",
  PROFILE_UPDATED: "Cập nhật thông tin thành công!",
  PASSWORD_CHANGED: "Đổi mật khẩu thành công!",
};
