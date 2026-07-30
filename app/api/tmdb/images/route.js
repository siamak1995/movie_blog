import { NextResponse } from "next/server";

// آدرس پایه API اصلی TMDb
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// این route فقط لیست تصاویر مربوط به فیلم/سریال را از TMDb دریافت می‌کند
export async function GET(request) {
    // خواندن query string از درخواست
    const { searchParams } = new URL(request.url);

    // شناسه فیلم یا سریال در TMDb
    const id = searchParams.get("id");

    // نوع محتوا؛ movie یا tv
    const type = searchParams.get("type") || "movie";

    // بدون id نمی‌توان تصاویر را از TMDb گرفت
    if (!id) {
        return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    try {
        // دریافت پوسترها و بک‌دراپ‌ها از TMDb
        const response = await fetch(
            `${TMDB_BASE_URL}/${type}/${id}/images?include_image_language=en,null`,
            {
                headers: {
                    // احراز هویت با توکن TMDb از env
                    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
                    accept: "application/json",
                },

                // جلوگیری از کش شدن پاسخ در سمت Next.js
                cache: "no-store",
            }
        );

        // تبدیل پاسخ به JSON
        const data = await response.json();

        // خروجی شامل posters و backdrops است
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        // خطاهای احتمالی ارتباط با TMDb مدیریت می‌شوند
        return NextResponse.json(
            { error: "Failed to fetch TMDb images", details: String(error) },
            { status: 500 }
        );
    }
}
