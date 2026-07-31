import { useState, useEffect } from 'react';
import { PROVINCES } from '../data/provinces';

const heroImages = [
  'https://images.pexels.com/photos/38116420/pexels-photo-38116420.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600',
  'https://images.pexels.com/photos/37668045/pexels-photo-37668045.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600',
  'https://images.pexels.com/photos/32755075/pexels-photo-32755075.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600',
  'https://images.pexels.com/photos/30933135/pexels-photo-30933135.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600',
];

interface HeroProps {
  onExplore: () => void;
  onSelectProvince: (id: string) => void;
}

export default function HeroSection({ onExplore, onSelectProvince }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof PROVINCES>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const results = PROVINCES.filter(
        p => p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.highlights.some(h => h.toLowerCase().includes(q)) ||
          p.foods.some(f => f.toLowerCase().includes(q))
      ).slice(0, 6);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const stats = [
    { number: '34', label: 'Tỉnh thành' },
    { number: '100+', label: 'Địa điểm' },
    { number: '200+', label: 'Món ăn' },
    { number: '50+', label: 'Lịch trình' },
  ];

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background slideshow */}
      {heroImages.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={img} alt="" className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-0">
        <div className="max-w-3xl">
          <div className="animate-fade-in-up">
            <p className="text-amber-400 font-display font-semibold text-sm md:text-base tracking-wider uppercase mb-3">
              Vietnam Travel Planner v2.0
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-4 md:mb-6">
              Khám Phá{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                Việt Nam
              </span>
              <br />Cùng Bạn Bè
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-xl mb-6 md:mb-8 font-body leading-relaxed">
              Lên kế hoạch du lịch 34 tỉnh thành Việt Nam. Tính chi phí, chia tiền theo nhóm, lịch trình chi tiết từ A đến Z.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative mb-8 animate-fade-in-up stagger-2 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm tỉnh thành, địa điểm, món ăn..."
                className="w-full px-5 py-3.5 md:py-4 pr-12 rounded-2xl bg-white/95 backdrop-blur text-gray-900 placeholder-gray-400 text-sm md:text-base font-body shadow-2xl outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Search results dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in max-h-80 overflow-y-auto">
                {searchResults.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { onSelectProvince(p.id); setSearchQuery(''); setSearchResults([]); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
                      <p className="text-gray-500 text-xs truncate">{p.tagline}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 animate-fade-in-up stagger-3">
            <button
              onClick={onExplore}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-display font-semibold text-sm shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Khám phá ngay
            </button>
            <button
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="px-6 py-3 bg-white/15 backdrop-blur text-white rounded-xl font-display font-semibold text-sm border border-white/20 hover:bg-white/25 transition-all"
            >
              Tìm hiểu thêm
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl animate-fade-in-up stagger-4">
          {stats.map((stat, i) => (
            <div key={i} className="glass rounded-xl px-4 py-3 text-center">
              <p className="text-2xl md:text-3xl font-display font-bold text-white">{stat.number}</p>
              <p className="text-white/60 text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-amber-400' : 'w-1.5 bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
}
