import { Notification } from "@/src/core/notifications/domain/models/Notification";
import { CreateNotificationModal } from "@/src/shared/components/modals/CreateNotificationModal";
import { useModalStore } from "@/src/shared/stores/modalStore";
import { Edit3 } from "lucide-react";
import { useState } from "react";

interface UpdateNotificationButtonProps {
  selectedItem: Notification;
}

export const UpdateNotificationButton = ({ selectedItem: item }: UpdateNotificationButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openModal, closeModal } = useModalStore();

  const handleOpenModal = () => {
    setIsModalOpen(true);
    openModal("createEditNotification");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    closeModal("createEditNotification");
  };

  return (
    <>
      {isModalOpen && (
        <CreateNotificationModal
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          action="edit"
          selectedItem={item}
        />
      )}
      <button
        onClick={handleOpenModal}
        className="p-2 text-slate-300 hover:text-gray-500 transition-colors opacity-100"
      >
        <Edit3 size={18} />
      </button>
    </>
  );
};
