import { useState } from 'react';
import type { TripItem } from './TripPlanner';

interface BillItem {
  id: string;
  name: string;
  amount: number;
  category: string;
  splitWith: number;
}

interface Props {
  people: number;
  onSetPeople: (n: number) => void;
  totalBudget: number;
  onSetTotalBudget: (n: number) => void;
  tripItems: TripItem[];
}

const CATEGORIES = [
  { id: 'transport', name: 'Di chuyển', icon: '🚗', color: 'bg-blue-50 text-blue-700' },
  { id: 'accommodation', name: 'Lưu trú', icon: '🏨', color: 'bg-purple-50 text-purple-700' },
  { id: 'food', name: 'Ăn uống', icon: '🍜', color: 'bg-amber-50 text-amber-700' },
  { id: 'ticket', name: 'Vé tham quan', icon: '🎫', color: 'bg-green-50 text-green-700' },
  { id: 'shopping', name: 'Mua sắm', icon: '🛍️', color: 'bg-pink-50 text-pink-700' },
  { id: 'other', name: 'Khác', icon: '📦', color: 'bg-gray-50 text-gray-700' },
];

export default function BudgetCalculator({ people, onSetPeople, totalBudget, onSetTotalBudget, tripItems }: Props) {
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newBill, setNewBill] = useState<Partial<BillItem>>({ name: '', amount: 0, category: 'food', splitWith: people });

  const addBillItem = () => {
    if (!newBill.name?.trim() || !newBill.amount) return;
    const item: BillItem = {
      id: Date.now().toString(),
      name: newBill.name || '',
      amount: newBill.amount || 0,
      category: newBill.category || 'food',
      splitWith: newBill.splitWith || people,
    };
    setBillItems([...billItems, item]);
    setNewBill({ name: '', amount: 0, category: 'food', splitWith: people });
    setShowAdd(false);
  };

  const deleteBillItem = (id: string) => {
    setBillItems(billItems.filter(i => i.id !== id));
  };

  const tripCosts = tripItems.reduce((s, i) => s + i.cost, 0);
  const billTotal = billItems.reduce((s, i) => s + i.amount, 0);
  const grandTotal = tripCosts + billTotal;
  const perPerson = people > 0 ? grandTotal / people : 0;

  const categoryTotals = CATEGORIES.map(cat => ({
    ...cat,
    total: billItems.filter(b => b.category === cat.id).reduce((s, i) => s + i.amount, 0),
  })).filter(c => c.total > 0);

  const budgetRemaining = totalBudget - grandTotal;

  return (
    <div className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <p className="text-red-600 font-display font-semibold text-sm tracking-wider uppercase mb-2">Quản lý</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">Chi Phí & Chia Tiền</h2>
          <p className="text-gray-500 text-sm">Tính toán chi phí và chia tiền cho nhóm bạn</p>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
          <h3 className="font-display font-bold text-gray-900 mb-4">Cài đặt chuyến đi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Số người đi</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSetPeople(Math.max(1, people - 1))}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  value={people}
                  onChange={e => onSetPeople(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-center text-sm font-bold text-gray-900"
                />
                <button
                  onClick={() => onSetPeople(people + 1)}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Tổng ngân sách (VNĐ)</label>
              <input
                type="number"
                min={0}
                step={100000}
                value={totalBudget}
                onChange={e => onSetTotalBudget(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900"
                placeholder="Nhập tổng ngân sách cho cả nhóm"
              />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-gray-500 text-xs mb-1">Tổng chi phí</p>
            <p className="text-xl md:text-2xl font-display font-bold text-gray-900">{(grandTotal / 1000000).toFixed(1)}M</p>
            <p className="text-gray-400 text-[10px]">{grandTotal.toLocaleString()} VNĐ</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-gray-500 text-xs mb-1">Chi phí/người</p>
            <p className="text-xl md:text-2xl font-display font-bold text-red-600">{(perPerson / 1000).toFixed(0)}k</p>
            <p className="text-gray-400 text-[10px]">{perPerson.toLocaleString()} VNĐ</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-gray-500 text-xs mb-1">Ngân sách đặt</p>
            <p className="text-xl md:text-2xl font-display font-bold text-amber-600">{(totalBudget / 1000000).toFixed(1)}M</p>
            <p className="text-gray-400 text-[10px]">{totalBudget.toLocaleString()} VNĐ</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-gray-500 text-xs mb-1">Còn lại</p>
            <p className={`text-xl md:text-2xl font-display font-bold ${budgetRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {budgetRemaining >= 0 ? '+' : ''}{(budgetRemaining / 1000).toFixed(0)}k
            </p>
            <p className="text-gray-400 text-[10px]">{budgetRemaining >= 0 ? 'Dư ngân sách' : 'Vượt ngân sách'}</p>
          </div>
        </div>

        {/* Budget Bar */}
        {totalBudget > 0 && (
          <div className="bg-white rounded-xl p-4 border border-gray-100 mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold text-gray-700">Tiến độ chi tiêu</p>
              <p className="text-sm text-gray-500">{((grandTotal / totalBudget) * 100).toFixed(0)}%</p>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${grandTotal / totalBudget > 1 ? 'bg-red-500' : grandTotal / totalBudget > 0.8 ? 'bg-amber-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min((grandTotal / totalBudget) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Category breakdown */}
        {categoryTotals.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
            <h3 className="font-display font-bold text-gray-900 mb-4">Phân loại chi tiêu</h3>
            <div className="space-y-3">
              {categoryTotals.map(cat => (
                <div key={cat.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${cat.color}`}>
                      {cat.icon} {cat.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 text-sm">{cat.total.toLocaleString()} VNĐ</p>
                    <p className="text-gray-400 text-[10px]">{people > 0 ? (cat.total / people).toLocaleString() : 0} VNĐ/người</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bill items from trip */}
        {tripCosts > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
            <h3 className="font-display font-bold text-gray-900 mb-3">Chi phí từ lịch trình</h3>
            <p className="text-amber-600 font-semibold text-lg">{tripCosts.toLocaleString()} VNĐ</p>
            <p className="text-gray-500 text-xs">{people > 0 ? (tripCosts / people).toLocaleString() : 0} VNĐ/người</p>
          </div>
        )}

        {/* Custom bill items */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-gray-900">Hóa đơn thêm</h3>
            <button
              onClick={() => setShowAdd(true)}
              className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors"
            >
              + Thêm mục
            </button>
          </div>

          {billItems.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">Chưa có hóa đơn nào. Thêm mục chi phí phát sinh tại đây.</p>
          ) : (
            <div className="space-y-2">
              {billItems.map(item => {
                const cat = CATEGORIES.find(c => c.id === item.category);
                return (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 group">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-sm">{cat?.icon}</span>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                        <p className="text-gray-400 text-[10px]">
                          Chia {item.splitWith} người · {(item.amount / item.splitWith).toLocaleString()} VNĐ/người
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 text-sm whitespace-nowrap">{item.amount.toLocaleString()}</p>
                      <button
                        onClick={() => deleteBillItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 text-gray-400 hover:text-red-500 transition-all"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Add bill modal */}
        {showAdd && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 modal-overlay" onClick={() => setShowAdd(false)}>
            <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-6 modal-content" onClick={e => e.stopPropagation()}>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-4">Thêm chi phí</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Tên mục</label>
                  <input
                    type="text"
                    value={newBill.name}
                    onChange={e => setNewBill({ ...newBill, name: e.target.value })}
                    placeholder="VD: Tiền phà Cát Bà"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Số tiền (VNĐ)</label>
                  <input
                    type="number"
                    min={0}
                    value={newBill.amount}
                    onChange={e => setNewBill({ ...newBill, amount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Phân loại</label>
                  <div className="grid grid-cols-3 gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setNewBill({ ...newBill, category: cat.id })}
                        className={`px-2 py-2 rounded-xl text-xs font-semibold transition-all ${
                          newBill.category === cat.id
                            ? 'bg-red-50 text-red-700 border-2 border-red-200'
                            : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                        }`}
                      >
                        {cat.icon} {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Chia cho (số người)</label>
                  <input
                    type="number"
                    min={1}
                    value={newBill.splitWith}
                    onChange={e => setNewBill({ ...newBill, splitWith: parseInt(e.target.value) || people })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm">Hủy</button>
                <button onClick={addBillItem} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm">Thêm</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
