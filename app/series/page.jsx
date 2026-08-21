import ContentCatalog from "@/components/ContentCatalog";
import { movies } from "@/app/api/movies/movies";

// صفحهٔ فهرست تمام سریال‌های موجود در کاتالوگ
export default function SeriesPage() {
    // پشتیبانی از هر دو نام رایج movie type برای سریال در داده‌ها
    const seriesItems = movies.filter((item) => item.type === "series" || item.type === "tv");

    return (
        <>
            {/* ارسال سریال‌های فیلترشده به کامپوننت مشترک کاتالوگ */}
            <ContentCatalog items={seriesItems} contentType="series" />
        </>
    );
}
