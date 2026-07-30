"use client";

import Link from "next/link";
import { PlayCircle, Star } from "lucide-react";
import Image from "next/image";

export default function MovieCard({ movie }) {
    const imageSrc = movie?.image || movie?.bannerImage || "/images/placeholder.svg";
    const typeLabel = movie?.type === "series" || movie?.type === "tv" ? "سریال" : "فیلم";

    return (
        <Link href={`/movies/${movie.slug}`} className="group block h-full">
            <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#181818] transition-all duration-300 hover:border-white/20">
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-white/5">
                    <img
                        src={movie.image || "/images/placeholder.svg"}
                        alt={movie.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = "/images/placeholder.svg";
                        }}
                    />

                    <span className="absolute right-3 top-3 rounded-md bg-[#E50914] px-2 py-1 text-[10px] font-bold text-white">
                        {typeLabel}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <PlayCircle size={46} className="text-[#E50914]" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#181818] to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-4 text-right" dir="rtl">
                    <h3 className="line-clamp-1 text-sm font-black text-white">
                        {movie?.titleFa || movie?.title}
                    </h3>

                    <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1">
                            <Star size={14} className="fill-yellow-500 text-yellow-500" />
                            <span className="text-xs font-bold text-white/75">{movie?.imdb || "-"}</span>
                        </div>
                        <span className="text-xs text-white/45">{movie?.year || ""}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
