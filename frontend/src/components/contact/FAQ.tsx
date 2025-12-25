import FAQItem from "./FAQItem";

export default function FAQ() {
  const questions = [
    {
      q: "Tôi có thể hủy tour sau khi đặt không?",
      a: "Bạn có thể hủy tour trước ngày khởi hành 7 ngày để được hoàn tiền 100%. Sau thời gian này, chi phí hủy sẽ tùy vào từng tour.",
    },
    {
      q: "Thanh toán có an toàn không?",
      a: "GoTour sử dụng cổng thanh toán đạt chuẩn PCI-DSS, đảm bảo an toàn tuyệt đối cho mọi giao dịch.",
    },
    {
      q: "Tôi cần hóa đơn VAT thì làm thế nào?",
      a: "Bạn vui lòng cung cấp thông tin doanh nghiệp khi đặt tour hoặc liên hệ bộ phận hỗ trợ để được cấp hóa đơn.",
    },
    {
      q: "Làm sao để được hỗ trợ nhanh nhất?",
      a: "Bạn có thể gọi hotline 1900 1234 hoặc nhắn tin qua email hotro@gotour.com để được phản hồi trong 5 phút.",
    },
  ];

  return (
    <div className="space-y-3">
      {questions.map((item, index) => (
        <FAQItem key={index} question={item.q} answer={item.a} />
      ))}
    </div>
  );
}
