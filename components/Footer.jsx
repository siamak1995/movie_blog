export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    <div className="space-y-4">
                        <h3 className="text-2xl font-black text-red-500">مووی‌لاگ</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            بررسی تخصصی سینما با نگاهی متفاوت. هر هفته با جدیدترین نقدها همراه شما هستیم.
                        </p>
                    </div>

                    <div className="space-y-4 text-right">
                        <h4 className="font-bold text-lg">دسترسی سریع</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">ژانر وحشت</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">سینمای کلاسیک</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">بهترین‌های ۲۰۲۶</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4 text-right">
                        <h4 className="font-bold text-lg">ارتباط با ما</h4>
                        <div className="flex gap-4">
                            <span className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 cursor-pointer transition-all">IG</span>
                            <span className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 cursor-pointer transition-all">TG</span>
                            <span className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 cursor-pointer transition-all">X</span>
                        </div>
                    </div>

                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-xs">
                    تمامی حقوق محفوظ است © ۲۰۲۶ | طراحی شده برای سینمادوستان
                </div>
            </div>
        </footer>
    );
}
