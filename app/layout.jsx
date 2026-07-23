"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "./globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
    const [isPinned, setIsPinned] = useState(true);

    return (
        <html lang="fa" dir="rtl">
        <body className="bg-[#fcfcfc] text-gray-900">
        <Navbar isPinned={isPinned} setIsPinned={setIsPinned}/>

        <div className="flex">
            <Sidebar isPinned={isPinned}/>

            <main
                className={`
                            flex-1 min-h-screen pt-24 px-6 md:px-12 transition-all duration-500 ease-in-out
                            ${isPinned ? "mr-80" : "mr-0"}
                        `}
            >
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
                <Footer/>
            </main>
        </div>
        </body>

        </html>
    );
}
