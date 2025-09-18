import { LucideIcon, Triangle } from "lucide-react";
import React from "react";

interface StatCardProps {
  icon: LucideIcon;
  iconBg: string;
  bgColor: string;
  title: string;
  value: number;
}

const StatCard = ({
  icon: Icon,
  iconBg,
  bgColor,
  title,
  value,
}: StatCardProps) => {
  return (
    <div
      className={`max-w-[270px] w-full bg-gradient-to-r ${bgColor} to-white border border-gray-300 rounded-md p-6 flex items-start justify-between`}
    >
      <div>
        <p className="text-base font-normal text-gray-800">{title}</p>
        <p className="text-2xl font-semibold text-[#111827] mt-1">{value}</p>
        <p className="text-sm font-semibold text-[#111827] mt-2">
          <span className="text-green-600 font-bold flex items-center gap-1">
            <Triangle size={14} className="text-primary" />
          </span>
          <span>+5000 Last 30 days users</span>
        </p>
      </div>
      <div>
        <div
          className={`${iconBg}  rounded-full w-12 h-12 flex items-center justify-center`}
        >
          <Icon className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;

// import React from "react";

// const StatCard = ({ icon, iconBg, title, value }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 min-w-[280px]">
//       <div
//         className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${iconBg}`}
//       >
//         {icon}
//       </div>
//       <div>
//         <p className="text-sm text-gray-700">{title}</p>
//         <p className="font-semibold text-2xl mt-1">{value}</p>
//       </div>
//     </div>
//   );
// };

// export default StatCard;
