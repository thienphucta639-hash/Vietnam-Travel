import { useState } from 'react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  tripData: { people: number; totalBudget: number; destinations: string[] };
}

export default function Header({ currentView, onNavigate, tripData }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'explore', label: 'Khám phá' },
    { id: 'planner', label: 'Lịch trình' },
    { id: 'budget', label: 'Chi phí' },
    { id: 'favorites', label: 'Yêu thích' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-display font-bold text-sm shadow-lg shadow-red-200 group-hover:shadow-red-300 transition-shadow">
              VN
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-bold text-gray-900 text-sm leading-none">Vietnam Travel</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase">Planner v2.0</p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currentView === item.id
                    ? 'bg-red-50 text-red-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Trip summary mini */}
          <div className="hidden lg:flex items-center gap-3 text-xs text-gray-500">
            {tripData.people > 0 && (
              <span className="bg-gray-100 px-2.5 py-1 rounded-full">{tripData.people} người</span>
            )}
            {tripData.totalBudget > 0 && (
              <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                {(tripData.totalBudget / 1000000).toFixed(1)}M VNĐ
              </span>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`h-0.5 bg-gray-700 rounded transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-0.5 bg-gray-700 rounded transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-gray-700 rounded transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  currentView === item.id
                    ? 'bg-red-50 text-red-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {tripData.people > 0 && (
            <div className="px-4 pb-3 flex gap-2 text-xs">
              <span className="bg-gray-100 px-2.5 py-1 rounded-full">{tripData.people} người</span>
              {tripData.totalBudget > 0 && (
                <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                  {(tripData.totalBudget / 1000000).toFixed(1)}M VNĐ
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
