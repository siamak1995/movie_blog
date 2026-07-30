"use client";

import { useEffect, useState } from "react";
import { getTmdbDetails, getTmdbImages, getTmdbImageUrl } from "@/lib/tmdb";

export function useMoviesWithTmdb(initialMovies = []) {
    // نگهداری لیست فیلم‌ها
    const [movies, setMovies] = useState([]);

    // وضعیت لود شدن اطلاعات
    const [loading, setLoading] = useState(true);

    // نگهداری متن خطا در صورت نیاز
    const [error, setError] = useState("");

    useEffect(() => {
        // برای جلوگیری از تغییر state بعد از خارج شدن کامپوننت از صفحه
        let isMounted = true;

        // تابع اصلی برای دریافت و کامل کردن اطلاعات فیلم‌ها
        async function loadMovies() {
            // اگر لیست اولیه معتبر یا دارای داده نباشد، لیست خالی نمایش داده می‌شود
            if (!Array.isArray(initialMovies) || initialMovies.length === 0) {
                if (isMounted) {
                    setMovies([]);
                    setLoading(false);
                }
                return;
            }

            // اول اطلاعات اولیه فیلم‌ها نمایش داده می‌شود
            setMovies(initialMovies);

            // شمارنده برای فهمیدن پایان لود شدن همه فیلم‌ها
            let loadedCount = 0;

            // دریافت اطلاعات تکمیلی برای هر فیلم از TMDb
            initialMovies.forEach(async (movie) => {
                try {
                    // دریافت جزئیات فیلم یا سریال از TMDb
                    const details = await getTmdbDetails(movie.tmdbId, movie.type);

                    // مسیر پوستر و بنر از اطلاعات جزئیات
                    let posterPath = details?.poster_path || "";
                    let backdropPath = details?.backdrop_path || "";

                    // اگر پوستر یا بنر در جزئیات نبود، از API تصاویر دریافت می‌شود
                    if (!posterPath || !backdropPath) {
                        try {
                            // دریافت لیست تصاویر فیلم یا سریال
                            const images = await getTmdbImages(movie.tmdbId, movie.type);

                            // انتخاب اولین پوستر موجود
                            posterPath ||= images?.posters?.[0]?.file_path || "";

                            // انتخاب اولین بنر موجود
                            backdropPath ||= images?.backdrops?.[0]?.file_path || "";
                        } catch (_) {}
                    }

                    // اگر کامپوننت از صفحه خارج شده باشد، ادامه نمی‌دهیم
                    if (!isMounted) return;

                    // به‌روزرسانی همان فیلم در لیست با اطلاعات جدید TMDb
                    setMovies((prev) =>
                        prev.map((item) =>
                            item.id === movie.id
                                ? {
                                    ...item,

                                    // ساخت آدرس تصویر پوستر یا استفاده از تصویر قبلی/جایگزین
                                    image: posterPath
                                        ? getTmdbImageUrl(posterPath, "w500")
                                        : movie.image || "/images/placeholder.svg",

                                    // ساخت آدرس تصویر بنر یا استفاده از تصویر قبلی/جایگزین
                                    bannerImage: backdropPath
                                        ? getTmdbImageUrl(backdropPath, "original")
                                        : movie.bannerImage || "/images/placeholder.svg",

                                    // استفاده از توضیحات TMDb در صورت وجود
                                    description:
                                        details?.overview || movie.description,
                                }
                                : item
                        )
                    );
                } catch (err) {
                    // ثبت خطا در کنسول بدون خراب کردن نمایش صفحه
                    console.error("TMDb failed:", movie.title, err);
                } finally {
                    // افزایش تعداد فیلم‌هایی که پردازش آن‌ها تمام شده است
                    loadedCount++;

                    // وقتی همه فیلم‌ها پردازش شدند، وضعیت loading تمام می‌شود
                    if (loadedCount === initialMovies.length && isMounted) {
                        setLoading(false);
                        setError("");
                    }
                }
            });
        }

        // اجرای تابع دریافت اطلاعات فیلم‌ها
        loadMovies();

        return () => {
            // هنگام خروج از صفحه، اجازه تغییر state داده نمی‌شود
            isMounted = false;
        };
    }, [initialMovies]);

    // خروجی hook برای استفاده در کامپوننت‌ها
    return { movies, loading, error };
}
