import { useState } from 'react';
import { MapPin, Heart, ExternalLink } from 'lucide-react';

interface ProvinceCardProps {
  province: {
    id: string;
    name: string;
    region: string;
    regionColor: string;
    image: string;
    overview: string;
    highlights: string[];
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
  index: number;
}

export default function ProvinceCard({ province, isFavorite, onToggleFavorite, onClick, index }: ProvinceCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer card-hover border border-slate-100"
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {!imgLoaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={province.image}
          alt={province.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Region badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-lg text-white text-xs font-semibold"
          style={{ backgroundColor: province.regionColor }}
        >
          {province.region}
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isFavorite
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
              : 'bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Province name overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display font-bold text-xl text-white drop-shadow-lg">
            {province.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3">
          {province.overview}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {province.highlights.slice(0, 3).map((h, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 text-xs font-medium"
            >
              <MapPin size={10} />
              {h}
            </span>
          ))}
          {province.highlights.length > 3 && (
            <span className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-500 text-xs font-medium">
              +{province.highlights.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400 font-medium">Xem chi tiết</span>
          <ExternalLink size={14} className="text-slate-400 group-hover:text-red-500 transition-colors" />
        </div>
      </div>
    </div>
  );
}
