
import React from 'react';

interface SystemDesktopProps {
  onOpenApp: () => void;
}

const SystemDesktop: React.FC<SystemDesktopProps> = ({ onOpenApp }) => {
  const date = new Date();
  const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-12 px-6 relative overflow-hidden bg-gradient-to-br from-[#121417] via-[#2d3238] to-[#121417]">
      {/* 动态壁纸装饰 */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[100px] rounded-full"></div>

      {/* 桌面时钟挂件 */}
      <div className="text-center mt-10 z-10">
        <h1 className="text-7xl font-light text-white tracking-tighter">
          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </h1>
        <p className="text-lg text-white/80 mt-2">
          {monthNames[date.getMonth()]}{date.getDate()}日 {dayNames[date.getDay()]}
        </p>
      </div>

      {/* 应用图标网格 */}
      <div className="grid grid-cols-4 gap-y-8 w-full px-2 z-10 mb-20">
        <button 
          onClick={onOpenApp}
          className="flex flex-col items-center gap-2 group active:scale-90 transition-transform"
        >
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-[22px] flex items-center justify-center shadow-lg shadow-blue-900/40 relative overflow-hidden">
             <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <span className="text-3xl">🛡️</span>
          </div>
          <span className="text-[11px] text-white font-medium text-shadow">Guardia卫士</span>
        </button>

        {/* 占位图标 */}
        {['相册', '设置', '浏览器', '电话', '信息', '相机', '应用商店'].map((name, i) => (
          <div key={i} className="flex flex-col items-center gap-2 opacity-60">
            <div className="w-16 h-16 bg-white/10 rounded-[22px] backdrop-blur-md flex items-center justify-center">
              <span className="text-2xl">{['🖼️', '⚙️', '🌐', '📞', '💬', '📷', '🛍️'][i]}</span>
            </div>
            <span className="text-[11px] text-white font-medium">{name}</span>
          </div>
        ))}
      </div>
      
      {/* 底部固定栏 */}
      <div className="w-full bg-white/10 backdrop-blur-xl rounded-[32px] p-4 flex justify-around items-center mb-4 border border-white/10">
        {['📞', '💬', '🌐', '📷'].map((emoji, i) => (
          <div key={i} className="w-12 h-12 flex items-center justify-center text-2xl active:scale-90 transition-transform">
            {emoji}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemDesktop;
