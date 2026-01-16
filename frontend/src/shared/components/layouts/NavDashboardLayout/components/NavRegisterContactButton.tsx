import { CustomButton } from "@/src/shared/components/ui/CustomButton";
import { useDashboardStore } from "@/src/shared/stores/dashboardStore";
import { UserPlus } from "lucide-react";

export const NavRegisterContactButton = () => {
  const { setActiveTab } = useDashboardStore((state) => state);

  return (
    <CustomButton variant="secondary" onClick={() => setActiveTab("contacts")}>
      <UserPlus size={20} /> Add Contact
    </CustomButton>
  );
};
