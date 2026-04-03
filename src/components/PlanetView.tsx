import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';
import { PlanetData, SatelliteData, MarkerData } from '../types';
import { X, Info } from 'lucide-react';

interface PlanetViewProps {
  planet: PlanetData;
  timeMultiplier: number;
  isFocused: boolean;
  onFocusChange: (focused: boolean) => void;
}

const LONG_PRESS_DURATION = 500;

const Satellite: React.FC<{ 
  satellite: SatelliteData; 
  timeMultiplier: number;
  onLongPress: (sat: SatelliteData) => void;
}> = ({ satellite, timeMultiplier, onLongPress }) => {
  const rotation = useMotionValue(Math.random() * 360);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useAnimationFrame((t, delta) => {
    const speed = (satellite.orbitSpeed * timeMultiplier * delta) / 100;
    rotation.set(rotation.get() + speed);
  });

  const rotate = useTransform(rotation, (v) => `${v}deg`);

  const startPress = () => {
    timerRef.current = setTimeout(() => onLongPress(satellite), LONG_PRESS_DURATION);
  };

  const endPress = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        width: satellite.orbitRadius * 2,
        height: satellite.orbitRadius * 2,
        marginLeft: -satellite.orbitRadius,
        marginTop: -satellite.orbitRadius,
      }}
    >
      <div className="absolute inset-0 border border-white/5 rounded-full pointer-events-none" />
      
      <motion.div className="absolute inset-0" style={{ rotate }}>
        <button
          onMouseDown={startPress}
          onMouseUp={endPress}
          onMouseLeave={endPress}
          onTouchStart={startPress}
          onTouchEnd={endPress}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 group outline-none cursor-pointer"
        >
          <div
            className="rounded-full shadow-lg transition-all group-hover:scale-150 active:scale-90"
            style={{
              width: satellite.size,
              height: satellite.size,
              backgroundColor: satellite.color,
              boxShadow: `0 0 15px ${satellite.color}`,
            }}
          >
            {satellite.type === 'artificial' && (
              <div className="absolute inset-0 animate-ping bg-white/40 rounded-full" />
            )}
          </div>
          <div className="absolute left-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span className="bg-black/60 backdrop-blur-md text-[10px] px-2 py-1 rounded border border-white/10 whitespace-nowrap">
              {satellite.name}
            </span>
          </div>
        </button>
      </motion.div>
    </div>
  );
};

export const PlanetView: React.FC<PlanetViewProps> = ({ planet, timeMultiplier, isFocused, onFocusChange }) => {
  const [selectedItem, setSelectedItem] = useState<{ type: 'planet' | 'satellite', data: any } | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePlanetStartPress = () => {
    timerRef.current = setTimeout(() => setSelectedItem({ type: 'planet', data: planet }), LONG_PRESS_DURATION);
  };

  const handlePlanetEndPress = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (selectedItem) {
        setSelectedItem(null);
      } else {
        onFocusChange(false);
      }
    }
  };

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center cursor-default"
      onClick={handleBackgroundClick}
    >
      {/* Camera Container */}
      <motion.div 
        animate={{
          scale: isFocused ? 1 : 0.6,
          opacity: isFocused ? 1 : 0.5,
          filter: isFocused ? 'blur(0px)' : 'blur(4px)',
        }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-[800px] h-[800px] flex items-center justify-center pointer-events-auto">
          {/* Satellites */}
          {planet.satellites.map((sat) => (
            <Satellite 
              key={`${planet.id}-${sat.id}`} 
              satellite={sat} 
              timeMultiplier={timeMultiplier}
              onLongPress={(s) => setSelectedItem({ type: 'satellite', data: s })}
            />
          ))}

          {/* Planet Body */}
          <motion.div
            key={planet.id}
            onMouseDown={handlePlanetStartPress}
            onMouseUp={handlePlanetEndPress}
            onMouseLeave={handlePlanetEndPress}
            onTouchStart={handlePlanetStartPress}
            onTouchEnd={handlePlanetEndPress}
            className="relative rounded-full shadow-2xl z-10 cursor-pointer select-none"
            style={{
              width: 240 * planet.size,
              height: 240 * planet.size,
              background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.secondaryColor || '#000'})`,
              boxShadow: `inset -20px -20px 60px rgba(0,0,0,0.6), 0 0 80px ${planet.color}30`,
            }}
          >
            <div className="absolute inset-0 rounded-full ring-1 ring-white/10 blur-[1px]" />
            <div className="absolute inset-0 rounded-full opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          </motion.div>

          {/* Saturn's Rings */}
          {planet.id === 'saturn' && (
            <div
              className="absolute z-0 pointer-events-none"
              style={{
                width: 480,
                height: 480,
                border: '50px double rgba(251, 191, 36, 0.2)',
                borderRadius: '50%',
                transform: 'rotateX(75deg)',
              }}
            />
          )}
        </div>
      </motion.div>

      {/* Info Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute z-50 bg-black/60 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 max-w-sm shadow-2xl pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="w-12 h-12 rounded-full shadow-lg"
                style={{ 
                  background: selectedItem.type === 'planet' 
                    ? `radial-gradient(circle at 30% 30%, ${selectedItem.data.color}, ${selectedItem.data.secondaryColor || '#000'})`
                    : selectedItem.data.color,
                  boxShadow: `0 0 20px ${selectedItem.data.color}40` 
                }}
              />
              <div>
                <h3 className="text-xl font-bold">{selectedItem.data.name}</h3>
                <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">
                  {selectedItem.type === 'planet' ? selectedItem.data.category : `${selectedItem.data.type} Satellite`}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              {selectedItem.data.description || selectedItem.data.details || "Detailed telemetry data is currently being synchronized."}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="block text-[8px] uppercase text-white/30 mb-1">
                  {selectedItem.type === 'planet' ? 'Orbit Speed' : 'Orbit Radius'}
                </span>
                <span className="text-xs font-mono">
                  {selectedItem.type === 'planet' ? selectedItem.data.sunOrbitSpeed : selectedItem.data.orbitRadius} km rel.
                </span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="block text-[8px] uppercase text-white/30 mb-1">Scale</span>
                <span className="text-xs font-mono">{selectedItem.data.size}x</span>
              </div>
              {selectedItem.type === 'planet' && (
                <>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="block text-[8px] uppercase text-white/30 mb-1">Mass</span>
                    <span className="text-xs font-mono truncate">{selectedItem.data.mass}</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="block text-[8px] uppercase text-white/30 mb-1">Gravity</span>
                    <span className="text-xs font-mono">{selectedItem.data.gravity}</span>
                  </div>
                  <div className="col-span-2 bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="block text-[8px] uppercase text-white/30 mb-1">Surface Temp</span>
                    <span className="text-xs font-mono">{selectedItem.data.temperature}</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      {!selectedItem && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white font-medium pointer-events-none"
        >
          Long press to explore • Click background to exit
        </motion.div>
      )}
    </div>
  );
};
