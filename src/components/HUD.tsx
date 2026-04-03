import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const HUD: React.FC = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCoords({
        x: Math.random() * 1000,
        y: Math.random() * 1000,
        z: Math.random() * 1000,
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Scanlines Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20 scanline-anim" />
      
      {/* Corner Brackets */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/20 rounded-tl-3xl" />
      <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-white/20 rounded-tr-3xl" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-white/20 rounded-bl-3xl" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/20 rounded-br-3xl" />

      {/* Coordinate Readouts */}
      <div className="absolute top-12 left-12 flex flex-col gap-1 font-mono text-[8px] text-white/30 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-red-500 animate-pulse rounded-full" />
          <span>Live Telemetry</span>
        </div>
        <div>Sector: 7G-Delta</div>
        <div>X: {coords.x.toFixed(4)}</div>
        <div>Y: {coords.y.toFixed(4)}</div>
        <div>Z: {coords.z.toFixed(4)}</div>
      </div>

      {/* Right Side Status */}
      <div className="absolute top-12 right-12 flex flex-col items-end gap-1 font-mono text-[8px] text-white/30 uppercase tracking-widest">
        <div>Uplink: Stable</div>
        <div className="flex items-center gap-2">
          <span>Signal Strength</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`w-0.5 h-2 ${i <= 4 ? 'bg-blue-500' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>
        <div>Buffer: 100%</div>
      </div>

      {/* Bottom Center Label */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-t from-white/20 to-transparent" />
        <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.8em]">Orbital Explorer v2.4.0</div>
      </div>
    </div>
  );
};
