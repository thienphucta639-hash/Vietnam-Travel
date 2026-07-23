import { useState } from 'react';
import {
  Users, Calendar, DollarSign, Plus, Trash2, Edit3, Check, X,
  Download, Upload, RotateCcw, Utensils, Bus, Hotel, Star, MapPin,
  Receipt, ChevronDown, ChevronUp, FileJson
} from 'lucide-react';
import { TripState, BillItem } from '../store/useStore';
import ExportModal from './ExportModal';

interface Props {
  trip: TripState;
  updateTrip: (updates: Partial<TripState>) => void;
  addBillItem: (item: Omit<BillItem, 'id'>) => void;
  removeBillItem: (id: string) => void;
  updateBillItem: (id: string, updates: Partial<BillItem>) => void;
  totalBill: number;
  perPerson: number;
  importTrip: (json: string) => boolean;
  resetTrip: () => void;
}

const CATEGORIES = [
  { id: 'transport', label: 'Di chuyển', icon: Bus, color: 'bg-blue-50 text-blue-600' },
  { id: 'food', label: 'Ăn uống', icon: Utensils, color: 'bg-orange-50 text-orange-600' },
  { id: 'hotel', label: 'Chỗ ở', icon: Hotel, color: 'bg-purple-50 text-purple-600' },
  { id: 'visit', label: 'Tham quan', icon: MapPin, color: 'bg-green-50 text-green-600' },
  { id: 'other', label: 'Khác', icon: Star, color: 'bg-slate-50 text-slate-600' },
];

function formatVND(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace('.0', '') + 'tr';
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'k';
  return n.toLocaleString('vi-VN');
}

export default function PlannerView({
  trip, updateTrip, addBillItem, removeBillItem, updateBillItem,
  totalBill, perPerson, importTrip, resetTrip
}: Props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', amount: '', category: 'other' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ name: '', amount: '' });
  const [showSettings, setShowSettings] = useState(true);
  const [showBill, setShowBill] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleAdd = () => {
    const amount = parseFloat(newItem.amount);
    if (!newItem.name.trim() || isNaN(amount) || amount <= 0) return;
    addBillItem({
      name: newItem.name.trim(),
      amount,
      category: newItem.category,
    });
    setNewItem({ name: '', amount: '', category: 'other' });
    setShowAddForm(false);
  };

  const startEdit = (item: BillItem) => {
    setEditingId(item.id);
    setEditValues({ name: item.name, amount: item.amount.toString() });
  };

  const saveEdit = (id: string) => {
    const amount = parseFloat(editValues.amount);
    if (!editValues.name.trim() || isNaN(amount)) return;
    updateBillItem(id, { name: editValues.name.trim(), amount });
    setEditingId(null);
  };

  const handleImport = () => {
    if (importTrip(importText)) {
      setShowImportModal(false);
      setImportText('');
    }
  };

  const categoryTotals = CATEGORIES.map(cat => ({
    ...cat,
    total: trip.billItems.filter(b => b.category === cat.id).reduce((s, b) => s + b.amount, 0),
    count: trip.billItems.filter(b => b.category === cat.id).length,
  }));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6 fade-in-up">
      <div className="mb-2">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-1">Lịch trình & Chi phí</h2>
        <p className="text-slate-500 text-sm">Quản lý chuyến đi, tính toán và chia tiền nhóm</p>
      </div>

      {/* Trip Settings */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full flex items-center justify-between p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <Calendar size={18} className="text-red-500" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900">Thông tin chuyến đi</h3>
              <p className="text-sm text-slate-500">{trip.numPeople} người · {trip.name || 'Chưa đặt tên'}</p>
            </div>
          </div>
          {showSettings ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
        </button>

        {showSettings && (
          <div className="px-5 pb-5 space-y-4 border-t border-slate-100 pt-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Tên chuyến đi</label>
              <input
                type="text"
                value={trip.name}
                onChange={e => updateTrip({ name: e.target.value })}
                placeholder="VD: Hè 2024 cùng hội bạn"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Ngày đi</label>
                <input
                  type="date"
                  value={trip.startDate}
                  onChange={e => updateTrip({ startDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Ngày về</label>
                <input
                  type="date"
                  value={trip.endDate}
                  onChange={e => updateTrip({ endDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Số người đi</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateTrip({ numPeople: Math.max(1, trip.numPeople - 1) })}
                  className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-lg font-bold"
                >
                  -
                </button>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 min-w-[80px] justify-center">
                  <Users size={16} className="text-slate-500" />
                  <span className="font-bold text-slate-900 text-lg">{trip.numPeople}</span>
                </div>
                <button
                  onClick={() => updateTrip({ numPeople: trip.numPeople + 1 })}
                  className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-lg font-bold"
                >
                  +
                </button>
                <span className="text-sm text-slate-500">người</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 text-white">
          <p className="text-sm text-red-100 font-medium mb-1">Tổng chi phí</p>
          <p className="font-display text-2xl font-bold">{totalBill > 0 ? formatVND(totalBill) + 'đ' : '0đ'}</p>
          <p className="text-xs text-red-200 mt-1">{trip.billItems.length} khoản chi</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-5 text-white">
          <p className="text-sm text-indigo-100 font-medium mb-1">Mỗi người trả</p>
          <p className="font-display text-2xl font-bold">{perPerson > 0 ? formatVND(Math.ceil(perPerson)) + 'đ' : '0đ'}</p>
          <p className="text-xs text-indigo-200 mt-1">Chia đều {trip.numPeople} người</p>
        </div>
      </div>

      {/* Category breakdown */}
      {totalBill > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-900 mb-3 text-sm">Phân bổ chi phí</h3>
          <div className="space-y-2.5">
            {categoryTotals.filter(c => c.total > 0).map(cat => {
              const pct = totalBill > 0 ? (cat.total / totalBill) * 100 : 0;
              return (
                <div key={cat.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cat.color}`}>
                    <cat.icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-700 font-medium">{cat.label}</span>
                      <span className="text-sm text-slate-900 font-semibold">{formatVND(cat.total)}đ</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-red-500 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0 w-10 text-right">{pct.toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bill Items */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <button
          onClick={() => setShowBill(!showBill)}
          className="w-full flex items-center justify-between p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <Receipt size={18} className="text-green-500" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900">Danh sách chi phí</h3>
              <p className="text-sm text-slate-500">{trip.billItems.length} khoản</p>
            </div>
          </div>
          {showBill ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
        </button>

        {showBill && (
          <div className="border-t border-slate-100">
            {trip.billItems.length === 0 ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <DollarSign size={24} className="text-slate-300" />
                </div>
                <p className="text-slate-500 text-sm mb-1">Chưa có khoản chi nào</p>
                <p className="text-slate-400 text-xs">Thêm chi phí để tính toán</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {trip.billItems.map(item => {
                  const cat = CATEGORIES.find(c => c.id === item.category) || CATEGORIES[4];
                  const CatIcon = cat.icon;

                  if (editingId === item.id) {
                    return (
                      <div key={item.id} className="p-4 bg-amber-50/50">
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="text"
                            value={editValues.name}
                            onChange={e => setEditValues(v => ({ ...v, name: e.target.value }))}
                            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
                            autoFocus
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={editValues.amount}
                            onChange={e => setEditValues(v => ({ ...v, amount: e.target.value }))}
                            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
                            placeholder="Số tiền (VNĐ)"
                          />
                          <button
                            onClick={() => saveEdit(item.id)}
                            className="w-9 h-9 rounded-lg bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="w-9 h-9 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-300 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={item.id} className="flex items-center gap-3 p-4 group hover:bg-slate-50/50 transition-colors">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cat.color}`}>
                        <CatIcon size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
                        <p className="text-xs text-slate-400">{cat.label}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-slate-900">{item.amount.toLocaleString('vi-VN')}đ</p>
                        <p className="text-xs text-slate-400">{formatVND(Math.ceil(item.amount / trip.numPeople))}đ/ng</p>
                      </div>
                      <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
                        <button
                          onClick={() => startEdit(item)}
                          className="w-7 h-7 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-400 transition-colors"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => removeBillItem(item.id)}
                          className="w-7 h-7 rounded-lg hover:bg-red-100 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Add form */}
            {showAddForm ? (
              <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={e => setNewItem(v => ({ ...v, name: e.target.value }))}
                    placeholder="Tên khoản chi (VD: Vé máy bay, Khách sạn...)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 bg-white"
                    autoFocus
                  />
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={newItem.amount}
                      onChange={e => setNewItem(v => ({ ...v, amount: e.target.value }))}
                      placeholder="Số tiền (VNĐ)"
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 bg-white"
                    />
                    <select
                      value={newItem.category}
                      onChange={e => setNewItem(v => ({ ...v, category: e.target.value }))}
                      className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 bg-white text-slate-700"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAdd}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-500 transition-colors"
                    >
                      <Plus size={16} />
                      Thêm khoản chi
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-3 rounded-xl bg-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-300 transition-colors"
                    >
                      Hủy
                    </button>
                  </div>
                </div>

                {/* Quick add suggestions */}
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <p className="text-xs text-slate-400 mb-2">Thêm nhanh:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: 'Vé máy bay', amount: 1500000, cat: 'transport' },
                      { name: 'Khách sạn/đêm', amount: 500000, cat: 'hotel' },
                      { name: 'Ăn sáng', amount: 50000, cat: 'food' },
                      { name: 'Ăn trưa', amount: 100000, cat: 'food' },
                      { name: 'Ăn tối', amount: 150000, cat: 'food' },
                      { name: 'Grab/taxi', amount: 200000, cat: 'transport' },
                      { name: 'Vé tham quan', amount: 200000, cat: 'visit' },
                      { name: 'Thuê xe máy', amount: 150000, cat: 'transport' },
                    ].map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setNewItem({ name: s.name, amount: s.amount.toString(), category: s.cat })}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        {s.name} ({formatVND(s.amount)})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 border-t border-slate-100">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 text-sm font-medium hover:border-red-300 hover:text-red-500 hover:bg-red-50/50 transition-all"
                >
                  <Plus size={16} />
                  Thêm khoản chi mới
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setShowExportModal(true)}
          className="flex flex-col items-center gap-2 p-4 bg-green-600 rounded-2xl border border-green-500 shadow-lg shadow-green-600/20 text-white hover:bg-green-500 transition-all"
        >
          <Download size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">Tải về máy</span>
        </button>
        <button
          onClick={() => setShowImportModal(true)}
          className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-600 hover:bg-slate-50 hover:border-slate-200 transition-all"
        >
          <Upload size={18} />
          <span className="text-xs font-medium">Nhập file</span>
        </button>
        <button
          onClick={() => setShowConfirmReset(true)}
          className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all"
        >
          <RotateCcw size={18} />
          <span className="text-xs font-medium">Đặt lại</span>
        </button>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" onClick={() => setShowImportModal(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl p-6 max-w-lg w-full modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <FileJson size={18} className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Nhập dữ liệu</h3>
                <p className="text-sm text-slate-500">Dán nội dung JSON đã xuất trước đó</p>
              </div>
            </div>
            <textarea
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder="Dán nội dung JSON vào đây..."
              rows={8}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none"
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleImport}
                className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors"
              >
                Nhập dữ liệu
              </button>
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-3 rounded-xl bg-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-300 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Reset */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" onClick={() => setShowConfirmReset(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full modal-content" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <RotateCcw size={24} className="text-red-500" />
              </div>
              <h3 className="font-semibold text-slate-900 text-lg mb-2">Đặt lại tất cả?</h3>
              <p className="text-sm text-slate-500 mb-6">
                Toàn bộ dữ liệu chuyến đi sẽ bị xóa. Hành động này không thể hoàn tác.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    resetTrip();
                    setShowConfirmReset(false);
                  }}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-500 transition-colors"
                >
                  Xóa hết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          trip={trip}
          totalBill={totalBill}
          perPerson={perPerson}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
}
