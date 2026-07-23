import { useState } from 'react';
import { ArrowLeft, Heart, MapPin, Navigation, Clock, DollarSign, Utensils, Bus, Lightbulb, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Province, getGoogleMapsUrl, getGoogleMapsDirectionsUrl } from '../data/provinces';

interface Props {
  province: Province;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onBack: () => void;
}

export default function ProvinceDetail({ province, isFavorite, onToggleFavorite, onBack }: Props) {
  const [expandedPlace, setExpandedPlace] = useState<number | null>(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="fade-in-up">
      {/* Hero */}
      <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden rounded-b-3xl">
        {!imgLoaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={province.image}
          alt={province.name}
          className={`w-full h-full object-cover ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={onToggleFavorite}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isFavorite
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'
            }`}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Province info */}
        <div className="absolute bottom-6 left-6 right-6">
          <div
            className="inline-block px-3 py-1 rounded-lg text-white text-xs font-semibold mb-2"
            style={{ backgroundColor: province.regionColor }}
          >
            {province.region}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-1">{province.name}</h1>
          <a
            href={getGoogleMapsUrl(province.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/80 text-sm hover:text-white transition-colors"
          >
            <MapPin size={14} />
            Xem trên Google Maps
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Overview */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="font-display font-bold text-lg text-slate-900 mb-3">Tổng quan</h2>
          <p className="text-slate-600 leading-relaxed">{province.overview}</p>
        </section>

        {/* Highlights */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="font-display font-bold text-lg text-slate-900 mb-4">Điểm nổi bật</h2>
          <div className="flex flex-wrap gap-2">
            {province.highlights.map((h, i) => (
              <a
                key={i}
                href={`https://www.google.com/maps/search/${encodeURIComponent(h + ' ' + province.name + ' Việt Nam')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 text-slate-700 text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-colors group"
              >
                <MapPin size={13} className="text-red-400" />
                {h}
                <ExternalLink size={10} className="text-slate-400 group-hover:text-red-400 transition-colors" />
              </a>
            ))}
          </div>
        </section>

        {/* Places Detail */}
        <section>
          <h2 className="font-display font-bold text-lg text-slate-900 mb-4 px-1">Địa điểm chi tiết</h2>
          <div className="space-y-3">
            {province.places.map((place, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedPlace(expandedPlace === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-red-500" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">{place.name}</h3>
                      <p className="text-sm text-slate-500 truncate">{place.desc}</p>
                    </div>
                  </div>
                  {expandedPlace === i ? <ChevronUp size={18} className="text-slate-400 shrink-0" /> : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
                </button>

                {expandedPlace === i && (
                  <div className="px-5 pb-5 space-y-4 scale-in">
                    <p className="text-sm text-slate-600 leading-relaxed">{place.desc}</p>

                    {/* Info grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50">
                        <Clock size={15} className="text-blue-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-blue-600 font-semibold">Thời điểm đẹp</p>
                          <p className="text-sm text-blue-700">{place.bestTime}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-green-50">
                        <DollarSign size={15} className="text-green-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-green-600 font-semibold">Chi phí</p>
                          <p className="text-sm text-green-700">{place.avgCost}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tips */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={15} className="text-amber-500" />
                        <h4 className="text-sm font-semibold text-slate-800">Mẹo hay</h4>
                      </div>
                      <ul className="space-y-1.5">
                        {place.tips.map((tip, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Maps buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <a
                        href={getGoogleMapsUrl(place.name + ' ' + province.name, place.coords)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                      >
                        <MapPin size={14} />
                        Xem bản đồ
                      </a>
                      <a
                        href={getGoogleMapsDirectionsUrl(place.name + ' ' + province.name, place.coords)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
                      >
                        <Navigation size={14} />
                        Chỉ đường
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Foods */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Utensils size={18} className="text-orange-500" />
            <h2 className="font-display font-bold text-lg text-slate-900">Ẩm thực đặc sản</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {province.foods.map((food, i) => (
              <a
                key={i}
                href={`https://www.google.com/search?q=${encodeURIComponent(food + ' ' + province.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-orange-50 text-orange-700 text-sm font-medium hover:bg-orange-100 transition-colors"
              >
                {food}
              </a>
            ))}
          </div>
        </section>

        {/* Transport */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <Bus size={18} className="text-indigo-500" />
            <h2 className="font-display font-bold text-lg text-slate-900">Di chuyển</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{province.transport}</p>
        </section>

        {/* Google link */}
        <div className="text-center pb-4">
          <a
            href={`https://www.google.com/search?q=du+lịch+${encodeURIComponent(province.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <ExternalLink size={14} />
            Tìm hiểu thêm về {province.name} trên Google
          </a>
        </div>
      </div>
    </div>
  );
}
