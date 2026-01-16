import { SwitchDasboardLayout } from "./components/SwitchDasboardLayout";

export const HeaderDashboardLayout = () => {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Manage your notifications and distribution lists.</p>
      </div>
      <SwitchDasboardLayout />
    </header>
  );
};
