// "use client";
// import Link from "next/link";
// import { Home, Flame, Calendar, LayoutGrid } from "lucide-react";
//
// export default function Sidebar({ isPinned }) {
//     const menuItems = [
//         { name: "صفحه اصلی", icon: <Home size={20} />, href: "/" },
//         { name: "محبوب‌ترین‌ها", icon: <Flame size={20} />, href: "#" },
//         { name: "تقویم اکران", icon: <Calendar size={20} />, href: "#" },
//         { name: "دسته‌بندی‌ها", icon: <LayoutGrid size={20} />, href: "#" },
//     ];
//
//     return (
//         <aside
//             className={`
//                 fixed top-0 right-0 h-full bg-white border-l border-gray-100 transition-all duration-500 ease-in-out
//                 ${isPinned ? "w-80 translate-x-0" : "w-80 translate-x-full"}
//                 z-[100] shadow-2xl /* عدد بسیار بالا برای اطمینان از قرارگیری روی محتوا */
//             `}
//         >
//             <div className="w-80 pt-28 px-6 text-right">
//                 <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] mb-8 uppercase">دسترسی سریع</p>
//                 <ul className="space-y-2">
//                     {menuItems.map((item, index) => (
//                         <li key={index}>
//                             <Link href={item.href} className="flex items-center justify-between p-4 rounded-2xl hover:bg-red-50 group transition-all">
//                                 <div className="flex items-center gap-4 flex-row-reverse">
//                                     <span className="font-bold text-gray-700 group-hover:text-red-600">{item.name}</span>
//                                     <span className="text-xl">{item.icon}</span>
//                                 </div>
//                                 <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">←</span>
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </aside>
//     );
// }
