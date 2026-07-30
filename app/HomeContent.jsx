"use client";

import HeroBanner from "@/components/HeroBanner";
import MovieCard from "@/components/MovieCard";
import { useMoviesWithTmdb } from "@/hooks/useMoviesWithTmdb";

/**
 * ترتیب نمایش دسته‌ها
 * هر ژانری که داخل دیتابیس وجود داشته باشد
 * به صورت خودکار نمایش داده می‌شود.
 */
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

/**
 * تعداد کارت هر ردیف
 */
const MAX_ITEMS = 12;

export default function HomeContent({ initialMovies }) {
    const { movies } = useMoviesWithTmdb(initialMovies);

    /**
     * فیلم‌های ویژه
     */
    const featuredMovies = movies.filter((movie) => movie.isFeatured);

    /**
     * گروه‌بندی فیلم‌ها بر اساس ژانر
     */
    const genreSections = {};

    movies.forEach((movie) => {
        const genre = movie.genre || "سایر";

        if (!genreSections[genre]) {
            genreSections[genre] = [];
        }

        genreSections[genre].push(movie);
    });

    /**
     * مرتب‌سازی ژانرها
     */
    const orderedGenres = [
        ...GENRE_ORDER.filter((g) => genreSections[g]),
        ...Object.keys(genreSections).filter((g) => !GENRE_ORDER.includes(g)),
    ];

    return (
        <div className="min-h-screen w-full bg-[#101010]" dir="rtl">

            {/* بنر بالای صفحه */}
            <HeroBanner movies={movies} />

            <main className="mx-auto max-w-[1800px] px-4 py-12 md:px-10">

                {/* پیشنهاد سردبیر */}
                {featuredMovies.length > 0 && (
                    <section className="mb-14">

                        <div className="mb-6 flex items-center justify-between">

                            <h2 className="text-3xl font-black text-white">
                                ⭐ پیشنهاد سردبیر
                            </h2>

                            <span className="rounded-full bg-white/10 px-4 py-1 text-sm text-white/60">
                                {featuredMovies.length} عنوان
                            </span>

                        </div>

                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

                            {featuredMovies
                                .slice(0, MAX_ITEMS)
                                .map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                    />
                                ))}

                        </div>

                    </section>
                )}

                {/* نمایش فیلم‌ها بر اساس ژانر */}
                {orderedGenres.map((genre) => (
                    <section
                        key={genre}
                        className="mb-16"
                    >

                        {/* عنوان ژانر */}
                        <div className="mb-6 flex items-center justify-between">

                            <h2 className="text-3xl font-black text-white">
                                {genre}
                            </h2>

                            <span className="rounded-full bg-white/10 px-4 py-1 text-sm text-white/60">
                                {genreSections[genre].length} عنوان
                            </span>

                        </div>

                        {/* لیست فیلم‌ها */}
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

                            {genreSections[genre]
                                .slice(0, MAX_ITEMS)
                                .map((movie) => (
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