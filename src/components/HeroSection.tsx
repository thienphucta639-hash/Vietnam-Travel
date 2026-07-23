import { ArrowRight, MapPin, Users, Calendar } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onPlanner: () => void;
  totalProvinces: number;
}

export default function HeroSection({ onExplore, onPlanner, totalProvinces }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/37667909/pexels-photo-37667909.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600"
          alt="Vietnam landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {totalProvinces} tỉnh thành trên cả nước
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5">
            Khám phá
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
              Việt Nam
            </span>
            <br />
            cùng bạn bè
          </h1>

          <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-lg">
            Lên kế hoạch du lịch chi tiết, tính toán chi phí, chia tiền nhóm.
            Từ Sa Pa mờ sương đến Cà Mau cực Nam — tất cả trong một ứng dụng.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={onExplore}
              className="flex items-center gap-2.5 px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-semibold text-[15px] transition-all shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-500/30 active:scale-95"
            >
              Khám phá ngay
              <ArrowRight size={18} />
            </button>
            <button
              onClick={onPlanner}
              className="flex items-center gap-2.5 px-7 py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white rounded-2xl font-semibold text-[15px] transition-all border border-white/20 active:scale-95"
            >
              Lên lịch trình
            </button>
          </div>

          <div className="flex flex-wrap gap-6 text-white/70">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-red-400" />
              <span className="text-sm">34 tỉnh thành</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-blue-400" />
              <span className="text-sm">Chia tiền nhóm</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-green-400" />
              <span className="text-sm">Lịch trình chi tiết</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f8fafc] to-transparent" />
    </section>
  );
}
