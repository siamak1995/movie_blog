// ساخت آدرس تصویر TMDb با استفاده از سرویس weserv
export function getTmdbImageUrl(imagePath, size = "w500") {
    if (
        !imagePath ||
        imagePath === "null" ||
        imagePath === "undefined"
    ) {
        return "/images/placeholder.svg";
    }

    // اگر یک آدرس کامل دریافت شد، همان آدرس استفاده می‌شود
    if (
        imagePath.startsWith("http://") ||
        imagePath.startsWith("https://")
    ) {
        return imagePath;
    }

    // اطمینان از اینکه مسیر تصویر با اسلش شروع می‌شود
    const normalizedPath = imagePath.startsWith("/")
        ? imagePath
        : `/${imagePath}`;

    const tmdbImageUrl =
        `https://image.tmdb.org/t/p/${size}${normalizedPath}`;

    return `https://images.weserv.nl/?url=${encodeURIComponent(
        tmdbImageUrl
    )}&output=webp&q=85`;
}

// دریافت جزئیات فیلم یا سریال از API داخلی پروژه
export async function getTmdbDetails(tmdbId, type = "movie") {
    const mediaType =
        type === "series" || type === "tv"
            ? "tv"
            : "movie";

    const response = await fetch(
        `/api/tmdb/details?id=${encodeURIComponent(tmdbId)}&type=${mediaType}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(
            `TMDb details failed: ${response.status}`
        );
    }

    return response.json();
}

// دریافت تصاویر فیلم یا سریال از API داخلی پروژه
export async function getTmdbImages(tmdbId, type = "movie") {
    const mediaType =
        type === "series" || type === "tv"
            ? "tv"
            : "movie";

    const response = await fetch(
        `/api/tmdb/images?id=${encodeURIComponent(tmdbId)}&type=${mediaType}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(
            `TMDb images failed: ${response.status}`
        );
    }

    return response.json();
}
