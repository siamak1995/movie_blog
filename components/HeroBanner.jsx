"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Info, Play } from "lucide-react";

// مدت زمان تعویض خودکار هر اسلاید
const AUTO_SLIDE_DELAY = 6000;

// کامپوننت بنر اصلی صفحه
const HeroBanner = ({ movies = [] }) => {
    // جدا کردن فقط فیلم‌ها و سریال‌های ویژه برای نمایش در اسلایدر
    const featuredMovies = useMemo(() => {
        return movies.filter((movie) => movie.isFeatured);
    }, [movies]);

    // نگهداری شماره اسلاید فعلی
    const [currentIndex, setCurrentIndex] = useState(0);

    // اگر تعداد آیتم‌ها تغییر کرد و اسلاید فعلی وجود نداشت، برگرد به اسلاید اول
    useEffect(() => {
        if (currentIndex >= featuredMovies.length) {
            setCurrentIndex(0);
        }
    }, [featuredMovies, currentIndex]);

    // تعویض خودکار اسلایدها
    useEffect(() => {
        // اگر فقط یک آیتم یا کمتر داریم، اسلایدر خودکار لازم نیست
        if (featuredMovies.length <= 1) return;

        // هر چند ثانیه برو به اسلاید بعدی
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
        }, AUTO_SLIDE_DELAY);

        // پاک کردن تایمر هنگام خروج از کامپوننت
        return () => clearInterval(timer);
    }, [featuredMovies]);

    // اگر فیلم ویژه‌ای وجود نداشت، چیزی نمایش نده
    if (!featuredMovies.length) return null;

    // گرفتن اطلاعات فیلم فعلی
    const movie = featuredMovies[currentIndex];

    // انتخاب تصویر بنر، اگر نبود از تصویر اصلی و در آخر از placeholder استفاده کن
    const bannerSrc =
        movie.bannerImage ||
        movie.image ||
        "/images/placeholder.svg";

    // رفتن به اسلاید بعدی
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    };

    // رفتن به اسلاید قبلی
    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? featuredMovies.length - 1 : prev - 1
        );
    };

    return (
        // بخش اصلی بنر صفحه
        <section
            className="relative h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] w-full overflow-hidden bg-[#0F0F0F]"
            dir="rtl"
        >
            {/* تصویر پس‌زمینه بنر */}
            {/* تصویر پس‌زمینهٔ اسلاید فعال با جایگزین در صورت خطا */}
            <img
                key={movie.id}
                src={bannerSrc}
                alt={movie.titleFa || movie.title}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
                onError={(e) => {
                    // اگر تصویر لود نشد، تصویر پیش‌فرض نمایش داده شود
                    e.currentTarget.src = "/images/placeholder.svg";
                }}
            />

            {/* لایه تیره روی تصویر برای خواناتر شدن متن */}
            {/* لایهٔ نیمه‌شفاف برای افزایش خوانایی متن روی تصویر */}
            <div className="absolute inset-0 bg-black/35" />

            {/* گرادینت پایین بنر برای ترکیب شدن با بک‌گراند صفحه */}
            {/* گرادیان پایین تصویر برای اتصال نرم بنر به پس‌زمینه */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/30 to-transparent" />

            {/* محتوای اصلی روی بنر */}
            {/* لایهٔ محتوا که متن و دکمه‌ها را پایین بنر قرار می‌دهد */}
            <div className="absolute inset-0 z-10 flex items-end">
                {/* ظرف واکنش‌گرا برای محدود کردن عرض محتوای بنر */}
                <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 pb-10 sm:pb-14 md:pb-20 lg:pb-24">
                    {/* عنوان فیلم یا سریال */}
                    <h1 className="mb-4 max-w-2xl text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                        {movie.titleFa || movie.title}
                    </h1>

                    {/* توضیح کوتاه فیلم یا سریال */}
                    <p className="mb-8 max-w-2xl text-sm leading-8 text-white/80 md:text-base">
                        {movie.description}
                    </p>

                    {/* اطلاعات کلی فیلم مثل امتیاز، سال، ژانر و مدت زمان */}
                    {/* ردیف متادیتای کوتاه فیلم */}
                    <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-white/75">
                        <span className="rounded-full bg-white/10 px-3 py-1">
                            ⭐ {movie.imdb}
                        </span>

                        {/* سال انتشار فیلم */}
                        <span>{movie.year}</span>

                        {/* ژانر فیلم */}
                        <span>{movie.genre}</span>

                        {/* مدت زمان فیلم */}
                        <span>{movie.duration}</span>

                        {/* رده‌بندی سنی اثر */}
                        <span>{movie.ageRating}</span>
                    </div>

                    {/* دکمه‌های اصلی بنر */}
                    <div className="flex flex-wrap gap-4">
                        {/* دکمه پخش فیلم */}
                        <button className="flex items-center gap-2 rounded-lg bg-[#E50914] px-5 py-2 font-bold text-white transition-all hover:bg-[#b80710] sm:px-6 sm:py-3 lg:px-8">
                            {/* آیکون پخش داخل دکمهٔ اصلی */}
                            <Play size={20} fill="currentColor" />
                            پخش فیلم
                        </button>

                        {/* دکمه اطلاعات بیشتر */}
                        <button className="flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2 font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 sm:px-6 sm:py-3 lg:px-8">
                            {/* آیکون اطلاعات تکمیلی */}
                            <Info size={20} />
                            اطلاعات بیشتر
                        </button>
                    </div>
                </div>
            </div>

            {/* دکمه رفتن به اسلاید قبلی */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-all hover:bg-black/70"
            >
                {/* آیکون فلش حرکت به اسلاید قبلی */}
                <ChevronLeft size={26} />
            </button>

            {/* دکمه رفتن به اسلاید بعدی */}
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-all hover:bg-black/70"
            >
                {/* آیکون فلش حرکت به اسلاید بعدی */}
                <ChevronRight size={26} />
            </button>

            {/* نقطه‌های پایین بنر برای نمایش اسلاید فعال */}
            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
                {featuredMovies.map((_, index) => (
                    /* نقطهٔ قابل کلیک برای انتخاب مستقیم هر اسلاید */
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-3 rounded-full transition-all duration-300 ${
                            // اگر این نقطه مربوط به اسلاید فعلی بود، قرمز و کشیده شود
                            currentIndex === index
                                ? "w-10 bg-[#E50914]"
                                : "w-3 bg-white/40"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroBanner;
