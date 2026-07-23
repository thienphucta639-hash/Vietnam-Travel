// Source files for ZIP download
// Each key is the file path, value is the content

export const SOURCE_FILES: Record<string, string> = {
  'package.json': `{
  "name": "vietnam-travel-planner",
  "private": true,
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
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
    "gh-pages": "^6.1.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}`,

  'index.html': `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vietnam Travel Planner — Lên kế hoạch du lịch Việt Nam</title>
    <meta name="description" content="Ứng dụng lên kế hoạch du lịch Việt Nam với 34 tỉnh thành. Tính chi phí, chia tiền, lịch trình chi tiết." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,

  'vite.config.ts': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/vietnam-travel-planner/'
})`,

  'tsconfig.json': `{
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
}`,

  '.gitignore': `node_modules
dist
.DS_Store
*.local`,

  'README.md': `# 🇻🇳 Vietnam Travel Planner v2.0

Ứng dụng lên kế hoạch du lịch Việt Nam với 34 tỉnh thành.

## ✨ Tính năng

- 🗺️ **34 tỉnh thành** với thông tin chi tiết, hình ảnh thật
- 📍 **Google Maps** tích hợp - xem bản đồ và chỉ đường
- 💰 **Tính chi phí** - thêm khoản chi, chia tiền nhóm tự động
- 📋 **Lịch trình gợi ý** - 6 tour mẫu với chi tiết từng ngày
- ❤️ **Yêu thích** - lưu địa điểm quan tâm
- 📱 **Responsive** - chạy tốt trên điện thoại và máy tính
- 💾 **Lưu trữ** - dữ liệu lưu trên trình duyệt (localStorage)
- 📤 **Xuất file** - JSON, TXT, PNG

## 🚀 Cài đặt

\`\`\`bash
npm install
npm run dev
\`\`\`

Mở http://localhost:5173

## 🏗️ Build

\`\`\`bash
npm run build
\`\`\`

## 🌐 Deploy lên GitHub Pages

1. Đổi \`base\` trong vite.config.ts thành tên repo của bạn
2. Chạy:

\`\`\`bash
npm run deploy
\`\`\`

Web sẽ live tại: \`https://YOUR_USERNAME.github.io/vietnam-travel-planner/\`

## 📁 Cấu trúc

\`\`\`
src/
├── components/     # React components (12 files)
├── data/          # Dữ liệu 34 tỉnh thành
├── store/         # State management
└── utils/         # Helper functions
\`\`\`

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS v4
- Lucide Icons
- html2canvas

---

Made with ❤️ for Vietnamese travelers
`,

  'src/main.tsx': `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);`,

  'src/utils/cn.ts': `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,

  'src/index.css': `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Space Grotesk', system-ui, sans-serif;
}

:root { --header-height: 64px; }
* { -webkit-tap-highlight-color: transparent; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
body { font-family: 'Inter', system-ui, sans-serif; background: #f8fafc; color: #1e293b; overflow-x: hidden; }

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 999px; }

@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
.skeleton { background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%); background-size: 200% 100%; animation: shimmer 1.5s ease-in-out infinite; border-radius: 8px; }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }

@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.scale-in { animation: scaleIn 0.3s ease-out forwards; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.modal-overlay { animation: fadeIn 0.2s ease-out; }

@keyframes modalSlideUp { from { opacity: 0; transform: translateY(40px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
.modal-content { animation: modalSlideUp 0.3s ease-out; }

input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
input[type="number"] { -moz-appearance: textfield; }

.card-hover { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px -12px rgba(0,0,0,0.15); }

.chip { display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 999px; font-size: 13px; font-weight: 500; white-space: nowrap; transition: all 0.15s ease; }
.glass { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); background: rgba(255,255,255,0.85); }

.safe-area-bottom { padding-bottom: env(safe-area-inset-bottom, 0px); }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
.line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }`,

  'HUONG_DAN.md': `# Hướng dẫn sử dụng

## Cài đặt
\`\`\`bash
npm install
npm run dev
\`\`\`

## Deploy lên GitHub Pages
1. Tạo repo mới trên GitHub
2. git init && git add . && git commit -m "Initial"
3. git remote add origin https://github.com/USERNAME/REPO.git
4. git push -u origin main
5. npm run deploy

## Lưu ý
- Đổi \`base\` trong vite.config.ts thành tên repo của bạn
- VD: base: '/my-travel-app/'
`,
};

// Note: The actual component files are too large to embed
// They will be fetched from the built bundle or need to be added manually
