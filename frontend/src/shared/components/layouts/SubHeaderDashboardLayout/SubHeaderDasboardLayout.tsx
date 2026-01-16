"use client";
import { useDashboardStore } from "@/src/shared/stores/dashboardStore";
import { useState } from "react";
import { HeaderContacts } from "./components/HeaderContacts";
import { HeaderNotifications } from "./components/HeaderNotifications";

export const SubHeaderDashboardLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'create' | 'edit' | 'view'
  const [selectedItem, setSelectedItem] = useState(null);
  const activeTab = useDashboardStore((state) => state.activeTab);

  return (
    <>
      <HeaderContacts />
      <HeaderNotifications />
    </>
  );
};
