"use client";

import { useState } from "react";
import { Star } from "lucide-react";

// کامپوننت ثبت امتیاز توسط کاربر
export default function Rating() {
    // نگهداری امتیازی که کاربر ثبت کرده است
    const [rating, setRating] = useState(0);

    // نگهداری شماره ستاره‌ای که ماوس روی آن قرار دارد
    const [hover, setHover] = useState(0);

    return (
        // باکس اصلی بخش امتیازدهی
        <div className="flex flex-col gap-2">
            {/* بخش نمایش و انتخاب ستاره‌ها */}
            <div className="flex items-center gap-1.5 direction-ltr">
                {/* ساخت پنج ستاره برای انتخاب امتیاز */}
                {[1, 2, 3, 4, 5].map((star) => (
                    /* هر دکمه یک امتیاز ستاره‌ای قابل انتخاب را نمایش می‌دهد */
                    <button
                        key={star}
                        type="button"
                        className="transition-transform active:scale-90"

                        // ثبت امتیاز با کلیک روی ستاره
                        onClick={() => setRating(star)}

                        // روشن کردن ستاره‌ها هنگام رفتن ماوس روی آن‌ها
                        onMouseEnter={() => setHover(star)}

                        // خاموش کردن حالت موقت بعد از خارج شدن ماوس
                        onMouseLeave={() => setHover(0)}
                    >
                        {/* آیکون هر ستاره */}
                        <Star
                            size={24}
                            className={`transition-colors duration-200 ${
                                // روشن کردن ستاره‌های قبل از امتیاز انتخاب‌شده
                                star <= (hover || rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-200"
                            }`}
                        />
                    </button>
                ))}

                {/* نمایش عدد امتیاز بعد از انتخاب ستاره */}
                {rating > 0 && (
                    <span className="mr-3 text-xs font-black bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg">
                        {rating} از ۵
                    </span>
                )}
            </div>

            {/* متن راهنمای بخش امتیازدهی */}
            <p className="text-[10px] text-gray-400 font-medium mr-1">
                امتیاز شما به این اثر
            </p>
        </div>
    );
}
