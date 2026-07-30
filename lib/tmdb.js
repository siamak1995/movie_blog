const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function getTmdbImageUrl(path, size = "w500") {
    if (!path) return "/images/placeholder.svg";

    return `https://images.weserv.nl/?url=${encodeURIComponent(
        `image.tmdb.org/t/p/${size}${path}`
    )}`;
}

export async function getTmdbDetails(tmdbId, type = "movie") {
    const mediaType =
        type === "series" || type === "tv"
            ? "tv"
            : "movie";
    const response = await fetch(`/api/tmdb/details?id=${tmdbId}&type=${mediaType}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`TMDb details failed: ${response.status}`);
    }

    return response.json();
}

export async function getTmdbImages(tmdbId, type = "movie") {
    const mediaType = type === "series" ? "tv" : "movie";
    const response = await fetch(`/api/tmdb/images?id=${tmdbId}&type=${mediaType}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`TMDb images failed: ${response.status}`);
    }

    return response.json();
}
