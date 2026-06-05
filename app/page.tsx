import { Metadata } from "next";
import { movies } from "@/data/movies";
import HomeContent from "./HomeContent"; // این کامپوننت کلاینت ما خواهد بود

export const metadata: Metadata = {
    title: 'مووی‌لاگ | مرجع نقد و بررسی فیلم و سریال',
    description: 'پلتفرم تخصصی ثبت تجربه تماشای فیلم',
}

export default function Home() {
    // در آینده اینجا دیتای دیتابیس را fetch می‌کنیم
    // const movies = await getMovies();

    return (
        <main className="p-8 mt-20">
            <HomeContent initialMovies={movies} />
        </main>
    );
}
