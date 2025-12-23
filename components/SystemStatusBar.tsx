
import React, { useState, useEffect } from 'react';

const SystemStatusBar: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 flex justify-between items-center px-5 text-[12px] font-medium text-white/90 sticky top-0 z-[100] bg-transparent">
      <div className="flex items-center">
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>📶</span>
        <span>Wi-Fi</span>
        <div className="flex items-center gap-0.5">
          <span className="text-[10px]">100%</span>
          <div className="w-5 h-2.5 border border-white/50 rounded-[2px] relative flex items-center p-[1px]">
            <div className="h-full bg-white w-full rounded-[1px]"></div>
            <div className="absolute -right-[3px] w-[2px] h-1 bg-white/50 rounded-r-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusBar;
