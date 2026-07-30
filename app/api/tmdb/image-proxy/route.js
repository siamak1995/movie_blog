import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// هاست‌های ممکن برای دریافت فایل تصویر از TMDb
const HOSTS = [
    "https://image.tmdb.org/t/p",
    "https://media.themoviedb.org/t/p",
];

// این route تصویر TMDb را دانلود می‌کند، داخل public ذخیره می‌کند و بعد همان فایل local را برمی‌گرداند
export async function GET(req) {
    // خواندن query string از درخواست
    const { searchParams } = new URL(req.url);

    // مسیر تصویر در TMDb، مثل /abc123.jpg
    const imagePath = searchParams.get("path");

    // سایز تصویر؛ اگر ارسال نشود w500 استفاده می‌شود
    const size = searchParams.get("size") || "w500";

    // بدون path امکان ساخت URL تصویر وجود ندارد
    if (!imagePath) {
        return new NextResponse("Bad Request", { status: 400 });
    }

    // استخراج اسم فایل از انتهای مسیر تصویر
    const fileName = imagePath.split("/").pop();

    // مسیر پوشه‌ای که تصاویر دانلودشده داخل public ذخیره می‌شوند
    const saveDir = path.join(process.cwd(), "public", "images", "banner");

    // مسیر کامل فایل روی دیسک
    const saveFile = path.join(saveDir, fileName);

    // اگر تصویر قبلا دانلود شده باشد، دیگر دوباره از TMDb گرفته نمی‌شود
    try {
        await fs.access(saveFile);

        // هدایت درخواست به فایل local داخل public
        return NextResponse.redirect(
            new URL(`/images/banner/${fileName}`, req.url)
        );
    } catch {}

    // اگر پوشه ذخیره‌سازی وجود نداشته باشد، ساخته می‌شود
    await fs.mkdir(saveDir, { recursive: true });

    // تلاش برای دانلود تصویر از هاست‌های تعریف‌شده
    for (const host of HOSTS) {
        // ساخت آدرس نهایی تصویر در TMDb
        const url = `${host}/${size}${imagePath}`;

        try {
            // دریافت تصویر از TMDb
            const res = await fetch(url);

            // اگر این هاست پاسخ موفق نداد، هاست بعدی امتحان می‌شود
            if (!res.ok) continue;

            // تبدیل خروجی تصویر به Buffer برای ذخیره روی دیسک
            const buffer = Buffer.from(await res.arrayBuffer());

            // ذخیره تصویر داخل public/images/banner
            await fs.writeFile(saveFile, buffer);

            // برگرداندن همان تصویر دانلودشده به مرورگر
            return new NextResponse(buffer, {
                headers: {
                    "Content-Type": res.headers.get("content-type") || "image/jpeg",
                    "Cache-Control": "public,max-age=31536000,immutable",
                },
            });
        } catch {}
    }

    // اگر هیچ هاستی تصویر را نداد، تصویر جایگزین نمایش داده می‌شود
    return NextResponse.redirect(
        new URL("/images/placeholder.svg", req.url)
    );
}
