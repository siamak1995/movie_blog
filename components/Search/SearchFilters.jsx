"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    getTmdbDetails,
    getTmdbImages,
    getTmdbImageUrl,
} from "@/lib/tmdb";

export default function SearchResultItem({ movie, onClick }) {

    // تصویر پوستر
    const [image, setImage] = useState(
        movie.image || "/images/placeholder.svg"
    );

    useEffect(() => {

        let mounted = true;

        async function loadImage() {

            // اگر قبلا تصویر وجود دارد
            if (movie.image) {
                setImage(movie.image);
                return;
            }

            try {

                const details = await getTmdbDetails(
                    movie.tmdbId,
                    movie.type
                );

                let posterPath = details?.poster_path || "";

                if (!posterPath) {

                    const images = await getTmdbImages(
                        movie.tmdbId,
                        movie.type
                    );

                    posterPath =
                        images?.posters?.[0]?.file_path || "";

                }

                if (!mounted) return;

                if (posterPath) {

                    setImage(
                        getTmdbImageUrl(
                            posterPath,
                            "w185"
                        )
                    );

                }

            } catch {

                if (mounted) {
                    setImage("/images/placeholder.svg");
                }

            }

        }

        loadImage();

        return () => {
            mounted = false;
        };

    }, [movie]);

    return (

        <Link
            href={`/movies/${movie.slug}`}
            onClick={onClick}
            className="flex items-center gap-3 border-b border-white/5 p-3 transition hover:bg-white/5 last:border-none"
        >

            <img
                src={image}
                alt={movie.title}
                className="h-16 w-11 shrink-0 rounded-lg object-cover bg-[#222]"
                loading="lazy"
                onError={(e) => {
                    e.currentTarget.src = "/images/placeholder.svg";
                }}
            />

            <div className="min-w-0 flex-1">

                <div className="truncate font-bold text-white">
                    {movie.titleFa || movie.title}
                </div>

                <div className="truncate text-xs text-white/45">
                    {movie.title}
                </div>

                <div className="mt-1 flex items-center gap-2 text-[11px] text-white/35">
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span>{movie.genre}</span>
                </div>

            </div>

        </Link>

    );

}