export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[#121212] py-8 text-white" dir="rtl">
            {/* لایه اصلی فوتر */}
            <div className="mx-auto max-w-[1800px] px-4 md:px-8 lg:px-10">
                {/* منوی پایینی */}
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-center text-xs font-bold text-white/50">
                    <a href="#" className="transition-colors hover:text-white">اپلیکیشن‌ها</a>
                    <a href="#" className="transition-colors hover:text-white">فرصت‌های شغلی</a>
                    <a href="#" className="transition-colors hover:text-white">تبلیغات در مووی‌لاگ</a>
                    <a href="#" className="transition-colors hover:text-white">خرید اشتراک</a>
                    <a href="#" className="transition-colors hover:text-white">کارت هدیه</a>
                    <a href="#" className="transition-colors hover:text-white">سوالات متداول</a>
                    <a href="#" className="transition-colors hover:text-white">تماس با ما</a>
                    <a href="#" className="transition-colors hover:text-white">درباره ما</a>
                    <a href="#" className="transition-colors hover:text-white">قوانین</a>
                    <a href="#" className="transition-colors hover:text-white">شرایط مصرف اینترنت</a>
                </div>
            </div>
        </footer>
    );
}
