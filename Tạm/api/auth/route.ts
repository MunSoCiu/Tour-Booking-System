import { NextRequest, NextResponse } from "next/server";

// Mock database
const users: any[] = [
  {
    id: "1",
    email: "admin@traveloka.com",
    password: "admin123", // In production, use bcrypt hash
    fullName: "Admin User",
    phone: "0909123456",
    role: "admin",
    avatar: null,
    birthDate: "1990-01-01",
    address: "123 ABC Street",
    createdAt: "2023-01-01",
    updatedAt: "2024-11-01",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    fullName: "Nguyễn Văn A",
    phone: "0918234567",
    role: "customer",
    avatar: null,
    birthDate: "1995-05-15",
    address: "456 XYZ Street",
    createdAt: "2023-06-15",
    updatedAt: "2024-11-01",
  },
];

// Helper function to generate JWT (mock)
function generateToken(user: any) {
  // In production, use proper JWT library like jsonwebtoken
  const token = Buffer.from(
    JSON.stringify({
      userId: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    })
  ).toString("base64");

  return token;
}

// Helper function to verify token (mock)
function verifyToken(token: string) {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());
    if (decoded.exp < Date.now()) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

// POST /api/auth/register - Đăng ký
export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const endpoint = url.pathname.split("/").pop();

    if (endpoint === "register") {
      const body = await request.json();

      // Validate required fields
      const requiredFields = ["email", "password", "fullName", "phone"];
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
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { success: false, error: "Invalid email format" },
          { status: 400 }
        );
      }

      // Check if user already exists
      const existingUser = users.find((u) => u.email === body.email);
      if (existingUser) {
        return NextResponse.json(
          { success: false, error: "Email already registered" },
          { status: 400 }
        );
      }

      // Validate password strength
      if (body.password.length < 6) {
        return NextResponse.json(
          { success: false, error: "Password must be at least 6 characters" },
          { status: 400 }
        );
      }

      // Create new user
      const newUser = {
        id: String(users.length + 1),
        email: body.email,
        password: body.password, // In production, hash with bcrypt
        fullName: body.fullName,
        phone: body.phone,
        role: "customer",
        avatar: null,
        birthDate: body.birthDate || null,
        address: body.address || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      users.push(newUser);

      // Generate token
      const token = generateToken(newUser);
      const refreshToken = generateToken({ ...newUser, type: "refresh" });

      // Remove password from response
      const { password, ...userWithoutPassword } = newUser;

      return NextResponse.json(
        {
          success: true,
          data: {
            user: userWithoutPassword,
            token,
            refreshToken,
          },
          message: "Registration successful",
        },
        { status: 201 }
      );
    }

    // POST /api/auth/login - Đăng nhập
    if (endpoint === "login") {
      const body = await request.json();

      // Validate required fields
      if (!body.email || !body.password) {
        return NextResponse.json(
          { success: false, error: "Email and password are required" },
          { status: 400 }
        );
      }

      // Find user
      const user = users.find((u) => u.email === body.email);
      if (!user) {
        return NextResponse.json(
          { success: false, error: "Invalid credentials" },
          { status: 401 }
        );
      }

      // Check password (in production, use bcrypt.compare)
      if (user.password !== body.password) {
        return NextResponse.json(
          { success: false, error: "Invalid credentials" },
          { status: 401 }
        );
      }

      // Generate tokens
      const token = generateToken(user);
      const refreshToken = generateToken({ ...user, type: "refresh" });

      // Update last login
      user.lastLogin = new Date().toISOString();

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      return NextResponse.json({
        success: true,
        data: {
          user: userWithoutPassword,
          token,
          refreshToken,
        },
        message: "Login successful",
      });
    }

    // POST /api/auth/logout - Đăng xuất
    if (endpoint === "logout") {
      // In a real app, you would invalidate the token here
      // For now, we just return success
      return NextResponse.json({
        success: true,
        message: "Logout successful",
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid endpoint" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}

// GET /api/auth/profile - Lấy thông tin profile
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Find user
    const user = users.find((u) => u.id === decoded.userId);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to get profile" },
      { status: 500 }
    );
  }
}

// PUT /api/auth/profile - Cập nhật profile
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const userIndex = users.findIndex((u) => u.id === decoded.userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Don't allow updating email, password, or role through this endpoint
    const { email, password, role, ...updateData } = body;

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    // Remove password from response
    const { password: _, ...userWithoutPassword } = users[userIndex];

    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
      message: "Profile updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

// POST /api/auth/change-password - Đổi mật khẩu
export async function changePassword(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "Current password and new password are required",
        },
        { status: 400 }
      );
    }

    const userIndex = users.findIndex((u) => u.id === decoded.userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Check current password
    if (users[userIndex].password !== currentPassword) {
      return NextResponse.json(
        { success: false, error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Validate new password
    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: "New password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Update password
    users[userIndex].password = newPassword; // In production, hash with bcrypt
    users[userIndex].updatedAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to change password" },
      { status: 500 }
    );
  }
}
