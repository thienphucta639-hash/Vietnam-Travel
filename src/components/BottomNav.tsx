import { Home, Map, Heart, Receipt, Search } from 'lucide-react';

interface Props {
  currentView: string;
  onNavigate: (view: string) => void;
  favCount: number;
}

export default function BottomNav({ currentView, onNavigate, favCount }: Props) {
  const items = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'explore', label: 'Khám phá', icon: Map },
    { id: 'search', label: 'Tìm kiếm', icon: Search },
    { id: 'favorites', label: 'Yêu thích', icon: Heart, badge: favCount },
    { id: 'planner', label: 'Lịch trình', icon: Receipt },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/60 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-1">
        {items.map(item => {
          const isActive = currentView === item.id || (currentView === 'province-detail' && item.id === 'explore');
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                isActive ? 'text-red-600' : 'text-slate-400'
              }`}
            >
              <div className="relative">
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                {item.badge ? (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                ) : null}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-red-600' : 'text-slate-400'}`}>{item.label}</span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-red-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
