import { Plus } from "lucide-react";
import { CustomButton } from "../../../shared/components/ui/CustomButton";

export const CreateContactButton = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-xl font-bold text-slate-700">Address Book</h2>
      <CustomButton>
        <Plus size={18} /> New Contacts
      </CustomButton>
    </div>
  );
};
