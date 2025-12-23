
import React, { useState } from 'react';
import { Rule, RuleType } from '../types';

interface RulesManagerProps {
  rules: Rule[];
  onAddRule: (type: RuleType, value: string, label?: string) => void;
  onRemoveRule: (id: string) => void;
}

const RulesManager: React.FC<RulesManagerProps> = ({ rules, onAddRule, onRemoveRule }) => {
  const [activeTab, setActiveTab] = useState<RuleType>(RuleType.WHITELIST);
  const [isAdding, setIsAdding] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [newLabel, setNewLabel] = useState('');

  const filteredRules = rules.filter(r => r.type === activeTab);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newValue.trim()) return;
    onAddRule(activeTab, newValue, newLabel || undefined);
    setNewValue('');
    setNewLabel('');
    setIsAdding(false);
  };

  const tabs = [
    { type: RuleType.WHITELIST, label: '白名单', icon: '✅' },
    { type: RuleType.BLACKLIST, label: '黑名单', icon: '🚫' },
    { type: RuleType.CONTENT, label: '内容', icon: '📝' },
  ];

  return (
    <div className="pb-24 animate-in slide-in-from-right-4 duration-300">
      <h1 className="text-2xl font-bold mb-6 px-1">防火墙规则</h1>
      
      {/* M3 选项卡 */}
      <div className="flex border-b border-[#44474e] mb-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.type;
          return (
            <button
              key={tab.type}
              onClick={() => setActiveTab(tab.type)}
              className={`flex-1 py-4 text-sm font-medium transition-all relative ${isActive ? 'text-[#aac7ff]' : 'text-[#c4c6cf]'}`}
            >
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-[#aac7ff] rounded-t-full"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* 规则列表 */}
      <div className="space-y-3">
        {filteredRules.length === 0 ? (
          <div className="py-20 text-center text-[#c4c6cf] opacity-50">
            暂无相关规则
          </div>
        ) : (
          filteredRules.map((rule) => (
            <div key={rule.id} className="m3-card p-5 flex justify-between items-center group">
              <div>
                <p className="font-medium text-[#e2e2e6]">{rule.value}</p>
                {rule.label && <p className="text-xs text-[#c4c6cf] mt-1">{rule.label}</p>}
              </div>
              <button 
                onClick={() => onRemoveRule(rule.id)}
                className="w-10 h-10 rounded-full hover:bg-red-500/10 flex items-center justify-center text-[#c4c6cf] hover:text-red-400 transition-colors"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {/* FAB (悬浮操作按钮) */}
      {!isAdding && (
        <button 
          onClick={() => setIsAdding(true)}
          className="fixed bottom-[100px] right-6 w-14 h-14 bg-[#d1e4ff] text-[#00315c] rounded-[16px] shadow-xl flex items-center justify-center text-3xl hover:scale-105 active:scale-95 transition-all z-40"
        >
          ＋
        </button>
      )}

      {/* 添加规则浮层 */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end justify-center">
          <div className="w-full max-w-md bg-[#2e3033] rounded-t-[28px] p-8 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">添加新{tabs.find(t => t.type === activeTab)?.label}</h3>
              <button onClick={() => setIsAdding(false)} className="text-2xl opacity-60">×</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                autoFocus
                type="text"
                placeholder={activeTab === RuleType.CONTENT ? "输入关键字..." : "输入电话号码..."}
                className="w-full bg-[#1a1c1e] border border-[#44474e] rounded-[16px] p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#aac7ff]"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
              {activeTab !== RuleType.CONTENT && (
                <input
                  type="text"
                  placeholder="备注名称 (可选)"
                  className="w-full bg-[#1a1c1e] border border-[#44474e] rounded-[16px] p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#aac7ff]"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                />
              )}
              <button 
                type="submit"
                className="w-full bg-[#aac7ff] text-[#00315c] font-bold py-4 rounded-[16px] mt-2 shadow-lg"
              >
                保存规则
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RulesManager;
