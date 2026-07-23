export interface Place {
  name: string;
  desc: string;
  coords: { lat: number; lng: number };
  tips: string[];
  bestTime: string;
  avgCost: string;
}

export interface Province {
  id: string;
  name: string;
  region: string;
  regionColor: string;
  image: string;
  overview: string;
  highlights: string[];
  places: Place[];
  foods: string[];
  transport: string;
  mapsQuery: string;
}

export const REGIONS = [
  { id: 'tay-bac', name: 'Tây Bắc', color: '#059669' },
  { id: 'dong-bac', name: 'Đông Bắc', color: '#0891b2' },
  { id: 'dong-bang-bac-bo', name: 'Đồng Bằng Bắc Bộ', color: '#d97706' },
  { id: 'bac-trung-bo', name: 'Bắc Trung Bộ', color: '#dc2626' },
  { id: 'nam-trung-bo', name: 'Nam Trung Bộ', color: '#7c3aed' },
  { id: 'tay-nguyen', name: 'Tây Nguyên', color: '#be185d' },
  { id: 'dong-nam-bo', name: 'Đông Nam Bộ', color: '#ea580c' },
  { id: 'tay-nam-bo', name: 'Tây Nam Bộ', color: '#4f46e5' },
];

export const PROVINCES: Province[] = [
  // ===== TÂY BẮC =====
  {
    id: 'lao-cai',
    name: 'Lào Cai',
    region: 'Tây Bắc',
    regionColor: '#059669',
    image: 'https://images.pexels.com/photos/37667909/pexels-photo-37667909.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Lào Cai nổi tiếng với Sa Pa — thiên đường ruộng bậc thang, khí hậu mát mẻ quanh năm và văn hóa đặc sắc của các dân tộc H\'Mông, Dao, Tày. Đỉnh Fansipan 3.143m được mệnh danh "Nóc nhà Đông Dương".',
    highlights: ['Ruộng bậc thang Mù Cang Chải', 'Đỉnh Fansipan', 'Bản Cát Cát', 'Thác Bạc Sa Pa'],
    places: [
      { name: 'Sa Pa', desc: 'Thị trấn trong sương với ruộng bậc thang tuyệt đẹp, văn hóa dân tộc đa dạng', coords: { lat: 22.3364, lng: 103.8438 }, tips: ['Đi vào tháng 9-10 để ngắm lúa chín vàng', 'Mang áo ấm, Sa Pa lạnh quanh năm', 'Thuê xe máy khám phá bản làng'], bestTime: 'Tháng 9-11', avgCost: '2-4 triệu/người' },
      { name: 'Fansipan', desc: 'Đỉnh núi cao nhất Đông Dương 3.143m, có cáp treo hiện đại', coords: { lat: 22.3033, lng: 103.7750 }, tips: ['Đi cáp treo mất 15 phút, giá ~700k', 'Leo bộ mất 2 ngày 1 đêm', 'Nên đi sáng sớm để tránh sương mù'], bestTime: 'Tháng 10-3', avgCost: '700k-2 triệu' },
    ],
    foods: ['Thắng cố', 'Cá hồi Sa Pa', 'Lợn cắp nách nướng', 'Rượu táo mèo'],
    transport: 'Xe khách giường nằm từ Hà Nội (~5h), tàu hỏa đêm (~8h), hoặc bay đến Sân bay Lào Cai',
    mapsQuery: 'Lào Cai, Vietnam',
  },
  {
    id: 'lai-chau',
    name: 'Lai Châu',
    region: 'Tây Bắc',
    regionColor: '#059669',
    image: 'https://images.pexels.com/photos/37668077/pexels-photo-37668077.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Lai Châu là vùng đất hoang sơ với những con đèo ngoạn mục, suối nước nóng tự nhiên và văn hóa đa dạng của hơn 20 dân tộc. Nơi đây ít du khách nên giữ được vẻ nguyên sơ.',
    highlights: ['Đèo Ô Quy Hồ', 'Suối nước nóng Vàng Pheo', 'Putaleng', 'Bản Sìn Hồ'],
    places: [
      { name: 'Đèo Ô Quy Hồ', desc: 'Một trong tứ đại đỉnh đèo Tây Bắc, dài 50km nối Lai Châu - Lào Cai', coords: { lat: 22.3500, lng: 103.7700 }, tips: ['Cẩn thận sương mù buổi sáng', 'Dừng chân ngắm cảnh ở các điểm dừng', 'Không nên đi ban đêm'], bestTime: 'Tháng 10-4', avgCost: 'Miễn phí' },
    ],
    foods: ['Cá suối nướng', 'Xôi nếp nương', 'Thịt trâu gác bếp'],
    transport: 'Xe khách từ Hà Nội (~10h) hoặc đi qua Sa Pa theo đèo Ô Quy Hồ',
    mapsQuery: 'Lai Châu, Vietnam',
  },
  {
    id: 'dien-bien',
    name: 'Điện Biên',
    region: 'Tây Bắc',
    regionColor: '#059669',
    image: 'https://images.pexels.com/photos/28706867/pexels-photo-28706867.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Điện Biên gắn liền với chiến thắng lịch sử Điện Biên Phủ 1954. Thung lũng Mường Thanh rộng lớn, cánh đồng lúa bát ngát và các di tích lịch sử hào hùng.',
    highlights: ['Di tích Điện Biên Phủ', 'Đồi A1', 'Hầm Đại tướng De Castries', 'Hồ Pa Khoang'],
    places: [
      { name: 'Quần thể di tích Điện Biên Phủ', desc: 'Hệ thống di tích lịch sử chiến thắng 1954 với đồi A1, hầm chỉ huy', coords: { lat: 21.3860, lng: 103.0159 }, tips: ['Nên thuê hướng dẫn viên để hiểu lịch sử', 'Ghé Bảo tàng Chiến thắng', 'Dành ít nhất nửa ngày'], bestTime: 'Tháng 11-3', avgCost: '50k-100k vé tham quan' },
    ],
    foods: ['Nộm da trâu', 'Cơm lam', 'Pa pỉnh tộp (cá suối nướng)'],
    transport: 'Bay từ Hà Nội (~1h15) hoặc xe khách (~10-12h)',
    mapsQuery: 'Điện Biên, Vietnam',
  },
  {
    id: 'son-la',
    name: 'Sơn La',
    region: 'Tây Bắc',
    regionColor: '#059669',
    image: 'https://images.pexels.com/photos/37634257/pexels-photo-37634257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Sơn La nổi tiếng với cao nguyên Mộc Châu — vùng đất sữa và hoa, thảo nguyên xanh mướt và khí hậu ôn hòa. Là điểm đến lý tưởng cho người yêu thiên nhiên.',
    highlights: ['Cao nguyên Mộc Châu', 'Đèo Pha Đin', 'Nhà tù Sơn La', 'Rừng thông Bản Áng'],
    places: [
      { name: 'Mộc Châu', desc: 'Cao nguyên xanh mướt với đồi chè, hoa cải trắng, hoa mận và trang trại bò sữa', coords: { lat: 20.8325, lng: 104.6478 }, tips: ['Tháng 1-2 hoa mận nở trắng rừng', 'Tháng 11 hoa cải trắng rực rỡ', 'Thử sữa tươi và yaourt Mộc Châu'], bestTime: 'Tháng 10-3', avgCost: '1.5-3 triệu/người' },
    ],
    foods: ['Bê chao Mộc Châu', 'Sữa tươi Mộc Châu', 'Nậm pịa', 'Cá suối'],
    transport: 'Xe khách từ Hà Nội (~5-6h). Nên thuê xe máy để khám phá',
    mapsQuery: 'Sơn La, Vietnam',
  },

  // ===== ĐÔNG BẮC =====
  {
    id: 'quang-ninh',
    name: 'Quảng Ninh',
    region: 'Đông Bắc',
    regionColor: '#0891b2',
    image: 'https://images.pexels.com/photos/38116420/pexels-photo-38116420.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Quảng Ninh sở hữu Vịnh Hạ Long — Di sản Thiên nhiên Thế giới UNESCO với gần 2.000 hòn đảo đá vôi. Ngoài ra còn có Bái Tử Long, Cô Tô và cửa khẩu Móng Cái.',
    highlights: ['Vịnh Hạ Long', 'Đảo Cô Tô', 'Vịnh Bái Tử Long', 'Yên Tử'],
    places: [
      { name: 'Vịnh Hạ Long', desc: 'Di sản UNESCO với ~2.000 đảo đá vôi, hang động kỳ vĩ', coords: { lat: 20.9101, lng: 107.1839 }, tips: ['Đặt tour du thuyền 2N1Đ để trải nghiệm đầy đủ', 'Chèo kayak khám phá hang Luồn', 'Tránh mùa mưa tháng 7-8'], bestTime: 'Tháng 10-4', avgCost: '2-8 triệu/người' },
      { name: 'Đảo Cô Tô', desc: 'Quần đảo hoang sơ với bãi biển cát trắng, nước trong xanh', coords: { lat: 21.0569, lng: 107.7682 }, tips: ['Tàu cao tốc từ Vân Đồn ~1h', 'Thuê xe máy trên đảo', 'Ăn hải sản tại chợ đêm Cô Tô'], bestTime: 'Tháng 4-9', avgCost: '2-4 triệu/người' },
    ],
    foods: ['Chả mực Hạ Long', 'Sam biển', 'Hàu sữa', 'Bánh gật gù'],
    transport: 'Xe khách/ô tô từ Hà Nội (~3.5h), hoặc bay đến Sân bay Vân Đồn',
    mapsQuery: 'Quảng Ninh, Vietnam',
  },
  {
    id: 'lang-son',
    name: 'Lạng Sơn',
    region: 'Đông Bắc',
    regionColor: '#0891b2',
    image: 'https://images.pexels.com/photos/38100494/pexels-photo-38100494.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Lạng Sơn là vùng biên giới phía Bắc với cửa khẩu Hữu Nghị, nổi tiếng với các hang động kỳ vĩ, chợ biên giới và ẩm thực đặc sắc.',
    highlights: ['Động Tam Thanh', 'Nhị Thanh', 'Chợ Đông Kinh', 'Cửa khẩu Hữu Nghị'],
    places: [
      { name: 'Động Tam Thanh - Nhị Thanh', desc: 'Hai hang động đẹp nhất Lạng Sơn nằm trong lòng núi đá vôi', coords: { lat: 21.8469, lng: 106.7544 }, tips: ['Vé vào ~30k/người', 'Kết hợp tham quan chùa Tam Thanh', 'Nên đi buổi sáng'], bestTime: 'Quanh năm', avgCost: '500k-1.5 triệu/người' },
    ],
    foods: ['Vịt quay Lạng Sơn', 'Phở chua', 'Bánh cuốn trứng', 'Khau nhục'],
    transport: 'Xe khách từ Hà Nội (~3h), tàu hỏa (~5h)',
    mapsQuery: 'Lạng Sơn, Vietnam',
  },
  {
    id: 'cao-bang',
    name: 'Cao Bằng',
    region: 'Đông Bắc',
    regionColor: '#0891b2',
    image: 'https://images.pexels.com/photos/34739724/pexels-photo-34739724.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Cao Bằng được UNESCO công nhận là Công viên Địa chất Toàn cầu. Thác Bản Giốc — thác nước lớn nhất Đông Nam Á nằm trên biên giới Việt-Trung.',
    highlights: ['Thác Bản Giốc', 'Động Ngườm Ngao', 'Hồ Thang Hen', 'Khu di tích Pác Bó'],
    places: [
      { name: 'Thác Bản Giốc', desc: 'Thác nước hùng vĩ nhất Việt Nam và lớn nhất Đông Nam Á', coords: { lat: 22.8544, lng: 106.7236 }, tips: ['Đi vào mùa nước lớn (tháng 6-9) để thác đẹp nhất', 'Có thể đi thuyền sát chân thác', 'Mang theo áo mưa'], bestTime: 'Tháng 6-9', avgCost: '1.5-3 triệu/người' },
    ],
    foods: ['Bánh cuốn Cao Bằng', 'Phở chua', 'Cháo ấu tẩu', 'Lạp xường hun khói'],
    transport: 'Xe khách từ Hà Nội (~7h). Nên thuê xe máy khám phá',
    mapsQuery: 'Cao Bằng, Vietnam',
  },
  {
    id: 'thai-nguyen',
    name: 'Thái Nguyên',
    region: 'Đông Bắc',
    regionColor: '#0891b2',
    image: 'https://images.pexels.com/photos/13878582/pexels-photo-13878582.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Thái Nguyên nổi tiếng là "thủ phủ trà" Việt Nam với vùng chè Tân Cương. Nơi đây có hồ Núi Cốc thơ mộng và nhiều di tích lịch sử thời kháng chiến.',
    highlights: ['Hồ Núi Cốc', 'Vùng chè Tân Cương', 'Bảo tàng Văn hóa các dân tộc'],
    places: [
      { name: 'Hồ Núi Cốc', desc: 'Hồ nước nhân tạo rộng 25km² giữa núi rừng, gắn liền truyền thuyết tình yêu', coords: { lat: 21.5667, lng: 105.7500 }, tips: ['Đi thuyền trên hồ, ghé đảo', 'Khu nghỉ dưỡng ven hồ nhiều lựa chọn', 'Kết hợp tham quan vùng chè'], bestTime: 'Quanh năm', avgCost: '800k-2 triệu/người' },
    ],
    foods: ['Trà Tân Cương', 'Bánh chưng Bờ Đậu', 'Cơm lam', 'Tôm sông Cầu'],
    transport: 'Xe khách từ Hà Nội (~2h)',
    mapsQuery: 'Thái Nguyên, Vietnam',
  },
  {
    id: 'tuyen-quang',
    name: 'Tuyên Quang',
    region: 'Đông Bắc',
    regionColor: '#0891b2',
    image: 'https://images.pexels.com/photos/37634257/pexels-photo-37634257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Tuyên Quang — thủ đô kháng chiến, nổi tiếng với lễ hội Trung thu lớn nhất Việt Nam, Na Hang hùng vĩ và rừng nguyên sinh.',
    highlights: ['Hồ Na Hang', 'Thác Mơ', 'Lễ hội Trung thu Tuyên Quang', 'Tân Trào'],
    places: [
      { name: 'Na Hang', desc: 'Hồ nước xanh ngọc giữa núi đá vôi, được ví như "Hạ Long trên cạn"', coords: { lat: 22.3500, lng: 105.3833 }, tips: ['Đi thuyền trên hồ ~200k/người', 'Ngắm voọc mũi hếch nếu may mắn', 'Ở lại bản làng qua đêm'], bestTime: 'Tháng 9-11', avgCost: '1-2.5 triệu/người' },
    ],
    foods: ['Thịt trâu khô', 'Mắm cá ruộng', 'Cơm lam Na Hang'],
    transport: 'Xe khách từ Hà Nội (~3.5h)',
    mapsQuery: 'Tuyên Quang, Vietnam',
  },

  // ===== ĐỒNG BẰNG BẮC BỘ =====
  {
    id: 'ha-noi',
    name: 'Hà Nội',
    region: 'Đồng Bằng Bắc Bộ',
    regionColor: '#d97706',
    image: 'https://images.pexels.com/photos/38282169/pexels-photo-38282169.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Thủ đô ngàn năm văn hiến với phố cổ 36 phố phường, hồ Hoàn Kiếm huyền thoại, lăng Bác và ẩm thực đường phố phong phú bậc nhất thế giới.',
    highlights: ['Phố cổ Hà Nội', 'Hồ Hoàn Kiếm', 'Lăng Chủ tịch Hồ Chí Minh', 'Văn Miếu Quốc Tử Giám', 'Hoàng thành Thăng Long'],
    places: [
      { name: 'Phố cổ Hà Nội', desc: '36 phố phường với kiến trúc cổ kính, ẩm thực đường phố và cuộc sống sôi động', coords: { lat: 21.0340, lng: 105.8500 }, tips: ['Đi bộ hoặc xích lô quanh phố cổ', 'Thứ 6-CN có phố đi bộ quanh Hồ Gươm', 'Ăn phở Bát Đàn, bún chả Hương Liên'], bestTime: 'Tháng 9-12', avgCost: '500k-2 triệu/ngày' },
      { name: 'Hồ Hoàn Kiếm', desc: 'Biểu tượng Hà Nội với tháp Rùa, đền Ngọc Sơn và cầu Thê Húc', coords: { lat: 21.0288, lng: 105.8525 }, tips: ['Đi dạo buổi sáng sớm hoặc tối', 'Cuối tuần có phố đi bộ', 'Ghé đền Ngọc Sơn (30k vé vào)'], bestTime: 'Quanh năm', avgCost: 'Miễn phí' },
      { name: 'Văn Miếu Quốc Tử Giám', desc: 'Trường đại học đầu tiên của Việt Nam, xây năm 1070', coords: { lat: 21.0275, lng: 105.8356 }, tips: ['Vé 30k/người', 'Nên thuê hướng dẫn viên', 'Tránh giờ trưa nắng nóng'], bestTime: 'Quanh năm', avgCost: '30k/người' },
    ],
    foods: ['Phở Hà Nội', 'Bún chả', 'Bún đậu mắm tôm', 'Chả cá Lã Vọng', 'Bánh mì Hà Nội', 'Cà phê trứng'],
    transport: 'Sân bay Nội Bài. Metro tuyến 2A. Grab/xe buýt thuận tiện',
    mapsQuery: 'Hà Nội, Vietnam',
  },
  {
    id: 'hai-phong',
    name: 'Hải Phòng',
    region: 'Đồng Bằng Bắc Bộ',
    regionColor: '#d97706',
    image: 'https://images.pexels.com/photos/7336586/pexels-photo-7336586.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Thành phố cảng lớn nhất miền Bắc, nổi tiếng với đảo Cát Bà — vườn quốc gia và khu dự trữ sinh quyển thế giới, và phượng đỏ rực rỡ mỗi mùa hè.',
    highlights: ['Đảo Cát Bà', 'Đồ Sơn', 'Vịnh Lan Hạ', 'Nhà hát lớn Hải Phòng'],
    places: [
      { name: 'Đảo Cát Bà', desc: 'Đảo lớn nhất Vịnh Hạ Long với rừng nguyên sinh và bãi biển đẹp', coords: { lat: 20.7269, lng: 107.0473 }, tips: ['Phà từ Hải Phòng ~45 phút', 'Thuê xe máy ~150k/ngày', 'Đi Vịnh Lan Hạ bằng thuyền'], bestTime: 'Tháng 4-10', avgCost: '2-4 triệu/người' },
    ],
    foods: ['Bánh đa cua', 'Nem cua bể', 'Bún tôm Hải Phòng'],
    transport: 'Xe khách/ô tô từ Hà Nội (~2h), có sân bay Cát Bi',
    mapsQuery: 'Hải Phòng, Vietnam',
  },
  {
    id: 'phu-tho',
    name: 'Phú Thọ',
    region: 'Đồng Bằng Bắc Bộ',
    regionColor: '#d97706',
    image: 'https://images.pexels.com/photos/37634257/pexels-photo-37634257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Phú Thọ — vùng đất Tổ với Đền Hùng, nơi thờ các Vua Hùng. Hát Xoan là di sản văn hóa phi vật thể nhân loại. Giỗ Tổ Hùng Vương 10/3 âm lịch là ngày lễ quốc gia.',
    highlights: ['Đền Hùng', 'Hát Xoan Phú Thọ', 'Vườn Quốc gia Xuân Sơn'],
    places: [
      { name: 'Đền Hùng', desc: 'Khu di tích lịch sử quốc gia đặc biệt, nơi thờ 18 đời Vua Hùng', coords: { lat: 21.3833, lng: 105.2667 }, tips: ['Giỗ Tổ 10/3 âm lịch rất đông', 'Nên đi ngày thường để tránh đông đúc', 'Leo 495 bậc đá lên đền Thượng'], bestTime: 'Tháng 3-4 âm lịch', avgCost: '100k-500k/người' },
    ],
    foods: ['Thịt chua Thanh Sơn', 'Xôi nếp gà Phú Thọ', 'Cá lăng sông Đà'],
    transport: 'Xe khách từ Hà Nội (~2h)',
    mapsQuery: 'Phú Thọ, Vietnam',
  },
  {
    id: 'bac-ninh',
    name: 'Bắc Ninh',
    region: 'Đồng Bằng Bắc Bộ',
    regionColor: '#d97706',
    image: 'https://images.pexels.com/photos/38282169/pexels-photo-38282169.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Bắc Ninh — vùng đất Kinh Bắc với truyền thống quan họ lâu đời. Dân ca Quan họ là di sản văn hóa phi vật thể nhân loại. Nhiều đình chùa cổ kính.',
    highlights: ['Quan họ Bắc Ninh', 'Đền Đô', 'Chùa Dâu', 'Chùa Bút Tháp'],
    places: [
      { name: 'Đền Đô', desc: 'Đền thờ 8 vị vua triều Lý, kiến trúc cổ kính uy nghi', coords: { lat: 21.1167, lng: 106.0833 }, tips: ['Miễn phí tham quan', 'Lễ hội đền Đô tháng 3 âm lịch', 'Nghe Quan họ tại hội Lim'], bestTime: 'Tháng 1-3 âm lịch', avgCost: 'Miễn phí - 500k' },
    ],
    foods: ['Bánh phu thê', 'Nem Bùi', 'Bánh khúc làng Diềm'],
    transport: 'Xe khách/ô tô từ Hà Nội (~45 phút)',
    mapsQuery: 'Bắc Ninh, Vietnam',
  },
  {
    id: 'hung-yen',
    name: 'Hưng Yên',
    region: 'Đồng Bằng Bắc Bộ',
    regionColor: '#d97706',
    image: 'https://images.pexels.com/photos/28706867/pexels-photo-28706867.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Hưng Yên nổi tiếng với nhãn lồng thơm ngọt, phố Hiến xưa "thứ nhất Kinh Kỳ, thứ nhì Phố Hiến" và nhiều di tích lịch sử văn hóa.',
    highlights: ['Phố Hiến', 'Nhãn lồng Hưng Yên', 'Đền Mẫu', 'Văn Miếu Xích Đằng'],
    places: [
      { name: 'Phố Hiến', desc: 'Thương cảng cổ từng sầm uất bậc nhất Đàng Ngoài thế kỷ 17', coords: { lat: 20.6464, lng: 106.0667 }, tips: ['Ghé Văn Miếu Xích Đằng', 'Thưởng thức nhãn lồng mùa hè', 'Tham quan đền chùa quanh phố'], bestTime: 'Tháng 7-8 (mùa nhãn)', avgCost: '300k-1 triệu/người' },
    ],
    foods: ['Nhãn lồng Hưng Yên', 'Long nhãn', 'Bánh đa kê'],
    transport: 'Xe khách từ Hà Nội (~1.5h)',
    mapsQuery: 'Hưng Yên, Vietnam',
  },
  {
    id: 'ninh-binh',
    name: 'Ninh Bình',
    region: 'Đồng Bằng Bắc Bộ',
    regionColor: '#d97706',
    image: 'https://images.pexels.com/photos/34739724/pexels-photo-34739724.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Ninh Bình — "Hạ Long trên cạn" với Tràng An (Di sản thế giới), Tam Cốc, Bái Đính và cố đô Hoa Lư. Cảnh quan núi đá vôi sông nước tuyệt đẹp.',
    highlights: ['Tràng An', 'Tam Cốc - Bích Động', 'Chùa Bái Đính', 'Cố đô Hoa Lư', 'Vườn quốc gia Cúc Phương'],
    places: [
      { name: 'Tràng An', desc: 'Di sản thế giới kép (văn hóa & thiên nhiên), quần thể hang động và sông nước', coords: { lat: 20.2506, lng: 105.8986 }, tips: ['Vé thuyền ~250k/người, đi ~2-3h', 'Chọn tuyến 1 hoặc 2 để ngắm hang đẹp nhất', 'Đi sáng sớm tránh đông'], bestTime: 'Tháng 5-6 (lúa chín)', avgCost: '250k-500k/người' },
      { name: 'Tam Cốc - Bích Động', desc: 'Ba hang động giữa cánh đồng lúa, đi thuyền trên sông Ngô Đồng', coords: { lat: 20.2139, lng: 105.9233 }, tips: ['Vé thuyền ~150k + vé tham quan', 'Mặc đồ thoải mái, đội nón', 'Tháng 5-6 lúa chín vàng tuyệt đẹp'], bestTime: 'Tháng 5-6', avgCost: '200k-400k/người' },
    ],
    foods: ['Cơm cháy Ninh Bình', 'Thịt dê núi', 'Ốc núi', 'Miến lươn'],
    transport: 'Xe khách từ Hà Nội (~2h), xe máy (~2.5h)',
    mapsQuery: 'Ninh Bình, Vietnam',
  },

  // ===== BẮC TRUNG BỘ =====
  {
    id: 'thanh-hoa',
    name: 'Thanh Hóa',
    region: 'Bắc Trung Bộ',
    regionColor: '#dc2626',
    image: 'https://images.pexels.com/photos/7336586/pexels-photo-7336586.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Thanh Hóa — xứ Thanh rộng lớn với bãi biển Sầm Sơn nổi tiếng, Thành Nhà Hồ (Di sản thế giới), Vườn quốc gia Bến En và nền văn hóa Đông Sơn.',
    highlights: ['Bãi biển Sầm Sơn', 'Thành Nhà Hồ', 'Vườn quốc gia Bến En', 'Suối cá thần Cẩm Lương'],
    places: [
      { name: 'Sầm Sơn', desc: 'Bãi biển dài, cát mịn, là điểm du lịch biển lâu đời nhất miền Bắc', coords: { lat: 19.7500, lng: 105.9000 }, tips: ['Hải sản tươi ngon giá rẻ', 'Tránh dịp lễ 30/4 rất đông', 'Phòng khách sạn từ 300k-1 triệu/đêm'], bestTime: 'Tháng 5-8', avgCost: '1-3 triệu/người' },
    ],
    foods: ['Nem chua Thanh Hóa', 'Chả tôm', 'Bánh cuốn Thanh Hóa', 'Bún bung'],
    transport: 'Xe khách từ Hà Nội (~3.5h), tàu hỏa (~3h)',
    mapsQuery: 'Thanh Hóa, Vietnam',
  },
  {
    id: 'nghe-an',
    name: 'Nghệ An',
    region: 'Bắc Trung Bộ',
    regionColor: '#dc2626',
    image: 'https://images.pexels.com/photos/37634257/pexels-photo-37634257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Nghệ An — quê hương Bác Hồ, tỉnh lớn nhất Việt Nam. Nổi tiếng với bãi biển Cửa Lò, Vườn quốc gia Pù Mát và phong cảnh núi rừng miền Tây Nghệ An.',
    highlights: ['Bãi biển Cửa Lò', 'Kim Liên - quê Bác', 'Vườn quốc gia Pù Mát', 'Khe Nước Trong'],
    places: [
      { name: 'Cửa Lò', desc: 'Bãi biển đẹp nhất Bắc Trung Bộ với cát trắng mịn dài 10km', coords: { lat: 18.8019, lng: 105.7178 }, tips: ['Hải sản rẻ hơn Sầm Sơn', 'Nên đi vào ngày trong tuần', 'Ghé thăm đảo Ngư, đảo Mắt'], bestTime: 'Tháng 5-8', avgCost: '1-2.5 triệu/người' },
    ],
    foods: ['Lươn xứ Nghệ', 'Cháo lươn', 'Bánh đa cua', 'Cà pháo mắm tôm'],
    transport: 'Bay đến Sân bay Vinh (~1h từ HN), xe khách (~5-6h)',
    mapsQuery: 'Nghệ An, Vietnam',
  },
  {
    id: 'ha-tinh',
    name: 'Hà Tĩnh',
    region: 'Bắc Trung Bộ',
    regionColor: '#dc2626',
    image: 'https://images.pexels.com/photos/37634257/pexels-photo-37634257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Hà Tĩnh — vùng đất học, quê hương Nguyễn Du. Nổi tiếng với bãi biển Thiên Cầm, Vũ Quang và khu mộ Nguyễn Du.',
    highlights: ['Biển Thiên Cầm', 'Khu di tích Nguyễn Du', 'Vườn quốc gia Vũ Quang', 'Chùa Hương Tích'],
    places: [
      { name: 'Biển Thiên Cầm', desc: 'Bãi biển hoang sơ hình cây đàn, nước xanh trong', coords: { lat: 18.2833, lng: 106.0500 }, tips: ['Ít khách du lịch, yên tĩnh', 'Hải sản tươi, giá mềm', 'Kết hợp thăm Nguyễn Du'], bestTime: 'Tháng 5-8', avgCost: '800k-2 triệu/người' },
    ],
    foods: ['Cu đơ Hà Tĩnh', 'Nhút Thanh Chương', 'Kẹo cu đơ', 'Bún bò Hà Tĩnh'],
    transport: 'Bay đến Sân bay Vinh + xe bus (~1h), xe khách từ HN (~6-7h)',
    mapsQuery: 'Hà Tĩnh, Vietnam',
  },
  {
    id: 'quang-tri',
    name: 'Quảng Trị',
    region: 'Bắc Trung Bộ',
    regionColor: '#dc2626',
    image: 'https://images.pexels.com/photos/26550067/pexels-photo-26550067.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Quảng Trị — vùng đất thép với Thành cổ Quảng Trị, sông Thạch Hãn, địa đạo Vịnh Mốc và cầu Hiền Lương trên vĩ tuyến 17.',
    highlights: ['Thành cổ Quảng Trị', 'Địa đạo Vịnh Mốc', 'Cầu Hiền Lương', 'Đảo Cồn Cỏ'],
    places: [
      { name: 'Thành cổ Quảng Trị', desc: 'Di tích 81 ngày đêm chiến đấu anh dũng mùa hè 1972', coords: { lat: 16.7500, lng: 107.1833 }, tips: ['Viếng đài tưởng niệm', 'Thả hoa đăng trên sông Thạch Hãn buổi tối', 'Nên tìm hiểu lịch sử trước khi đến'], bestTime: 'Quanh năm', avgCost: '300k-1 triệu/người' },
    ],
    foods: ['Bánh bột lọc', 'Cháo bột Quảng Trị', 'Bánh ướt thịt nướng'],
    transport: 'Tàu hỏa hoặc xe khách, gần sân bay Phú Bài (Huế)',
    mapsQuery: 'Quảng Trị, Vietnam',
  },
  {
    id: 'hue',
    name: 'Huế',
    region: 'Bắc Trung Bộ',
    regionColor: '#dc2626',
    image: 'https://images.pexels.com/photos/37855977/pexels-photo-37855977.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Huế — cố đô triều Nguyễn với Đại Nội, lăng tẩm, chùa Thiên Mụ bên sông Hương thơ mộng. Quần thể di tích Huế là Di sản Thế giới UNESCO. Ẩm thực cung đình tinh tế.',
    highlights: ['Đại Nội Huế', 'Chùa Thiên Mụ', 'Lăng Khải Định', 'Lăng Minh Mạng', 'Sông Hương'],
    places: [
      { name: 'Đại Nội Huế', desc: 'Hoàng thành triều Nguyễn, Di sản Thế giới với Ngọ Môn, Điện Thái Hòa', coords: { lat: 16.4698, lng: 107.5784 }, tips: ['Vé 200k/người, nên mua vé combo', 'Thuê áo dài chụp ảnh tại Đại Nội', 'Đi buổi sáng tránh nắng'], bestTime: 'Tháng 1-4', avgCost: '200k-500k/người' },
      { name: 'Chùa Thiên Mụ', desc: 'Ngôi chùa cổ nhất Huế trên đồi Hà Khê, biểu tượng xứ Huế', coords: { lat: 16.4536, lng: 107.5453 }, tips: ['Miễn phí tham quan', 'Đi thuyền trên sông Hương đến chùa', 'Ngắm hoàng hôn trên sông Hương'], bestTime: 'Quanh năm', avgCost: 'Miễn phí' },
    ],
    foods: ['Bún bò Huế', 'Cơm hến', 'Bánh bèo', 'Bánh nậm', 'Bánh lọc', 'Chè Huế'],
    transport: 'Sân bay Phú Bài, tàu hỏa ga Huế, xe khách',
    mapsQuery: 'Huế, Vietnam',
  },

  // ===== NAM TRUNG BỘ =====
  {
    id: 'da-nang',
    name: 'Đà Nẵng',
    region: 'Nam Trung Bộ',
    regionColor: '#7c3aed',
    image: 'https://images.pexels.com/photos/26550067/pexels-photo-26550067.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Đà Nẵng — thành phố đáng sống nhất Việt Nam với bãi biển Mỹ Khê (top đẹp nhất hành tinh), Bà Nà Hills với Cầu Vàng, Ngũ Hành Sơn và ẩm thực miền Trung.',
    highlights: ['Bãi biển Mỹ Khê', 'Cầu Vàng Bà Nà Hills', 'Ngũ Hành Sơn', 'Cầu Rồng', 'Bán đảo Sơn Trà'],
    places: [
      { name: 'Bà Nà Hills', desc: 'Khu du lịch trên núi với Cầu Vàng nổi tiếng thế giới, làng Pháp và công viên Fantasy Park', coords: { lat: 15.9977, lng: 107.9945 }, tips: ['Vé cáp treo ~900k/người', 'Đi sớm để tránh đông', 'Mang áo khoác vì trên núi lạnh'], bestTime: 'Tháng 2-5', avgCost: '900k-1.5 triệu/người' },
      { name: 'Bãi biển Mỹ Khê', desc: 'Top 25 bãi biển đẹp nhất châu Á theo Forbes, cát trắng mịn', coords: { lat: 16.0544, lng: 108.2472 }, tips: ['Tắm biển miễn phí', 'Ăn hải sản ven biển giá rẻ', 'Xem cầu Rồng phun lửa tối thứ 7'], bestTime: 'Tháng 3-9', avgCost: 'Miễn phí' },
    ],
    foods: ['Mì Quảng', 'Bánh tráng cuốn thịt heo', 'Bún chả cá', 'Bánh xèo Đà Nẵng'],
    transport: 'Sân bay Đà Nẵng (nhiều chuyến bay giá rẻ), tàu hỏa',
    mapsQuery: 'Đà Nẵng, Vietnam',
  },
  {
    id: 'quang-ngai',
    name: 'Quảng Ngãi',
    region: 'Nam Trung Bộ',
    regionColor: '#7c3aed',
    image: 'https://images.pexels.com/photos/31390027/pexels-photo-31390027.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Quảng Ngãi sở hữu đảo Lý Sơn — "đảo tỏi" với biển xanh ngắt, và nhiều di tích lịch sử như Sơn Mỹ. Là điểm đến mới nổi, hoang sơ.',
    highlights: ['Đảo Lý Sơn', 'Cổng Tò Vò', 'Chùa Hang', 'Khu chứng tích Sơn Mỹ'],
    places: [
      { name: 'Đảo Lý Sơn', desc: 'Đảo núi lửa với cảnh quan địa chất độc đáo, biển trong xanh tuyệt đẹp', coords: { lat: 15.3772, lng: 109.1153 }, tips: ['Tàu cao tốc từ cảng Sa Kỳ ~30 phút', 'Thuê xe máy ~100k/ngày', 'Mua tỏi Lý Sơn làm quà'], bestTime: 'Tháng 3-8', avgCost: '1.5-3 triệu/người' },
    ],
    foods: ['Cá bống sông Trà', 'Don Quảng Ngãi', 'Tỏi Lý Sơn'],
    transport: 'Xe khách từ Đà Nẵng (~2.5h) hoặc Quy Nhơn (~3h)',
    mapsQuery: 'Quảng Ngãi, Vietnam',
  },
  {
    id: 'khanh-hoa',
    name: 'Khánh Hòa',
    region: 'Nam Trung Bộ',
    regionColor: '#7c3aed',
    image: 'https://images.pexels.com/photos/28143546/pexels-photo-28143546.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Khánh Hòa với thành phố biển Nha Trang — "hòn ngọc Viễn Đông", nổi tiếng với vịnh đẹp, Vinpearl, Tháp Bà Ponagar và lặn biển ngắm san hô.',
    highlights: ['Vịnh Nha Trang', 'Vinpearl Land', 'Tháp Bà Ponagar', 'Hòn Mun', 'Dốc Lết'],
    places: [
      { name: 'Vịnh Nha Trang', desc: 'Một trong 29 vịnh đẹp nhất thế giới với 19 đảo lớn nhỏ', coords: { lat: 12.2388, lng: 109.1967 }, tips: ['Tour 4 đảo ~200k-400k/người', 'Lặn biển ngắm san hô ở Hòn Mun', 'Ăn hải sản tại chợ Đầm'], bestTime: 'Tháng 1-8', avgCost: '2-5 triệu/người' },
      { name: 'Vinpearl Land', desc: 'Thiên đường giải trí trên đảo Hòn Tre với công viên nước, vườn thú', coords: { lat: 12.2219, lng: 109.2350 }, tips: ['Vé cáp treo + tham quan ~880k', 'Dành cả ngày ở đây', 'Đặt combo khách sạn + vé rẻ hơn'], bestTime: 'Quanh năm', avgCost: '880k-1.5 triệu/người' },
    ],
    foods: ['Bún chả cá Nha Trang', 'Bánh canh chả cá', 'Nem nướng Ninh Hòa', 'Yến sào'],
    transport: 'Sân bay Cam Ranh (~40 phút vào trung tâm), tàu hỏa',
    mapsQuery: 'Nha Trang, Khánh Hòa, Vietnam',
  },

  // ===== TÂY NGUYÊN =====
  {
    id: 'gia-lai',
    name: 'Gia Lai',
    region: 'Tây Nguyên',
    regionColor: '#be185d',
    image: 'https://images.pexels.com/photos/36393653/pexels-photo-36393653.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Gia Lai — vùng đất bazan đỏ với Biển Hồ (Pleiku), không gian văn hóa cồng chiêng Tây Nguyên (Di sản thế giới) và những rẫy cà phê bạt ngàn.',
    highlights: ['Biển Hồ T\'Nưng', 'Thác Phú Cường', 'Làng cổ Stơr', 'Đồi chè Biển Hồ'],
    places: [
      { name: 'Biển Hồ T\'Nưng', desc: 'Hồ nước ngọt tự nhiên trên miệng núi lửa, rộng 230ha', coords: { lat: 13.9939, lng: 108.0153 }, tips: ['Đến vào buổi sáng sớm khi sương mù', 'Uống cà phê ven hồ', 'Kết hợp thăm đồi chè gần đó'], bestTime: 'Tháng 11-3', avgCost: '500k-1.5 triệu/người' },
    ],
    foods: ['Cơm lam gà nướng', 'Phở khô Gia Lai', 'Bún mắm cua', 'Cà phê Gia Lai'],
    transport: 'Bay đến Sân bay Pleiku (~1h15 từ HCM)',
    mapsQuery: 'Gia Lai, Vietnam',
  },
  {
    id: 'dak-lak',
    name: 'Đắk Lắk',
    region: 'Tây Nguyên',
    regionColor: '#be185d',
    image: 'https://images.pexels.com/photos/36393662/pexels-photo-36393662.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Đắk Lắk — thủ phủ cà phê Việt Nam với Buôn Ma Thuột, văn hóa cồng chiêng, voi Tây Nguyên và hồ Lắk thơ mộng.',
    highlights: ['Buôn Đôn - du lịch voi', 'Hồ Lắk', 'Thác Dray Nur', 'Bảo tàng Cà phê thế giới'],
    places: [
      { name: 'Bảo tàng Cà phê thế giới', desc: 'Bảo tàng cà phê đầu tiên tại Việt Nam, trưng bày lịch sử cà phê toàn cầu', coords: { lat: 12.6831, lng: 108.0383 }, tips: ['Vé ~60k bao gồm 1 ly cà phê', 'Thưởng thức nhiều loại cà phê', 'Mua cà phê đặc sản làm quà'], bestTime: 'Quanh năm', avgCost: '60k-200k/người' },
    ],
    foods: ['Cà phê Buôn Ma Thuột', 'Cơm lam', 'Gà nướng bản Đôn', 'Rượu cần'],
    transport: 'Bay đến Sân bay Buôn Ma Thuột (~1h30 từ HCM)',
    mapsQuery: 'Đắk Lắk, Vietnam',
  },
  {
    id: 'lam-dong',
    name: 'Lâm Đồng',
    region: 'Tây Nguyên',
    regionColor: '#be185d',
    image: 'https://images.pexels.com/photos/36393653/pexels-photo-36393653.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Lâm Đồng với Đà Lạt — "thành phố ngàn hoa", "Paris thu nhỏ" ở độ cao 1.500m. Khí hậu mát mẻ quanh năm, kiến trúc Pháp lãng mạn, đồi thông và hồ nước thơ mộng.',
    highlights: ['Hồ Xuân Hương', 'Thung lũng Tình Yêu', 'Đồi Robin', 'Thiền viện Trúc Lâm', 'Langbiang'],
    places: [
      { name: 'Đà Lạt', desc: 'Thành phố sương mù lãng mạn với kiến trúc Pháp, vườn hoa và đồi thông', coords: { lat: 11.9404, lng: 108.4583 }, tips: ['Mang áo ấm, Đà Lạt lạnh về đêm', 'Thuê xe máy ~100k/ngày', 'Chợ đêm Đà Lạt mở từ 17h', 'Uống cà phê ngắm đồi'], bestTime: 'Tháng 11-3', avgCost: '2-5 triệu/người' },
      { name: 'Langbiang', desc: 'Ngọn núi cao 2.167m với huyền thoại tình yêu Lang và Biang', coords: { lat: 12.0500, lng: 108.4333 }, tips: ['Đi xe jeep lên đỉnh ~300k/người', 'Hoặc leo bộ ~3h', 'Ngắm toàn cảnh Đà Lạt từ đỉnh'], bestTime: 'Tháng 11-4', avgCost: '100k-300k/người' },
    ],
    foods: ['Bánh tráng nướng Đà Lạt', 'Kem bơ', 'Lẩu gà lá é', 'Bánh căn', 'Cà phê chồn'],
    transport: 'Bay đến Sân bay Liên Khương (~50 phút từ HCM), xe khách (~7h)',
    mapsQuery: 'Đà Lạt, Lâm Đồng, Vietnam',
  },

  // ===== ĐÔNG NAM BỘ =====
  {
    id: 'dong-nai',
    name: 'Đồng Nai',
    region: 'Đông Nam Bộ',
    regionColor: '#ea580c',
    image: 'https://images.pexels.com/photos/36418084/pexels-photo-36418084.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Đồng Nai — tỉnh công nghiệp lớn nhất phía Nam nhưng có Vườn quốc gia Cát Tiên (Khu dự trữ sinh quyển thế giới), thác Giang Điền và văn hóa đa dạng.',
    highlights: ['Vườn quốc gia Cát Tiên', 'Thác Giang Điền', 'Khu du lịch Bửu Long', 'Văn miếu Trấn Biên'],
    places: [
      { name: 'Vườn quốc gia Cát Tiên', desc: 'Khu dự trữ sinh quyển thế giới với rừng nguyên sinh và động vật hoang dã', coords: { lat: 11.4167, lng: 107.4167 }, tips: ['Đặt tour xem đom đóm ban đêm', 'Trek rừng nửa ngày', 'Mang thuốc chống muỗi'], bestTime: 'Tháng 11-4', avgCost: '500k-1.5 triệu/người' },
    ],
    foods: ['Gỏi cá sông', 'Bưởi Tân Triều', 'Bánh canh bột gạo'],
    transport: 'Xe khách/ô tô từ TP.HCM (~1-2h)',
    mapsQuery: 'Đồng Nai, Vietnam',
  },
  {
    id: 'tay-ninh',
    name: 'Tây Ninh',
    region: 'Đông Nam Bộ',
    regionColor: '#ea580c',
    image: 'https://images.pexels.com/photos/37855977/pexels-photo-37855977.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Tây Ninh nổi tiếng với núi Bà Đen — "nóc nhà Nam Bộ" cao 986m, Tòa Thánh Cao Đài kiến trúc độc đáo và hệ thống cáp treo hiện đại.',
    highlights: ['Núi Bà Đen', 'Tòa Thánh Cao Đài', 'Hồ Dầu Tiếng', 'Tháp cáp treo kỷ lục'],
    places: [
      { name: 'Núi Bà Đen', desc: 'Ngọn núi cao nhất Nam Bộ 986m với hệ thống cáp treo hiện đại', coords: { lat: 11.3544, lng: 106.1786 }, tips: ['Cáp treo ~300k khứ hồi', 'Leo bộ mất ~3-4h', 'Đi sáng sớm ngắm bình minh'], bestTime: 'Tháng 11-4', avgCost: '300k-800k/người' },
    ],
    foods: ['Bánh tráng phơi sương Trảng Bàng', 'Muối tôm Tây Ninh', 'Bánh canh Trảng Bàng'],
    transport: 'Xe khách từ TP.HCM (~2h)',
    mapsQuery: 'Tây Ninh, Vietnam',
  },
  {
    id: 'tp-hcm',
    name: 'TP. Hồ Chí Minh',
    region: 'Đông Nam Bộ',
    regionColor: '#ea580c',
    image: 'https://images.pexels.com/photos/20224478/pexels-photo-20224478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'TP.HCM — thành phố lớn nhất, trung tâm kinh tế sôi động nhất Việt Nam. Sài Gòn hoa lệ với Nhà thờ Đức Bà, Dinh Độc Lập, phố đi bộ Nguyễn Huệ và ẩm thực đường phố đỉnh cao.',
    highlights: ['Dinh Độc Lập', 'Nhà thờ Đức Bà', 'Bưu điện Trung tâm', 'Phố đi bộ Nguyễn Huệ', 'Chợ Bến Thành', 'Landmark 81'],
    places: [
      { name: 'Dinh Độc Lập', desc: 'Di tích lịch sử quốc gia đặc biệt, nơi chứng kiến sự kiện 30/4/1975', coords: { lat: 10.7769, lng: 106.6952 }, tips: ['Vé 65k/người', 'Tham quan buổi sáng', 'Thuê hướng dẫn viên để hiểu lịch sử'], bestTime: 'Quanh năm', avgCost: '65k/người' },
      { name: 'Chợ Bến Thành', desc: 'Biểu tượng Sài Gòn từ 1914, khu chợ nổi tiếng với du khách quốc tế', coords: { lat: 10.7725, lng: 106.6980 }, tips: ['Mặc cả khoảng 50-70% giá', 'Chợ đêm xung quanh từ 18h', 'Thử hết các món ăn vặt'], bestTime: 'Quanh năm', avgCost: 'Miễn phí (chỉ mua sắm)' },
      { name: 'Landmark 81', desc: 'Tòa nhà cao nhất Việt Nam 461m với đài quan sát Saigon Skydeck', coords: { lat: 10.7952, lng: 106.7219 }, tips: ['Vé Skydeck ~250k/người', 'Ngắm toàn cảnh thành phố', 'Có khu ẩm thực và mua sắm bên dưới'], bestTime: 'Quanh năm', avgCost: '250k/người' },
    ],
    foods: ['Phở Sài Gòn', 'Cơm tấm', 'Bánh mì Sài Gòn', 'Bún thịt nướng', 'Gỏi cuốn', 'Hủ tiếu Nam Vang', 'Chè đủ loại'],
    transport: 'Sân bay Tân Sơn Nhất. Grab, xe buýt, Metro tuyến 1 Bến Thành - Suối Tiên',
    mapsQuery: 'TP. Hồ Chí Minh, Vietnam',
  },

  // ===== TÂY NAM BỘ =====
  {
    id: 'dong-thap',
    name: 'Đồng Tháp',
    region: 'Tây Nam Bộ',
    regionColor: '#4f46e5',
    image: 'https://images.pexels.com/photos/28706867/pexels-photo-28706867.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Đồng Tháp — xứ sen hồng với Tràm Chim (Vườn quốc gia), làng hoa Sa Đéc và mùa nước nổi hấp dẫn.',
    highlights: ['Vườn quốc gia Tràm Chim', 'Làng hoa Sa Đéc', 'Khu di tích Xẻo Quít', 'Đồng sen Tháp Mười'],
    places: [
      { name: 'Tràm Chim', desc: 'Vườn quốc gia với hơn 200 loài chim, nơi cư trú của sếu đầu đỏ quý hiếm', coords: { lat: 10.7167, lng: 105.5500 }, tips: ['Đi thuyền trong tràm ~100k/người', 'Mùa sếu bay tháng 12-3', 'Mang ống nhòm xem chim'], bestTime: 'Tháng 12-4', avgCost: '500k-1.5 triệu/người' },
    ],
    foods: ['Cá lóc nướng trui', 'Hủ tiếu Sa Đéc', 'Bánh xèo miền Tây', 'Lẩu mắm'],
    transport: 'Xe khách từ TP.HCM (~3-4h)',
    mapsQuery: 'Đồng Tháp, Vietnam',
  },
  {
    id: 'vinh-long',
    name: 'Vĩnh Long',
    region: 'Tây Nam Bộ',
    regionColor: '#4f46e5',
    image: 'https://images.pexels.com/photos/28706867/pexels-photo-28706867.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Vĩnh Long — vùng đất cù lao với vườn cây ăn trái trĩu quả, chợ nổi và đời sống sông nước yên bình đậm chất miền Tây.',
    highlights: ['Chợ nổi Cái Bè', 'Cù lao An Bình', 'Vườn trái cây', 'Làng nghề gạch gốm'],
    places: [
      { name: 'Cù lao An Bình', desc: 'Cù lao xanh mướt giữa sông Tiền, vườn trái cây và homestay yên bình', coords: { lat: 10.2500, lng: 105.9500 }, tips: ['Thuê thuyền đi vòng quanh cù lao', 'Ở homestay trải nghiệm cuộc sống miền Tây', 'Ăn trái cây tại vườn'], bestTime: 'Quanh năm', avgCost: '500k-1.5 triệu/người' },
    ],
    foods: ['Cá tai tượng chiên xù', 'Hủ tiếu Mỹ Tho', 'Trái cây miền Tây'],
    transport: 'Xe khách từ TP.HCM (~2.5h)',
    mapsQuery: 'Vĩnh Long, Vietnam',
  },
  {
    id: 'can-tho',
    name: 'Cần Thơ',
    region: 'Tây Nam Bộ',
    regionColor: '#4f46e5',
    image: 'https://images.pexels.com/photos/20224478/pexels-photo-20224478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Cần Thơ — thủ phủ miền Tây với chợ nổi Cái Răng nổi tiếng, bến Ninh Kiều thơ mộng và ẩm thực sông nước phong phú.',
    highlights: ['Chợ nổi Cái Răng', 'Bến Ninh Kiều', 'Thiền viện Trúc Lâm Phương Nam', 'Cù lao Tân Lộc'],
    places: [
      { name: 'Chợ nổi Cái Răng', desc: 'Chợ nổi lớn nhất ĐBSCL, họp từ 5h sáng trên sông Cần Thơ', coords: { lat: 10.0167, lng: 105.7500 }, tips: ['Đi từ 5-6h sáng là đông nhất', 'Thuê thuyền ~200k/thuyền', 'Ăn bún riêu, hủ tiếu trên sông', 'Mang theo máy ảnh chống nước'], bestTime: 'Quanh năm', avgCost: '200k-500k/người' },
      { name: 'Bến Ninh Kiều', desc: 'Bến sông nổi tiếng với công viên ven sông, chợ đêm và du thuyền', coords: { lat: 10.0333, lng: 105.7833 }, tips: ['Đi dạo buổi tối rất lãng mạn', 'Du thuyền trên sông ~100k', 'Chợ đêm phong phú'], bestTime: 'Quanh năm', avgCost: 'Miễn phí' },
    ],
    foods: ['Bún nước lèo', 'Bánh xèo miền Tây', 'Lẩu mắm', 'Chuối nướng'],
    transport: 'Bay đến Sân bay Cần Thơ, hoặc xe khách từ TP.HCM (~3.5h)',
    mapsQuery: 'Cần Thơ, Vietnam',
  },
  {
    id: 'an-giang',
    name: 'An Giang',
    region: 'Tây Nam Bộ',
    regionColor: '#4f46e5',
    image: 'https://images.pexels.com/photos/37634257/pexels-photo-37634257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'An Giang — vùng đất tâm linh với núi Sam, núi Cấm, rừng tràm Trà Sư và mùa nước nổi lênh đênh đặc trưng miền Tây.',
    highlights: ['Rừng tràm Trà Sư', 'Núi Cấm (Thiên Cấm Sơn)', 'Miếu Bà Chúa Xứ núi Sam', 'Mùa nước nổi'],
    places: [
      { name: 'Rừng tràm Trà Sư', desc: 'Rừng tràm ngập nước xanh mướt với hàng ngàn con cò, cá', coords: { lat: 10.6833, lng: 105.0833 }, tips: ['Đi thuyền máy + xuồng ~100k', 'Sáng sớm hoặc chiều muộn đẹp nhất', 'Mùa nước nổi (tháng 9-11) tuyệt vời nhất'], bestTime: 'Tháng 9-11', avgCost: '100k-500k/người' },
    ],
    foods: ['Mắm Châu Đốc', 'Bún cá Châu Đốc', 'Tung lò mò', 'Bánh bò thốt nốt'],
    transport: 'Xe khách từ TP.HCM (~5-6h) hoặc Cần Thơ (~2h)',
    mapsQuery: 'An Giang, Vietnam',
  },
  {
    id: 'ca-mau',
    name: 'Cà Mau',
    region: 'Tây Nam Bộ',
    regionColor: '#4f46e5',
    image: 'https://images.pexels.com/photos/7336586/pexels-photo-7336586.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overview: 'Cà Mau — cực Nam Tổ quốc với Mũi Cà Mau, rừng ngập mặn đước bạt ngàn, hệ sinh thái độc đáo và cuộc sống hoang dã của vùng đất mới.',
    highlights: ['Mũi Cà Mau - Đất Mũi', 'Vườn quốc gia U Minh Hạ', 'Rừng đước ngập mặn', 'Hòn Khoai'],
    places: [
      { name: 'Đất Mũi - Mũi Cà Mau', desc: 'Điểm cực Nam Tổ quốc, nơi hai biển giao nhau', coords: { lat: 8.6283, lng: 104.7272 }, tips: ['Đi tàu cao tốc từ TP Cà Mau ~2h', 'Đứng ở cột mốc GPS 0001', 'Mang theo chứng minh thư để đóng dấu'], bestTime: 'Tháng 11-4', avgCost: '1-3 triệu/người' },
    ],
    foods: ['Cua Cà Mau (đặc sản)', 'Lẩu mắm U Minh', 'Ốc len xào dừa', 'Ba khía muối'],
    transport: 'Bay đến Sân bay Cà Mau hoặc xe khách từ TP.HCM (~8h)',
    mapsQuery: 'Cà Mau, Vietnam',
  },
];

export function getGoogleMapsUrl(name: string, coords?: { lat: number; lng: number }): string {
  // Dùng trực tiếp URL maps/place — hoạt động trên cả mobile lẫn desktop
  if (coords) {
    return `https://www.google.com/maps/place/${encodeURIComponent(name)}/@${coords.lat},${coords.lng},15z`;
  }
  return `https://www.google.com/maps/search/${encodeURIComponent(name + ' Việt Nam')}`;
}

export function getGoogleMapsDirectionsUrl(destName: string, coords?: { lat: number; lng: number }): string {
  // Dùng maps/dir — tự lấy vị trí hiện tại làm điểm đi
  if (coords) {
    return `https://www.google.com/maps/dir//${coords.lat},${coords.lng}`;
  }
  return `https://www.google.com/maps/dir//${encodeURIComponent(destName + ' Việt Nam')}`;
}
