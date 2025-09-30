// import React from "react";
// import ChatItem from "./ChatItem";
// import { SendHorizonal, X } from "lucide-react";

// const Messages = () => {
//   return (
//     <div>
//       <div className="flex max-w-4xl mx-auto h-[600px] border border-gray-200 rounded-lg overflow-hidden shadow-sm">
//         {/* Left panel */}
//         <div className="w-72 border-r border-gray-200 flex flex-col">
//           <div className="flex items-center justify-between px-6 py-4">
//             <h2 className="font-bold text-lg">Chat</h2>
//             <span className="text-xs font-semibold bg-gray-200 text-gray-700 rounded-md px-2 py-0.5 select-none">
//               4
//             </span>
//           </div>
//           <div className="px-4 pb-4">
//             <div className="relative text-gray-400">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
//               />
//               <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
//             </div>
//           </div>
//           <div className="flex-1 overflow-y-auto scrollbar-thin">
//             {/* Chat items */}
//             <ChatItem
//               imgSrc="https://placehold.co/40x40/png?text=Devid+Heilo+portrait+man+curly+hair+glasses"
//               altText="Portrait of a man with curly hair and glasses smiling"
//               name="Devid Heilo"
//               message="I cam across your  and..."
//               status="green"
//             />
//             <ChatItem
//               imgSrc="https://placehold.co/40x40/png?text=Henry+Fisher+portrait+woman+smiling"
//               altText="Portrait of a smiling woman with short hair"
//               name="Henry Fisher"
//               message="I like your confidence 💪"
//               status="green"
//               active
//             />
//             <ChatItem
//               imgSrc="https://placehold.co/40x40/png?text=Wilium+Smith+portrait+man+short+hair"
//               altText="Portrait of a man with short hair and black shirt"
//               name="Wilium Smith"
//               message="Can you share your offer?"
//               status="green"
//             />
//             <ChatItem
//               imgSrc="https://placehold.co/40x40/png?text=Henry+Deco+portrait+man+glasses"
//               altText="Portrait of a man with glasses and white shirt"
//               name="Henry Deco"
//               message="I'm waiting for you response!"
//               status="red"
//             />
//             <ChatItem
//               imgSrc="https://placehold.co/40x40/png?text=Jubin+Jack+portrait+woman+smiling"
//               altText="Portrait of a smiling woman with dark hair"
//               name="Jubin Jack"
//               message="I'm waiting for you response!"
//               status="green"
//             />
//           </div>
//         </div>

//         {/* Right panel */}
//         <div className="flex-1 flex flex-col">
//           {/* Header */}
//           <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
//             <div className="flex items-center space-x-4">
//               <img
//                 src="https://placehold.co/40x40/png?text=Kost+Vinshi+portrait+man+dark+hair"
//                 alt="Portrait of a man with dark hair and blue shirt"
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               <div>
//                 <p className="font-semibold text-gray-900">Kost Vinshi</p>
//                 <p className="text-sm text-gray-400">Reply to message</p>
//               </div>
//             </div>
//             <button
//               aria-label="Close chat"
//               className="text-gray-400 hover:text-gray-600 focus:outline-none"
//               onClick={onclose}
//             >
//               <X />
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 text-sm text-gray-700">
//             {/* Message 1 */}
//             <div>
//               <p className="mb-1 font-semibold text-gray-700">Andri Thomas</p>
//               <p className="inline-block bg-gray-100 rounded-lg px-4 py-3 max-w-[70%]">
//                 I want to make an appointment tomorrow from 2:00 to 5:00pm?
//               </p>
//               <p className="mt-1 text-xs text-gray-400">1:55pm</p>
//             </div>

//             {/* Message 2 */}
//             <div className="flex justify-start flex-col max-w-[70%]">
//               <p className="bg-blue-600 text-white rounded-lg px-4 py-3">
//                 Hello, Thomas! I will check the schedule and inform you
//               </p>
//               <p className="mt-1 text-xs text-gray-400 self-end">1:58pm</p>
//             </div>

//             {/* Message 3 */}
//             <div>
//               <p className="mb-1 font-semibold text-gray-700">Andri Thomas</p>
//               <p className="inline-block bg-gray-100 rounded-lg px-4 py-3 max-w-[70%] text-gray-500">
//                 Ok, Thanks for your reply.
//               </p>
//               <p className="mt-1 text-xs text-gray-400">1:59pm</p>
//             </div>

//             {/* Message 4 */}
//             <div className="flex justify-start flex-col max-w-[70%]">
//               <p className="bg-blue-600 text-white rounded-lg px-4 py-3">
//                 You are welcome!
//               </p>
//               <p className="mt-1 text-xs text-gray-400 self-end">2:00pm</p>
//             </div>
//           </div>

//           {/* Input */}
//           <form className="border-t border-gray-200 px-6 py-3 flex items-center space-x-3">
//             <input
//               type="text"
//               placeholder="Type something here..."
//               className="flex-1 border border-gray-300 rounded-lg py-2 px-3 text-sm text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
//             />
//             <button
//               type="button"
//               className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 flex items-center justify-center"
//               aria-label="Send message"
//             >
//               <SendHorizonal size={18} />
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;
