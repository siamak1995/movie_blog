"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
    return (
        <html lang="fa" dir="rtl">
        <body className="bg-[#101010] text-white antialiased">
        <Navbar />

        <main className="min-h-screen pt-24">
            {children}
        </main>

        <Footer />
        </body>
        </html>
    );
}
