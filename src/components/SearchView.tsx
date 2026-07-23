import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PROVINCES } from '../data/provinces';

interface Props {
  onSelectProvince: (id: string) => void;
  onClose: () => void;
}

export default function SearchView({ onSelectProvince, onClose }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PROVINCES.filter(p => {
      const searchFields = [
        p.name,
        p.region,
        p.overview,
        ...p.highlights,
        ...p.foods,
        ...p.places.map(pl => pl.name),
        ...p.places.map(pl => pl.desc),
      ].join(' ').toLowerCase();
      return searchFields.includes(q);
    });
  }, [query]);

  return (
    <div className="fixed inset-0 z-50 modal-overlay" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative max-w-2xl mx-auto pt-20 px-4" onClick={e => e.stopPropagation()}>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden modal-content">
          {/* Search input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
            <Search size={20} className="text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Tìm tỉnh thành, địa điểm, món ăn..."
              className="flex-1 text-slate-900 placeholder:text-slate-400 outline-none text-[15px]"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={16} className="text-slate-400" />
              </button>
            )}
            <button onClick={onClose} className="text-sm text-slate-500 font-medium hover:text-slate-700 ml-2">
              Đóng
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query && results.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500">Không tìm thấy kết quả cho "{query}"</p>
              </div>
            )}

            {!query && (
              <div className="p-5">
                <p className="text-sm text-slate-500 mb-3 font-medium">Gợi ý tìm kiếm</p>
                <div className="flex flex-wrap gap-2">
                  {['Hạ Long', 'Đà Nẵng', 'Phở', 'Biển', 'Sa Pa', 'Đà Lạt', 'Cà phê', 'Chợ nổi'].map(s => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 text-sm hover:bg-slate-100 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {results.map(p => (
              <button
                key={p.id}
                onClick={() => onSelectProvince(p.id)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors text-left border-b border-slate-50 last:border-0 group"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors">{p.name}</h3>
                    <span className="text-xs text-slate-400">{p.region}</span>
                  </div>
                  <p className="text-sm text-slate-500 truncate">{p.overview}</p>
                </div>
                <ArrowRight size={16} className="text-slate-300 shrink-0 group-hover:text-red-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
