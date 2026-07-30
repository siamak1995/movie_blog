"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { movies } from "@/app/api/movies/movies";

export default function Navbar() {

    // متن جستجو
    const [search, setSearch] = useState("");

    // نتایج جستجو
    const results = useMemo(() => {

        if (!search.trim()) return [];

        const value = search.trim().toLowerCase();

        return movies
            .filter((movie) =>
                movie.title.toLowerCase().includes(value) ||
                movie.titleFa.includes(value) ||
                movie.genre.includes(value) ||
                movie.director.toLowerCase().includes(value)
            )
            .slice(0, 8);

    }, [search]);

    return (
        // منوی بالای سایت
        <nav
            className="fixed right-0 left-0 top-0 z-[200] border-b border-white/10 bg-[#0F0F0F]/95 backdrop-blur-md"
            dir="rtl"
        >
            <div className="mx-auto flex h-20 max-w-[1800px] items-center justify-between px-4 md:px-8 lg:px-10">

                {/* لوگو و منو */}
                <div className="flex items-center gap-8">

                    <Link
                        href="/"
                        className="text-2xl font-black tracking-tighter text-white"
                    >
                        Movie<span className="text-[#E50914]">Log</span>
                    </Link>

                    <ul className="hidden items-center gap-6 lg:flex">

                        <li>
                            <Link href="/" className="text-sm font-bold text-white">
                                خانه
                            </Link>
                        </li>

                        <li>
                            <Link href="/movies" className="text-sm font-bold text-white/60 hover:text-white">
                                فیلم‌ها
                            </Link>
                        </li>

                        <li>
                            <Link href="/series" className="text-sm font-bold text-white/60 hover:text-white">
                                سریال‌ها
                            </Link>
                        </li>

                        <li>
                            <Link href="/latest" className="text-sm font-bold text-white/60 hover:text-white">
                                تازه‌ها
                            </Link>
                        </li>

                    </ul>

                </div>

                {/* سمت راست */}
                <div className="flex items-center gap-4">

                    {/* باکس جستجو */}
                    <div className="relative hidden w-[380px] md:block">

                        {/* آیکون جستجو */}
                        <Search
                            size={18}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                        />

                        {/* ورودی */}
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="جستجوی فیلم، سریال، کارگردان..."
                            className="h-11 w-full rounded-full border border-white/10 bg-white/5 pr-11 pl-10 text-sm text-white placeholder:text-white/35 outline-none transition-all focus:border-[#E50914]"
                        />

                        {/* پاک کردن */}
                        {search && (
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

                        {/* لیست نتایج */}
                        {results.length > 0 && (

                            <div className="absolute top-[54px] right-0 left-0 overflow-hidden rounded-2xl border border-white/10 bg-[#191919] shadow-2xl">

                                {results.map((movie) => (

                                    <Link
                                        key={movie.id}
                                        href={`/movies/${movie.slug}`}
                                        onClick={() => setSearch("")}
                                        className="flex items-center gap-3 border-b border-white/5 p-3 transition hover:bg-white/5 last:border-none"
                                    >

                                        {/* پوستر */}
                                        <img
                                            src={movie.image || "/images/placeholder.svg"}
                                            alt={movie.title}
                                            className="h-16 w-11 rounded-lg object-cover"
                                        />

                                        {/* اطلاعات */}
                                        <div className="flex-1">

                                            <div className="font-bold text-white">
                                                {movie.titleFa}
                                            </div>

                                            <div className="mt-1 text-xs text-white/45">
                                                {movie.title}
                                            </div>

                                            <div className="mt-2 flex gap-2 text-[11px] text-white/35">
                                                <span>{movie.year}</span>
                                                <span>•</span>
                                                <span>{movie.genre}</span>
                                            </div>

                                        </div>

                                    </Link>

                                ))}

                            </div>

                        )}

                    </div>

                    {/* ورود */}
                    <button className="rounded-full bg-[#E50914] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#b80710]">
                        ورود / اشتراک
                    </button>

                </div>

            </div>
        </nav>
    );
}