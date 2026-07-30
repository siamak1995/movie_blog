"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

// کامپوننت دکمه لایک
export default function LikeButton() {
    // وضعیت لایک شدن یا نشدن
    const [liked, setLiked] = useState(false);

    // تعداد لایک‌ها
    const [count, setCount] = useState(99);

    return (
        // دکمه اصلی لایک
        <button
            onClick={() => {
                // تغییر وضعیت لایک
                setLiked(!liked);

                // اگر لایک شده بود یکی کم کن، اگر نشده بود یکی اضافه کن
                setCount(liked ? count - 1 : count + 1);
            }}
            className={`group flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all duration-300 border ${
                // تغییر ظاهر دکمه بر اساس وضعیت لایک
                liked
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "bg-gray-50 border-gray-100 text-gray-500 hover:bg-white hover:border-gray-300"
            }`}
        >
            {/* آیکون قلب */}
            <Heart
                size={20}
                className={`transition-all duration-300 ${
                    // پر شدن قلب در حالت لایک شده
                    liked ? "fill-red-600 scale-110" : "group-hover:scale-110"
                }`}
            />

            {/* نمایش تعداد لایک‌ها */}
            <span className="font-bold text-sm tabular-nums">{count}</span>
        </button>
    );
}
