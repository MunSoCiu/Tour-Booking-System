import { NextRequest, NextResponse } from "next/server";

// Mock database for chat messages
const conversations: Map<string, any[]> = new Map();

// Mock chat responses for demo
const autoResponses = [
  {
    keywords: ["xin chào", "hello", "hi", "chào"],
    response:
      "Xin chào! Tôi là trợ lý ảo của Traveloka. Tôi có thể giúp gì cho bạn hôm nay?",
  },
  {
    keywords: ["đặt tour", "booking", "đặt chỗ"],
    response:
      "Để đặt tour, bạn có thể:\n1. Tìm kiếm tour trên trang chủ\n2. Chọn tour phù hợp\n3. Điền thông tin và thanh toán\n\nBạn cần tôi hỗ trợ điều gì cụ thể?",
  },
  {
    keywords: ["giá", "phí", "chi phí", "tiền"],
    response:
      "Giá tour của chúng tôi phụ thuộc vào:\n- Điểm đến\n- Thời gian (cao điểm/thấp điểm)\n- Số lượng khách\n- Loại dịch vụ\n\nBạn quan tâm tour nào để tôi báo giá cụ thể?",
  },
  {
    keywords: ["hủy", "cancel", "hoàn tiền"],
    response:
      "Chính sách hủy tour:\n- Hủy trước 30 ngày: Hoàn 100%\n- Hủy trước 15-29 ngày: Hoàn 50%\n- Hủy trong 14 ngày: Không hoàn tiền\n\nBạn cần hỗ trợ hủy tour không?",
  },
  {
    keywords: ["thanh toán", "payment", "trả tiền"],
    response:
      "Chúng tôi hỗ trợ các phương thức thanh toán:\n- Thẻ tín dụng/ghi nợ\n- Ví điện tử (MoMo, ZaloPay)\n- Chuyển khoản ngân hàng\n\nTất cả đều an toàn và bảo mật!",
  },
  {
    keywords: ["liên hệ", "contact", "hotline"],
    response:
      "Bạn có thể liên hệ với chúng tôi qua:\n📞 Hotline: 1900 1234\n📧 Email: hotro@traveloka.com\n🏢 Văn phòng: Tòa nhà Capital Place, 29 Liễu Giai, Ba Đình, Hà Nội\n\nGiờ làm việc: 8:00 - 22:00 hàng ngày",
  },
];

// Helper function to find appropriate response
function findResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  for (const item of autoResponses) {
    if (item.keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return item.response;
    }
  }

  return "Cảm ơn bạn đã liên hệ! Tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể hỏi về:\n- Đặt tour\n- Giá cả\n- Thanh toán\n- Chính sách hủy\n- Liên hệ\n\nHoặc gọi hotline 1900 1234 để được hỗ trợ trực tiếp!";
}

// GET /api/chat - Lấy lịch sử chat
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const conversationId = searchParams.get("conversationId");

    if (!conversationId) {
      return NextResponse.json(
        { success: false, error: "Conversation ID is required" },
        { status: 400 }
      );
    }

    const messages = conversations.get(conversationId) || [];

    return NextResponse.json({
      success: true,
      data: {
        conversationId,
        messages,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch chat history" },
      { status: 500 }
    );
  }
}

// POST /api/chat - Gửi tin nhắn
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversationId, message, userId, userName } = body;

    // Validate required fields
    if (!conversationId || !message) {
      return NextResponse.json(
        { success: false, error: "Conversation ID and message are required" },
        { status: 400 }
      );
    }

    // Get or create conversation
    if (!conversations.has(conversationId)) {
      conversations.set(conversationId, []);
    }

    const conversation = conversations.get(conversationId)!;

    // Add user message
    const userMessage = {
      id: `msg_${Date.now()}_user`,
      conversationId,
      sender: "user",
      userId: userId || "guest",
      userName: userName || "Khách",
      message,
      timestamp: new Date().toISOString(),
      read: false,
    };

    conversation.push(userMessage);

    // Generate bot response
    const botResponse = findResponse(message);

    // Add bot message
    const botMessage = {
      id: `msg_${Date.now()}_bot`,
      conversationId,
      sender: "bot",
      userId: "bot",
      userName: "Trợ lý Traveloka",
      message: botResponse,
      timestamp: new Date(Date.now() + 1000).toISOString(), // 1 second delay
      read: false,
    };

    conversation.push(botMessage);

    // Update conversation
    conversations.set(conversationId, conversation);

    return NextResponse.json({
      success: true,
      data: {
        userMessage,
        botMessage,
      },
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}

// POST /api/chat/typing - Báo hiệu đang gõ
export async function sendTyping(conversationId: string) {
  // In a real app with WebSocket, you would emit a typing event
  return NextResponse.json({
    success: true,
    data: {
      conversationId,
      typing: true,
    },
  });
}

// PUT /api/chat/read - Đánh dấu đã đọc
export async function markAsRead(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversationId, messageIds } = body;

    if (!conversationId || !messageIds || !Array.isArray(messageIds)) {
      return NextResponse.json(
        { success: false, error: "Invalid request" },
        { status: 400 }
      );
    }

    const conversation = conversations.get(conversationId);

    if (!conversation) {
      return NextResponse.json(
        { success: false, error: "Conversation not found" },
        { status: 404 }
      );
    }

    // Mark messages as read
    for (const message of conversation) {
      if (messageIds.includes(message.id)) {
        message.read = true;
      }
    }

    conversations.set(conversationId, conversation);

    return NextResponse.json({
      success: true,
      message: "Messages marked as read",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to mark messages as read" },
      { status: 500 }
    );
  }
}

// DELETE /api/chat - Xóa conversation
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const conversationId = searchParams.get("conversationId");

    if (!conversationId) {
      return NextResponse.json(
        { success: false, error: "Conversation ID is required" },
        { status: 400 }
      );
    }

    conversations.delete(conversationId);

    return NextResponse.json({
      success: true,
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete conversation" },
      { status: 500 }
    );
  }
}

// GET /api/chat/conversations - Lấy danh sách conversations (Admin)
export async function getConversations() {
  try {
    const allConversations = Array.from(conversations.entries()).map(
      ([id, messages]) => {
        const lastMessage = messages[messages.length - 1];
        const unreadCount = messages.filter(
          (m) => !m.read && m.sender === "user"
        ).length;

        return {
          conversationId: id,
          lastMessage: lastMessage?.message || "",
          lastMessageTime: lastMessage?.timestamp || "",
          unreadCount,
          userName:
            messages.find((m) => m.sender === "user")?.userName || "Unknown",
          userId:
            messages.find((m) => m.sender === "user")?.userId || "unknown",
        };
      }
    );

    // Sort by last message time
    allConversations.sort(
      (a, b) =>
        new Date(b.lastMessageTime).getTime() -
        new Date(a.lastMessageTime).getTime()
    );

    return NextResponse.json({
      success: true,
      data: allConversations,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
}
