"use client";
import { CreateNotificationForm } from "@/src/modules/notifications/components/CreateNotificationForm";
import { Modal } from "../ui/Modal";
import { Notification } from "@/src/core/notifications/domain/models/Notification";

interface CreateNotificationModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  selectedItem?: Notification;
  action: "create" | "edit";
}

export const CreateNotificationModal = ({
  isOpen,
  handleCloseModal,
  selectedItem,
  action,
}: CreateNotificationModalProps) => {
  const getTitle = action === "create" ? "Create Notification" : "Edit Notification";

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} title={getTitle}>
      <CreateNotificationForm
        action={action}
        closeModal={handleCloseModal}
        selectedItem={selectedItem}
      />
    </Modal>
  );
};
