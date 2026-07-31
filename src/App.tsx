import { useState, useEffect, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProvinceGrid from './components/ProvinceGrid';
import ProvinceDetail from './components/ProvinceDetail';
import TripPlanner from './components/TripPlanner';
import BudgetCalculator from './components/BudgetCalculator';
import FavoritesView from './components/FavoritesView';
import { PROVINCES, REGIONS } from './data/provinces';
import type { TripItem } from './components/TripPlanner';

// LocalStorage helpers
function load<T>(key: string, fallback: T): T {
  try {
    const val = localStorage.getItem('vntravel_' + key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem('vntravel_' + key, JSON.stringify(value));
  } catch { /* ignore */ }
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(load('favorites', []));
  const [tripDestinations, setTripDestinations] = useState<string[]>(load('tripDests', []));
  const [tripItems, setTripItems] = useState<TripItem[]>(load('tripItems', []));
  const [people, setPeople] = useState<number>(load('people', 4));
  const [totalBudget, setTotalBudget] = useState<number>(load('totalBudget', 0));

  // Save to localStorage
  useEffect(() => { save('favorites', favorites); }, [favorites]);
  useEffect(() => { save('tripDests', tripDestinations); }, [tripDestinations]);
  useEffect(() => { save('tripItems', tripItems); }, [tripItems]);
  useEffect(() => { save('people', people); }, [people]);
  useEffect(() => { save('totalBudget', totalBudget); }, [totalBudget]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProvince]);

  const navigate = useCallback((view: string) => {
    setSelectedProvince(null);
    setCurrentView(view);
  }, []);

  const selectProvince = useCallback((id: string) => {
    setSelectedProvince(id);
    setCurrentView('detail');
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  }, []);

  const addToTrip = useCallback((provinceId: string) => {
    setTripDestinations(prev => prev.includes(provinceId) ? prev : [...prev, provinceId]);
  }, []);

  const removeFromTrip = useCallback((provinceId: string) => {
    setTripDestinations(prev => prev.filter(id => id !== provinceId));
    setTripItems(prev => prev.filter(i => i.provinceId !== provinceId));
  }, []);

  const province = selectedProvince ? PROVINCES.find(p => p.id === selectedProvince) : null;

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="font-body min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        onNavigate={navigate}
        tripData={{ people, totalBudget, destinations: tripDestinations }}
      />

      <main className={currentView === 'home' ? '' : 'pt-14 md:pt-16'}>
        {/* Home view */}
        {currentView === 'home' && (
          <>
            <HeroSection
              onExplore={() => navigate('explore')}
              onSelectProvince={selectProvince}
            />

            {/* Featured destinations */}
            <section className="py-12 md:py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-10">
                  <p className="text-red-600 font-display font-semibold text-sm tracking-wider uppercase mb-2">Nổi bật</p>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">Điểm Đến Hàng Đầu</h2>
                  <p className="text-gray-500 text-sm max-w-lg mx-auto">Những địa điểm du lịch được yêu thích nhất Việt Nam</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {['ha-noi', 'da-nang', 'tp-hcm', 'quang-ninh', 'lam-dong', 'lao-cai'].map((id, i) => {
                    const p = PROVINCES.find(pr => pr.id === id);
                    if (!p) return null;
                    const region = REGIONS.find(r => r.id === p.region);
                    return (
                      <div
                        key={id}
                        onClick={() => selectProvince(id)}
                        className={`group cursor-pointer rounded-2xl overflow-hidden card-hover animate-fade-in-up ${i < 3 ? 'md:col-span-1' : 'md:col-span-1'}`}
                        style={{ animationDelay: `${i * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
                      >
                        <div className="relative h-52 md:h-60 overflow-hidden">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover province-card-img" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider mb-2 inline-block"
                              style={{ backgroundColor: region?.color }}>
                              {region?.name}
                            </span>
                            <h3 className="text-xl font-display font-bold text-white">{p.name}</h3>
                            <p className="text-white/70 text-xs mt-0.5">{p.tagline}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={() => navigate('explore')}
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl font-display font-semibold text-sm hover:bg-gray-800 transition-colors"
                  >
                    Xem tất cả 34 tỉnh thành
                  </button>
                </div>
              </div>
            </section>

            {/* How it works */}
            <section className="py-12 md:py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-10">
                  <p className="text-red-600 font-display font-semibold text-sm tracking-wider uppercase mb-2">Hướng dẫn</p>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">Lên Kế Hoạch Dễ Dàng</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                  {[
                    { step: '01', title: 'Chọn điểm đến', desc: 'Khám phá 34 tỉnh thành và lưu những nơi bạn muốn đi', color: 'from-red-500 to-red-600' },
                    { step: '02', title: 'Lên lịch trình', desc: 'Sử dụng lịch trình gợi ý hoặc tự tạo riêng cho mình', color: 'from-amber-500 to-amber-600' },
                    { step: '03', title: 'Tính chi phí', desc: 'Nhập chi phí và chia tiền tự động cho nhóm bạn bè', color: 'from-green-500 to-green-600' },
                    { step: '04', title: 'Lên đường!', desc: 'Dữ liệu lưu trên trình duyệt, mang theo bất cứ đâu', color: 'from-blue-500 to-blue-600' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-display font-bold text-sm mb-4 shadow-lg`}>
                        {item.step}
                      </div>
                      <h3 className="font-display font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Regions overview */}
            <section className="py-12 md:py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-10">
                  <p className="text-red-600 font-display font-semibold text-sm tracking-wider uppercase mb-2">Vùng miền</p>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">7 Vùng Du Lịch</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {REGIONS.map((region, i) => {
                    const count = PROVINCES.filter(p => p.region === region.id).length;
                    return (
                      <button
                        key={region.id}
                        onClick={() => navigate('explore')}
                        className="bg-white rounded-xl p-4 border border-gray-100 card-hover text-center animate-fade-in-up"
                        style={{ animationDelay: `${i * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
                      >
                        <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: region.color + '15' }}>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: region.color }} />
                        </div>
                        <p className="font-display font-bold text-gray-900 text-sm">{region.name}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{count} tỉnh</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-10 md:py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-display font-bold text-sm">VN</div>
                      <div>
                        <p className="font-display font-bold text-sm">Vietnam Travel Planner</p>
                        <p className="text-gray-500 text-[10px] tracking-wider uppercase">v2.0</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm max-w-sm">Khám phá Việt Nam cùng bạn bè. Lên kế hoạch, tính chi phí và tạo kỷ niệm.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="font-display font-bold text-sm mb-3">Khám phá</p>
                      <div className="space-y-2">
                        {['Miền Bắc', 'Miền Trung', 'Miền Nam', 'Tây Bắc'].map(r => (
                          <button key={r} onClick={() => navigate('explore')} className="block text-gray-400 text-sm hover:text-white transition-colors">{r}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm mb-3">Tính năng</p>
                      <div className="space-y-2">
                        {[
                          { label: 'Lịch trình', view: 'planner' },
                          { label: 'Chi phí', view: 'budget' },
                          { label: 'Yêu thích', view: 'favorites' },
                        ].map(item => (
                          <button key={item.view} onClick={() => navigate(item.view)} className="block text-gray-400 text-sm hover:text-white transition-colors">{item.label}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
                  <p className="text-gray-500 text-xs">Vietnam Travel Planner v2.0 — Dữ liệu được lưu trên trình duyệt của bạn</p>
                  <p className="text-gray-500 text-xs">Made with care for Vietnamese travelers</p>
                </div>
              </div>
            </footer>
          </>
        )}

        {/* Explore view */}
        {currentView === 'explore' && (
          <ProvinceGrid
            onSelectProvince={selectProvince}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {/* Detail view */}
        {currentView === 'detail' && province && (
          <ProvinceDetail
            province={province}
            onBack={() => navigate('explore')}
            onAddToTrip={addToTrip}
            isFavorite={favorites.includes(province.id)}
            onToggleFavorite={() => toggleFavorite(province.id)}
            isInTrip={tripDestinations.includes(province.id)}
          />
        )}

        {/* Planner view */}
        {currentView === 'planner' && (
          <TripPlanner
            tripDestinations={tripDestinations}
            tripItems={tripItems}
            onUpdateItems={setTripItems}
            people={people}
            onRemoveDestination={removeFromTrip}
            onViewProvince={selectProvince}
          />
        )}

        {/* Budget view */}
        {currentView === 'budget' && (
          <BudgetCalculator
            people={people}
            onSetPeople={setPeople}
            totalBudget={totalBudget}
            onSetTotalBudget={setTotalBudget}
            tripItems={tripItems}
          />
        )}

        {/* Favorites view */}
        {currentView === 'favorites' && (
          <FavoritesView
            favorites={favorites}
            onSelectProvince={selectProvince}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>
    </div>
  );
}
