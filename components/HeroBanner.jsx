"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Heart, ChevronRight, ChevronLeft } from "lucide-react";

export default function HeroBanner({ featuredMovies = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!featuredMovies || featuredMovies.length === 0) return null;

    const movie = featuredMovies[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    };

    const handlePrev = () => {
        setCurrentIndex(
            (prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length
        );
    };

    return (
        <section className="relative w-full mb-10 px-4 md:px-0" dir="rtl">
            <div
                className="relative w-full rounded-[2rem] overflow-hidden"
                style={{ height: "clamp(450px, 50vw, 600px)" }}
            >
                <Image
                    src={movie.bannerImage || movie.image || "/placeholder.jpg"}
                    alt={movie.titleFa || movie.title || "Movie banner"}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />

                <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent md:bg-gradient-to-r md:from-gray-950 md:via-gray-950/60 md:to-transparent" />

                <div className="absolute inset-0 z-20 flex max-w-3xl flex-col justify-end p-8 text-right md:justify-center md:p-16">
                    {movie.title && (
                        <h2 className="mb-1 font-sans text-lg font-medium uppercase tracking-widest text-white/50 md:text-2xl">
                            {movie.title}
                        </h2>
                    )}

                    <h1 className="mb-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                        {movie.titleFa || movie.title}
                    </h1>

                    <div className="mb-8 flex flex-wrap items-center gap-3">
                        {movie.ageRating && (
                            <span className="rounded-lg border border-orange-500/30 bg-orange-500/20 px-2 py-1 text-xs font-bold text-orange-400">
                {movie.ageRating}
              </span>
                        )}

                        {(movie.year || movie.duration) && (
                            <span className="text-sm font-medium text-white/80">
                {[movie.year, movie.duration].filter(Boolean).join(" • ")}
              </span>
                        )}

                        {movie.imdb && (
                            <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-2 py-1">
                <span className="text-sm font-bold text-yellow-400">
                  {movie.imdb}
                </span>
                                <span className="text-[10px] font-bold text-white/50">
                  IMDb
                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {movie.slug && (
                            <Link
                                href={`/movies/${movie.slug}`}
                                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 font-extrabold text-black shadow-xl transition-all hover:scale-105 hover:bg-blue-600 hover:text-white active:scale-95"
                            >
                                <Play size={20} className="fill-current" />
                                <span>مشاهده فیلم</span>
                            </Link>
                        )}

                        <button
                            type="button"
                            aria-label="افزودن به علاقه‌مندی‌ها"
                            className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md transition-all hover:bg-white/20"
                        >
                            <Heart size={24} className="text-white" />
                        </button>
                    </div>
                </div>

                {featuredMovies.length > 1 && (
                    <div className="absolute bottom-8 left-8 z-30 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="فیلم قبلی"
                            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-white backdrop-blur-xl transition-all hover:bg-white hover:text-black"
                        >
                            <ChevronRight size={24} />
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="فیلم بعدی"
                            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-white backdrop-blur-xl transition-all hover:bg-white hover:text-black"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
