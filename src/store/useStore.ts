import { useState, useCallback, useEffect } from 'react';

export interface TripDay {
  id: string;
  date: string;
  provinceId: string;
  activities: TripActivity[];
}

export interface TripActivity {
  id: string;
  time: string;
  title: string;
  description: string;
  cost: number;
  type: 'visit' | 'food' | 'transport' | 'hotel' | 'other';
}

export interface BillItem {
  id: string;
  name: string;
  amount: number;
  category: string;
}

export interface TripState {
  name: string;
  startDate: string;
  endDate: string;
  numPeople: number;
  destinations: string[];
  days: TripDay[];
  billItems: BillItem[];
  favorites: string[];
}

const DEFAULT_TRIP: TripState = {
  name: 'Chuyến đi Việt Nam',
  startDate: '',
  endDate: '',
  numPeople: 4,
  destinations: [],
  days: [],
  billItems: [],
  favorites: [],
};

const STORAGE_KEY = 'vietnam-travel-planner-v2';

function loadFromStorage(): TripState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_TRIP, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load from storage:', e);
  }
  return { ...DEFAULT_TRIP };
}

function saveToStorage(state: TripState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save to storage:', e);
  }
}

export function useTripStore() {
  const [trip, setTrip] = useState<TripState>(loadFromStorage);

  useEffect(() => {
    saveToStorage(trip);
  }, [trip]);

  const updateTrip = useCallback((updates: Partial<TripState>) => {
    setTrip(prev => ({ ...prev, ...updates }));
  }, []);

  const addBillItem = useCallback((item: Omit<BillItem, 'id'>) => {
    setTrip(prev => ({
      ...prev,
      billItems: [...prev.billItems, { ...item, id: Date.now().toString() }],
    }));
  }, []);

  const removeBillItem = useCallback((id: string) => {
    setTrip(prev => ({
      ...prev,
      billItems: prev.billItems.filter(i => i.id !== id),
    }));
  }, []);

  const updateBillItem = useCallback((id: string, updates: Partial<BillItem>) => {
    setTrip(prev => ({
      ...prev,
      billItems: prev.billItems.map(i => i.id === id ? { ...i, ...updates } : i),
    }));
  }, []);

  const toggleFavorite = useCallback((provinceId: string) => {
    setTrip(prev => ({
      ...prev,
      favorites: prev.favorites.includes(provinceId)
        ? prev.favorites.filter(f => f !== provinceId)
        : [...prev.favorites, provinceId],
    }));
  }, []);

  const totalBill = trip.billItems.reduce((sum, item) => sum + item.amount, 0);
  const perPerson = trip.numPeople > 0 ? totalBill / trip.numPeople : 0;

  const exportTrip = useCallback(() => {
    const dataStr = JSON.stringify(trip, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${trip.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [trip]);

  const importTrip = useCallback((jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        setTrip({ ...DEFAULT_TRIP, ...parsed });
        return true;
      }
    } catch (e) {
      console.error('Import failed:', e);
    }
    return false;
  }, []);

  const resetTrip = useCallback(() => {
    setTrip({ ...DEFAULT_TRIP });
  }, []);

  return {
    trip,
    updateTrip,
    addBillItem,
    removeBillItem,
    updateBillItem,
    toggleFavorite,
    totalBill,
    perPerson,
    exportTrip,
    importTrip,
    resetTrip,
  };
}
