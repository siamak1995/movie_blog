"use client";
import { useState } from "react";
import { Send, MessageSquare, User, Clock, Star } from "lucide-react";
import { commentsData as initialComments } from "@/data/comments";

export default function CommentSection({ movieId }) {
    const movieComments = initialComments.filter(c => c.movieId === movieId);
    const [allComments, setAllComments] = useState(movieComments);
    const [newComment, setNewComment] = useState("");
    const [authorName, setAuthorName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim() || !authorName.trim()) return;
        const newCommentObj = {
            id: Date.now(),
            movieId: movieId,
            author: authorName,
            date: "همین الان",
            text: newComment,
            rating: 5
        };
        setAllComments([newCommentObj, ...allComments]);
        setNewComment("");
        setAuthorName("");
    };

    return (
        <div className="w-full mt-32 mb-20 clear-both inline-block" dir="rtl">
            <div className="flex items-center justify-between w-full mb-16 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-4">
                    <div className="w-2.5 h-10 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.4)]"></div>
                    <h3 className="text-3xl font-black text-gray-900">دیوار نظرات</h3>
                </div>
                <div className="bg-gray-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl">
                    <MessageSquare size={20} className="text-red-500" />
                    <span className="text-base font-black tabular-nums">{allComments.length} دیدگاه</span>
                </div>
            </div>

            {/* Form */}
            <div className="w-full mb-16 block bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 gap-6">
                        <input
                            type="text"
                            placeholder="نام و نام‌خانوادگی شما"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                            required
                        />
                        <textarea
                            placeholder="نظرتان را درباره این اثر بنویسید..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 min-h-[140px] text-sm font-medium outline-none focus:border-red-500 focus:bg-white transition-all resize-none text-gray-600 leading-8"
                            required
                        />
                    </div>

                    <div className="flex justify-start pt-2">
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700   text-white px-10 py-4 rounded-2xl font-black text-sm flex flex-row-reverse
                            items-center justify-center gap-4 transition-all active:scale-95 shadow-lg shadow-red-200/50 group"
                        >
                            <span>ثبت نظر نهایی</span>
                            <Send size={20} className="rotate-180" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Comments List */}
            <div className="flex flex-col gap-8 w-full">
                {allComments.map((comment) => (
                    <div key={comment.id} className="w-full bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 text-gray-400">
                                    <User size={28} />
                                </div>
                                <div>
                                    <h4 className="font-black text-gray-900 text-lg">{comment.author}</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1 font-bold">
                                        <Clock size={14} />
                                        <span>{comment.date}</span>
                                    </div>
                                </div>
                            </div>
                            {/* نمایش ستاره بر اساس ریتینگ موجود در دیتا */}
                            <div className="flex gap-0.5 text-yellow-400 bg-yellow-50/50 p-2 rounded-xl">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                        key={s}
                                        size={14}
                                        fill={s <= (comment.rating || 5) ? "currentColor" : "none"}
                                        className={s <= (comment.rating || 5) ? "" : "text-gray-200"}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="pr-5 border-r-4 border-red-500/10">
                            <p className="text-gray-600 text-sm leading-9 text-justify font-medium">
                                {comment.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
