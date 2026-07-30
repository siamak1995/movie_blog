// آدرس اصلی تصاویر TMDb
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// ساخت آدرس نهایی تصویر با استفاده از پروکسی weserv
export function getTmdbImageUrl(path, size = "w500") {
    // اگر مسیر تصویر وجود نداشت، تصویر جایگزین نمایش داده می‌شود
    if (!path) return "/images/placeholder.svg";

    // ساخت آدرس تصویر از TMDb و تبدیل آن به آدرس قابل استفاده از طریق weserv
    return `https://images.weserv.nl/?url=${encodeURIComponent(
        `image.tmdb.org/t/p/${size}${path}`
    )}`;
}

// دریافت جزئیات فیلم یا سریال از API داخلی پروژه
export async function getTmdbDetails(tmdbId, type = "movie") {
    // تبدیل نوع محتوا به مقدار قابل قبول برای TMDb
    const mediaType =
        type === "series" || type === "tv"
            ? "tv"
            : "movie";

    // ارسال درخواست به route داخلی برای دریافت جزئیات
    const response = await fetch(`/api/tmdb/details?id=${tmdbId}&type=${mediaType}`, {
        cache: "no-store",
    });

    // اگر درخواست موفق نبود، خطا ایجاد می‌شود
    if (!response.ok) {
        throw new Error(`TMDb details failed: ${response.status}`);
    }

    // تبدیل پاسخ به JSON و برگرداندن نتیجه
    return response.json();
}

// دریافت تصاویر فیلم یا سریال از API داخلی پروژه
export async function getTmdbImages(tmdbId, type = "movie") {
    // تبدیل نوع محتوا به مقدار قابل قبول برای TMDb
    const mediaType = type === "series" ? "tv" : "movie";

    // ارسال درخواست به route داخلی برای دریافت تصاویر
    const response = await fetch(`/api/tmdb/images?id=${tmdbId}&type=${mediaType}`, {
        cache: "no-store",
    });

    // اگر درخواست موفق نبود، خطا ایجاد می‌شود
    if (!response.ok) {
        throw new Error(`TMDb images failed: ${response.status}`);
    }

    // تبدیل پاسخ به JSON و برگرداندن نتیجه
    return response.json();
}
