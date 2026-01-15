import React from "react";

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  noBorder?: boolean;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick, noBorder = false }) => {
  return (
    <div
      className="w-full sm:w-20 flex flex-col items-center gap-2 group cursor-pointer select-none active:scale-95 transition-transform"
      onClick={onClick}>
      {/* Icon container */}
      <div
        className={`w-12 h-12 flex items-center justify-center ${
          noBorder ? "bg-transparent" : "bg-[#111] border border-gray-800"
        } text-gray-500 group-hover:bg-white ${
          noBorder ? "" : "group-hover:border-white"
        } group-hover:text-black transition-all duration-150`}>
        {icon}
      </div>

      {/* Label */}
      <span className="text-[9px] text-center text-gray-500 px-1.5 py-0.5 font-mono tracking-wider uppercase group-hover:bg-white group-hover:text-black transition-colors">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
