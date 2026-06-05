import { Search, Filter } from "lucide-react";

export default function SearchFilters({ onFilterChange, filters }) {
    return (
        <div className="bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-100 mb-10 space-y-4">
            <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-250px">
                    <Search className="absolute right-4 top-3.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="نام فیلم یا سریال..."
                        className="w-full pr-12 pl-4 py-3 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                        onChange={(e) => onFilterChange('title', e.target.value)}
                    />
                </div>

                {/* فیلتر نوع (فیلم/سریال) */}
                <select
                    className="pr-4 pl-10 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-red-500"
                    onChange={(e) => onFilterChange('type', e.target.value)}
                >
                    <option value="">نوع (همه)</option>
                    <option value="movie">فیلم سینمایی</option>
                    <option value="series">سریال</option>
                </select>

                {/* فیلتر ژانر */}
                <select
                    className="pr-4 pl-10 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-red-500"
                    onChange={(e) => onFilterChange('genre', e.target.value)}
                >
                    <option value="">ژانر (همه)</option>
                    <option value="action">اکشن</option>
                    <option value="drama">درام</option>
                    <option value="horror">ترسناک</option>
                </select>

                {/* فیلتر امتیاز IMDB */}
                <select
                    className="pr-4 pl-10 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-red-500"
                    onChange={(e) => onFilterChange('imdb', e.target.value)}
                >
                    <option value="">امتیاز (همه)</option>
                    <option value="8">بالای ۸</option>
                    <option value="7">بالای ۷</option>
                </select>
            </div>
        </div>
    );
}
