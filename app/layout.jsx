"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
    return (
        // ریشهٔ HTML با زبان فارسی و جهت راست‌به‌چپ برای کل برنامه
        <html lang="fa" dir="rtl">
        {/* بدنهٔ مشترک صفحات با رنگ زمینه و تنظیمات خوانایی متن */}
        <body className="bg-[#101010] text-white antialiased">
        {/* نوار ناوبری ثابت که در همهٔ صفحات نمایش داده می‌شود */}
        <Navbar />

        {/* ناحیهٔ اصلی برای قرار دادن محتوای هر مسیر */}
        <main className="min-h-screen pt-24">
            {children}
        </main>

        {/* پابرگ مشترک سایت در انتهای صفحه */}
        <Footer />
        </body>
        </html>
    );
}
