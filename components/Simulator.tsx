
import React, { useState } from 'react';

interface SimulatorProps {
  onSimulate: (type: 'SMS' | 'CALL', number: string, content?: string) => void;
}

const Simulator: React.FC<SimulatorProps> = ({ onSimulate }) => {
  const [number, setNumber] = useState('');
  const [content, setContent] = useState('');
  const [lastResult, setLastResult] = useState<string | null>(null);

  const handleSimulate = (type: 'SMS' | 'CALL') => {
    if (!number.trim()) return;
    onSimulate(type, number, type === 'SMS' ? content : undefined);
    setLastResult(`已模拟来自 ${number} 的 ${type === 'SMS' ? '短信' : '通话'}`);
    setTimeout(() => setLastResult(null), 3000);
  };

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold">防火墙模拟器</h1>
      <p className="text-[#c4c6cf] text-sm">
        测试 Guardia 如何处理传入信号。输入号码（可选输入短信内容）以查看防火墙的工作流程。
      </p>

      <div className="m3-card p-5 border border-white/5 space-y-4 shadow-xl">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-[#c4c6cf] uppercase ml-1">传入号码</label>
          <input
            type="text"
            placeholder="例如: 13800138000"
            className="w-full bg-[#1a1c1e] border border-[#44474e] rounded-xl px-4 py-3 text-lg font-mono text-[#e2e2e6] focus:outline-none focus:border-[#aac7ff] transition-all"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-[#c4c6cf] uppercase ml-1">短信内容 (可选)</label>
          <textarea
            placeholder="在此输入内容以测试关键字过滤..."
            className="w-full bg-[#1a1c1e] border border-[#44474e] rounded-xl px-4 py-3 text-sm text-[#e2e2e6] min-h-[100px] focus:outline-none focus:border-[#aac7ff] transition-all resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => handleSimulate('CALL')}
            className="bg-[#3d4758] hover:bg-[#4a5465] text-[#aac7ff] font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            📞 模拟来电
          </button>
          <button
            onClick={() => handleSimulate('SMS')}
            className="bg-[#aac7ff] hover:bg-[#b8d3ff] text-[#00315c] font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            💬 模拟短信
          </button>
        </div>

        {lastResult && (
          <div className="text-center text-xs font-bold text-green-400 animate-pulse">
            {lastResult}
          </div>
        )}
      </div>

      {/* APK 构建指南卡片 */}
      <div className="m3-card p-5 border border-[#aac7ff]/20 bg-[#aac7ff]/5">
        <h4 className="text-sm font-bold text-[#aac7ff] mb-3 flex items-center gap-2">
          📦 找不到 Build APK 选项？
        </h4>
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-[#aac7ff] text-[#00315c] flex items-center justify-center text-[10px] font-bold shrink-0">1</div>
            <p className="text-[12px] text-[#e2e2e6]">检查仓库根目录是否有 <b>.github/workflows/build-apk.yml</b> 文件。</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-[#aac7ff] text-[#00315c] flex items-center justify-center text-[10px] font-bold shrink-0">2</div>
            <p className="text-[12px] text-[#e2e2e6]">点击顶部 <b>Actions</b>，在左侧列表中点击 <b>"Build Android APK"</b>。</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-[#aac7ff] text-[#00315c] flex items-center justify-center text-[10px] font-bold shrink-0">3</div>
            <p className="text-[12px] text-[#e2e2e6]">点击右侧白色按钮 <b>Run workflow</b> 即可开始构建。</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-[#aac7ff] text-[#00315c] flex items-center justify-center text-[10px] font-bold shrink-0">4</div>
            <p className="text-[12px] text-[#e2e2e6]">完成后在页面最下方的 <b>Artifacts</b> 下载 APK。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
