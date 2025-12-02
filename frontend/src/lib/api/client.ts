import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const tourAPI = {
  getAll: (params?: any) => apiClient.get("/tours", { params }),
  getById: (id: string) => apiClient.get(`/tours/${id}`),
  create: (data: any) => apiClient.post("/tours", data),
  update: (id: string, data: any) => apiClient.put(`/tours/${id}`, data),
  delete: (id: string) => apiClient.delete(`/tours/${id}`),
};

export const bookingAPI = {
  getAll: (params?: any) => apiClient.get("/bookings", { params }),
  getById: (id: string) => apiClient.get(`/bookings/${id}`),
  create: (data: any) => apiClient.post("/bookings", data),
  update: (id: string, data: any) => apiClient.put(`/bookings/${id}`, data),
  cancel: (id: string) => apiClient.post(`/bookings/${id}/cancel`),
};

export const authAPI = {
  login: (credentials: any) => apiClient.post("/auth/login", credentials),
  register: (data: any) => apiClient.post("/auth/register", data),
  logout: () => apiClient.post("/auth/logout"),
  getProfile: () => apiClient.get("/auth/profile"),
};
