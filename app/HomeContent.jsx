"use client"; // این خط نجات‌بخش است

import { useState } from "react";
import MovieCard from "@/components/MovieCard";
import SearchFilters from "@/components/SearchFilters";

export default function HomeContent({ initialMovies }) {
    const [criteria, setCriteria] = useState({
        title: '',
        type: '',
        genre: '',
        imdb: '',
        year: ''
    });

    const handleFilterChange = (key, value) => {
        setCriteria(prev => ({ ...prev, [key]: value }));
    };

    const filteredData = initialMovies.filter(movie => {
        const matchTitle = movie.title.toLowerCase().includes(criteria.title.toLowerCase());
        const matchType = criteria.type === '' || movie.type === criteria.type;
        const matchGenre = criteria.genre === '' || movie.genre.includes(criteria.genre);
        const matchImdb = criteria.imdb === '' || movie.imdb >= parseFloat(criteria.imdb);
        return matchTitle && matchType && matchGenre && matchImdb;
    });

    return (
        <>
            {/* حالا این کامپوننت‌ها بدون خطا اینجا کار می‌کنند */}
            <SearchFilters onFilterChange={handleFilterChange} filters={criteria} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredData.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {filteredData.length === 0 && (
                <div className="text-center py-20 text-gray-400 font-bold">
                    فیلمی با این مشخصات پیدا نشد.
                </div>
            )}
        </>
    );
}
