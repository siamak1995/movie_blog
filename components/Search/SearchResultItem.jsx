"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTmdbDetails, getTmdbImages, getTmdbImageUrl } from "@/lib/tmdb";

// کامپوننت هر آیتم در نتایج جستجو
export default function SearchResultItem({ movie, onClick }) {
    // نگهداری تصویر پوستر؛ اگر تصویر نبود، placeholder نمایش داده می‌شود
    const [image, setImage] = useState(movie.image || "/images/placeholder.svg");

    // گرفتن تصویر فیلم از TMDb در صورتی که داخل دیتای خودمان تصویر نداشته باشد
    useEffect(() => {
        // برای جلوگیری از تغییر state بعد از خروج کامپوننت
        let mounted = true;

        // لود کردن تصویر پوستر فیلم یا سریال
        async function loadImage() {
            // اگر فیلم از قبل تصویر داشت، همان تصویر استفاده می‌شود
            if (movie.image) {
                setImage(movie.image);
                return;
            }

            try {
                // گرفتن جزئیات فیلم یا سریال از TMDb
                const details = await getTmdbDetails(movie.tmdbId, movie.type);

                // اولویت اول: پوستر اصلی داخل details
                let poster = details?.poster_path;

                // اگر پوستر اصلی نبود، از لیست تصاویر TMDb اولین پوستر را برمی‌داریم
                if (!poster) {
                    const images = await getTmdbImages(movie.tmdbId, movie.type);
                    poster = images?.posters?.[0]?.file_path;
                }

                // اگر کامپوننت هنوز فعال بود و پوستر پیدا شد، تصویر را ست می‌کنیم
                if (mounted && poster) {
                    setImage(getTmdbImageUrl(poster, "w185"));
                }
            } catch (_) {
                // اگر دریافت تصویر خطا داشت، همان تصویر پیش‌فرض باقی می‌ماند
            }
        }

        loadImage();

        // هنگام خروج کامپوننت، اجازه تغییر state نمی‌دهیم
        return () => {
            mounted = false;
        };
    }, [movie]);

    return (
        // لینک رفتن به صفحه جزئیات فیلم یا سریال
        <Link
            href={`/movies/${movie.slug}`}
            onClick={onClick}
            className="flex items-center gap-3 border-b border-white/5 p-3 hover:bg-white/5"
        >
            {/* تصویر پوستر فیلم یا سریال */}
            <img
                src={image}
                alt={movie.title}
                className="h-16 w-11 shrink-0 rounded-lg object-cover"
                onError={(e) => {
                    // اگر تصویر لود نشد، تصویر پیش‌فرض نمایش داده شود
                    e.currentTarget.src = "/images/placeholder.svg";
                }}
            />

            {/* اطلاعات متنی نتیجه جستجو */}
            <div className="min-w-0 flex-1">
                {/* عنوان فارسی */}
                <div className="truncate font-bold text-white">
                    {movie.titleFa}
                </div>

                {/* عنوان اصلی */}
                <div className="truncate text-xs text-white/40">
                    {movie.title}
                </div>

                {/* سال ساخت و ژانر */}
                <div className="mt-1 text-[11px] text-white/35">
                    {movie.year} • {movie.genre}
                </div>
            </div>
        </Link>
    );
}
