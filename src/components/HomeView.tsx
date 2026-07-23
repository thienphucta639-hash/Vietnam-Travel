import { useState } from 'react';
import { TrendingUp, Star, ChevronRight, Compass, X, MapPin, Clock, DollarSign, Utensils, Plane, Bus, CheckCircle } from 'lucide-react';
import { PROVINCES, REGIONS } from '../data/provinces';
import HeroSection from './HeroSection';
import { BillItem } from '../store/useStore';

interface Props {
  onNavigate: (view: string) => void;
  onSelectProvince: (id: string) => void;
  onApplyItinerary?: (data: { name: string; numDays: number; billItems: Omit<BillItem, 'id'>[]; }) => void;
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
}

const FEATURED_IDS = ['ha-noi', 'quang-ninh', 'da-nang', 'hue', 'khanh-hoa', 'lam-dong', 'tp-hcm', 'can-tho'];

interface CostItem {
  name: string;
  amount: number;
  category: string;
}

interface Departure {
  from: string;
  options: { method: string; duration: string; price: string; note: string }[];
}

interface Itinerary {
  title: string;
  days: string;
  numDays: number;
  places: string[];
  budget: string;
  color: string;
  departure: Departure;
  schedule: { day: string; items: { time: string; activity: string; note: string }[] }[];
  tips: string[];
  foods: string[];
  costs: CostItem[];
}

const ITINERARIES: Itinerary[] = [
  {
    title: 'Miền Bắc',
    days: '5 ngày 4 đêm',
    numDays: 5,
    places: ['Hà Nội', 'Sa Pa', 'Hạ Long', 'Ninh Bình'],
    budget: '5-8 triệu/người',
    color: 'from-emerald-500 to-teal-600',
    departure: {
      from: 'TP.HCM / Đà Nẵng',
      options: [
        { method: 'Máy bay', duration: '2h (HCM→HN)', price: '1.200.000 - 2.500.000đ', note: 'Đặt sớm trên Vietjet, Bamboo Airways giá rẻ' },
        { method: 'Tàu hỏa', duration: '30-34h (HCM→HN)', price: '800.000 - 1.500.000đ', note: 'Tàu SE giường nằm, trải nghiệm thú vị' },
      ],
    },
    schedule: [
      { day: 'Ngày 1 — Hà Nội', items: [
        { time: 'Sáng', activity: 'Bay/đến Hà Nội, nhận phòng khách sạn phố cổ', note: 'Nên ở khu Hoàn Kiếm' },
        { time: 'Trưa', activity: 'Ăn phở Bát Đàn hoặc bún chả Hương Liên', note: 'Phở Bát Đàn: 49 Bát Đàn' },
        { time: 'Chiều', activity: 'Tham quan Văn Miếu, Hồ Hoàn Kiếm, đền Ngọc Sơn', note: 'Đi bộ quanh phố cổ' },
        { time: 'Tối', activity: 'Phố đi bộ (T6-CN), uống cà phê trứng Giảng', note: 'Cà phê Giảng: 39 Nguyễn Hữu Huân' },
      ]},
      { day: 'Ngày 2 — Sa Pa', items: [
        { time: 'Sáng sớm', activity: 'Xe khách/tàu hỏa đêm đến Sa Pa', note: 'Đặt trước giường nằm VIP ~400k' },
        { time: 'Trưa', activity: 'Nhận phòng homestay, ăn trưa tại thị trấn', note: 'Homestay bản Tả Van view đẹp' },
        { time: 'Chiều', activity: 'Trek bản Cát Cát, ngắm ruộng bậc thang', note: 'Vé vào ~70k, đi bộ ~3km' },
        { time: 'Tối', activity: 'Chợ đêm Sa Pa, thử thắng cố và lợn cắp nách', note: 'Mặc ấm, Sa Pa lạnh' },
      ]},
      { day: 'Ngày 3 — Sa Pa → Hạ Long', items: [
        { time: 'Sáng', activity: 'Lên Fansipan bằng cáp treo', note: 'Vé ~700k, đi sớm tránh mây' },
        { time: 'Trưa', activity: 'Xuống núi, ăn trưa, di chuyển về Hạ Long', note: 'Xe ~5-6 tiếng' },
        { time: 'Tối', activity: 'Đến Hạ Long, nhận phòng nghỉ ngơi', note: 'Ở khu Bãi Cháy tiện đi tour' },
      ]},
      { day: 'Ngày 4 — Vịnh Hạ Long', items: [
        { time: 'Sáng', activity: 'Tour du thuyền Vịnh Hạ Long', note: 'Tour 1 ngày từ ~800k/người' },
        { time: 'Trưa', activity: 'Ăn hải sản trên thuyền, tham quan hang Sửng Sốt', note: 'Chèo kayak khám phá hang' },
        { time: 'Chiều', activity: 'Tắm biển Ti Tốp, ngắm hoàng hôn trên vịnh', note: 'Mang theo đồ bơi' },
        { time: 'Tối', activity: 'Về bờ, ăn chả mực Hạ Long', note: 'Chả mực Bà Kiều nổi tiếng' },
      ]},
      { day: 'Ngày 5 — Ninh Bình → Về', items: [
        { time: 'Sáng', activity: 'Di chuyển sang Ninh Bình (~3h), đi thuyền Tràng An', note: 'Vé thuyền ~250k/người' },
        { time: 'Trưa', activity: 'Ăn cơm cháy dê núi Ninh Bình', note: 'Đặc sản phải thử' },
        { time: 'Chiều', activity: 'Tham quan chùa Bái Đính hoặc Hang Múa', note: 'Hang Múa leo ~500 bậc' },
        { time: 'Tối', activity: 'Về Hà Nội, bay/tàu về nhà', note: 'Mua quà: ô mai, cốm Hà Nội' },
      ]},
    ],
    tips: ['Đặt vé máy bay sớm để được giá rẻ', 'Mang áo ấm cho Sa Pa', 'Nên thuê xe máy ở Ninh Bình', 'Đặt tour Hạ Long từ trước qua Klook/Traveloka'],
    foods: ['Phở Hà Nội', 'Bún chả', 'Thắng cố Sa Pa', 'Chả mực Hạ Long', 'Cơm cháy dê núi Ninh Bình'],
    costs: [
      { name: 'Vé máy bay khứ hồi', amount: 3000000, category: 'transport' },
      { name: 'Xe khách HN→Sa Pa (giường nằm)', amount: 400000, category: 'transport' },
      { name: 'Xe Sa Pa→Hạ Long', amount: 350000, category: 'transport' },
      { name: 'Xe Hạ Long→Ninh Bình', amount: 250000, category: 'transport' },
      { name: 'Cáp treo Fansipan', amount: 700000, category: 'visit' },
      { name: 'Tour du thuyền Hạ Long 1 ngày', amount: 800000, category: 'visit' },
      { name: 'Vé thuyền Tràng An', amount: 250000, category: 'visit' },
      { name: 'Khách sạn Hà Nội (1 đêm)', amount: 400000, category: 'hotel' },
      { name: 'Homestay Sa Pa (1 đêm)', amount: 300000, category: 'hotel' },
      { name: 'Khách sạn Hạ Long (1 đêm)', amount: 500000, category: 'hotel' },
      { name: 'Khách sạn Ninh Bình (1 đêm)', amount: 350000, category: 'hotel' },
      { name: 'Ăn uống 5 ngày (~200k/ngày)', amount: 1000000, category: 'food' },
    ],
  },
  {
    title: 'Miền Trung',
    days: '4 ngày 3 đêm',
    numDays: 4,
    places: ['Đà Nẵng', 'Hội An', 'Huế'],
    budget: '4-6 triệu/người',
    color: 'from-violet-500 to-purple-600',
    departure: {
      from: 'TP.HCM / Hà Nội',
      options: [
        { method: 'Máy bay', duration: '1h20 (HCM→ĐN)', price: '800.000 - 1.800.000đ', note: 'Vietjet, Bamboo có giá rẻ thường xuyên' },
        { method: 'Tàu hỏa', duration: '17h (HCM→ĐN)', price: '500.000 - 1.000.000đ', note: 'Tàu SE đêm, sáng tới nơi' },
        { method: 'Xe khách', duration: '18-20h (HCM→ĐN)', price: '350.000 - 500.000đ', note: 'Xe giường nằm Phương Trang, Hoàng Long' },
      ],
    },
    schedule: [
      { day: 'Ngày 1 — Đà Nẵng', items: [
        { time: 'Sáng', activity: 'Bay đến Đà Nẵng, nhận phòng gần biển Mỹ Khê', note: 'Khách sạn biển Mỹ Khê từ 500k/đêm' },
        { time: 'Trưa', activity: 'Ăn mì Quảng Bà Mua, tắm biển Mỹ Khê', note: 'Mì Quảng Bà Mua: 19-21 Trần Bình Trọng' },
        { time: 'Chiều', activity: 'Lên Bà Nà Hills, check-in Cầu Vàng', note: 'Vé cáp treo ~900k, đi cả chiều' },
        { time: 'Tối', activity: 'Xem cầu Rồng phun lửa (T7), ăn hải sản bãi biển', note: 'Cầu Rồng phun lửa 21h thứ 7' },
      ]},
      { day: 'Ngày 2 — Hội An', items: [
        { time: 'Sáng', activity: 'Di chuyển sang Hội An (~40 phút), thuê xe đạp', note: 'Grab/taxi ~150k' },
        { time: 'Trưa', activity: 'Ăn cao lầu, cơm gà Hội An', note: 'Cơm gà Bà Buội nổi tiếng' },
        { time: 'Chiều', activity: 'Tham quan phố cổ, Chùa Cầu, nhà cổ Phùng Hưng', note: 'Vé combo phố cổ ~120k' },
        { time: 'Tối', activity: 'Thả hoa đăng trên sông Hoài, chợ đêm Hội An', note: 'Hoa đăng ~10k/cái' },
      ]},
      { day: 'Ngày 3 — Huế', items: [
        { time: 'Sáng', activity: 'Di chuyển Hội An → Huế qua đèo Hải Vân', note: 'Thuê xe máy qua đèo cực đẹp, hoặc xe khách ~3h' },
        { time: 'Trưa', activity: 'Ăn bún bò Huế, cơm hến', note: 'Bún bò O Phượng: 7 Nguyễn Du' },
        { time: 'Chiều', activity: 'Tham quan Đại Nội Huế, lăng Khải Định', note: 'Vé Đại Nội ~200k' },
        { time: 'Tối', activity: 'Đi thuyền sông Hương nghe ca Huế', note: 'Tour thuyền sông Hương ~100k' },
      ]},
      { day: 'Ngày 4 — Huế → Về', items: [
        { time: 'Sáng', activity: 'Chùa Thiên Mụ, chợ Đông Ba mua quà', note: 'Mua mè xửng, tré Huế' },
        { time: 'Trưa', activity: 'Ăn bánh bèo, bánh nậm, bánh lọc Huế', note: 'Quán Hạnh: 11 Phó Đức Chính' },
        { time: 'Chiều', activity: 'Bay từ sân bay Phú Bài về nhà', note: 'Sân bay cách trung tâm ~15km' },
      ]},
    ],
    tips: ['Thuê xe máy ở Đà Nẵng ~150k/ngày', 'Mặc áo dài chụp ảnh ở Hội An', 'Tránh mùa mưa tháng 10-12', 'Qua đèo Hải Vân bằng xe máy rất đẹp'],
    foods: ['Mì Quảng', 'Cao lầu Hội An', 'Bún bò Huế', 'Bánh bèo', 'Bánh tráng cuốn thịt heo'],
    costs: [
      { name: 'Vé máy bay khứ hồi', amount: 2000000, category: 'transport' },
      { name: 'Grab/taxi ĐN↔Hội An', amount: 300000, category: 'transport' },
      { name: 'Xe Hội An→Huế', amount: 200000, category: 'transport' },
      { name: 'Thuê xe máy Đà Nẵng (1 ngày)', amount: 150000, category: 'transport' },
      { name: 'Cáp treo Bà Nà Hills', amount: 900000, category: 'visit' },
      { name: 'Vé combo phố cổ Hội An', amount: 120000, category: 'visit' },
      { name: 'Vé Đại Nội Huế', amount: 200000, category: 'visit' },
      { name: 'Thuyền sông Hương ca Huế', amount: 100000, category: 'visit' },
      { name: 'Khách sạn Đà Nẵng (1 đêm)', amount: 500000, category: 'hotel' },
      { name: 'Khách sạn Hội An (1 đêm)', amount: 450000, category: 'hotel' },
      { name: 'Khách sạn Huế (1 đêm)', amount: 400000, category: 'hotel' },
      { name: 'Ăn uống 4 ngày (~200k/ngày)', amount: 800000, category: 'food' },
    ],
  },
  {
    title: 'Miền Nam',
    days: '3 ngày 2 đêm',
    numDays: 3,
    places: ['TP.HCM', 'Cần Thơ', 'Vĩnh Long'],
    budget: '3-5 triệu/người',
    color: 'from-orange-500 to-red-600',
    departure: {
      from: 'Hà Nội / Đà Nẵng',
      options: [
        { method: 'Máy bay', duration: '2h (HN→HCM)', price: '1.000.000 - 2.200.000đ', note: 'Nhiều chuyến bay mỗi ngày' },
        { method: 'Từ nội thành HCM', duration: 'Tại chỗ', price: 'Grab ~30k về trung tâm', note: 'Nếu ở HCM rồi thì bắt đầu luôn' },
      ],
    },
    schedule: [
      { day: 'Ngày 1 — TP.HCM', items: [
        { time: 'Sáng', activity: 'Tham quan Dinh Độc Lập, Nhà thờ Đức Bà, Bưu điện Trung tâm', note: 'Đi bộ được, gần nhau' },
        { time: 'Trưa', activity: 'Ăn cơm tấm Bụi Sài Gòn, uống cà phê sữa đá', note: 'Cơm tấm Bụi: Nhiều chi nhánh' },
        { time: 'Chiều', activity: 'Phố đi bộ Nguyễn Huệ, Landmark 81 Skydeck', note: 'Skydeck vé ~250k' },
        { time: 'Tối', activity: 'Chợ Bến Thành, ăn vặt đường phố', note: 'Chợ đêm bên ngoài từ 18h' },
      ]},
      { day: 'Ngày 2 — Cần Thơ', items: [
        { time: 'Sáng sớm', activity: 'Xe khách đi Cần Thơ (~3.5h)', note: 'Xe Phương Trang ~150k' },
        { time: 'Trưa', activity: 'Nhận phòng, ăn bún riêu Cần Thơ', note: 'Ở gần Bến Ninh Kiều' },
        { time: 'Chiều', activity: 'Thiền viện Trúc Lâm Phương Nam, vườn trái cây', note: 'Ăn trái cây tại vườn' },
        { time: 'Tối', activity: 'Dạo Bến Ninh Kiều, chợ đêm, ăn lẩu mắm', note: 'Du thuyền sông Hậu ~100k' },
      ]},
      { day: 'Ngày 3 — Chợ nổi → Về', items: [
        { time: '4:30 sáng', activity: 'Đi chợ nổi Cái Răng, ăn sáng trên sông', note: 'Thuê thuyền ~200k/thuyền' },
        { time: 'Trưa', activity: 'Ghé cù lao Vĩnh Long, ăn cá tai tượng chiên xù', note: 'Trải nghiệm miệt vườn sông nước' },
        { time: 'Chiều', activity: 'Về TP.HCM hoặc bay về nhà', note: 'Mua đặc sản: bánh tráng, mắm' },
      ]},
    ],
    tips: ['Dậy sớm 4h30 để đi chợ nổi', 'Mặc đồ mát, miền Nam nóng quanh năm', 'Thử hết các loại trái cây miền Tây', 'Ở homestay cù lao trải nghiệm sông nước'],
    foods: ['Cơm tấm', 'Bánh mì Sài Gòn', 'Hủ tiếu', 'Bún riêu', 'Lẩu mắm', 'Cá tai tượng chiên xù'],
    costs: [
      { name: 'Vé máy bay khứ hồi', amount: 2200000, category: 'transport' },
      { name: 'Xe khách HCM→Cần Thơ', amount: 150000, category: 'transport' },
      { name: 'Xe Cần Thơ→Vĩnh Long→HCM', amount: 200000, category: 'transport' },
      { name: 'Grab di chuyển nội thành HCM', amount: 200000, category: 'transport' },
      { name: 'Vé Landmark 81 Skydeck', amount: 250000, category: 'visit' },
      { name: 'Thuyền chợ nổi Cái Răng', amount: 200000, category: 'visit' },
      { name: 'Du thuyền sông Hậu', amount: 100000, category: 'visit' },
      { name: 'Khách sạn HCM (1 đêm)', amount: 500000, category: 'hotel' },
      { name: 'Khách sạn Cần Thơ (1 đêm)', amount: 400000, category: 'hotel' },
      { name: 'Ăn uống 3 ngày (~200k/ngày)', amount: 600000, category: 'food' },
    ],
  },
  {
    title: 'Tây Nguyên',
    days: '3 ngày 2 đêm',
    numDays: 3,
    places: ['Đà Lạt'],
    budget: '3-5 triệu/người',
    color: 'from-pink-500 to-rose-600',
    departure: {
      from: 'TP.HCM / Hà Nội',
      options: [
        { method: 'Máy bay', duration: '50 phút (HCM→Liên Khương)', price: '700.000 - 1.500.000đ', note: 'Sân bay Liên Khương cách ĐL ~30km' },
        { method: 'Xe khách', duration: '7h (HCM→Đà Lạt)', price: '250.000 - 350.000đ', note: 'Xe Phương Trang, Thành Bưởi giường nằm' },
      ],
    },
    schedule: [
      { day: 'Ngày 1 — Đà Lạt', items: [
        { time: 'Sáng', activity: 'Bay đến Liên Khương, nhận phòng, thuê xe máy', note: 'Xe máy ~100k/ngày' },
        { time: 'Trưa', activity: 'Ăn bánh tráng nướng chợ Đà Lạt, bánh căn', note: 'Chợ Đà Lạt tầng trên' },
        { time: 'Chiều', activity: 'Hồ Xuân Hương, Thung lũng Tình Yêu, đồi Robin', note: 'Vé Thung lũng Tình Yêu ~100k' },
        { time: 'Tối', activity: 'Chợ đêm Đà Lạt, uống sữa đậu nành nóng', note: 'Chợ đêm mở từ 17h' },
      ]},
      { day: 'Ngày 2 — Đà Lạt', items: [
        { time: 'Sáng sớm', activity: 'Săn mây đồi Đa Phú hoặc Hòn Bồ', note: 'Đi 4-5h sáng, mang áo ấm' },
        { time: 'Trưa', activity: 'Lẩu gà lá é, kem bơ Đà Lạt', note: 'Quán Lẩu gà lá é Tiến Thành' },
        { time: 'Chiều', activity: 'Thiền viện Trúc Lâm, cáp treo ngắm hồ Tuyền Lâm', note: 'Cáp treo ~100k khứ hồi' },
        { time: 'Tối', activity: 'Quán cà phê view đồi thông, acoustic Đà Lạt', note: 'Nhiều quán cà phê đẹp' },
      ]},
      { day: 'Ngày 3 — Đà Lạt → Về', items: [
        { time: 'Sáng', activity: 'Leo Langbiang ngắm toàn cảnh hoặc đi xe jeep', note: 'Xe jeep ~300k/người lên đỉnh' },
        { time: 'Trưa', activity: 'Ăn trưa, mua quà: mứt, atiso, cà phê', note: 'Mứt Đà Lạt rất ngon' },
        { time: 'Chiều', activity: 'Bay về từ sân bay Liên Khương', note: 'Sân bay cách TP ~30km' },
      ]},
    ],
    tips: ['Mang áo ấm, Đà Lạt lạnh lúc sáng sớm', 'Thuê xe máy khám phá tự do', 'Thử cà phê weasel chính gốc', 'Homestay đồi thông rất lãng mạn'],
    foods: ['Bánh tráng nướng', 'Lẩu gà lá é', 'Kem bơ', 'Bánh căn', 'Cà phê Đà Lạt'],
    costs: [
      { name: 'Vé máy bay khứ hồi', amount: 1600000, category: 'transport' },
      { name: 'Taxi sân bay→TP Đà Lạt', amount: 200000, category: 'transport' },
      { name: 'Thuê xe máy (3 ngày)', amount: 300000, category: 'transport' },
      { name: 'Xăng xe máy', amount: 100000, category: 'transport' },
      { name: 'Vé Thung lũng Tình Yêu', amount: 100000, category: 'visit' },
      { name: 'Cáp treo Trúc Lâm', amount: 100000, category: 'visit' },
      { name: 'Xe jeep Langbiang', amount: 300000, category: 'visit' },
      { name: 'Khách sạn/homestay (2 đêm)', amount: 800000, category: 'hotel' },
      { name: 'Ăn uống 3 ngày (~200k/ngày)', amount: 600000, category: 'food' },
    ],
  },
  {
    title: 'Biển Trung Bộ',
    days: '4 ngày 3 đêm',
    numDays: 4,
    places: ['Nha Trang', 'Quy Nhơn'],
    budget: '4-7 triệu/người',
    color: 'from-cyan-500 to-blue-600',
    departure: {
      from: 'TP.HCM / Hà Nội',
      options: [
        { method: 'Máy bay', duration: '1h (HCM→Cam Ranh)', price: '600.000 - 1.500.000đ', note: 'Sân bay Cam Ranh cách Nha Trang ~40km' },
        { method: 'Xe khách', duration: '8-9h (HCM→NT)', price: '250.000 - 400.000đ', note: 'Xe giường nằm đêm, sáng tới' },
        { method: 'Tàu hỏa', duration: '7-9h (HCM→NT)', price: '300.000 - 700.000đ', note: 'Tàu SE ngắm cảnh biển đẹp' },
      ],
    },
    schedule: [
      { day: 'Ngày 1 — Nha Trang', items: [
        { time: 'Sáng', activity: 'Bay đến Cam Ranh, nhận phòng ven biển', note: 'Khách sạn biển từ 400k/đêm' },
        { time: 'Trưa', activity: 'Ăn bún chả cá, nem nướng Ninh Hòa', note: 'Nem nướng Đặng Văn Quyên nổi tiếng' },
        { time: 'Chiều', activity: 'Tắm biển Nha Trang, Tháp Bà Ponagar', note: 'Vé Tháp Bà ~22k' },
        { time: 'Tối', activity: 'Ăn hải sản chợ Đầm, dạo biển đêm', note: 'Hải sản chợ Đầm tươi, rẻ' },
      ]},
      { day: 'Ngày 2 — Nha Trang', items: [
        { time: 'Cả ngày', activity: 'Tour 4 đảo hoặc lặn biển Hòn Mun', note: 'Tour 4 đảo ~300k, lặn biển ~800k' },
        { time: 'Tối', activity: 'Vinpearl Land (nếu có thời gian)', note: 'Vé ~880k bao gồm cáp treo' },
      ]},
      { day: 'Ngày 3 — Quy Nhơn', items: [
        { time: 'Sáng', activity: 'Di chuyển Nha Trang → Quy Nhơn (~4h)', note: 'Xe khách hoặc thuê xe' },
        { time: 'Trưa', activity: 'Ăn bánh xèo tôm nhảy Quy Nhơn', note: 'Quán bánh xèo Mỹ Liên' },
        { time: 'Chiều', activity: 'Ghềnh Ráng Tiên Sa, mộ Hàn Mặc Tử', note: 'View biển cực đẹp' },
        { time: 'Tối', activity: 'Dạo biển Quy Nhơn, ăn hải sản nướng', note: 'Biển Quy Nhơn sạch, ít người' },
      ]},
      { day: 'Ngày 4 — Quy Nhơn → Về', items: [
        { time: 'Sáng', activity: 'Kỳ Co, Eo Gió — bãi biển đẹp nhất miền Trung', note: 'Vé Kỳ Co ~50k, cano ~200k' },
        { time: 'Trưa', activity: 'Tháp Đôi Quy Nhơn, ăn trưa', note: 'Di tích Chăm Pa cổ' },
        { time: 'Chiều', activity: 'Bay từ sân bay Phù Cát về nhà', note: 'Sân bay cách TP ~30km' },
      ]},
    ],
    tips: ['Kem chống nắng là bắt buộc', 'Lặn biển Hòn Mun ngắm san hô tuyệt đẹp', 'Quy Nhơn yên bình hơn Nha Trang', 'Thử hết các loại hải sản tươi sống'],
    foods: ['Bún chả cá', 'Nem nướng Ninh Hòa', 'Bánh xèo tôm nhảy', 'Hải sản tươi sống'],
    costs: [
      { name: 'Vé máy bay khứ hồi', amount: 1800000, category: 'transport' },
      { name: 'Taxi sân bay Cam Ranh→NT', amount: 250000, category: 'transport' },
      { name: 'Xe khách NT→Quy Nhơn', amount: 200000, category: 'transport' },
      { name: 'Tour 4 đảo Nha Trang', amount: 300000, category: 'visit' },
      { name: 'Vé Kỳ Co + cano', amount: 250000, category: 'visit' },
      { name: 'Khách sạn Nha Trang (2 đêm)', amount: 800000, category: 'hotel' },
      { name: 'Khách sạn Quy Nhơn (1 đêm)', amount: 400000, category: 'hotel' },
      { name: 'Ăn uống 4 ngày (~250k/ngày)', amount: 1000000, category: 'food' },
    ],
  },
  {
    title: 'Đông Bắc',
    days: '4 ngày 3 đêm',
    numDays: 4,
    places: ['Cao Bằng', 'Lạng Sơn'],
    budget: '3-5 triệu/người',
    color: 'from-amber-500 to-orange-600',
    departure: {
      from: 'Hà Nội',
      options: [
        { method: 'Xe khách', duration: '7h (HN→Cao Bằng)', price: '250.000 - 350.000đ', note: 'Xe giường nằm từ bến xe Mỹ Đình' },
        { method: 'Xe máy', duration: '8-9h (HN→Cao Bằng)', price: 'Xăng ~200.000đ', note: 'Phượt xe máy cung đường đẹp' },
      ],
    },
    schedule: [
      { day: 'Ngày 1 — Hà Nội → Cao Bằng', items: [
        { time: 'Sáng sớm', activity: 'Xe khách Hà Nội → Cao Bằng (~7h)', note: 'Xe giường nằm ~250k' },
        { time: 'Chiều', activity: 'Đến Cao Bằng, nhận phòng nghỉ ngơi', note: 'Khách sạn TP Cao Bằng giá rẻ' },
        { time: 'Tối', activity: 'Ăn phở chua Cao Bằng, dạo phố', note: 'Phở chua là đặc sản phải thử' },
      ]},
      { day: 'Ngày 2 — Thác Bản Giốc', items: [
        { time: 'Sáng', activity: 'Thuê xe máy đi Thác Bản Giốc (~80km)', note: 'Đường đẹp, đi ~2.5h' },
        { time: 'Trưa', activity: 'Tham quan Thác Bản Giốc, đi thuyền sát chân thác', note: 'Vé ~45k, thuyền ~30k' },
        { time: 'Chiều', activity: 'Động Ngườm Ngao — hang động khổng lồ', note: 'Vé ~40k, rất đẹp' },
        { time: 'Tối', activity: 'Về TP Cao Bằng nghỉ ngơi', note: 'Mua lạp xường hun khói làm quà' },
      ]},
      { day: 'Ngày 3 — Cao Bằng → Lạng Sơn', items: [
        { time: 'Sáng', activity: 'Khu di tích Pác Bó (nơi Bác Hồ ở)', note: 'Cách TP ~50km' },
        { time: 'Trưa', activity: 'Di chuyển Cao Bằng → Lạng Sơn (~3h)', note: 'Đường núi đẹp' },
        { time: 'Chiều', activity: 'Động Tam Thanh, Nhị Thanh', note: 'Vé ~30k/hang' },
        { time: 'Tối', activity: 'Ăn vịt quay Lạng Sơn, khau nhục', note: 'Vịt quay Lạng Sơn cực ngon' },
      ]},
      { day: 'Ngày 4 — Lạng Sơn → Về', items: [
        { time: 'Sáng', activity: 'Mua sắm chợ Đông Kinh (hàng biên giới)', note: 'Mặc cả 50% giá' },
        { time: 'Trưa', activity: 'Ăn phở chua, bánh cuốn trứng Lạng Sơn', note: 'Đặc sản xứ Lạng' },
        { time: 'Chiều', activity: 'Xe khách về Hà Nội (~3h)', note: 'Về kịp bay đêm nếu cần' },
      ]},
    ],
    tips: ['Mang theo áo ấm vùng cao', 'Thuê xe máy để chủ động', 'Thác Bản Giốc đẹp nhất mùa nước (T6-T9)', 'Đồ ăn Đông Bắc rất ngon và rẻ'],
    foods: ['Phở chua', 'Vịt quay Lạng Sơn', 'Khau nhục', 'Bánh cuốn trứng', 'Lạp xường hun khói'],
    costs: [
      { name: 'Xe khách HN→Cao Bằng', amount: 300000, category: 'transport' },
      { name: 'Xe khách CB→Lạng Sơn', amount: 150000, category: 'transport' },
      { name: 'Xe khách LS→Hà Nội', amount: 150000, category: 'transport' },
      { name: 'Thuê xe máy (2 ngày)', amount: 300000, category: 'transport' },
      { name: 'Xăng xe máy', amount: 150000, category: 'transport' },
      { name: 'Vé Bản Giốc + thuyền', amount: 75000, category: 'visit' },
      { name: 'Vé Động Ngườm Ngao', amount: 40000, category: 'visit' },
      { name: 'Vé Động Tam Thanh + Nhị Thanh', amount: 60000, category: 'visit' },
      { name: 'Khách sạn Cao Bằng (2 đêm)', amount: 500000, category: 'hotel' },
      { name: 'Khách sạn Lạng Sơn (1 đêm)', amount: 300000, category: 'hotel' },
      { name: 'Ăn uống 4 ngày (~150k/ngày)', amount: 600000, category: 'food' },
    ],
  },
];

function formatVND(n: number): string {
  return n.toLocaleString('vi-VN') + 'đ';
}

export default function HomeView({ onNavigate, onSelectProvince, onApplyItinerary }: Props) {
  const featured = FEATURED_IDS.map(id => PROVINCES.find(p => p.id === id)!).filter(Boolean);
  const [loadedImgs, setLoadedImgs] = useState<Set<string>>(new Set());
  const [openItinerary, setOpenItinerary] = useState<number | null>(null);
  const [applied, setApplied] = useState(false);

  const markLoaded = (id: string) => setLoadedImgs(prev => new Set(prev).add(id));

  const selectedIt = openItinerary !== null ? ITINERARIES[openItinerary] : null;

  const handleApply = () => {
    if (!selectedIt || !onApplyItinerary) return;
    onApplyItinerary({
      name: `Lịch trình ${selectedIt.title} ${selectedIt.days}`,
      numDays: selectedIt.numDays,
      billItems: selectedIt.costs.map(c => ({ name: c.name, amount: c.amount, category: c.category })),
    });
    setApplied(true);
    setTimeout(() => {
      setOpenItinerary(null);
      setApplied(false);
      onNavigate('planner');
    }, 800);
  };

  const totalCost = selectedIt ? selectedIt.costs.reduce((s, c) => s + c.amount, 0) : 0;

  return (
    <div>
      <HeroSection
        onExplore={() => onNavigate('explore')}
        onPlanner={() => onNavigate('planner')}
        totalProvinces={PROVINCES.length}
      />

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">Điểm đến nổi bật</h2>
            <p className="text-sm text-slate-500 mt-1">Những địa điểm được yêu thích nhất</p>
          </div>
          <button onClick={() => onNavigate('explore')} className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
            Xem tất cả <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((p, i) => (
            <button key={p.id} onClick={() => onSelectProvince(p.id)} className="group relative aspect-[4/5] rounded-2xl overflow-hidden card-hover" style={{ animationDelay: `${i * 80}ms` }}>
              {!loadedImgs.has(p.id) && <div className="absolute inset-0 skeleton" />}
              <img src={p.image} alt={p.name} className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${loadedImgs.has(p.id) ? 'opacity-100' : 'opacity-0'}`} loading="lazy" onLoad={() => markLoaded(p.id)} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="inline-block px-2 py-0.5 rounded text-white text-[10px] font-bold mb-1.5" style={{ backgroundColor: p.regionColor + 'dd' }}>{p.region}</span>
                <h3 className="font-display font-bold text-white text-lg leading-tight">{p.name}</h3>
                <p className="text-white/70 text-xs mt-0.5 line-clamp-1">{p.highlights[0]}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Regions */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-6">
            <Compass size={20} className="text-red-500" />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">Vùng miền</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {REGIONS.map(region => {
              const count = PROVINCES.filter(p => p.region === region.name).length;
              return (
                <button key={region.id} onClick={() => onNavigate('explore')} className="group relative p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all text-left overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 -translate-y-6 translate-x-6" style={{ backgroundColor: region.color }} />
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold mb-3" style={{ backgroundColor: region.color }}>{count}</div>
                  <h3 className="font-semibold text-slate-900 text-sm group-hover:text-red-600 transition-colors">{region.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{count} tỉnh thành</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Itineraries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={20} className="text-green-500" />
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">Lịch trình gợi ý</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITINERARIES.map((it, i) => (
            <button key={i} onClick={() => setOpenItinerary(i)} className={`relative bg-gradient-to-br ${it.color} rounded-2xl p-6 text-white overflow-hidden text-left hover:shadow-xl transition-shadow group`}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform" />
              <h3 className="font-display font-bold text-lg mb-1">{it.title}</h3>
              <p className="text-white/80 text-sm mb-3">{it.days}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {it.places.map(place => (<span key={place} className="px-2.5 py-1 rounded-lg bg-white/20 text-xs font-medium">{place}</span>))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-white/80 text-sm"><DollarSign size={14} /><span>{it.budget}</span></div>
                <span className="text-white/60 text-xs font-medium">Nhấn xem chi tiết →</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Itinerary Detail Modal */}
      {selectedIt && (
        <div className="fixed inset-0 z-50 modal-overlay" onClick={() => { setOpenItinerary(null); setApplied(false); }}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="max-w-2xl mx-auto px-4 py-8 pb-32">
              <div className="modal-content">
                {/* Header */}
                <div className={`bg-gradient-to-br ${selectedIt.color} rounded-2xl p-6 text-white mb-4 relative overflow-hidden`}>
                  <button onClick={() => { setOpenItinerary(null); setApplied(false); }} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"><X size={18} /></button>
                  <h2 className="font-display text-2xl font-bold mb-1">{selectedIt.title}</h2>
                  <p className="text-white/80">{selectedIt.days}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedIt.places.map(p => (<span key={p} className="px-3 py-1 rounded-lg bg-white/20 text-sm font-medium">{p}</span>))}
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-sm text-white/80">
                    <span className="flex items-center gap-1"><DollarSign size={14} /> {selectedIt.budget}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {selectedIt.schedule.length} ngày</span>
                  </div>
                </div>

                {/* Departure */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Plane size={16} className="text-blue-500" />
                    <h3 className="font-semibold text-slate-900 text-sm">Xuất phát từ {selectedIt.departure.from}</h3>
                  </div>
                  <div className="space-y-2.5">
                    {selectedIt.departure.options.map((opt, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-blue-50/70">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                          {opt.method === 'Máy bay' ? <Plane size={14} className="text-blue-600" /> : <Bus size={14} className="text-blue-600" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm text-slate-900">{opt.method}</span>
                            <span className="text-xs text-slate-500">{opt.duration}</span>
                          </div>
                          <p className="text-sm text-red-600 font-semibold mt-0.5">{opt.price}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{opt.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Schedule */}
                <div className="space-y-3 mb-4">
                  {selectedIt.schedule.map((day, di) => (
                    <div key={di} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                      <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
                        <h3 className="font-semibold text-slate-900 text-sm">{day.day}</h3>
                      </div>
                      <div className="divide-y divide-slate-50">
                        {day.items.map((item, ii) => (
                          <div key={ii} className="px-5 py-3 flex gap-3">
                            <span className="inline-block px-2 py-0.5 rounded bg-red-50 text-red-600 text-xs font-semibold min-w-[52px] text-center shrink-0 h-fit mt-0.5">{item.time}</span>
                            <div className="min-w-0">
                              <p className="text-sm text-slate-800 font-medium">{item.activity}</p>
                              {item.note && <p className="text-xs text-slate-500 mt-0.5">{item.note}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-3">
                  <div className="px-5 py-3 bg-green-50 border-b border-green-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-green-600" />
                      <h3 className="font-semibold text-green-900 text-sm">Chi phí ước tính (1 người)</h3>
                    </div>
                    <span className="font-bold text-green-700">{formatVND(totalCost)}</span>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {selectedIt.costs.map((c, i) => (
                      <div key={i} className="flex items-center justify-between px-5 py-2.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${c.category === 'transport' ? 'bg-blue-400' : c.category === 'food' ? 'bg-orange-400' : c.category === 'hotel' ? 'bg-purple-400' : 'bg-green-400'}`} />
                          <span className="text-sm text-slate-700 truncate">{c.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-900 shrink-0 ml-3">{formatVND(c.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Foods */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Utensils size={16} className="text-orange-500" />
                    <h3 className="font-semibold text-slate-900 text-sm">Món phải thử</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedIt.foods.map((f, i) => (
                      <a key={i} href={`https://www.google.com/search?q=${encodeURIComponent(f)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 text-xs font-medium hover:bg-orange-100 transition-colors">{f}</a>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Star size={16} className="text-amber-500" />
                    <h3 className="font-semibold text-slate-900 text-sm">Mẹo hay</h3>
                  </div>
                  <ul className="space-y-2">
                    {selectedIt.tips.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />{t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Map links */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={16} className="text-red-500" />
                    <h3 className="font-semibold text-slate-900 text-sm">Xem trên bản đồ</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedIt.places.map((p, i) => (
                      <a key={i} href={`https://www.google.com/maps/search/${encodeURIComponent(p + ' Việt Nam')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 text-slate-700 text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-colors">
                        <MapPin size={12} className="text-red-400" />{p}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Apply + Close */}
                <div className="flex gap-3">
                  <button
                    onClick={handleApply}
                    disabled={applied}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all ${applied ? 'bg-green-500 text-white' : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20'}`}
                  >
                    {applied ? <><CheckCircle size={18} /> Đã áp dụng!</> : 'Áp dụng lịch trình này'}
                  </button>
                  <button onClick={() => { setOpenItinerary(null); setApplied(false); }} className="px-6 py-3.5 rounded-2xl bg-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-300 transition-colors">
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">Sẵn sàng lên đường?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">Bắt đầu lên kế hoạch cho chuyến đi tiếp theo. Tính chi phí, chia tiền nhóm, tất cả miễn phí.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => onNavigate('explore')} className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-semibold transition-colors">Khám phá ngay</button>
            <button onClick={() => onNavigate('planner')} className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-semibold transition-colors border border-white/20">Lên lịch trình</button>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 py-8 text-center">
        <p className="text-slate-500 text-sm">Vietnam Travel Planner v2.0</p>
        <p className="text-slate-600 text-xs mt-2">Dữ liệu tham khảo. Giá cả có thể thay đổi theo thời điểm.</p>
        <button
          onClick={() => onNavigate('download')}
          className="mt-4 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Tải Source Code về máy
        </button>
      </footer>
    </div>
  );
}
