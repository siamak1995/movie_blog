"use client";
import { useState } from "react";
import { Star } from "lucide-react";

export default function Rating() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 direction-ltr">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className="transition-transform active:scale-90"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <Star
                            size={24}
                            className={`transition-colors duration-200 ${
                                star <= (hover || rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-200"
                            }`}
                        />
                    </button>
                ))}

                {rating > 0 && (
                    <span className="mr-3 text-xs font-black bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg">
                        {rating} از ۵
                    </span>
                )}
            </div>
            <p className="text-[10px] text-gray-400 font-medium mr-1">امتیاز شما به این اثر</p>
        </div>
    );
}
