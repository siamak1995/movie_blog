"use client";

import { useEffect, useState } from "react";
import { getTmdbDetails, getTmdbImages, getTmdbImageUrl } from "@/lib/tmdb";

export function useMoviesWithTmdb(initialMovies = []) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadMovies() {
            if (!Array.isArray(initialMovies) || initialMovies.length === 0) {
                if (isMounted) {
                    setMovies([]);
                    setLoading(false);
                }
                return;
            }

            setMovies(initialMovies);

            let loadedCount = 0;

            initialMovies.forEach(async (movie) => {
                try {
                    const details = await getTmdbDetails(movie.tmdbId, movie.type);

                    let posterPath = details?.poster_path || "";
                    let backdropPath = details?.backdrop_path || "";

                    if (!posterPath || !backdropPath) {
                        try {
                            const images = await getTmdbImages(movie.tmdbId, movie.type);

                            posterPath ||= images?.posters?.[0]?.file_path || "";
                            backdropPath ||= images?.backdrops?.[0]?.file_path || "";
                        } catch (_) {}
                    }

                    if (!isMounted) return;

                    setMovies((prev) =>
                        prev.map((item) =>
                            item.id === movie.id
                                ? {
                                    ...item,
                                    image: posterPath
                                        ? getTmdbImageUrl(posterPath, "w500")
                                        : movie.image || "/images/placeholder.svg",
                                    bannerImage: backdropPath
                                        ? getTmdbImageUrl(backdropPath, "original")
                                        : movie.bannerImage || "/images/placeholder.svg",
                                    description:
                                        details?.overview || movie.description,
                                }
                                : item
                        )
                    );
                } catch (err) {
                    console.error("TMDb failed:", movie.title, err);
                } finally {
                    loadedCount++;

                    if (loadedCount === initialMovies.length && isMounted) {
                        setLoading(false);
                        setError("");
                    }
                }
            });
        }

        loadMovies();

        return () => {
            isMounted = false;
        };
    }, [initialMovies]);

    return { movies, loading, error };
}