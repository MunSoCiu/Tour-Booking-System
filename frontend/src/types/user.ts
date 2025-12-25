export type User = {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  address?: string;
  birthDate?: string; // ISO string
  avatar?: string;
  role?: "user" | "admin";
};
