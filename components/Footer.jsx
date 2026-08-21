export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[#121212] py-8 text-white" dir="rtl">
            {/* لایه اصلی فوتر */}
            <div className="mx-auto max-w-[1800px] px-4 md:px-8 lg:px-10">
                {/* منوی پایینی */}
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-center text-xs font-bold text-white/50">
                    {/* لینک معرفی اپلیکیشن‌های سایت */}
                    <a href="#" className="transition-colors hover:text-white">اپلیکیشن‌ها</a>
                    {/* لینک فرصت‌های شغلی */}
                    <a href="#" className="transition-colors hover:text-white">فرصت‌های شغلی</a>
                    {/* لینک تبلیغات در سایت */}
                    <a href="#" className="transition-colors hover:text-white">تبلیغات در مووی‌لاگ</a>
                    {/* لینک خرید اشتراک */}
                    <a href="#" className="transition-colors hover:text-white">خرید اشتراک</a>
                    {/* لینک کارت هدیه */}
                    <a href="#" className="transition-colors hover:text-white">کارت هدیه</a>
                    {/* لینک پرسش‌های متداول */}
                    <a href="#" className="transition-colors hover:text-white">سوالات متداول</a>
                    {/* لینک تماس با تیم سایت */}
                    <a href="#" className="transition-colors hover:text-white">تماس با ما</a>
                    {/* لینک معرفی و دربارهٔ سایت */}
                    <a href="#" className="transition-colors hover:text-white">درباره ما</a>
                    {/* لینک قوانین استفاده */}
                    <a href="#" className="transition-colors hover:text-white">قوانین</a>
                    {/* لینک شرایط مصرف اینترنت */}
                    <a href="#" className="transition-colors hover:text-white">شرایط مصرف اینترنت</a>
                </div>
            </div>
        </footer>
    );
}
