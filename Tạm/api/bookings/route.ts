import { NextRequest, NextResponse } from "next/server";

// Mock database
const bookings: any[] = [
  {
    id: "#8A4B2C",
    tourId: "1",
    tourTitle: "Khám Phá Vịnh Hạ Long - Du thuyền 5 sao",
    userId: "1",
    customerName: "Nguyễn Văn A",
    customerEmail: "nva@email.com",
    customerPhone: "0909123456",
    guests: 2,
    children: 0,
    startDate: "2024-12-25",
    totalPrice: 5990000,
    servicePrice: 500000,
    status: "confirmed",
    paymentMethod: "credit_card",
    paymentStatus: "paid",
    specialRequests: "Phòng view biển",
    createdAt: "2024-11-15",
    updatedAt: "2024-11-15",
  },
];

// GET /api/bookings - Lấy danh sách bookings
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Filter bookings
    let filteredBookings = [...bookings];

    if (userId) {
      filteredBookings = filteredBookings.filter((b) => b.userId === userId);
    }

    if (status) {
      filteredBookings = filteredBookings.filter((b) => b.status === status);
    }

    // Sort by created date (newest first)
    filteredBookings.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedBookings,
      pagination: {
        page,
        limit,
        total: filteredBookings.length,
        totalPages: Math.ceil(filteredBookings.length / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Tạo booking mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "tourId",
      "tourTitle",
      "customerName",
      "customerEmail",
      "customerPhone",
      "guests",
      "startDate",
      "totalPrice",
      "paymentMethod",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.customerEmail)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate phone format (Vietnamese)
    const phoneRegex = /^(0|\+84)[0-9]{9}$/;
    if (!phoneRegex.test(body.customerPhone.replace(/\s/g, ""))) {
      return NextResponse.json(
        { success: false, error: "Invalid phone format" },
        { status: 400 }
      );
    }

    // Generate booking ID
    const bookingId =
      "#" + Math.random().toString(36).substring(2, 8).toUpperCase();

    // Create new booking
    const newBooking = {
      id: bookingId,
      userId: body.userId || null,
      ...body,
      servicePrice: body.servicePrice || 500000,
      status: "pending",
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    bookings.push(newBooking);

    // TODO: Send confirmation email
    // await sendBookingConfirmationEmail(newBooking);

    return NextResponse.json(
      {
        success: true,
        data: newBooking,
        message: "Booking created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

// GET /api/bookings/[id] - Lấy chi tiết booking
export async function getBookingById(id: string) {
  const booking = bookings.find((b) => b.id === id);

  if (!booking) {
    return NextResponse.json(
      { success: false, error: "Booking not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: booking,
  });
}

// PUT /api/bookings/[id] - Cập nhật booking
export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const body = await request.json();

    const bookingIndex = bookings.findIndex((b) => b.id === id);

    if (bookingIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    // Update booking
    bookings[bookingIndex] = {
      ...bookings[bookingIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    // TODO: Send update notification email
    // await sendBookingUpdateEmail(bookings[bookingIndex]);

    return NextResponse.json({
      success: true,
      data: bookings[bookingIndex],
      message: "Booking updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

// DELETE /api/bookings/[id] - Xóa/Hủy booking
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    const bookingIndex = bookings.findIndex((b) => b.id === id);

    if (bookingIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    // Check if booking can be cancelled
    const booking = bookings[bookingIndex];
    const startDate = new Date(booking.startDate);
    const today = new Date();
    const daysUntilStart = Math.ceil(
      (startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    let refundPercentage = 0;
    if (daysUntilStart >= 30) {
      refundPercentage = 100;
    } else if (daysUntilStart >= 15) {
      refundPercentage = 50;
    }

    // Update booking status to cancelled
    bookings[bookingIndex] = {
      ...booking,
      status: "cancelled",
      paymentStatus: refundPercentage > 0 ? "refunded" : "paid",
      updatedAt: new Date().toISOString(),
    };

    // TODO: Process refund
    // await processRefund(booking.id, refundPercentage);

    // TODO: Send cancellation email
    // await sendCancellationEmail(booking, refundPercentage);

    return NextResponse.json({
      success: true,
      data: bookings[bookingIndex],
      message: `Booking cancelled. Refund: ${refundPercentage}%`,
      refundPercentage,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to cancel booking" },
      { status: 500 }
    );
  }
}

// POST /api/bookings/[id]/confirm - Xác nhận booking (Admin)
export async function confirmBooking(id: string) {
  const bookingIndex = bookings.findIndex((b) => b.id === id);

  if (bookingIndex === -1) {
    return NextResponse.json(
      { success: false, error: "Booking not found" },
      { status: 404 }
    );
  }

  bookings[bookingIndex] = {
    ...bookings[bookingIndex],
    status: "confirmed",
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json({
    success: true,
    data: bookings[bookingIndex],
    message: "Booking confirmed successfully",
  });
}
