"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    getTmdbDetails,
    getTmdbImages,
    getTmdbImageUrl,
} from "@/lib/tmdb";

// آیتم تکی برای نمایش داخل نتایج جستجو
export default function SearchResultItem({ movie, onClick }) {
    // نگهداری تصویر پوستر
    // اگر داخل دیتای خودمان تصویر بود از همان استفاده می‌کنیم
    // در غیر این صورت تصویر پیش‌فرض نمایش داده می‌شود
    const [image, setImage] = useState(
        movie.image || "/images/placeholder.svg"
    );

    // دریافت تصویر از TMDb وقتی تصویر داخل دیتای خودمان وجود ندارد
    useEffect(() => {
        // برای جلوگیری از setState بعد از unmount شدن کامپوننت
        let mounted = true;

        // تابع لود تصویر پوستر
        async function loadImage() {
            // اگر قبلا تصویر وجود دارد، دیگر نیازی به درخواست از TMDb نیست
            if (movie.image) {
                setImage(movie.image);
                return;
            }

            try {
                // گرفتن جزئیات فیلم یا سریال از TMDb
                const details = await getTmdbDetails(
                    movie.tmdbId,
                    movie.type
                );

                // اولویت اول برای تصویر، poster_path داخل details است
                let posterPath = details?.poster_path || "";

                // اگر poster_path وجود نداشت، از لیست تصاویر TMDb استفاده می‌کنیم
                if (!posterPath) {
                    const images = await getTmdbImages(
                        movie.tmdbId,
                        movie.type
                    );

                    // اولین پوستر موجود را انتخاب می‌کنیم
                    posterPath =
                        images?.posters?.[0]?.file_path || "";
                }

                // اگر کامپوننت دیگر روی صفحه نبود، ادامه نده
                if (!mounted) return;

                // اگر مسیر پوستر پیدا شد، آدرس کامل تصویر ساخته و ذخیره می‌شود
                if (posterPath) {
                    setImage(
                        getTmdbImageUrl(
                            posterPath,
                            "w185"
                        )
                    );
                }
            } catch {
                // اگر گرفتن تصویر خطا داشت، تصویر پیش‌فرض نمایش داده می‌شود
                if (mounted) {
                    setImage("/images/placeholder.svg");
                }
            }
        }

        // اجرای تابع دریافت تصویر
        loadImage();

        // هنگام خروج کامپوننت، mounted را false می‌کنیم
        return () => {
            mounted = false;
        };
    }, [movie]);

    return (
        // لینک رفتن به صفحه جزئیات فیلم یا سریال
        <Link
            href={`/movies/${movie.slug}`}
            onClick={onClick}
            className="flex items-center gap-3 border-b border-white/5 p-3 transition hover:bg-white/5 last:border-none"
        >
            {/* تصویر پوستر نتیجه جستجو */}
            <img
                src={image}
                alt={movie.title}
                className="h-16 w-11 shrink-0 rounded-lg object-cover bg-[#222]"
                loading="lazy"
                onError={(e) => {
                    // اگر تصویر لود نشد، تصویر پیش‌فرض جایگزین شود
                    e.currentTarget.src = "/images/placeholder.svg";
                }}
            />

            {/* اطلاعات متنی فیلم یا سریال */}
            <div className="min-w-0 flex-1">
                {/* عنوان فارسی، اگر نبود عنوان اصلی نمایش داده می‌شود */}
                <div className="truncate font-bold text-white">
                    {movie.titleFa || movie.title}
                </div>

                {/* عنوان اصلی فیلم یا سریال */}
                <div className="truncate text-xs text-white/45">
                    {movie.title}
                </div>

                {/* سال ساخت و ژانر */}
                <div className="mt-1 flex items-center gap-2 text-[11px] text-white/35">
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span>{movie.genre}</span>
                </div>
            </div>
        </Link>
    );
}
