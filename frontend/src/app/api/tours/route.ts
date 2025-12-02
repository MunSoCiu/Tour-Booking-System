import { NextRequest, NextResponse } from "next/server";

// Mock database
const tours = [
  {
    id: "1",
    title: "Tour Khám Phá Châu Á 5N4D",
    slug: "tour-kham-pha-chau-a-5n4d",
    description:
      "Khám phá những điểm đến tuyệt vời nhất châu Á trong 5 ngày 4 đêm",
    destination: "Châu Á",
    duration: "5 ngày 4 đêm",
    price: 4000000,
    originalPrice: 5000000,
    discount: 20,
    images: ["/images/asia-tour-1.jpg", "/images/asia-tour-2.jpg"],
    rating: 4.8,
    reviewCount: 120,
    maxGuests: 20,
    startDate: "2024-12-15",
    endDate: "2024-12-19",
    included: [
      "Vé máy bay khứ hồi",
      "Khách sạn 4 sao",
      "Bữa ăn theo chương trình",
      "Hướng dẫn viên",
      "Bảo hiểm du lịch",
    ],
    excluded: ["Chi phí cá nhân", "Tiền típ", "Visa"],
    itinerary: [
      {
        day: 1,
        title: "Ngày 1: Khởi hành",
        description: "Tập trung tại sân bay, khởi hành đi...",
        activities: ["Check-in khách sạn", "Tham quan địa điểm 1", "Ăn tối"],
      },
    ],
    category: "adventure",
    tags: ["châu á", "khám phá", "văn hóa"],
    featured: true,
    status: "available",
    createdAt: "2024-01-01",
    updatedAt: "2024-11-01",
  },
  // More tours...
];

// GET /api/tours - Lấy danh sách tours
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") || "desc";

    // Filter tours
    let filteredTours = [...tours];

    if (search) {
      filteredTours = filteredTours.filter(
        (tour) =>
          tour.title.toLowerCase().includes(search.toLowerCase()) ||
          tour.destination.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filteredTours = filteredTours.filter(
        (tour) => tour.category === category
      );
    }

    if (minPrice) {
      filteredTours = filteredTours.filter(
        (tour) => tour.price >= parseInt(minPrice)
      );
    }

    if (maxPrice) {
      filteredTours = filteredTours.filter(
        (tour) => tour.price <= parseInt(maxPrice)
      );
    }

    // Sort tours
    filteredTours.sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];

      if (order === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTours = filteredTours.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedTours,
      pagination: {
        page,
        limit,
        total: filteredTours.length,
        totalPages: Math.ceil(filteredTours.length / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch tours" },
      { status: 500 }
    );
  }
}

// POST /api/tours - Tạo tour mới (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "destination",
      "duration",
      "price",
      "maxGuests",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create new tour
    const newTour = {
      id: String(tours.length + 1),
      slug: body.title.toLowerCase().replace(/\s+/g, "-"),
      ...body,
      rating: 0,
      reviewCount: 0,
      featured: false,
      status: "available",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tours.push(newTour);

    return NextResponse.json({ success: true, data: newTour }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create tour" },
      { status: 500 }
    );
  }
}

// PUT /api/tours/[id] - Cập nhật tour (Admin only)
export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const body = await request.json();

    const tourIndex = tours.findIndex((t) => t.id === id);

    if (tourIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Tour not found" },
        { status: 404 }
      );
    }

    tours[tourIndex] = {
      ...tours[tourIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: tours[tourIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update tour" },
      { status: 500 }
    );
  }
}

// DELETE /api/tours/[id] - Xóa tour (Admin only)
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    const tourIndex = tours.findIndex((t) => t.id === id);

    if (tourIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Tour not found" },
        { status: 404 }
      );
    }

    tours.splice(tourIndex, 1);

    return NextResponse.json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete tour" },
      { status: 500 }
    );
  }
}
