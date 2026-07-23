import { useState, useRef } from 'react';
import { X, Download, FileText, FileJson, Image, Copy, Check, Share2 } from 'lucide-react';
import { TripState } from '../store/useStore';
import { PROVINCES } from '../data/provinces';

interface Props {
  trip: TripState;
  totalBill: number;
  perPerson: number;
  onClose: () => void;
}

function formatVND(n: number): string {
  return n.toLocaleString('vi-VN') + 'đ';
}

function formatDate(dateStr: string): string {
  if (!dateStr) return 'Chưa chọn';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const CATEGORIES: Record<string, string> = {
  transport: 'Di chuyển',
  food: 'Ăn uống',
  hotel: 'Chỗ ở',
  visit: 'Tham quan',
  other: 'Khác',
};

export default function ExportModal({ trip, totalBill, perPerson, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const billRef = useRef<HTMLDivElement>(null);

  // Generate text summary
  const generateTextSummary = (): string => {
    const lines: string[] = [];
    lines.push('═══════════════════════════════════════');
    lines.push(`  ${trip.name || 'CHUYẾN ĐI VIỆT NAM'}`);
    lines.push('═══════════════════════════════════════');
    lines.push('');
    lines.push(`📅 Ngày đi: ${formatDate(trip.startDate)}`);
    lines.push(`📅 Ngày về: ${formatDate(trip.endDate)}`);
    lines.push(`👥 Số người: ${trip.numPeople} người`);
    lines.push('');

    if (trip.favorites.length > 0) {
      lines.push('❤️ ĐỊA ĐIỂM YÊU THÍCH:');
      trip.favorites.forEach(id => {
        const p = PROVINCES.find(pr => pr.id === id);
        if (p) lines.push(`   • ${p.name} (${p.region})`);
      });
      lines.push('');
    }

    if (trip.billItems.length > 0) {
      lines.push('💰 CHI PHÍ CHI TIẾT:');
      lines.push('───────────────────────────────────────');
      
      // Group by category
      const grouped = trip.billItems.reduce((acc, item) => {
        const cat = item.category || 'other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
      }, {} as Record<string, typeof trip.billItems>);

      Object.entries(grouped).forEach(([cat, items]) => {
        const catTotal = items.reduce((s, i) => s + i.amount, 0);
        lines.push('');
        lines.push(`📁 ${CATEGORIES[cat] || cat} (${formatVND(catTotal)})`);
        items.forEach(item => {
          lines.push(`   • ${item.name}: ${formatVND(item.amount)}`);
        });
      });

      lines.push('');
      lines.push('───────────────────────────────────────');
      lines.push(`💵 TỔNG CỘNG: ${formatVND(totalBill)}`);
      lines.push(`👤 MỖI NGƯỜI: ${formatVND(Math.ceil(perPerson))}`);
      lines.push('───────────────────────────────────────');
    }

    lines.push('');
    lines.push('Xuất từ Vietnam Travel Planner v2.0');
    lines.push(`Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`);
    
    return lines.join('\n');
  };

  // Export as JSON
  const exportJSON = () => {
    const dataStr = JSON.stringify(trip, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(trip.name || 'chuyen-di').replace(/\s+/g, '-')}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export as Text
  const exportText = () => {
    const text = generateTextSummary();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(trip.name || 'chuyen-di').replace(/\s+/g, '-')}_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    const text = generateTextSummary();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Export as image (using canvas)
  const exportImage = async () => {
    if (!billRef.current) return;
    setExporting(true);

    try {
      // Dynamic import html2canvas
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(billRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `${(trip.name || 'hoa-don').replace(/\s+/g, '-')}_${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Export image failed:', err);
      alert('Không thể xuất ảnh. Vui lòng thử lại hoặc dùng định dạng khác.');
    } finally {
      setExporting(false);
    }
  };

  // Share (Web Share API)
  const shareTrip = async () => {
    const text = generateTextSummary();
    if (navigator.share) {
      try {
        await navigator.share({
          title: trip.name || 'Chuyến đi Việt Nam',
          text: text,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div 
        className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden modal-content flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <Download size={18} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Xuất & Chia sẻ</h3>
              <p className="text-sm text-slate-500">Tải về hoặc chia sẻ chuyến đi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Export options */}
        <div className="p-5 space-y-3 overflow-y-auto flex-1">
          <p className="text-sm text-slate-600 font-medium mb-3">Chọn định dạng tải về:</p>
          
          <button
            onClick={exportJSON}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all group text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition-colors">
              <FileJson size={22} className="text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900">Tải file JSON</p>
              <p className="text-sm text-slate-500">Dữ liệu đầy đủ, có thể nhập lại sau</p>
            </div>
            <Download size={18} className="text-slate-400 group-hover:text-blue-500 shrink-0" />
          </button>

          <button
            onClick={exportText}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-green-300 hover:bg-green-50/50 transition-all group text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
              <FileText size={22} className="text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900">Tải file TXT</p>
              <p className="text-sm text-slate-500">Văn bản thuần túy, dễ đọc</p>
            </div>
            <Download size={18} className="text-slate-400 group-hover:text-green-500 shrink-0" />
          </button>

          <button
            onClick={exportImage}
            disabled={exporting}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all group text-left disabled:opacity-50"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0 group-hover:bg-purple-200 transition-colors">
              <Image size={22} className="text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900">
                {exporting ? 'Đang xuất ảnh...' : 'Tải ảnh PNG'}
              </p>
              <p className="text-sm text-slate-500">Hình ảnh hóa đơn đẹp mắt</p>
            </div>
            <Download size={18} className="text-slate-400 group-hover:text-purple-500 shrink-0" />
          </button>

          <div className="pt-3 border-t border-slate-100">
            <p className="text-sm text-slate-600 font-medium mb-3">Chia sẻ nhanh:</p>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-colors"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                {copied ? 'Đã sao chép!' : 'Sao chép'}
              </button>
              {'share' in navigator && (
                <button
                  onClick={shareTrip}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-sm transition-colors"
                >
                  <Share2 size={16} />
                  Chia sẻ
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hidden bill preview for image export */}
        <div className="absolute -left-[9999px] top-0">
          <div 
            ref={billRef} 
            className="w-[400px] p-6 bg-white"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl mb-3">
                <span className="font-bold">🇻🇳 Vietnam Travel Planner</span>
              </div>
              <h2 className="font-bold text-xl text-slate-900">{trip.name || 'Chuyến đi Việt Nam'}</h2>
              <p className="text-sm text-slate-500 mt-1">
                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
              </p>
            </div>

            <div className="flex justify-center gap-6 mb-6 text-center">
              <div>
                <p className="text-2xl font-bold text-slate-900">{trip.numPeople}</p>
                <p className="text-xs text-slate-500">người</p>
              </div>
              <div className="w-px bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-red-600">{formatVND(totalBill)}</p>
                <p className="text-xs text-slate-500">tổng cộng</p>
              </div>
              <div className="w-px bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{formatVND(Math.ceil(perPerson))}</p>
                <p className="text-xs text-slate-500">mỗi người</p>
              </div>
            </div>

            {trip.billItems.length > 0 && (
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                  <p className="font-semibold text-sm text-slate-700">Chi tiết chi phí</p>
                </div>
                <div className="divide-y divide-slate-100">
                  {trip.billItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {CATEGORIES[item.category] || 'Khác'}
                        </span>
                        <span className="text-sm text-slate-700">{item.name}</span>
                      </div>
                      <span className="font-semibold text-sm text-slate-900">{formatVND(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-slate-200 text-center">
              <p className="text-xs text-slate-400">
                Xuất ngày {new Date().toLocaleDateString('vi-VN')} • Vietnam Travel Planner v2.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
