"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import TourTable from "@/components/admin/tours/TourTable";
import TourModal from "@/components/admin/tours/TourModal";

export default function AdminToursPage() {
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(0);

  function refreshData() {
    setReload((prev) => prev + 1);
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Quản lý Tour</h1>
              <p className="text-gray-500">
                Xem, thêm, chỉnh sửa và quản lý danh sách tour du lịch.
              </p>
            </div>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setOpenModal(true)}
            >
              + Thêm Tour
            </button>
          </div>

          {/* TABLE */}
          <TourTable key={reload} />
        </div>
      </div>

      {/* MODAL ADD NEW TOUR */}
      {openModal && (
        <TourModal onClose={() => setOpenModal(false)} refresh={refreshData} />
      )}
    </div>
  );
}
