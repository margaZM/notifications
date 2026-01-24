import { Plus } from "lucide-react";
import { useState } from "react";
import { useModalStore } from "@/src/shared/stores/modalStore";
import { CreateNotificationModal } from "../../../shared/components/modals/CreateNotificationModal";

export const CreateNotificationButton = () => {
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
          action="create"
        />
      )}
      <button
        onClick={handleOpenModal}
        className="group flex items-center gap-2 bg-white border border-gray-100 text-primary-default px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary-default hover:text-white transition-all duration-300"
      >
        <Plus size={18} className="transition-transform group-hover:rotate-90" />
        New Notification
      </button>
    </>
  );
};
