import { useState } from 'react';
import { Province, REGIONS } from '../data/provinces';

interface Props {
  province: Province;
  onBack: () => void;
  onAddToTrip: (provinceId: string) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isInTrip: boolean;
}

export default function ProvinceDetail({ province, onBack, onAddToTrip, isFavorite, onToggleFavorite, isInTrip }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'places' | 'food' | 'itinerary' | 'tips'>('overview');
  const [showItineraryApply, setShowItineraryApply] = useState(false);

  const region = REGIONS.find(r => r.id === province.region);

  const openMaps = (name: string, coords: [number, number]) => {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(name)}/@${coords[0]},${coords[1]},15z`, '_blank');
  };

  const tabs = [
    { id: 'overview' as const, label: 'Tổng quan' },
    { id: 'places' as const, label: 'Địa điểm' },
    { id: 'food' as const, label: 'Ẩm thực' },
    { id: 'itinerary' as const, label: 'Lịch trình' },
    { id: 'tips' as const, label: 'Mẹo hay' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img src={province.image} alt={province.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-20 md:top-24 left-4 md:left-6 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur text-white text-sm hover:bg-white/30 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại
        </button>

        {/* Favorite */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-20 md:top-24 right-4 md:right-6 w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <svg className={`w-5 h-5 ${isFavorite ? 'text-red-400 fill-red-400' : 'text-white'}`} fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Title */}
        <div className="absolute bottom-6 left-4 md:left-6 right-4 md:right-6">
          <span
            className="inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider mb-2"
            style={{ backgroundColor: region?.color || '#666' }}
          >
            {region?.name}
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-1">{province.name}</h1>
          <p className="text-white/80 text-sm md:text-base">{province.tagline}</p>
        </div>
      </div>

      {/* Quick info bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex flex-wrap gap-4 md:gap-8 text-sm">
          <div>
            <p className="text-gray-400 text-xs">Thời điểm đẹp</p>
            <p className="font-semibold text-gray-900">{province.bestTime}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Ngân sách</p>
            <p className="font-semibold text-amber-600">{province.avgBudget}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => onAddToTrip(province.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                isInTrip
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-600 text-white hover:bg-red-700 shadow-sm'
              }`}
            >
              {isInTrip ? 'Đã thêm vào trip' : 'Thêm vào lịch trình'}
            </button>
            <button
              onClick={() => openMaps(province.name, province.coords)}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-all"
            >
              Google Maps
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white sticky top-14 md:top-16 z-30 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 md:px-6 flex gap-1 overflow-x-auto scrollbar-none">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all relative ${
                activeTab === tab.id ? 'text-red-600 tab-active' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {activeTab === 'overview' && (
          <div className="animate-fade-in space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-display font-bold text-xl text-gray-900 mb-3">Giới thiệu</h3>
              <p className="text-gray-600 leading-relaxed">{province.overview}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-display font-bold text-xl text-gray-900 mb-4">Điểm nổi bật</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {province.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 font-bold text-sm">{i + 1}</span>
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'places' && (
          <div className="animate-fade-in space-y-4">
            {province.places.map((place, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 card-hover">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-display font-bold text-gray-900 text-lg">{place.name}</h4>
                    <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded">{place.type}</span>
                  </div>
                  <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">{place.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{place.desc}</p>
                {place.tips && <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded-lg mb-3">Mẹo: {place.tips}</p>}
                <button
                  onClick={() => openMaps(place.name, place.coords)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Xem trên Google Maps
                </button>
              </div>
            ))}
            <div className="text-center pt-4">
              <a
                href={`https://www.google.com/maps/search/du+lich+${encodeURIComponent(province.name)}/@${province.coords[0]},${province.coords[1]},12z`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold hover:bg-blue-100 transition-colors"
              >
                Xem thêm trên Google Maps
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        )}

        {activeTab === 'food' && (
          <div className="animate-fade-in">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-display font-bold text-xl text-gray-900 mb-4">Ẩm thực đặc sản</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {province.foods.map((food, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-100/50">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-700 text-sm font-bold">{i + 1}</span>
                    </div>
                    <span className="text-gray-800 text-sm font-medium">{food}</span>
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(food + ' ' + province.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-gray-400 hover:text-blue-600 transition-colors"
                      title="Tìm hiểu thêm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-xl text-gray-900">Lịch trình gợi ý</h3>
              <button
                onClick={() => { setShowItineraryApply(true); onAddToTrip(province.id); }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  showItineraryApply || isInTrip
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {showItineraryApply || isInTrip ? 'Đã áp dụng lịch trình' : 'Áp dụng lịch trình này'}
              </button>
            </div>

            {province.itinerary.map(day => (
              <div key={day.day} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white">
                  <h4 className="font-display font-bold">Ngày {day.day}: {day.title}</h4>
                </div>
                <div className="p-5">
                  <div className="timeline-line space-y-4 pl-10">
                    {day.items.map((item, j) => (
                      <div key={j} className="relative">
                        <div className="absolute -left-10 top-0.5 w-8 h-8 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center z-10">
                          <span className="text-[10px] font-bold text-red-600">{item.time.split(':')[0]}</span>
                        </div>
                        <div className="pb-1">
                          <span className="text-xs font-semibold text-red-600">{item.time}</span>
                          <p className="text-gray-800 font-medium text-sm">{item.activity}</p>
                          {item.note && <p className="text-gray-500 text-xs mt-0.5">{item.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="animate-fade-in">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-display font-bold text-xl text-gray-900 mb-4">Mẹo du lịch</h3>
              <div className="space-y-3">
                {province.tips.map((tip, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl bg-blue-50/50 border border-blue-100/50">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <a
                href={`https://www.google.com/search?q=du+lich+${encodeURIComponent(province.name)}+meo+hay`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                Tìm thêm mẹo du lịch {province.name} trên Google
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
