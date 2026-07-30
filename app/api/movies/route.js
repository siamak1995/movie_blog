// app/api/movies/route.js
import { NextResponse } from "next/server";

// این route یک API عمومی‌تر برای گرفتن جزئیات فیلم/سریال از TMDb است
// از نظر وظیفه خیلی شبیه app/api/tmdb/details/route.js است
export async function GET(request) {
    // خواندن پارامترهای query string
    const { searchParams } = new URL(request.url);

    // شناسه TMDb فیلم یا سریال
    const tmdbId = searchParams.get("id");

    // نوع محتوا؛ movie یا tv
    const type = searchParams.get("type") || "movie";

    // بدون id نمی‌توان اطلاعات فیلم را دریافت کرد
    if (!tmdbId) {
        return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    // آدرس پایه API اصلی TMDb
    const TMDB_BASE_URL = "https://api.themoviedb.org/3";

    try {
        // دریافت جزئیات فیلم/سریال از TMDb با زبان فارسی
        const res = await fetch(`${TMDB_BASE_URL}/${type}/${tmdbId}?language=fa-IR`, {
            headers: {
                // توکن TMDb از env خوانده می‌شود
                Authorization: `Bearer ${process.env.TMDB_TOKEN}`,

                // اعلام نوع داده درخواستی/ارسالی
                "Content-Type": "application/json",
            },
        });

        // تبدیل پاسخ TMDb به JSON
        const data = await res.json();

        // برگرداندن داده به کلاینت
        return NextResponse.json(data);
    } catch (error) {
        // مدیریت خطاهای شبکه یا مشکل ارتباط با TMDb
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}
