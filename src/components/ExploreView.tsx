import { useState, useMemo } from 'react';
import { PROVINCES, REGIONS } from '../data/provinces';
import ProvinceCard from './ProvinceCard';
import ProvinceDetail from './ProvinceDetail';
import { Filter, Grid3X3, List } from 'lucide-react';

interface Props {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function ExploreView({ favorites, onToggleFavorite }: Props) {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    if (selectedRegion === 'all') return PROVINCES;
    return PROVINCES.filter(p => p.region === REGIONS.find(r => r.id === selectedRegion)?.name);
  }, [selectedRegion]);

  const province = selectedProvince ? PROVINCES.find(p => p.id === selectedProvince) : null;

  if (province) {
    return (
      <ProvinceDetail
        province={province}
        isFavorite={favorites.includes(province.id)}
        onToggleFavorite={() => onToggleFavorite(province.id)}
        onBack={() => setSelectedProvince(null)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 fade-in-up">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Khám phá Việt Nam</h2>
        <p className="text-slate-500">
          {filtered.length} tỉnh thành {selectedRegion !== 'all' ? `· ${REGIONS.find(r => r.id === selectedRegion)?.name}` : '· Tất cả vùng miền'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex items-center gap-1.5 shrink-0">
          <Filter size={15} className="text-slate-400" />
        </div>
        <button
          onClick={() => setSelectedRegion('all')}
          className={`chip shrink-0 ${selectedRegion === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          Tất cả ({PROVINCES.length})
        </button>
        {REGIONS.map(region => {
          const count = PROVINCES.filter(p => p.region === region.name).length;
          return (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`chip shrink-0 ${selectedRegion === region.id ? 'text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
              style={selectedRegion === region.id ? { backgroundColor: region.color } : {}}
            >
              {region.name} ({count})
            </button>
          );
        })}
      </div>

      {/* View toggle */}
      <div className="flex items-center justify-end gap-1 mb-4">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-slate-200 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Grid3X3 size={16} />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-slate-200 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <List size={16} />
        </button>
      </div>

      {/* Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <ProvinceCard
              key={p.id}
              province={p}
              isFavorite={favorites.includes(p.id)}
              onToggleFavorite={() => onToggleFavorite(p.id)}
              onClick={() => setSelectedProvince(p.id)}
              index={i}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setSelectedProvince(p.id)}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-slate-900 group-hover:text-red-600 transition-colors">{p.name}</h3>
                  <span
                    className="px-2 py-0.5 rounded text-white text-[10px] font-bold"
                    style={{ backgroundColor: p.regionColor }}
                  >
                    {p.region}
                  </span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2">{p.overview}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(p.id);
                }}
                className="shrink-0 p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={favorites.includes(p.id) ? '#ef4444' : 'none'}
                  stroke={favorites.includes(p.id) ? '#ef4444' : '#94a3b8'}
                  strokeWidth={2}
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
