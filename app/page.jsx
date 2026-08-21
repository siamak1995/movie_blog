import HomeContent from "./HomeContent";
import { movies as staticMovies } from "./api/movies/movies";

export default function Home() {
    return (
        // پوستهٔ اصلی صفحهٔ خانه که حداقل ارتفاع صفحه و پس‌زمینهٔ تیره را فراهم می‌کند
        <main className="min-h-screen bg-[#101010]">
            {/* محتوای تعاملی خانه که فهرست فیلم‌ها را دریافت می‌کند */}
            <HomeContent initialMovies={staticMovies} />
        </main>
    );
}
