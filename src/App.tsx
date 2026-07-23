import { useState, useCallback } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeView from './components/HomeView';
import ExploreView from './components/ExploreView';
import FavoritesView from './components/FavoritesView';
import PlannerView from './components/PlannerView';
import SearchView from './components/SearchView';
import ProvinceDetail from './components/ProvinceDetail';
import DownloadZip from './components/DownloadZip';
import { PROVINCES } from './data/provinces';
import { useTripStore } from './store/useStore';

type View = 'home' | 'explore' | 'favorites' | 'planner' | 'search' | 'province-detail' | 'download';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  const store = useTripStore();

  const navigate = useCallback((view: string) => {
    if (view === 'search') {
      setShowSearch(true);
      return;
    }
    setCurrentView(view as View);
    setSelectedProvinceId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const selectProvince = useCallback((id: string) => {
    setSelectedProvinceId(id);
    setCurrentView('province-detail');
    setShowSearch(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const selectedProvince = selectedProvinceId ? PROVINCES.find(p => p.id === selectedProvinceId) : null;

  const renderView = () => {
    if (currentView === 'province-detail' && selectedProvince) {
      return (
        <div className="pt-16">
          <ProvinceDetail
            province={selectedProvince}
            isFavorite={store.trip.favorites.includes(selectedProvince.id)}
            onToggleFavorite={() => store.toggleFavorite(selectedProvince.id)}
            onBack={() => {
              setCurrentView('explore');
              setSelectedProvinceId(null);
            }}
          />
        </div>
      );
    }

    switch (currentView) {
      case 'home':
        return (
          <div className="pt-16">
            <HomeView
              onNavigate={navigate}
              onSelectProvince={selectProvince}
              favorites={store.trip.favorites}
              onToggleFavorite={store.toggleFavorite}
              onApplyItinerary={(data) => {
                // Set trip name
                store.updateTrip({ name: data.name, numPeople: store.trip.numPeople || 4 });
                // Set start/end dates based on numDays from today
                const start = new Date();
                const end = new Date();
                end.setDate(end.getDate() + data.numDays - 1);
                store.updateTrip({
                  startDate: start.toISOString().slice(0, 10),
                  endDate: end.toISOString().slice(0, 10),
                });
                // Add bill items
                data.billItems.forEach(item => {
                  store.addBillItem(item);
                });
              }}
            />
          </div>
        );
      case 'explore':
        return (
          <div className="pt-16">
            <ExploreView
              favorites={store.trip.favorites}
              onToggleFavorite={store.toggleFavorite}
            />
          </div>
        );
      case 'favorites':
        return (
          <div className="pt-16">
            <FavoritesView
              favorites={store.trip.favorites}
              onToggleFavorite={store.toggleFavorite}
              onSelectProvince={selectProvince}
            />
          </div>
        );
      case 'planner':
        return (
          <div className="pt-16">
            <PlannerView
              trip={store.trip}
              updateTrip={store.updateTrip}
              addBillItem={store.addBillItem}
              removeBillItem={store.removeBillItem}
              updateBillItem={store.updateBillItem}
              totalBill={store.totalBill}
              perPerson={store.perPerson}
              importTrip={store.importTrip}
              resetTrip={store.resetTrip}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header
        currentView={currentView}
        onNavigate={navigate}
        favCount={store.trip.favorites.length}
      />

      {renderView()}

      {showSearch && (
        <SearchView
          onSelectProvince={selectProvince}
          onClose={() => setShowSearch(false)}
        />
      )}

      {currentView === 'download' && (
        <DownloadZip onClose={() => setCurrentView('home')} />
      )}

      {currentView !== 'download' && (
        <BottomNav
          currentView={currentView}
          onNavigate={navigate}
          favCount={store.trip.favorites.length}
        />
      )}

      {/* Spacer for bottom nav on mobile - only on non-home pages */}
      {currentView !== 'home' && currentView !== 'download' && <div className="md:hidden h-20" />}
    </div>
  );
}
