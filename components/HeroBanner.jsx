"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Info, Play } from "lucide-react";

const AUTO_SLIDE_DELAY = 6000;

const HeroBanner = ({ movies = [] }) => {
    // فقط فیلم‌ها و سریال‌های ویژه برای اسلایدر
    const featuredMovies = useMemo(() => {
        return movies.filter((movie) => movie.isFeatured);
    }, [movies]);

    // اندیس اسلاید جاری
    const [currentIndex, setCurrentIndex] = useState(0);

    // جلوگیری از خطا هنگام خالی بودن لیست
    useEffect(() => {
        if (currentIndex >= featuredMovies.length) {
            setCurrentIndex(0);
        }
    }, [featuredMovies, currentIndex]);

    // اسلاید خودکار
    useEffect(() => {
        if (featuredMovies.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
        }, AUTO_SLIDE_DELAY);

        return () => clearInterval(timer);
    }, [featuredMovies]);

    // در صورت نبود فیلم ویژه
    if (!featuredMovies.length) return null;

    // فیلم جاری
    const movie = featuredMovies[currentIndex];

    // تصویر پس زمینه
    const bannerSrc =
        movie.bannerImage ||
        movie.image ||
        "/images/placeholder.svg";

    // رفتن به اسلاید بعد
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    };

    // رفتن به اسلاید قبل
    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? featuredMovies.length - 1 : prev - 1
        );
    };

    return (
        // سکشن اصلی بنر
        <section
            className="relative h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] w-full overflow-hidden bg-[#0F0F0F]"
            dir="rtl"
        >
            {/* تصویر پس زمینه */}
            <img
                key={movie.id}
                src={bannerSrc}
                alt={movie.titleFa || movie.title}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
                onError={(e) => {
                    e.currentTarget.src = "/images/placeholder.svg";
                }}
            />

            {/* لایه تاریک */}
            <div className="absolute inset-0 bg-black/35" />

            {/* گرادینت پایین */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/30 to-transparent" />

            {/* محتوای بنر */}
            <div className="absolute inset-0 z-10 flex items-end">
                <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 pb-10 sm:pb-14 md:pb-20 lg:pb-24">

                    {/* عنوان */}
                    <h1 className="mb-4 max-w-2xl text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                        {movie.titleFa || movie.title}
                    </h1>

                    {/* توضیحات */}
                    <p className="mb-8 max-w-2xl text-sm leading-8 text-white/80 md:text-base">
                        {movie.description}
                    </p>

                    {/* اطلاعات فیلم */}
                    <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-white/75">

                        <span className="rounded-full bg-white/10 px-3 py-1">
                            ⭐ {movie.imdb}
                        </span>

                        <span>{movie.year}</span>

                        <span>{movie.genre}</span>

                        <span>{movie.duration}</span>

                        <span>{movie.ageRating}</span>

                    </div>

                    {/* دکمه ها */}
                    <div className="flex flex-wrap gap-4">

                        <button
                            className="flex items-center gap-2 rounded-lg bg-[#E50914] px-5 py-2 font-bold text-white transition-all hover:bg-[#b80710] sm:px-6 sm:py-3 lg:px-8"
                        >
                            <Play size={20} fill="currentColor" />
                            پخش فیلم
                        </button>

                        <button
                            className="flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2 font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 sm:px-6 sm:py-3 lg:px-8"
                        >
                            <Info size={20} />
                            اطلاعات بیشتر
                        </button>

                    </div>
                </div>
            </div>

            {/* دکمه قبلی */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-all hover:bg-black/70"
            >
                <ChevronLeft size={26} />
            </button>

            {/* دکمه بعدی */}
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-all hover:bg-black/70"
            >
                <ChevronRight size={26} />
            </button>

            {/* نشانگر اسلاید */}
            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">

                {featuredMovies.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-3 rounded-full transition-all duration-300 ${
                            currentIndex === index
                                ? "w-10 bg-[#E50914]"
                                : "w-3 bg-white/40"
                        }`}
                    />
                ))}

            </div>
        </section>
    );
};

export default HeroBanner;