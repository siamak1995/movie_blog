import HomeContent from "./HomeContent";
import { movies as staticMovies } from "./api/movies/movies";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#101010]">
            <HomeContent initialMovies={staticMovies} />
        </main>
    );
}
