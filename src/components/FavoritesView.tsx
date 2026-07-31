import { PROVINCES, REGIONS } from '../data/provinces';

interface Props {
  favorites: string[];
  onSelectProvince: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function FavoritesView({ favorites, onSelectProvince, onToggleFavorite }: Props) {
  const favoriteProvinces = PROVINCES.filter(p => favorites.includes(p.id));

  return (
    <div className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <p className="text-red-600 font-display font-semibold text-sm tracking-wider uppercase mb-2">Danh sách</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">Yêu Thích</h2>
          <p className="text-gray-500 text-sm">{favorites.length} địa điểm đã lưu</p>
        </div>

        {favoriteProvinces.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 border-dashed p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg font-display font-bold mb-2">Chưa có địa điểm yêu thích</p>
            <p className="text-gray-500 text-sm">Nhấn vào biểu tượng trái tim khi xem tỉnh thành để lưu vào đây</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteProvinces.map((province, i) => {
              const region = REGIONS.find(r => r.id === province.region);
              return (
                <div
                  key={province.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
                  onClick={() => onSelectProvince(province.id)}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img src={province.image} alt={province.name} className="w-full h-full object-cover img-zoom" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleFavorite(province.id); }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-red-500 fill-red-500" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider" style={{ backgroundColor: region?.color }}>
                        {region?.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-gray-900">{province.name}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">{province.tagline}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
