import { useState } from 'react';
import { PROVINCES, REGIONS } from '../data/provinces';

interface Props {
  onSelectProvince: (id: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function ProvinceGrid({ onSelectProvince, favorites, onToggleFavorite }: Props) {
  const [activeRegion, setActiveRegion] = useState('all');
  const [searchText, setSearchText] = useState('');

  const filtered = PROVINCES.filter(p => {
    const matchRegion = activeRegion === 'all' || p.region === activeRegion;
    const q = searchText.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q);
    return matchRegion && matchSearch;
  });

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-red-600 font-display font-semibold text-sm tracking-wider uppercase mb-2">Khám phá</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">34 Tỉnh Thành Việt Nam</h2>
          <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">Từ Sa Pa sương mù đến Cà Mau đất mũi, mỗi vùng miền đều có câu chuyện riêng</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder="Tìm tỉnh thành..."
              className="w-full px-4 py-2.5 pl-10 rounded-xl bg-gray-50 border border-gray-200 text-sm font-body text-gray-900 placeholder-gray-400 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveRegion('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeRegion === 'all' ? 'bg-red-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tất cả ({PROVINCES.length})
            </button>
            {REGIONS.map(r => {
              const count = PROVINCES.filter(p => p.region === r.id).length;
              return (
                <button
                  key={r.id}
                  onClick={() => setActiveRegion(r.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    activeRegion === r.id ? 'text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={activeRegion === r.id ? { backgroundColor: r.color } : {}}
                >
                  {r.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((province, i) => (
            <div
              key={province.id}
              className="province-card group bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${Math.min(i * 0.05, 0.5)}s`, opacity: 0, animationFillMode: 'forwards' }}
              onClick={() => onSelectProvince(province.id)}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={province.image}
                  alt={province.name}
                  className="province-card-img w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Favorite button */}
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleFavorite(province.id); }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <svg className={`w-4 h-4 ${favorites.includes(province.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} fill={favorites.includes(province.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Region badge */}
                <div className="absolute bottom-3 left-3">
                  <span
                    className="px-2 py-0.5 rounded-md text-[10px] font-bold text-white uppercase tracking-wider"
                    style={{ backgroundColor: REGIONS.find(r => r.id === province.region)?.color || '#666' }}
                  >
                    {REGIONS.find(r => r.id === province.region)?.name}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-display font-bold text-gray-900 text-lg mb-0.5 group-hover:text-red-600 transition-colors">
                  {province.name}
                </h3>
                <p className="text-gray-500 text-xs mb-3 line-clamp-1">{province.tagline}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {province.highlights.slice(0, 3).map((h, j) => (
                    <span key={j} className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded-md text-[10px] font-medium">
                      {h}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{province.bestTime}</span>
                  <span className="font-medium text-amber-600">{province.avgBudget.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Không tìm thấy tỉnh thành nào</p>
          </div>
        )}
      </div>
    </section>
  );
}
