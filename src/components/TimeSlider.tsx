import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

interface TimeSliderProps {
  value: number;
  onChange: (val: number) => void;
}

export const TimeSlider: React.FC<TimeSliderProps> = ({ value, onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Map value (0.1 - 10) to percentage (0 - 100)
  const percentage = ((value - 0.1) / (10 - 0.1)) * 100;

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const newPercentage = x / rect.width;
    const newValue = 0.1 + newPercentage * (10 - 0.1);
    onChange(parseFloat(newValue.toFixed(1)));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };
    const onEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging]);

  const ticks = Array.from({ length: 51 }).map((_, i) => i);

  return (
    <div className="flex flex-col items-center gap-4 pointer-events-auto select-none">
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Slow</span>
        
        <div 
          ref={containerRef}
          className="relative w-80 h-16 flex items-center cursor-ew-resize group"
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          {/* Track Background */}
          <div className="absolute inset-x-0 h-px bg-white/10" />
          
          {/* Ticks */}
          <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
            {ticks.map((tick) => {
              const isMajor = tick % 5 === 0;
              const isActive = (tick / 50) * 100 <= percentage;
              return (
                <div
                  key={tick}
                  className="transition-all duration-300"
                  style={{
                    width: '1px',
                    height: isMajor ? '12px' : '6px',
                    backgroundColor: isActive ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                    boxShadow: isActive && isMajor ? '0 0 8px #3b82f6' : 'none',
                    opacity: isMajor ? 1 : 0.5
                  }}
                />
              );
            })}
          </div>

          {/* Active Progress Line */}
          <div 
            className="absolute left-0 h-px bg-blue-500 shadow-[0_0_10px_#3b82f6]"
            style={{ width: `${percentage}%` }}
          />

          {/* Handle */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
            style={{ left: `${percentage}%` }}
            animate={{ scale: isDragging ? 1.2 : 1 }}
          >
            <div className="w-1 h-8 bg-blue-500 shadow-[0_0_15px_#3b82f6] rounded-full" />
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
              {value}x
            </div>
          </motion.div>
        </div>

        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Fast</span>
      </div>

      <div className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold">
        Temporal Scale Adjustment
      </div>
    </div>
  );
};
