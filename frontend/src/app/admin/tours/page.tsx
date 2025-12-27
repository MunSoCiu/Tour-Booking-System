"use client";

import { useState } from "react";
import TourTable from "@/components/admin/tours/TourTable";
import TourModal from "@/components/admin/tours/TourModal";

export default function AdminToursPage() {
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(0);
  const [editTour, setEditTour] = useState<any>(null);

  function refreshData() {
    setReload((prev) => prev + 1);
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Quản lý Tour</h1>
            <p className="text-gray-500">
              Xem, thêm, chỉnh sửa và quản lý danh sách tour du lịch.
            </p>
          </div>

          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => {
              setEditTour(null);
              setOpenModal(true);
            }}
          >
            + Thêm Tour
          </button>
        </div>

        {/* TABLE */}
        <TourTable
          key={reload}
          onEdit={(tour) => {
            setEditTour(tour);
            setOpenModal(true);
          }}
        />
      </div>

      {/* MODAL */}
      {openModal && (
        <TourModal
          tour={editTour}
          onClose={() => setOpenModal(false)}
          refresh={refreshData}
        />
      )}
    </div>
  );
}
