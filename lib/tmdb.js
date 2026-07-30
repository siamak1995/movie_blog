// ساخت آدرس تصویر از طریق پروکسی داخلی (همراه با کش روی دیسک)
export function getTmdbImageUrl(imagePath, size = "w500") {

    if (
        !imagePath ||
        imagePath === "null" ||
        imagePath === "undefined"
    ) {
        return "/images/placeholder.svg";
    }

    // اگر قبلاً مسیر پروکسی یا فایل لوکال بود
    if (
        imagePath.startsWith("/api/") ||
        imagePath.startsWith("/images/")
    ) {
        return imagePath;
    }

    // اگر آدرس کامل TMDB یا هر URL دیگری بود
    if (
        imagePath.startsWith("http://") ||
        imagePath.startsWith("https://")
    ) {

        try {

            const url = new URL(imagePath);
            imagePath = url.pathname.replace(/^\/t\/p\/[^/]+/, "");

        } catch {

            return imagePath;

        }

    }

    // اطمینان از شروع شدن با /
    const normalizedPath = imagePath.startsWith("/")
        ? imagePath
        : `/${imagePath}`;

    // همه تصاویر از این مسیر عبور می‌کنند
    return `/api/tmdb/image-proxy?path=${encodeURIComponent(
        normalizedPath
    )}&size=${size}`;

}



// دریافت اطلاعات فیلم
export async function getTmdbDetails(
    tmdbId,
    type = "movie"
) {

    const mediaType =
        type === "series" || type === "tv"
            ? "tv"
            : "movie";

    const response = await fetch(
        `/api/tmdb/details?id=${encodeURIComponent(
            tmdbId
        )}&type=${mediaType}`,
        {
            cache: "force-cache",
            next: {
                revalidate: 86400
            }
        }
    );

    if (!response.ok) {
        throw new Error(
            `TMDb details failed (${response.status})`
        );
    }

    return response.json();

}



// دریافت تصاویر فیلم
export async function getTmdbImages(
    tmdbId,
    type = "movie"
) {

    const mediaType =
        type === "series" || type === "tv"
            ? "tv"
            : "movie";

    const response = await fetch(
        `/api/tmdb/images?id=${encodeURIComponent(
            tmdbId
        )}&type=${mediaType}`,
        {
            cache: "force-cache",
            next: {
                revalidate: 86400
            }
        }
    );

    if (!response.ok) {
        throw new Error(
            `TMDb images failed (${response.status})`
        );
    }

    return response.json();

}