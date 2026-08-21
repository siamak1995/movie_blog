import Link from "next/link";
import { Film, Sparkles, Tv } from "lucide-react";
import MovieCard from "@/components/MovieCard";

// کامپوننت مشترک نمایش فهرست فیلم‌ها یا سریال‌ها
export default function ContentCatalog({ items, contentType }) {
    // تشخیص عنوان‌ها و آیکون مناسب بر اساس نوع محتوای صفحه
    const isSeries = contentType === "series";
    const title = isSeries ? "سریال‌ها" : "فیلم‌ها";
    const description = isSeries
        ? "سریال‌های محبوب و تماشایی را برای شروع یک شب آرام پیدا کنید."
        : "بهترین فیلم‌ها را با جزئیات کامل، امتیاز کاربران و پوسترهای دیدنی مرور کنید.";
    const Icon = isSeries ? Tv : Film;

    return (
        // پوستهٔ اصلی کاتالوگ با زمینهٔ تیره و جهت راست‌به‌چپ
        <main className="min-h-screen bg-[#101010] px-4 pb-20 pt-32 text-white md:px-8 lg:px-12" dir="rtl">
            {/* نوار معرفی صفحه با گرادیان قرمز و اطلاعات آماری */}
            <section className="mx-auto max-w-[1800px] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-l from-[#351015] via-[#1c1719] to-[#171717] p-6 shadow-2xl shadow-black/20 sm:p-10 lg:p-14">
                {/* چیدمان واکنش‌گرا برای متن معرفی و آمار */}
                <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                    {/* بخش عنوان، توضیح و مسیر بازگشت به خانه */}
                    <div className="max-w-2xl">
                        {/* برچسب کوچک هویت صفحه */}
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-300">
                            {/* آیکون درخشش برای تأکید بر محتوای منتخب */}
                            <Sparkles size={15} />
                            <span>کتابخانهٔ اختصاصی مووی‌لاگ</span>
                        </div>

                        {/* عنوان اصلی فهرست محتوا */}
                        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                            {title}
                        </h1>

                        {/* توضیح کوتاه و راهنمای صفحه */}
                        <p className="mt-5 max-w-xl text-sm leading-8 text-white/60 sm:text-base">
                            {description}
                        </p>

                        {/* لینک بازگشت سریع به صفحهٔ خانه */}
                        <Link
                            href="/"
                            className="mt-7 inline-flex items-center rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
                        >
                            بازگشت به صفحهٔ اصلی
                        </Link>
                    </div>

                    {/* کارت آماری تعداد عنوان‌های قابل نمایش */}
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
                        {/* آیکون متناسب با نوع محتوای جاری */}
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 text-red-400">
                            <Icon size={28} />
                        </div>

                        {/* عدد و توضیح تعداد عنوان‌ها */}
                        <div>
                            <p className="text-3xl font-black text-white">{items.length}</p>
                            <p className="mt-1 text-xs font-bold text-white/45">عنوان آمادهٔ تماشا</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ناحیهٔ اصلی نمایش کارت‌ها */}
            <section className="mx-auto mt-14 max-w-[1800px]">
                {/* سربرگ فهرست و برچسب نوع محتوا */}
                <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                    {/* عنوان بخش نتایج */}
                    <div>
                        {/* تیتر فهرست */}
                        <h2 className="text-2xl font-black text-white sm:text-3xl">همهٔ {title}</h2>
                        {/* خط تزئینی برای هماهنگی با رنگ برند */}
                        <div className="mt-3 h-1 w-16 rounded-full bg-[#E50914]" />
                    </div>

                    {/* نمایش تعداد نتایج فیلترشده */}
                    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/55">
                        {items.length} نتیجه
                    </span>
                </div>

                {items.length > 0 ? (
                    // شبکهٔ واکنش‌گرا برای نمایش کارت‌های محتوا
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5 xl:grid-cols-6">
                        {items.map((item) => (
                            // کارت مستقل هر فیلم یا سریال با دادهٔ اختصاصی خودش
                            <MovieCard key={item.id} movie={item} />
                        ))}
                    </div>
                ) : (
                    // پیام راهنما در صورتی که محتوایی برای این دسته وجود نداشته باشد
                    <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-12 text-center">
                        {/* آیکون حالت خالی فهرست */}
                        <Icon className="mx-auto text-white/30" size={42} />
                        {/* عنوان حالت خالی */}
                        <h3 className="mt-5 text-xl font-black text-white">محتوایی پیدا نشد</h3>
                        {/* توضیح حالت خالی */}
                        <p className="mt-2 text-sm text-white/45">به‌زودی عنوان‌های تازه‌ای به این بخش اضافه می‌شود.</p>
                    </div>
                )}
            </section>
        </main>
    );
}
