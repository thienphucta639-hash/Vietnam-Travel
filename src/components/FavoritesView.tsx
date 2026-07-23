import { PROVINCES } from '../data/provinces';
import ProvinceCard from './ProvinceCard';
import { Heart } from 'lucide-react';

interface Props {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProvince: (id: string) => void;
}

export default function FavoritesView({ favorites, onToggleFavorite, onSelectProvince }: Props) {
  const favProvinces = PROVINCES.filter(p => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 fade-in-up">
      <div className="mb-6">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Heart size={24} className="text-red-500" fill="currentColor" />
          Yêu thích
        </h2>
        <p className="text-slate-500">{favProvinces.length} địa điểm đã lưu</p>
      </div>

      {favProvinces.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Heart size={32} className="text-slate-300" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
            Chưa có địa điểm yêu thích
          </h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Nhấn vào biểu tượng trái tim trên các tỉnh thành để thêm vào danh sách yêu thích
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favProvinces.map((p, i) => (
            <ProvinceCard
              key={p.id}
              province={p}
              isFavorite={true}
              onToggleFavorite={() => onToggleFavorite(p.id)}
              onClick={() => onSelectProvince(p.id)}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}
