import { useDashboardStore } from "@/src/shared/stores/dashboardStore";
import { useState } from "react";
import { CustomButton } from "../../../ui/CustomButton";
import { Plus } from "lucide-react";

export const HeaderContacts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'create' | 'edit' | 'view'
  const [selectedItem, setSelectedItem] = useState(null);
  const activeTab = useDashboardStore((state) => state.activeTab);

  const openModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      {activeTab === "contacts" && (
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-700">Address Book</h2>
          <div className="max-w-80">
            <CustomButton>
              <Plus size={18} /> New Contact
            </CustomButton>
          </div>
        </div>
      )}
    </>
  );
};
