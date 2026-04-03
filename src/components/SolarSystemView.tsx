import React from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';
import { PlanetData } from '../types';
import { PLANETS } from '../data/planets';

interface SolarSystemViewProps {
  onSelectPlanet: (planet: PlanetData) => void;
  timeMultiplier: number;
  targetPlanetId?: string | null;
}

const PlanetOrbit: React.FC<{ 
  planet: PlanetData; 
  timeMultiplier: number;
  onSelect: (p: PlanetData) => void;
  isTarget: boolean;
}> = ({ planet, timeMultiplier, onSelect, isTarget }) => {
  const rotation = useMotionValue(Math.random() * 360);

  useAnimationFrame((t, delta) => {
    const speed = (planet.sunOrbitSpeed * timeMultiplier * delta) / 500;
    rotation.set(rotation.get() + speed);
  });

  const rotate = useTransform(rotation, (v) => `${v}deg`);

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        width: planet.sunOrbitRadius * 2,
        height: planet.sunOrbitRadius * 2,
        marginLeft: -planet.sunOrbitRadius,
        marginTop: -planet.sunOrbitRadius,
      }}
    >
      <div className="absolute inset-0 border border-white/5 rounded-full pointer-events-none" />
      
      <motion.div 
        className="absolute inset-0"
        style={{ rotate }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <button
            onDoubleClick={() => onSelect(planet)}
            className="relative group outline-none"
          >
            {/* Reticle / Crosshair */}
            <AnimatePresence>
              {isTarget && (
                <motion.div
                  initial={{ scale: 2, opacity: 0, rotate: 45 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 2, opacity: 0 }}
                  className="absolute -inset-6 border border-blue-500/50 rounded-lg pointer-events-none z-20"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2 bg-blue-500" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-2 bg-blue-500" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-2 bg-blue-500" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-2 bg-blue-500" />
                  
                  {/* Scanning line */}
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-px bg-blue-400/30 blur-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className="rounded-full shadow-lg transition-transform group-hover:scale-150 group-active:scale-90"
              style={{
                width: 12 * planet.size,
                height: 12 * planet.size,
                background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.secondaryColor || '#000'})`,
                boxShadow: `0 0 10px ${planet.color}40`,
              }}
            />
            <span className="absolute left-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] uppercase tracking-widest text-white/40 whitespace-nowrap">
              {planet.name}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const SolarSystemView: React.FC<SolarSystemViewProps> = ({ onSelectPlanet, timeMultiplier, targetPlanetId }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background Orbital Rings (Static/Faint) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        {PLANETS.map((p) => (
          <div 
            key={`orbit-${p.id}`}
            className="absolute border border-white/10 rounded-full"
            style={{
              width: p.sunOrbitRadius * 2,
              height: p.sunOrbitRadius * 2,
            }}
          />
        ))}
      </div>

      <div className="relative w-[1200px] h-[1200px] flex items-center justify-center">
        {/* The Sun */}
        <div className="relative z-10">
          <motion.div 
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-20 h-20 rounded-full bg-yellow-400 shadow-[0_0_120px_rgba(250,204,21,0.8)]" 
          />
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-orange-500 blur-2xl opacity-40 animate-pulse" />
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-white blur-md opacity-30" />
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-6 text-[10px] uppercase tracking-[0.6em] text-yellow-400/80 font-black">The Sun</span>
        </div>

        {/* Planets */}
        {PLANETS.map((planet) => (
          <PlanetOrbit 
            key={planet.id} 
            planet={planet} 
            timeMultiplier={timeMultiplier}
            onSelect={onSelectPlanet}
            isTarget={targetPlanetId === planet.id}
          />
        ))}
      </div>
    </div>
  );
};
