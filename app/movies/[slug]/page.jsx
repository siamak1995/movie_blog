import {movies} from "@/data/movies";
import {notFound} from "next/navigation";
import LikeButton from "@/components/LikeButton";
import Rating from "@/components/Rating";
import CommentSection from "@/components/CommentSection";
import Image from "next/image";

// تابع تولید متادیتا به صورت داینامیک
export async function generateMetadata({params}) {
    const {slug} = await params;
    const movie = movies.find(m => m.slug.toLowerCase() === slug.toLowerCase());

    return {
        title: movie ? `${movie.title} | مووی‌لاگ` : "فیلم پیدا نشد",
    };
}

// کامپوننت اصلی صفحه (Server Component)
export default async function MoviePage({params}) {
    const {slug} = await params;

    const movie = movies.find((m) =>
        m.slug.toLowerCase() === decodeURIComponent(slug).toLowerCase()
    );

    if (!movie) return notFound();

    return (
        <main className="max-w-6xl mx-auto p-6 mt-16 text-right" dir="rtl">
            <article className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    {/* بخش تصویر فیلم */}
                    <div className="w-full md:w-1/3 rounded-[2.5rem] overflow-hidden shadow-2xl shrink-0">
                        <Image
                            src={movie.image}
                            alt={movie.title}
                            width={400}
                            height={600}
                            className="w-full object-cover aspect-[2/3]"
                        />
                    </div>

                    {/* بخش جزئیات فیلم */}
                    <div className="flex-1 space-y-6">
                        <h1 className="text-5xl font-black text-gray-900 leading-tight">{movie.title}</h1>

                        <div className="flex flex-wrap items-center gap-4">
                            <span className="bg-red-50 text-red-600 px-5 py-2 rounded-2xl font-bold text-sm">
                                سال ساخت: {movie.year}
                            </span>
                            <span className="bg-yellow-50 text-yellow-700 px-5 py-2 rounded-2xl font-bold text-sm">
                                ژانر: {movie.genre}
                            </span>
                            <span className="bg-gray-100 text-gray-700 px-5 py-2 rounded-2xl font-bold text-sm">
                                کارگردان: {movie.director}
                            </span>
                        </div>

                        <p className="text-lg leading-loose text-gray-600 text-justify">
                            {movie.description}
                        </p>

                        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-gray-900">این نقد مفید بود؟</span>
                                <LikeButton/>
                            </div>
                            <Rating/>
                        </div>
                    </div>
                </div>
            </article>

            {/* بخش کامنت‌ها */}
            <section className="w-full py-20 border-t border-gray-100">
                <CommentSection movieId={movie.id}/>
            </section>
        </main>
    );
}
