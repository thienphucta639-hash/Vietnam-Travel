import { useState } from 'react';
import { PROVINCES } from '../data/provinces';

export interface TripItem {
  id: string;
  provinceId: string;
  day: number;
  time: string;
  activity: string;
  cost: number;
  note: string;
}

interface Props {
  tripDestinations: string[];
  tripItems: TripItem[];
  onUpdateItems: (items: TripItem[]) => void;
  people: number;
  onRemoveDestination: (id: string) => void;
  onViewProvince: (id: string) => void;
}

export default function TripPlanner({ tripDestinations, tripItems, onUpdateItems, people, onRemoveDestination, onViewProvince }: Props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState<TripItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<TripItem>>({
    provinceId: tripDestinations[0] || '',
    day: 1,
    time: '08:00',
    activity: '',
    cost: 0,
    note: '',
  });

  const days = Array.from(new Set(tripItems.map(i => i.day))).sort((a, b) => a - b);
  const maxDay = days.length > 0 ? Math.max(...days) : 0;

  const addItem = () => {
    if (!newItem.activity?.trim()) return;
    const item: TripItem = {
      id: Date.now().toString(),
      provinceId: newItem.provinceId || tripDestinations[0] || '',
      day: newItem.day || 1,
      time: newItem.time || '08:00',
      activity: newItem.activity || '',
      cost: newItem.cost || 0,
      note: newItem.note || '',
    };
    onUpdateItems([...tripItems, item].sort((a, b) => a.day - b.day || a.time.localeCompare(b.time)));
    setNewItem({ provinceId: tripDestinations[0] || '', day: item.day, time: '08:00', activity: '', cost: 0, note: '' });
    setShowAddModal(false);
  };

  const updateItem = () => {
    if (!editItem) return;
    onUpdateItems(tripItems.map(i => i.id === editItem.id ? editItem : i).sort((a, b) => a.day - b.day || a.time.localeCompare(b.time)));
    setEditItem(null);
  };

  const deleteItem = (id: string) => {
    onUpdateItems(tripItems.filter(i => i.id !== id));
  };

  // Apply itinerary with costs from province data
  const applyItinerary = (provinceId: string) => {
    const province = PROVINCES.find(p => p.id === provinceId);
    if (!province) return;
    const offset = maxDay;
    const newItems: TripItem[] = province.itinerary.flatMap(day =>
      day.items.map((item, idx) => ({
        id: `${Date.now()}-${day.day}-${idx}`,
        provinceId,
        day: offset + day.day,
        time: item.time,
        activity: item.activity,
        cost: item.cost, // Chi phí từ data gốc
        note: item.note || '',
      }))
    );
    onUpdateItems([...tripItems, ...newItems].sort((a, b) => a.day - b.day || a.time.localeCompare(b.time)));
  };

  const totalCost = tripItems.reduce((s, i) => s + i.cost, 0);
  const allDays = Array.from(new Set(tripItems.map(i => i.day))).sort((a, b) => a - b);
  const perPerson = people > 0 ? totalCost / people : 0;

  // Group by day and province
  const getDayCost = (day: number) => tripItems.filter(i => i.day === day).reduce((s, i) => s + i.cost, 0);

  return (
    <div className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <p className="text-red-600 font-display font-semibold text-sm tracking-wider uppercase mb-2">Lịch trình</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">Trip Planner</h2>
          <p className="text-gray-500 text-sm">Thêm địa điểm, sắp xếp lịch trình và quản lý chi phí</p>
        </div>

        {/* Trip destinations */}
        {tripDestinations.length > 0 ? (
          <div className="mb-8">
            <h3 className="font-display font-bold text-lg text-gray-900 mb-3">Điểm đến đã chọn</h3>
            <div className="flex flex-wrap gap-2">
              {tripDestinations.map(id => {
                const p = PROVINCES.find(pr => pr.id === id);
                if (!p) return null;
                return (
                  <div key={id} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-200 card-hover">
                    <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                    <button onClick={() => onViewProvince(id)} className="font-medium text-sm text-gray-900 hover:text-red-600 transition-colors">{p.name}</button>
                    <button onClick={() => onRemoveDestination(id)} className="text-gray-400 hover:text-red-500 transition-colors ml-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 border-dashed p-8 text-center mb-8">
            <p className="text-gray-400 mb-2">Chưa có điểm đến nào</p>
            <p className="text-gray-500 text-sm">Hãy vào phần "Khám phá" để thêm tỉnh thành vào lịch trình</p>
          </div>
        )}

        {/* Auto-apply itinerary buttons */}
        {tripDestinations.length > 0 && (
          <div className="mb-8">
            <h3 className="font-display font-bold text-lg text-gray-900 mb-3">Áp dụng lịch trình gợi ý</h3>
            <p className="text-gray-500 text-sm mb-3">Chi phí sẽ được tự động tính từ lịch trình gợi ý của mỗi tỉnh</p>
            <div className="flex flex-wrap gap-2">
              {tripDestinations.map(id => {
                const p = PROVINCES.find(pr => pr.id === id);
                if (!p) return null;
                const hasItems = tripItems.some(i => i.provinceId === id);
                const itineraryCost = p.itinerary.reduce((total, day) => total + day.items.reduce((s, item) => s + item.cost, 0), 0);
                return (
                  <button
                    key={id}
                    onClick={() => !hasItems && applyItinerary(id)}
                    disabled={hasItems}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                      hasItems
                        ? 'bg-green-50 text-green-700 border border-green-200 cursor-default'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {hasItems ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {p.name} - Đã áp dụng
                      </>
                    ) : (
                      <>
                        <span>{p.name}</span>
                        <span className="text-xs opacity-80">~{(itineraryCost/1000).toFixed(0)}k</span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary - Chi phí tổng hợp */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <p className="text-2xl font-display font-bold text-gray-900">{allDays.length}</p>
            <p className="text-gray-500 text-xs">Số ngày</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <p className="text-2xl font-display font-bold text-gray-900">{tripItems.length}</p>
            <p className="text-gray-500 text-xs">Hoạt động</p>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-center text-white shadow-lg shadow-amber-200">
            <p className="text-2xl font-display font-bold">{totalCost > 0 ? (totalCost / 1000).toFixed(0) + 'k' : '0'}</p>
            <p className="text-amber-100 text-xs">Tổng chi phí (VNĐ)</p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-center text-white shadow-lg shadow-red-200">
            <p className="text-2xl font-display font-bold">{perPerson > 0 ? (perPerson / 1000).toFixed(0) + 'k' : '0'}</p>
            <p className="text-red-100 text-xs">Chi phí/người ({people} người)</p>
          </div>
        </div>

        {/* Timeline */}
        {allDays.map(day => {
          const dayCost = getDayCost(day);
          return (
            <div key={day} className="mb-8">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-display font-bold shadow-lg shadow-red-200">
                    {day}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-gray-900">Ngày {day}</h3>
                    <p className="text-gray-500 text-xs">
                      {tripItems.filter(i => i.day === day).length} hoạt động
                    </p>
                  </div>
                </div>
                {dayCost > 0 && (
                  <div className="text-right">
                    <p className="font-bold text-amber-600">{(dayCost/1000).toFixed(0)}k VNĐ</p>
                    <p className="text-gray-400 text-xs">{people > 0 ? (dayCost/people/1000).toFixed(0) + 'k/người' : ''}</p>
                  </div>
                )}
              </div>

              <div className="ml-5 border-l-2 border-red-100 pl-6 space-y-3">
                {tripItems.filter(i => i.day === day).map(item => {
                  const prov = PROVINCES.find(p => p.id === item.provinceId);
                  return (
                    <div key={item.id} className="relative bg-white rounded-xl p-4 border border-gray-100 card-hover group">
                      <div className="absolute -left-[31px] top-4 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">{item.time}</span>
                            {prov && <span className="text-[10px] text-gray-400">{prov.name}</span>}
                            {item.cost > 0 && (
                              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                                {(item.cost/1000).toFixed(0)}k
                              </span>
                            )}
                          </div>
                          <p className="font-medium text-gray-900 text-sm">{item.activity}</p>
                          {item.note && <p className="text-gray-500 text-xs mt-0.5">{item.note}</p>}
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setEditItem({ ...item })} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button onClick={() => deleteItem(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Add button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-300 text-gray-400 hover:border-red-300 hover:text-red-500 font-semibold text-sm transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Thêm hoạt động
        </button>

        {/* Cost summary banner */}
        {totalCost > 0 && (
          <div className="mt-8 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-5 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-red-100 text-sm mb-1">Tổng chi phí dự kiến</p>
                <p className="text-3xl font-display font-bold">{totalCost.toLocaleString()} VNĐ</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-red-100 text-sm mb-1">Chia cho {people} người</p>
                <p className="text-2xl font-display font-bold">{Math.round(perPerson).toLocaleString()} VNĐ/người</p>
              </div>
            </div>
          </div>
        )}

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-6 modal-content" onClick={e => e.stopPropagation()}>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-4">Thêm hoạt động</h3>
              <div className="space-y-3">
                {tripDestinations.length > 0 && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Điểm đến</label>
                    <select
                      value={newItem.provinceId}
                      onChange={e => setNewItem({ ...newItem, provinceId: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white text-gray-900"
                    >
                      {tripDestinations.map(id => {
                        const p = PROVINCES.find(pr => pr.id === id);
                        return <option key={id} value={id}>{p?.name}</option>;
                      })}
                    </select>
                  </div>
                )}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Ngày</label>
                    <input
                      type="number"
                      min={1}
                      value={newItem.day}
                      onChange={e => setNewItem({ ...newItem, day: parseInt(e.target.value) || 1 })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Giờ</label>
                    <input
                      type="time"
                      value={newItem.time}
                      onChange={e => setNewItem({ ...newItem, time: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Hoạt động</label>
                  <input
                    type="text"
                    value={newItem.activity}
                    onChange={e => setNewItem({ ...newItem, activity: e.target.value })}
                    placeholder="VD: Tham quan Hồ Hoàn Kiếm"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Chi phí (VNĐ)</label>
                    <input
                      type="number"
                      min={0}
                      step={10000}
                      value={newItem.cost}
                      onChange={e => setNewItem({ ...newItem, cost: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Ghi chú</label>
                    <input
                      type="text"
                      value={newItem.note}
                      onChange={e => setNewItem({ ...newItem, note: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400"
                      placeholder="Tùy chọn"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Hủy
                </button>
                <button onClick={addItem} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors">
                  Thêm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editItem && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 modal-overlay" onClick={() => setEditItem(null)}>
            <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-6 modal-content" onClick={e => e.stopPropagation()}>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-4">Sửa hoạt động</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Ngày</label>
                    <input type="number" min={1} value={editItem.day} onChange={e => setEditItem({ ...editItem, day: parseInt(e.target.value) || 1 })} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900" />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Giờ</label>
                    <input type="time" value={editItem.time} onChange={e => setEditItem({ ...editItem, time: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Hoạt động</label>
                  <input type="text" value={editItem.activity} onChange={e => setEditItem({ ...editItem, activity: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900" />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Chi phí (VNĐ)</label>
                    <input type="number" min={0} step={10000} value={editItem.cost} onChange={e => setEditItem({ ...editItem, cost: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900" />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Ghi chú</label>
                    <input type="text" value={editItem.note} onChange={e => setEditItem({ ...editItem, note: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setEditItem(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm">Hủy</button>
                <button onClick={updateItem} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm">Lưu</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
