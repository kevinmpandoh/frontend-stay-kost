// import React from "react";

// import dynamic from "next/dynamic";

// const ReactApexChart = dynamic(() => import("react-apexcharts"), {
//   ssr: false,
// });

// const Chart = () => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 flex-1 min-w-[0]">
//       <div className="flex justify-between items-center mb-4">
//         <div>
//           <p className="font-bold text-xl">Rp 7.000.000</p>
//           <p className="text-gray-500 text-sm">Total Kentungan</p>
//         </div>
//         <select
//           aria-label="Select time range"
//           className="border border-gray-300 rounded-md text-sm px-3 py-1 text-gray-700"
//         >
//           <option>Monthly</option>
//         </select>
//       </div>
//       <div className="relative w-full h-48">
//         {/* The chart lines and dots */}
//         <svg
//           viewBox="0 0 720 192"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-full h-full"
//         >
//           {/* Grid vertical lines */}
//           <line x1="90" y1="0" x2="90" y2="192" stroke="#E5E7EB" />
//           <line x1="180" y1="0" x2="180" y2="192" stroke="#E5E7EB" />
//           <line x1="270" y1="0" x2="270" y2="192" stroke="#E5E7EB" />
//           <line x1="360" y1="0" x2="360" y2="192" stroke="#E5E7EB" />
//           <line x1="450" y1="0" x2="450" y2="192" stroke="#E5E7EB" />
//           <line x1="540" y1="0" x2="540" y2="192" stroke="#E5E7EB" />
//           <line x1="630" y1="0" x2="630" y2="192" stroke="#E5E7EB" />

//           {/* Blue line */}
//           <path
//             d="M0 96C30 80 60 80 90 112C120 144 150 112 180 96C210 80 240 96 270 80C300 64 330 112 360 96C390 80 420 144 450 112C480 80 510 112 540 96C570 80 600 96 630 112C660 128 690 144 720 128"
//             stroke="#3B82F6"
//             strokeWidth="4"
//             strokeLinecap="round"
//           />
//           {/* Green line */}
//           <path
//             d="M0 128C30 112 60 96 90 80C120 64 150 112 180 144C210 176 240 144 270 112C300 80 330 112 360 144C390 176 420 144 450 112C480 80 510 112 540 144C570 176 600 144 630 112C660 80 690 96 720 112"
//             stroke="#059669"
//             strokeWidth="4"
//             strokeLinecap="round"
//           />
//           {/* Dot on blue line at x=450 */}
//           <circle cx="450" cy="112" r="8" fill="#3B82F6" />
//           {/* Tooltip */}
//           <rect
//             x="460"
//             y="80"
//             width="80"
//             height="30"
//             rx="6"
//             ry="6"
//             fill="white"
//             stroke="#E5E7EB"
//             strokeWidth="1"
//             filter="url(#shadow)"
//           />
//           <text
//             x="470"
//             y="100"
//             fill="#374151"
//             fontSize="14"
//             fontWeight="600"
//             fontFamily="Inter, sans-serif"
//           >
//             Oct 25
//           </text>
//           <text
//             x="530"
//             y="100"
//             fill="#374151"
//             fontSize="14"
//             fontWeight="600"
//             fontFamily="Inter, sans-serif"
//           >
//             $3,780
//           </text>
//           <defs>
//             <filter
//               id="shadow"
//               x="-20%"
//               y="-20%"
//               width="140%"
//               height="140%"
//               colorInterpolationFilters="sRGB"
//             >
//               <feDropShadow
//                 dx="0"
//                 dy="1"
//                 stdDeviation="1"
//                 floodColor="#000"
//                 floodOpacity="0.1"
//               />
//             </filter>
//           </defs>
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default Chart;
