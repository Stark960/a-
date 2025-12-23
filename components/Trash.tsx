
import React from 'react';
import { BlockLog } from '../types';

interface TrashProps {
  logs: BlockLog[];
  onClear: () => void;
}

const Trash: React.FC<TrashProps> = ({ logs, onClear }) => {
  return (
    <div className="pb-24 animate-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center mb-6 px-1">
        <h1 className="text-2xl font-bold">拦截记录</h1>
        {logs.length > 0 && (
          <button 
            onClick={onClear}
            className="text-sm text-[#aac7ff] font-medium px-4 py-2 rounded-full hover:bg-[#aac7ff]/10"
          >
            清空历史
          </button>
        )}
      </div>

      <div className="space-y-3">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-[#c4c6cf]/40">
            <span className="text-6xl mb-6 opacity-20">🛡️</span>
            <p className="text-lg font-medium">环境安全</p>
            <p className="text-sm">暂无恶意拦截记录</p>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="m3-card p-5 border border-white/5 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-[12px] ${log.type === 'CALL' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'}`}>
                    {log.type === 'CALL' ? '📞' : '💬'}
                  </div>
                  <div>
                    <p className="font-bold text-[#e2e2e6]">{log.number}</p>
                    <p className="text-[11px] text-[#c4c6cf] font-medium uppercase tracking-wide">
                      {log.type === 'CALL' ? '语音来电' : '文本短信'}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-[#c4c6cf]">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              {log.content && (
                <div className="bg-[#1a1c1e] p-3 rounded-[16px] text-sm text-[#e2e2e6]/80 leading-relaxed italic">
                  "{log.content}"
                </div>
              )}
              
              <div className="flex items-center gap-2 pt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                <span className="text-[11px] text-red-400 font-medium">拦截原因: {log.reason}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Trash;
