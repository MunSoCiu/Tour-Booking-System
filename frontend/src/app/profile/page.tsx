"use client";

import { useState } from "react";
import ProfileSidebar, {
  ProfileTab,
} from "@/components/profile/ProfileSidebar";
import PaymentMethods from "@/components/profile/PaymentMethods";

import ProfileDetails from "@/components/profile/ProfileDetails";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import TripHistory from "@/components/profile/TripHistory";

export default function ProfilePage() {
  const [tab, setTab] = useState<ProfileTab>("info");

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <ProfileSidebar tab={tab} setTab={setTab} />

        <div className="lg:col-span-3 space-y-6">
          {tab === "info" && <ProfileDetails onEdit={() => setTab("edit")} />}
          {tab === "edit" && <ProfileEditForm onDone={() => setTab("info")} />}
          {tab === "password" && <ChangePasswordForm />}
          {tab === "orders" && <TripHistory />}
          {tab === "payment" && <PaymentMethods />}
        </div>
      </div>
    </div>
  );
}
