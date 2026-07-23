import { useState } from 'react';
import { Download, Check, Loader2, FolderArchive } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Import all source code as strings
import { SOURCE_FILES } from '../data/sourceFiles';

interface Props {
  onClose: () => void;
}

export default function DownloadZip({ onClose }: Props) {
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  const downloadZip = async () => {
    setDownloading(true);
    setProgress(0);

    const zip = new JSZip();
    const totalFiles = Object.keys(SOURCE_FILES).length;
    let processedFiles = 0;

    // Add each file to the zip
    for (const [path, content] of Object.entries(SOURCE_FILES)) {
      zip.file(path, content as string);
      processedFiles++;
      setProgress(Math.round((processedFiles / totalFiles) * 100));
      // Small delay to show progress
      await new Promise(resolve => setTimeout(resolve, 20));
    }

    // Generate the zip file
    const blob = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    });

    // Download
    saveAs(blob, 'vietnam-travel-planner.zip');

    setDownloading(false);
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-green-500/30">
          <FolderArchive size={36} />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Tải Project ZIP</h1>
        <p className="text-slate-500 mb-6">Toàn bộ source code, sẵn sàng upload lên GitHub</p>

        {!done ? (
          <>
            {downloading ? (
              <div className="mb-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Loader2 size={24} className="animate-spin text-green-600" />
                  <span className="text-green-700 font-semibold">Đang tạo file ZIP...</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-slate-500 mt-2">{progress}% hoàn thành</p>
              </div>
            ) : (
              <button
                onClick={downloadZip}
                className="w-full flex items-center justify-center gap-3 py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-green-600/30 hover:shadow-xl mb-6"
              >
                <Download size={24} />
                Tải ZIP ngay
              </button>
            )}

            <div className="bg-slate-50 rounded-2xl p-4 text-left mb-4">
              <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                File ZIP bao gồm:
              </h3>
              <ul className="text-sm text-slate-600 space-y-1 ml-8">
                <li>• package.json, vite.config.ts, tsconfig.json</li>
                <li>• index.html, README.md, .gitignore</li>
                <li>• src/App.tsx, src/main.tsx, src/index.css</li>
                <li>• src/components/ (tất cả 12 components)</li>
                <li>• src/data/provinces.ts (34 tỉnh thành)</li>
                <li>• src/store/useStore.ts</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={40} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-green-700 mb-2">Tải xuống thành công!</h2>
            <p className="text-slate-500 mb-6">File vietnam-travel-planner.zip đã được tải về máy</p>
            
            <div className="bg-blue-50 rounded-2xl p-4 text-left mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">Bước tiếp theo:</h3>
              <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
                <li><strong>Giải nén</strong> file ZIP</li>
                <li>Mở terminal trong thư mục đã giải nén</li>
                <li>Chạy <code className="bg-blue-100 px-1.5 py-0.5 rounded font-mono text-xs">npm install</code></li>
                <li>Chạy <code className="bg-blue-100 px-1.5 py-0.5 rounded font-mono text-xs">npm run dev</code></li>
                <li>Mở <code className="bg-blue-100 px-1.5 py-0.5 rounded font-mono text-xs">http://localhost:5173</code></li>
              </ol>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 text-left mb-4">
              <h3 className="font-semibold text-slate-800 mb-2">Deploy lên GitHub Pages:</h3>
              <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                <li>Tạo repo mới trên GitHub</li>
                <li><code className="bg-slate-200 px-1 rounded text-xs">git init</code></li>
                <li><code className="bg-slate-200 px-1 rounded text-xs">git add .</code></li>
                <li><code className="bg-slate-200 px-1 rounded text-xs">git commit -m "Initial"</code></li>
                <li><code className="bg-slate-200 px-1 rounded text-xs">git remote add origin [URL]</code></li>
                <li><code className="bg-slate-200 px-1 rounded text-xs">git push -u origin main</code></li>
                <li><code className="bg-slate-200 px-1 rounded text-xs">npm run deploy</code></li>
              </ol>
            </div>

            <a
              href="https://github.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors mb-3"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Tạo GitHub Repository
            </a>
          </>
        )}

        <button
          onClick={onClose}
          className="w-full py-3 text-slate-500 hover:text-slate-700 font-medium transition-colors"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
