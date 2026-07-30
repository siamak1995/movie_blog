"use client";

import HeroBanner from "@/components/HeroBanner";
import MovieCard from "@/components/MovieCard";
import { useMoviesWithTmdb } from "@/hooks/useMoviesWithTmdb";

// ترتیب نمایش ژانرهای فیلم
const GENRE_ORDER = [
    "اکشن",
    "درام",
    "جنایی",
    "معمایی",
    "علمی‌تخیلی",
    "فانتزی",
    "کمدی",
    "ترسناک",
    "ماجراجویی",
    "انیمیشن",
];

// بیشترین تعداد کارت قابل نمایش در هر بخش
const MAX_ITEMS = 12;

export default function HomeContent({ initialMovies }) {
    // دریافت اطلاعات کامل‌شده فیلم‌ها از TMDb
    const { movies } = useMoviesWithTmdb(initialMovies);

    // جدا کردن فیلم‌های ویژه برای بخش پیشنهاد سردبیر
    const featuredMovies = movies.filter((movie) => movie.isFeatured);

    // ساخت یک شیء برای نگهداری فیلم‌های هر ژانر
    const genreSections = {};

    // بررسی تمام فیلم‌ها و قرار دادن هر فیلم در ژانر مربوط به خودش
    movies.forEach((movie) => {
        // اگر فیلم ژانر نداشته باشد، در بخش سایر قرار می‌گیرد
        const genre = movie.genre || "سایر";

        // اگر این ژانر هنوز ساخته نشده باشد، یک آرایه خالی برای آن می‌سازیم
        if (!genreSections[genre]) {
            genreSections[genre] = [];
        }

        // اضافه کردن فیلم به لیست ژانر مربوط به خودش
        genreSections[genre].push(movie);
    });

    // مرتب کردن ژانرها بر اساس ترتیب مشخص‌شده در GENRE_ORDER
    const orderedGenres = [
        // اضافه کردن ژانرهای موجود بر اساس ترتیب اصلی
        ...GENRE_ORDER.filter((g) => genreSections[g]),

        // اضافه کردن ژانرهایی که داخل لیست ترتیب اصلی نیستند
        ...Object.keys(genreSections).filter((g) => !GENRE_ORDER.includes(g)),
    ];

    return (
        // بدنه اصلی صفحه خانه
        <div className="min-h-screen w-full bg-[#101010]" dir="rtl">

            {/*نمایش بنر اصلی در بالای صفحه*/}
            <HeroBanner movies={movies} />

            {/*محتوای اصلی صفحه*/}
            <main className="mx-auto max-w-[1800px] px-4 py-12 md:px-10">

                {/*نمایش بخش پیشنهاد سردبیر در صورت وجود فیلم ویژه*/}
                {featuredMovies.length > 0 && (
                    <section className="mb-14">
                        {/*عنوان و تعداد فیلم‌های ویژه*/}
                        <div className="mb-6 flex items-center justify-between">
                            {/*عنوان بخش پیشنهاد سردبیر*/}
                            <h2 className="text-3xl font-black text-white">
                                ⭐ پیشنهاد سردبیر
                            </h2>

                            {/*تعداد فیلم‌های موجود در بخش پیشنهاد سردبیر*/}
                            <span className="rounded-full bg-white/10 px-4 py-1 text-sm text-white/60">
                                {featuredMovies.length} عنوان
                            </span>
                        </div>

                        {/*چیدمان کارت‌های فیلم‌های ویژه*/}
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                            {/*نمایش حداکثر تعداد مشخص‌شده از فیلم‌های ویژه*/}
                            {featuredMovies
                                .slice(0, MAX_ITEMS)
                                .map((movie) => (
                                    // نمایش کارت هر فیلم ویژه
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                    />
                                ))}
                        </div>
                    </section>
                )}

                {/*ساخت یک بخش جداگانه برای هر ژانر*/}
                {orderedGenres.map((genre) => (
                    <section
                        key={genre}
                        className="mb-16"
                    >

                        {/*عنوان ژانر و تعداد فیلم‌های آن*/}
                        <div className="mb-6 flex items-center justify-between">

                            {/*نام ژانر*/}
                            <h2 className="text-3xl font-black text-white">
                                {genre}
                            </h2>

                            {/*تعداد فیلم‌های موجود در این ژانر*/}
                            <span className="rounded-full bg-white/10 px-4 py-1 text-sm text-white/60">
                                {genreSections[genre].length} عنوان
                            </span>

                        </div>

                        {/*چیدمان کارت‌های فیلم‌های این ژانر*/}
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

                            {/*نمایش حداکثر تعداد مشخص‌شده از فیلم‌های این ژانر*/}
                            {genreSections[genre]
                                .slice(0, MAX_ITEMS)
                                .map((movie) => (
                                    // نمایش کارت هر فیلم
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                    />
                                ))}

                        </div>

                    </section>
                ))}

            </main>

        </div>
    );
}
