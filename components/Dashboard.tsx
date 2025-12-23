
import React from 'react';
import { AppState, FirewallStatus } from '../types';

interface DashboardProps {
  state: AppState;
  onToggleStatus: () => void;
  onUpdateAutoReply: (enabled: boolean, msg: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ state, onToggleStatus, onUpdateAutoReply }) => {
  const blockedCount = state.logs.filter(l => l.type !== 'AUTO_REPLY').length;
  const activeRules = state.rules.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* 状态看板 */}
      <div className="m3-card p-6 shadow-sm border border-white/5">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-medium text-[#e2e2e6]">系统保护状态</h2>
            <p className="text-sm text-[#c4c6cf] mt-1">
              {state.status === FirewallStatus.ACTIVE ? '所有引擎正常运行' : '实时防护已暂停'}
            </p>
          </div>
          <button 
            onClick={onToggleStatus}
            className={`w-14 h-8 rounded-full transition-colors relative ${state.status === FirewallStatus.ACTIVE ? 'bg-[#aac7ff]' : 'bg-[#44474e]'}`}
          >
            <div className={`absolute top-1 w-6 h-6 rounded-full transition-all shadow-md ${state.status === FirewallStatus.ACTIVE ? 'left-7 bg-[#00315c]' : 'left-1 bg-[#c4c6cf]'}`}></div>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#44474e]/30 rounded-[20px] p-4">
            <p className="text-[11px] font-bold text-[#c4c6cf] uppercase">已拦截</p>
            <p className="text-2xl font-bold text-[#aac7ff] mt-1">{blockedCount}</p>
          </div>
          <div className="bg-[#44474e]/30 rounded-[20px] p-4">
            <p className="text-[11px] font-bold text-[#c4c6cf] uppercase">活跃规则</p>
            <p className="text-2xl font-bold text-[#d0bcff] mt-1">{activeRules}</p>
          </div>
        </div>
      </div>

      {/* 自动回复配置 */}
      <div className="m3-card p-6 shadow-sm border border-white/5 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-[#e2e2e6] flex items-center gap-3">
            <span className="text-lg">💬</span> 自动回复
          </h3>
          <button 
            onClick={() => onUpdateAutoReply(!state.autoReplyEnabled, state.autoReplyMessage)}
            className={`w-10 h-5 rounded-full transition-colors relative ${state.autoReplyEnabled ? 'bg-[#aac7ff]' : 'bg-[#44474e]'}`}
          >
            <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${state.autoReplyEnabled ? 'left-5.5 bg-[#00315c]' : 'left-0.5 bg-[#c4c6cf]'}`}></div>
          </button>
        </div>
        
        {state.autoReplyEnabled && (
          <div className="space-y-3 pt-2">
            <textarea 
              className="w-full bg-[#1a1c1e] border border-[#44474e] rounded-[16px] p-4 text-sm text-[#e2e2e6] focus:outline-none focus:ring-2 focus:ring-[#aac7ff]/30"
              rows={2}
              value={state.autoReplyMessage}
              onChange={(e) => onUpdateAutoReply(true, e.target.value)}
              placeholder="输入自动回复内容..."
            />
          </div>
        )}
      </div>

      {/* 最近记录 */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-medium text-[#c4c6cf]">最近拦截</h3>
          <button className="text-xs text-[#aac7ff] font-medium">查看全部</button>
        </div>
        {state.logs.filter(l => l.type !== 'AUTO_REPLY').length === 0 ? (
          <div className="m3-card p-10 text-center text-[#c4c6cf] text-sm opacity-60">
            暂无记录
          </div>
        ) : (
          <div className="space-y-2">
            {state.logs.filter(l => l.type !== 'AUTO_REPLY').slice(0, 3).map((log) => (
              <div key={log.id} className="m3-card p-4 flex items-center gap-4 hover:bg-[#393b40] transition-colors">
                <div className="w-12 h-12 rounded-[16px] bg-[#44474e] flex items-center justify-center text-xl">
                  {log.type === 'CALL' ? '📞' : '💬'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#e2e2e6] truncate">{log.number}</p>
                  <p className="text-xs text-[#c4c6cf] truncate">{log.reason}</p>
                </div>
                <span className="text-[11px] text-[#c4c6cf]">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
