import ContentCatalog from "@/components/ContentCatalog";
import { movies } from "@/app/api/movies/movies";

// صفحهٔ فهرست تمام فیلم‌های موجود در کاتالوگ
export default function MoviesPage() {
    // انتخاب فقط رکوردهایی که نوع آن‌ها فیلم است
    const movieItems = movies.filter((item) => item.type === "movie");

    return (
        <>
            {/* ارسال فیلم‌های فیلترشده به کامپوننت مشترک کاتالوگ */}
            <ContentCatalog items={movieItems} contentType="movies" />
        </>
    );
}
