import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import FAQ from "@/components/contact/FAQ";

export default function ContactPage() {
  return (
    <div className="w-full bg-gray-50 pb-20 pt-10">
      {/* PAGE HEADER */}
      <div className="text-center mb-12 px-4">
        <h1 className="text-3xl font-bold text-gray-800">Liên hệ GoTour</h1>
        <p className="text-gray-500 mt-2">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7 – hãy gửi tin nhắn cho chúng
          tôi!
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
        {/* LEFT: CONTACT FORM */}
        <div className="md:col-span-2">
          <ContactForm />
        </div>

        {/* RIGHT: CONTACT INFO */}
        <div className="md:col-span-1">
          <ContactInfo />
        </div>
      </div>

      {/* FAQ SECTION */}
      <section className="max-w-5xl mx-auto mt-16 px-4">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Câu hỏi thường gặp
        </h2>

        <FAQ />
      </section>
    </div>
  );
}
