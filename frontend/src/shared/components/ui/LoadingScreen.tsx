import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-default">
      <Loader2 className="animate-spin h-12 w-12 text-primary" />
    </div>
  );
};
