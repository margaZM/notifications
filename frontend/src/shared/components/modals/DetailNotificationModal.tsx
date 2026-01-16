"use client";
import { CustomButton } from "../ui/CustomButton";
import { Edit3 } from "lucide-react";

interface DetailNotificationModalProps {
  selectedItem: {
    title: string;
    message: string;
    date: string;
  };
  openEditModal: (item: { title: string; message: string; date: string }) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const DetailNotificationModal = ({
  selectedItem,
  openEditModal,
  setIsModalOpen,
}: DetailNotificationModalProps) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Title</label>
        <p className="text-lg font-bold text-slate-800">{selectedItem.title}</p>
      </div>
      <div>
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Message
        </label>
        <div className="bg-slate-50 p-4 rounded-2xl mt-2 text-slate-600 text-sm leading-relaxed italic">
          "{selectedItem.message}"
        </div>
      </div>
      <div className="flex gap-10">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
            Status
          </label>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold">
            SENT
          </span>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
            Date
          </label>
          <p className="text-sm font-medium text-slate-600">{selectedItem.date}</p>
        </div>
      </div>
      <div className="pt-6 border-t border-slate-50 flex gap-4">
        <CustomButton className="flex-1" onClick={() => openEditModal(selectedItem)}>
          <Edit3 size={20} /> Edit Content
        </CustomButton>
        <CustomButton variant="secondary" onClick={() => setIsModalOpen(false)}>
          Close
        </CustomButton>
      </div>
    </div>
  );
};
