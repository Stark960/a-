
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

      {/* 规则逻辑说明 */}
      <div className="bg-[#44474e]/20 p-4 rounded-xl border border-white/5">
        <h4 className="text-xs font-bold text-[#c4c6cf] mb-2 uppercase">规则逻辑说明:</h4>
        <ul className="text-[11px] text-[#c4c6cf] space-y-2 list-disc pl-4">
          <li><strong>白名单:</strong> 始终允许通行，跳过所有其他过滤器。</li>
          <li><strong>黑名单:</strong> 立即拦截所有相关信号。</li>
          <li><strong>内容过滤:</strong> 如果不在上述名单中，短信内容将被扫描关键字。</li>
        </ul>
      </div>

      {/* APK 构建指南卡片 */}
      <div className="m3-card p-5 border border-[#aac7ff]/20 bg-[#aac7ff]/5">
        <h4 className="text-sm font-bold text-[#aac7ff] mb-3 flex items-center gap-2">
          📦 如何生成 APK (无需下载 SDK)
        </h4>
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-[#aac7ff] text-[#00315c] flex items-center justify-center text-[10px] font-bold shrink-0">1</div>
            <p className="text-[12px] text-[#e2e2e6]">将此代码上传到您的 <b>GitHub</b> 仓库。</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-[#aac7ff] text-[#00315c] flex items-center justify-center text-[10px] font-bold shrink-0">2</div>
            <p className="text-[12px] text-[#e2e2e6]">点击仓库顶部的 <b>Actions</b> 选项卡。</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-[#aac7ff] text-[#00315c] flex items-center justify-center text-[10px] font-bold shrink-0">3</div>
            <p className="text-[12px] text-[#e2e2e6]">选择 <b>Build Android APK</b> 工作流并运行。</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-[#aac7ff] text-[#00315c] flex items-center justify-center text-[10px] font-bold shrink-0">4</div>
            <p className="text-[12px] text-[#e2e2e6]">构建完成后，在 <b>Artifacts</b> 处下载 APK 文件。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
