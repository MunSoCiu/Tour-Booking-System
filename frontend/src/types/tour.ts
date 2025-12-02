export interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  maxGuests: number;
  startDate: string;
  endDate: string;
  included: string[];
  excluded: string[];
  itinerary: Itinerary[];
  category: "adventure" | "cultural" | "beach" | "mountain" | "city";
  tags: string[];
  featured: boolean;
  status: "available" | "soldout" | "upcoming";
  createdAt: string;
  updatedAt: string;
}

export interface Itinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface TourFilter {
  destination?: string;
  minPrice?: number;
  maxPrice?: number;
  duration?: string;
  category?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  guests?: number;
}

export interface TourSearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: "price" | "rating" | "popularity" | "date";
  order?: "asc" | "desc";
}
