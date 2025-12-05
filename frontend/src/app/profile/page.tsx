"use client";

import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileDetails from "@/components/profile/ProfileDetails";
import TripHistory from "@/components/profile/TripHistory";

export default function ProfilePage() {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT SIDEBAR */}
        <ProfileSidebar />

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-3 space-y-8">
          {/* PERSONAL INFO */}
          <ProfileDetails />

          {/* TRIP HISTORY */}
          <TripHistory />
        </div>
      </div>
    </div>
  );
}
