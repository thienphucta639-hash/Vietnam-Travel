# 🇻🇳 Vietnam Travel Planner — Hướng dẫn tải về & đẩy lên GitHub

## 📋 Bước 1: Chuẩn bị trên máy tính

### Cài đặt cần thiết:
1. **Node.js** (v18+): https://nodejs.org/
2. **Git**: https://git-scm.com/
3. **VS Code** (khuyến nghị): https://code.visualstudio.com/

---

## 📁 Bước 2: Tạo thư mục project

Mở Terminal/CMD và chạy:

```bash
mkdir vietnam-travel-planner
cd vietnam-travel-planner
```

---

## 📦 Bước 3: Tạo các file

### 3.1. Tạo file `package.json`:
```json
{
  "name": "vietnam-travel-planner",
  "private": true,
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "html2canvas": "^1.4.1",
    "lucide-react": "^0.300.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

### 3.2. Tạo file `index.html`:
```html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vietnam Travel Planner — Lên kế hoạch du lịch Việt Nam</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 3.3. Tạo file `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './'
})
```

### 3.4. Tạo file `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["src"]
}
```

### 3.5. Tạo cấu trúc thư mục:
```
vietnam-travel-planner/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── components/
    │   ├── Header.tsx
    │   ├── BottomNav.tsx
    │   ├── HeroSection.tsx
    │   ├── HomeView.tsx
    │   ├── ExploreView.tsx
    │   ├── ProvinceCard.tsx
    │   ├── ProvinceDetail.tsx
    │   ├── FavoritesView.tsx
    │   ├── PlannerView.tsx
    │   ├── SearchView.tsx
    │   └── ExportModal.tsx
    ├── data/
    │   └── provinces.ts
    ├── store/
    │   └── useStore.ts
    └── utils/
        └── cn.ts
```

---

## 🚀 Bước 4: Cài đặt & chạy thử

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Mở trình duyệt: http://localhost:5173

---

## 🐙 Bước 5: Tạo GitHub Repository

### 5.1. Tạo repo mới trên GitHub:
1. Vào https://github.com/new
2. Đặt tên repo: `vietnam-travel-planner`
3. Chọn **Public** (hoặc Private nếu muốn)
4. **KHÔNG** tick "Add a README file"
5. Nhấn **Create repository**

### 5.2. Đẩy code lên GitHub:

```bash
# Khởi tạo git
git init

# Thêm tất cả file
git add .

# Commit đầu tiên
git commit -m "Initial commit - Vietnam Travel Planner v2.0"

# Thêm remote (thay YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/vietnam-travel-planner.git

# Đẩy lên GitHub
git branch -M main
git push -u origin main
```

---

## 🌐 Bước 6: Deploy lên GitHub Pages (MIỄN PHÍ)

### 6.1. Cài thêm package deploy:
```bash
npm install -D gh-pages
```

### 6.2. Thêm scripts vào `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 6.3. Deploy:
```bash
npm run deploy
```

### 6.4. Bật GitHub Pages:
1. Vào repo trên GitHub → **Settings** → **Pages**
2. Source: chọn **gh-pages** branch
3. Nhấn **Save**
4. Đợi 1-2 phút, web sẽ live tại:
   `https://YOUR_USERNAME.github.io/vietnam-travel-planner/`

---

## 🎯 Deploy lên Vercel (Cách khác - cũng miễn phí)

1. Vào https://vercel.com/
2. Đăng nhập bằng GitHub
3. Nhấn **Add New** → **Project**
4. Import repo `vietnam-travel-planner`
5. Nhấn **Deploy**
6. Xong! Web live ngay lập tức

---

## 📝 Lưu ý quan trọng

- File `vite.config.ts` cần có `base: './'` để deploy đúng
- Nếu deploy GitHub Pages, đổi `base` thành: `base: '/vietnam-travel-planner/'`
- Mỗi lần sửa code, chạy `npm run deploy` để cập nhật

---

## ❓ Gặp lỗi?

### Lỗi "Permission denied":
```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

### Lỗi khi push:
- Kiểm tra đã đăng nhập GitHub chưa
- Dùng Personal Access Token thay password: https://github.com/settings/tokens

---

**Chúc bạn thành công! 🎉**
