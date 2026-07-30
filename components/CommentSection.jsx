"use client";

import { useMemo, useState } from "react";
import { Send, MessageSquare, User, Clock, Star } from "lucide-react";
import { commentsData as initialComments } from "@/data/comments";

// کامپوننت بخش نظرات هر فیلم یا سریال
export default function CommentSection({ movieId }) {
    // نگهداری همه نظرات
    const [allComments, setAllComments] = useState(initialComments);

    // متن نظر جدید
    const [newComment, setNewComment] = useState("");

    // نام کاربر
    const [authorName, setAuthorName] = useState("");

    // امتیاز کاربر برای نظر جدید
    const [rating, setRating] = useState(5);

    // گرفتن فقط نظرهای مربوط به همین فیلم یا سریال
    const movieComments = useMemo(() => {
        return allComments.filter((comment) => Number(comment.movieId) === Number(movieId));
    }, [allComments, movieId]);

    // بررسی آماده بودن فرم برای ثبت
    const canSubmit = authorName.trim() && newComment.trim();

    // ثبت نظر جدید
    const handleSubmit = (e) => {
        e.preventDefault();

        // اگر نام یا متن نظر خالی بود، ثبت انجام نشود
        if (!canSubmit) return;

        // ساخت آبجکت نظر جدید
        const newCommentObj = {
            id: Date.now(),
            movieId: Number(movieId),
            author: authorName.trim(),
            date: "همین الان",
            text: newComment.trim(),
            rating
        };

        // اضافه کردن نظر جدید به اول لیست
        setAllComments((prev) => [newCommentObj, ...prev]);

        // خالی کردن فرم بعد از ثبت
        setNewComment("");
        setAuthorName("");
        setRating(5);
    };

    return (
        // باکس اصلی بخش نظرات
        <section className="w-full mt-32 mb-20 clear-both" dir="rtl">
            {/* هدر بخش نظرات */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between w-full mb-10 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-4">
                    <div className="w-2.5 h-10 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.4)]" />

                    <div>
                        <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                            دیوار نظرات
                        </h3>

                        <p className="mt-2 text-sm text-gray-400 font-medium">
                            نظر کاربران درباره این اثر
                        </p>
                    </div>
                </div>

                {/* تعداد دیدگاه‌ها */}
                <div className="w-fit bg-gray-900 text-white px-5 py-3 rounded-2xl flex items-center gap-3 shadow-xl">
                    <MessageSquare size={20} className="text-red-500" />
                    <span className="text-sm sm:text-base font-black tabular-nums">
                        {movieComments.length} دیدگاه
                    </span>
                </div>
            </div>

            {/* فرم ثبت نظر */}
            <div className="w-full mb-14 bg-white border border-gray-200 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* عنوان فرم */}
                    <div>
                        <h4 className="text-xl font-black text-gray-900">
                            نظر خودت را ثبت کن
                        </h4>

                        <p className="mt-2 text-sm text-gray-400 font-medium">
                            نام، امتیاز و دیدگاهت را وارد کن
                        </p>
                    </div>

                    {/* فیلد نام */}
                    <input
                        type="text"
                        placeholder="نام و نام‌خانوادگی شما"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800 placeholder:text-gray-400"
                        required
                    />

                    {/* انتخاب امتیاز */}
                    <div className="flex flex-col gap-3">
                        <span className="text-sm font-black text-gray-800">
                            امتیاز شما
                        </span>

                        <div className="flex items-center gap-2 direction-ltr">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="transition-transform active:scale-90"
                                >
                                    {/* ستاره‌های امتیازدهی */}
                                    <Star
                                        size={24}
                                        fill={star <= rating ? "currentColor" : "none"}
                                        className={star <= rating ? "text-yellow-400" : "text-gray-200"}
                                    />
                                </button>
                            ))}

                            <span className="mr-3 text-xs font-black bg-yellow-50 text-yellow-600 px-3 py-1.5 rounded-xl">
                                {rating} از ۵
                            </span>
                        </div>
                    </div>

                    {/* متن نظر */}
                    <div className="relative">
                        <textarea
                            placeholder="نظرتان را درباره این اثر بنویسید..."
                            value={newComment}
                            maxLength={500}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 min-h-[150px] text-sm font-medium outline-none focus:border-red-500 focus:bg-white transition-all resize-none text-gray-600 leading-8 placeholder:text-gray-400"
                            required
                        />

                        {/* شمارنده متن نظر */}
                        <span className="absolute left-5 bottom-4 text-xs text-gray-400 font-bold tabular-nums">
                            {newComment.length}/500
                        </span>
                    </div>

                    {/* دکمه ثبت */}
                    <div className="flex justify-start pt-2">
                        <button
                            type="submit"
                            disabled={!canSubmit}
                            className={`text-white px-10 py-4 rounded-2xl font-black text-sm flex flex-row-reverse items-center justify-center gap-4 transition-all active:scale-95 shadow-lg group ${
                                canSubmit
                                    ? "bg-red-600 hover:bg-red-700 shadow-red-200/50"
                                    : "bg-gray-300 cursor-not-allowed shadow-none"
                            }`}
                        >
                            <span>ثبت نظر نهایی</span>
                            <Send size={20} className="rotate-180" />
                        </button>
                    </div>
                </form>
            </div>

            {/* لیست نظرات */}
            <div className="flex flex-col gap-6 w-full">
                {/* اگر نظری وجود نداشت */}
                {movieComments.length === 0 && (
                    <div className="w-full bg-gray-50 border border-dashed border-gray-200 p-10 rounded-[2rem] text-center">
                        <MessageSquare size={34} className="mx-auto text-gray-300 mb-4" />

                        <p className="text-gray-500 font-bold">
                            هنوز نظری برای این اثر ثبت نشده است.
                        </p>

                        <p className="mt-2 text-sm text-gray-400">
                            اولین نفر باش که نظرش را می‌نویسد.
                        </p>
                    </div>
                )}

                {/* نمایش تک تک نظرات */}
                {movieComments.map((comment) => (
                    <article
                        key={comment.id}
                        className="w-full bg-white border border-gray-100 p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-start mb-6">
                            {/* اطلاعات کاربر */}
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 text-gray-400">
                                    <User size={28} />
                                </div>

                                <div>
                                    <h4 className="font-black text-gray-900 text-lg">
                                        {comment.author}
                                    </h4>

                                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1 font-bold">
                                        <Clock size={14} />
                                        <span>{comment.date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* نمایش امتیاز نظر */}
                            <div className="w-fit flex gap-0.5 text-yellow-400 bg-yellow-50 p-2 rounded-xl">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={15}
                                        fill={star <= (comment.rating || 5) ? "currentColor" : "none"}
                                        className={star <= (comment.rating || 5) ? "" : "text-gray-200"}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* متن نظر */}
                        <div className="pr-5 border-r-4 border-red-500/10">
                            <p className="text-gray-600 text-sm leading-9 text-justify font-medium">
                                {comment.text}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
