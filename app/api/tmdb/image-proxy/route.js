import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

// لیست هاست‌ها برای تلاش اول و دوم
const PRIMARY_HOSTS = ["https://image.tmdb.org/t/p", "https://media.themoviedb.org/t/p"];
const FALLBACK_URL = "https://images.weserv.nl/?url=";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const imagePath = searchParams.get("path");
    const size = searchParams.get("size") || "w500";

    if (!imagePath || imagePath === "null" || imagePath === "undefined") {
        return NextResponse.redirect(new URL("/images/placeholder.svg", req.url));
    }

    const fileName = `${size}_${imagePath.split("/").pop()}`;
    const saveDir = path.join(process.cwd(), "public", "images", "movieImages");
    const saveFile = path.join(saveDir, fileName);

    // ۱. چک کردن کش محلی
    try {
        await fs.access(saveFile);
        return NextResponse.redirect(new URL(`/images/movieImages/${fileName}`, req.url));
    } catch {}

    // ایجاد پوشه در صورت عدم وجود
    try { await fs.mkdir(saveDir, { recursive: true }); } catch {}

    let buffer = null;
    let contentType = "image/jpeg";

    // ۲. تلاش برای دانلود از TMDb (مستقیم)
    for (const host of PRIMARY_HOSTS) {
        try {
            const res = await fetch(`${host}/${size}${imagePath}`, { cache: "no-store" });
            if (res.ok) {
                buffer = Buffer.from(await res.arrayBuffer());
                contentType = res.headers.get("content-type") || "image/jpeg";
                break;
            }
        } catch (e) {
            console.log("Direct fetch failed, trying fallback...");
        }
    }

    // ۳. اگر مستقیم نشد، از weserv استفاده کن (به عنوان نجات‌دهنده)
    if (!buffer) {
        try {
            const fallbackUrl = `${FALLBACK_URL}${encodeURIComponent(`https://image.tmdb.org/t/p/${size}${imagePath}`)}`;
            const res = await fetch(fallbackUrl);
            if (res.ok) {
                buffer = Buffer.from(await res.arrayBuffer());
                contentType = res.headers.get("content-type") || "image/jpeg";
            }
        } catch (e) {
            console.error("Fallback also failed");
        }
    }

    // ۴. اگر موفق شدیم، ذخیره کن و نمایش بده
    if (buffer) {
        await fs.writeFile(saveFile, buffer);
        return new NextResponse(buffer, {
            status: 200,
            headers: { "Content-Type": contentType },
        });
    }

    return NextResponse.redirect(new URL("/images/placeholder.svg", req.url));
}
