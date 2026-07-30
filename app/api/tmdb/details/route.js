import { NextResponse } from "next/server";

// آدرس پایه API اصلی TMDb برای دریافت اطلاعات فیلم و سریال
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// این route جزئیات یک فیلم یا سریال را بر اساس id و type از TMDb دریافت می‌کند
export async function GET(request) {
    // خواندن پارامترهای query string از آدرس درخواست
    const { searchParams } = new URL(request.url);

    // شناسه TMDb فیلم یا سریال
    const id = searchParams.get("id");

    // نوع محتوا؛ اگر ارسال نشود، movie در نظر گرفته می‌شود
    const type = searchParams.get("type") || "movie";

    // بدون id امکان درخواست از TMDb وجود ندارد
    if (!id) {
        return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    try {
        // درخواست جزئیات فیلم/سریال از TMDb با زبان فارسی
        const response = await fetch(`${TMDB_BASE_URL}/${type}/${id}?language=fa-IR`, {
            headers: {
                // توکن TMDb از فایل env خوانده می‌شود و نباید داخل کد نوشته شود
                Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
                accept: "application/json",
            },

            // همیشه اطلاعات تازه از TMDb گرفته شود و کش نشود
            cache: "no-store",
        });

        // تبدیل پاسخ TMDb به JSON
        const data = await response.json();

        // همان status دریافتی از TMDb به کلاینت برگردانده می‌شود
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        // خطاهای شبکه، فیلترینگ، قطع اتصال یا مشکل fetch اینجا مدیریت می‌شوند
        return NextResponse.json(
            { error: "Failed to fetch TMDb details", details: String(error) },
            { status: 500 }
        );
    }
}
