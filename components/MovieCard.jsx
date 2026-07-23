"use client";
import Link from "next/link";
import { Star, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function MovieCard({ movie }) {
    const badgeColor = movie.type === 'series' ? 'bg-red-600 text-white' : 'bg-yellow-400 text-black';


    return (
        // ارسال اطلاعات فیلم برای صفحه نمایش جزئیات در صورت کلیک کردن روی پوستر فیلم
        <Link href={`/movies/${movie.slug}`} className="group block h-full">

            <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm
            hover:shadow-2xl
            transition-all
            duration-500 border
             border-gray-100 flex flex-col h-full">
                {/*پوستر فیلم*/}
                <div className="relative aspect-2/3 w-full overflow-hidden rounded-t-[2.5rem]">
                    {/*تصویر فیلم/سریال به صورت کامل*/}
                    <Image
                        src={movie.image}
                        alt={movie.title}
                        width={400}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/*نمایش نوع سرگرمی (فیلم یا سریال)*/}
                    <div className={`absolute top-6 -right-10 rotate-45 
                    w-32 
                    py-1 z-20 
                    text-center text-[10px] font-black 
                    shadow-md uppercase 
                    tracking-wider ${badgeColor}`}>
                        {movie.type === 'series' ? 'سریال' : 'فیلم'}
                    </div>

                    {/*سایه مشکی با شفافیت 90 برای جذابیت بیشتر*/}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                    {/*نمایش امتیاز imdb*/}
                    <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/15 flex items-center gap-1">
                        <span className="text-white text-xs font-bold">{movie.imdb}</span>
                        {/*آیکون ستاره*/}
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    </div>
                </div>
                {/*جزئیات فیلم یا سریال*/}
                <div className="p-6 flex flex-col flex-grow text-right bg-white rounded-b-[2.5rem]" dir="rtl">
                    <h3 className="text-base font-extrabold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1">
                        {movie.title}
                    </h3>

                    <div className="flex justify-between items-center mt-2 text-gray-400 text-[11px] font-medium">
                        <span>سال: {movie.year}</span>
                        <div className="flex items-center gap-1">
                            <MessageCircle size={13} />
                            <span>{movie.commentsCount || 0} نظر </span>
                        </div>
                    </div>

                    <div className="my-4 border-t border-gray-50"></div>

                    <div className="flex justify-between items-center mt-auto">
                        <span className="text-[11px] text-gray-400">امتیاز شما:</span>
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} size={13} className="text-gray-200 hover:text-yellow-400 transition-colors cursor-pointer" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
