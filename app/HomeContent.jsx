// این یک کامپوننت کلاینت ساید است چون از useState برای مدیریت فیلترها استفاده می‌کند
"use client";

import { useState } from "react";
import SearchFilters from "../components/SearchFilters";
import MovieCard from "../components/MovieCard";
import HeroBanner from "../components/HeroBanner";

export default function HomeContent({ initialMovies }) {

    // جداسازی فیلم‌هایی که قرار است در ویترین بالای صفحه نمایش داده شوند
    const featuredMovies = initialMovies.filter(movie => movie.isFeatured);

    
    // ابجکت جستجو
    const [criteria, setCriteria] = useState({
        title: '',
        type: '',
        genre: '',
        imdb: ''
    });

    // ثبت اطلاعات ووردی کاربر در محل جستجو
    const handleFilterChange = (key, value) => {
        // افزودن فیلتر به محدوده جستجو
        setCriteria(prev => ({ ...prev, [key]: value }));
    };

    // انجام جستجو بر روی پراپس ورودی فیلم ها
    // استفاده از includes و parseFloat برای جستجو
    const filteredData = initialMovies.filter(movie => {
        const matchTitle = movie.title.toLowerCase().includes(criteria.title.toLowerCase());
        const matchType = criteria.type === '' || movie.type === criteria.type;
        const matchGenre = criteria.genre === '' || movie.genre.includes(criteria.genre);
        const matchImdb = criteria.imdb === '' || movie.imdb >= parseFloat(criteria.imdb);
        return matchTitle && matchType && matchGenre && matchImdb;
    });

    return (
        <>

            {/* بنر ویترین اصلی */}
            <HeroBanner featuredMovies={featuredMovies} />

            {/*جدا کردن بخش جستجو*/}
            <SearchFilters onFilterChange={handleFilterChange} />

             {/*بخش نمایش فیلم ها*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredData.map((movie) => (
                    // نمایش فیلم
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {/*برای زمانی که جستجو نتیجه ای ندارد*/}
            {filteredData.length === 0 && (
                <div className="text-center py-20 text-gray-400 font-bold">
                    فیلمی با این مشخصات پیدا نشد.
                </div>
            )}
        </>
    );
}
