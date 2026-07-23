import { useState } from 'react';
import { Menu, X, Map, Heart, Receipt, Search, Home } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  favCount: number;
}

export default function Header({ currentView, onNavigate, favCount }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'explore', label: 'Khám phá', icon: Map },
    { id: 'favorites', label: 'Yêu thích', icon: Heart, badge: favCount },
    { id: 'planner', label: 'Lịch trình', icon: Receipt },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-red-500/25">
            VN
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display font-bold text-[15px] text-slate-900 leading-tight">
              Vietnam Travel
            </h1>
            <p className="text-[11px] text-slate-500 font-medium -mt-0.5">Planner v2.0</p>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                currentView === item.id
                  ? 'bg-red-50 text-red-600'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
              {item.badge ? (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('search')}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Search size={18} />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-lg">
          <nav className="px-4 py-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMenuOpen(false);
                }}
                className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  currentView === item.id
                    ? 'bg-red-50 text-red-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="ml-auto w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
