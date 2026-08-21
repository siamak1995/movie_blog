"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { movies } from "@/app/api/movies/movies";
import SearchResultItem from "./Search/SearchResultItem";

// کامپوننت نوار بالای سایت
export default function Navbar() {
    // متن داخل سرچ
    const [search, setSearch] = useState("");

    // محاسبه نتایج جستجو بر اساس متن واردشده
    const results = useMemo(() => {
        // اگر چیزی وارد نشده باشد چیزی نمایش نده
        if (!search.trim()) return [];

        // یکدست کردن متن برای جستجوی راحت‌تر
        const value = search.trim().toLowerCase();

        // فیلتر کردن فیلم‌ها و سریال‌ها بر اساس عنوان، عنوان فارسی، ژانر و کارگردان
        return movies
            .filter((movie) =>
                movie.title.toLowerCase().includes(value) ||
                movie.titleFa.includes(value) ||
                movie.genre.includes(value) ||
                movie.director.toLowerCase().includes(value)
            )
            .slice(0, 8); // فقط 8 نتیجه اول نمایش داده شود
    }, [search]);

    return (
        // نوار اصلی بالای سایت
        <nav
            className="fixed right-0 left-0 top-0 z-[200] border-b border-white/10 bg-[#0F0F0F]/95 backdrop-blur-md"
            dir="rtl"
        >
            <div className="mx-auto flex h-20 max-w-[1800px] items-center justify-between px-4 md:px-8 lg:px-10">
                {/* بخش لوگو و منوها */}
                <div className="flex items-center gap-8">
                    {/* لوگوی سایت */}
                    <Link
                        href="/"
                        className="text-2xl font-black tracking-tighter text-white"
                    >
                        Movie{/* بخش قرمز نام تجاری سایت */}
                        <span className="text-[#E50914]">Log</span>
                    </Link>

                    {/* منوهای اصلی سایت */}
                    <ul className="hidden items-center gap-6 lg:flex">
                        {/* هر آیتم فهرست، یک گزینهٔ مستقل برای ناوبری است */}
                        <li>
                            {/* لینک بازگشت به صفحهٔ خانه */}
                            <Link href="/" className="text-sm font-bold text-white">
                                خانه
                            </Link>
                        </li>

                        {/* گزینهٔ ورود به فهرست فیلم‌ها */}
                        <li>
                            {/* لینک مسیر فیلم‌ها */}
                            <Link href="/movies" className="text-sm font-bold text-white/60 hover:text-white">
                                فیلم‌ها
                            </Link>
                        </li>

                        {/* گزینهٔ ورود به فهرست سریال‌ها */}
                        <li>
                            {/* لینک مسیر سریال‌ها */}
                            <Link href="/series" className="text-sm font-bold text-white/60 hover:text-white">
                                سریال‌ها
                            </Link>
                        </li>

                        {/* گزینهٔ نمایش تازه‌ترین محتوا */}
                        <li>
                            {/* لینک مسیر تازه‌ها */}
                            <Link href="/latest" className="text-sm font-bold text-white/60 hover:text-white">
                                تازه‌ها
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* بخش سمت چپ شامل سرچ و دکمه ورود */}
                <div className="flex items-center gap-4">
                    {/* باکس جستجو */}
                    <div className="relative hidden w-[380px] md:block">
                        {/* آیکون سرچ داخل باکس */}
                        {/* آیکون ثابت جست‌وجو داخل ورودی */}
                        <Search
                            size={18}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                        />

                        {/* اینپوت جستجو */}
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="جستجوی فیلم، سریال، کارگردان..."
                            className="h-11 w-full rounded-full border border-white/10 bg-white/5 pr-11 pl-10 text-sm text-white placeholder:text-white/35 outline-none transition-all focus:border-[#E50914]"
                        />

                        {/* دکمه پاک کردن متن سرچ */}
                        {search && (
                            /* این دکمه فقط هنگام وجود متن، جست‌وجو را پاک می‌کند */
                            <button
                                onClick={() => setSearch("")}
                                className="absolute left-3 top-1/2 -translate-y-1/2"
                            >
                                <X
                                    size={17}
                                    className="text-white/40 hover:text-white"
                                />
                            </button>
                        )}

                        {/* لیست نتایج جستجو */}
                        {results.length > 0 && (
                            <div className="absolute top-[54px] right-0 left-0 overflow-hidden rounded-2xl border border-white/10 bg-[#191919] shadow-2xl">
                                {results.map((movie) => (
                                    /* هر نتیجه به صفحهٔ جزئیات همان فیلم لینک می‌شود */
                                    <Link
                                        key={movie.id}
                                        href={`/movies/${movie.slug}`}
                                        onClick={() => setSearch("")}
                                        className="flex items-center gap-3 border-b border-white/5 p-3 transition hover:bg-white/5 last:border-none"
                                    >
                                        {/* جزئیات خلاصهٔ نتیجهٔ جست‌وجو */}
                                        <SearchResultItem
                                            key={movie.id}
                                            movie={movie}
                                            onClick={() => setSearch("")}
                                        />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* دکمه ورود یا اشتراک */}
                    <button className="rounded-full bg-[#E50914] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#b80710]">
                        ورود / اشتراک
                    </button>
                </div>
            </div>
        </nav>
    );
}
