// components/InfoRow.tsx

import React from "react";

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, icon }) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex gap-2">
        {icon && <span>{icon}</span>}
        <span className="font-medium w-40 text-gray-700">{label}</span>
      </div>
      <span className="text-gray-800">{value}</span>
    </div>
  );
};

export default InfoRow;
