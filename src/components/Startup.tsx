import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Startup: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const messages = [
    "Initializing Orbital Explorer...",
    "Establishing secure uplink...",
    "Calibrating gravitational sensors...",
    "Loading solar system map...",
    "Synchronizing satellite telemetry...",
    "Optimizing visual rendering...",
    "Ready for exploration."
  ];

  useEffect(() => {
    let currentMsg = 0;
    const interval = setInterval(() => {
      if (currentMsg < messages.length) {
        setLogs(prev => [...prev, messages[currentMsg]]);
        setProgress(prev => Math.min(prev + (100 / messages.length), 100));
        currentMsg++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-10 font-mono"
    >
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-2 border-blue-500/20 border-t-blue-500 rounded-full"
          />
          <h1 className="text-xl font-bold tracking-[0.5em] text-white uppercase">Orbital Explorer</h1>
        </div>

        <div className="space-y-2 h-40 overflow-hidden">
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] text-blue-400/60 flex items-center gap-2"
              >
                <span className="text-blue-500/40">[{new Date().toLocaleTimeString()}]</span>
                <span>{log}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-widest">
            <span>System Boot</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500"
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white/20" />
      <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-white/20" />
      <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-white/20" />
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white/20" />
    </motion.div>
  );
};
