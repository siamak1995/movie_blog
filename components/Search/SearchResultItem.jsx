"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTmdbDetails, getTmdbImages, getTmdbImageUrl } from "@/lib/tmdb";

export default function SearchResultItem({ movie, onClick }) {

    const [image, setImage] = useState(movie.image || "/images/placeholder.svg");

    useEffect(() => {

        let mounted = true;

        async function loadImage() {

            if (movie.image) {
                setImage(movie.image);
                return;
            }

            try {

                const details = await getTmdbDetails(movie.tmdbId, movie.type);

                let poster = details?.poster_path;

                if (!poster) {
                    const images = await getTmdbImages(movie.tmdbId, movie.type);
                    poster = images?.posters?.[0]?.file_path;
                }

                if (mounted && poster) {
                    setImage(getTmdbImageUrl(poster, "w185"));
                }

            } catch (_) {}

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
            className="flex items-center gap-3 border-b border-white/5 p-3 hover:bg-white/5"
        >

            <img
                src={image}
                alt={movie.title}
                className="h-16 w-11 shrink-0 rounded-lg object-cover"
            />

            <div className="min-w-0 flex-1">

                <div className="truncate font-bold text-white">
                    {movie.titleFa}
                </div>

                <div className="truncate text-xs text-white/40">
                    {movie.title}
                </div>

                <div className="mt-1 text-[11px] text-white/35">
                    {movie.year} • {movie.genre}
                </div>

            </div>

        </Link>

    );

}