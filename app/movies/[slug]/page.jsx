import { movies } from "@/app/api/movies/movies";
import { notFound } from "next/navigation";
import LikeButton from "@/components/LikeButton";
import Rating from "@/components/Rating";
import CommentSection from "@/components/CommentSection";
import { getTmdbImageUrl } from "@/lib/tmdb";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function getMovieDetails(tmdbId, type) {
    const mediaType = type === "series" ? "tv" : "movie";

    const res = await fetch(
        `${TMDB_BASE_URL}/${mediaType}/${tmdbId}?language=fa-IR`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
                accept: "application/json",
            },
            cache: "force-cache",
        }
    );

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export async function generateMetadata({ params }) {
    const { slug } = await params;

    const movie = movies.find(
        (m) => m.slug.toLowerCase() === slug.toLowerCase()
    );

    return {
        title: movie ? `${movie.title} | مووی‌لاگ` : "فیلم پیدا نشد",
    };
}

export default async function MoviePage({ params }) {
    const { slug } = await params;

    const movie = movies.find(
        (m) => m.slug.toLowerCase() === decodeURIComponent(slug).toLowerCase()
    );

    if (!movie) return notFound();

    const details = await getMovieDetails(movie.tmdbId, movie.type);

    const poster = details?.poster_path
        ? getTmdbImageUrl(details.poster_path, "w500")
        : movie.image || "/images/placeholder.svg";

    return (
        <main
            className="mx-auto mt-24 max-w-7xl px-5 pb-20"
            dir="rtl"
        >
            <article className="overflow-hidden rounded-3xl border border-white/10 bg-[#181818]">

                <div className="flex flex-col lg:flex-row">

                    <div className="w-full shrink-0 lg:w-[340px]">

                        <img
                            src={poster}
                            alt={movie.titleFa || movie.title}
                            className="h-full w-full object-cover"
                        />

                    </div>

                    <div className="flex-1 p-8 lg:p-12">

                        <h1 className="mb-6 text-4xl font-black text-white">
                            {movie.titleFa || movie.title}
                        </h1>

                        <div className="mb-8 flex flex-wrap gap-3">

                            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                                {movie.year}
                            </span>

                            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                                {movie.genre}
                            </span>

                            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                                {movie.director}
                            </span>

                            <span className="rounded-full bg-[#E50914] px-4 py-2 text-sm font-bold text-white">
                                IMDb {movie.imdb}
                            </span>

                        </div>

                        <p className="leading-9 text-white/80">
                            {details?.overview || movie.description}
                        </p>

                        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">

                            <div className="flex items-center gap-4">

                                <span className="font-bold text-white">
                                    این نقد مفید بود؟
                                </span>

                                <LikeButton />

                            </div>

                            <Rating />

                        </div>

                    </div>

                </div>

            </article>

            <section className="mt-16">
                <CommentSection movieId={movie.id} />
            </section>

        </main>
    );
}