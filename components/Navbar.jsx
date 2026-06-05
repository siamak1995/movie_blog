"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar({ isPinned, setIsPinned }) {
    return (
        <nav className="fixed top-0 right-0 left-0 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 z-[200] flex items-center justify-between px-8">
            <div className="flex items-center gap-6">
                <button
                    onClick={() => setIsPinned(!isPinned)}
                    className="p-2 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all border border-gray-100"
                >
                    {isPinned ? <X size={24} /> : <Menu size={24} />}
                </button>

                <Link href="/" className="text-2xl font-black tracking-tighter text-red-600">
                    MOVIE<span className="text-black"> LOG</span>
                </Link>
            </div>

            <div>
                <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-red-600 transition-all shadow-lg shadow-gray-200">
                    عضویت 
                </button>
            </div>
        </nav>
    );
}
