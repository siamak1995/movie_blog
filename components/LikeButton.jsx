"use client";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function LikeButton() {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(99);

    return (
        <button
            onClick={() => {
                setLiked(!liked);
                setCount(liked ? count - 1 : count + 1);
            }}
            className={`group flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all duration-300 border ${
                liked
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-white hover:border-gray-300'
            }`}
        >
            <Heart
                size={20}
                className={`transition-all duration-300 ${liked ? 'fill-red-600 scale-110' : 'group-hover:scale-110'}`}
            />
            <span className="font-bold text-sm tabular-nums">{count}</span>
        </button>
    );
}
