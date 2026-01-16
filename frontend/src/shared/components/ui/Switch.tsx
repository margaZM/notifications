interface Item {
  id: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

interface TabsItems {
  principal: Item;
  secondary: Item;
}

interface SwitchProps {
  tabs: TabsItems;
}

export const Switch = ({ tabs }: SwitchProps) => {
  const getVariantActiveStyles = (active: boolean) => {
    return active
      ? "bg-primary-default text-white shadow-md shadow-gray-100"
      : "text-slate-500 hover:bg-slate-50";
  };
  return (
    <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm cursor-pointer">
      <button
        onClick={tabs.principal.onClick}
        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${getVariantActiveStyles(tabs.principal.active)}`}
      >
        {tabs.principal.label}
      </button>
      <button
        onClick={tabs.secondary.onClick}
        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${getVariantActiveStyles(tabs.secondary.active)}`}
      >
        {tabs.secondary.label}
      </button>
    </div>
  );
};
