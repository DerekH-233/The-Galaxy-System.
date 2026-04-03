import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlanetData } from '../types';
import { PLANETS } from '../data/planets';
import { TimeSlider } from './TimeSlider';
import { Globe, Layers, Search, LayoutGrid } from 'lucide-react';

interface ControlsProps {
  currentPlanet: PlanetData | null;
  onSelectPlanet: (planet: PlanetData | null) => void;
  timeMultiplier: number;
  onTimeChange: (val: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  currentPlanet,
  onSelectPlanet,
  timeMultiplier,
  onTimeChange,
}) => {
  const [isPlanetMenuOpen, setIsPlanetMenuOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Auto-minimize when a planet is selected
  React.useEffect(() => {
    if (currentPlanet) {
      setIsMinimized(true);
    } else {
      setIsMinimized(false);
    }
  }, [currentPlanet]);

  const categories = Array.from(new Set(PLANETS.map(p => p.category)));

  return (
    <div className="fixed inset-0 pointer-events-none flex flex-col justify-between p-10 z-50">
      
      {/* Top Bar - Time Slider */}
      <div className="flex justify-center">
        <TimeSlider value={timeMultiplier} onChange={onTimeChange} />
      </div>

      {/* Bottom Bar - Planet Selection */}
      <div className="flex flex-col items-center gap-6 pointer-events-auto">
        <motion.div 
          className="relative w-full max-w-4xl"
          animate={{
            y: isMinimized && !isPlanetMenuOpen ? 100 : 0,
            opacity: isMinimized && !isPlanetMenuOpen ? 0.3 : 1,
            scale: isMinimized && !isPlanetMenuOpen ? 0.9 : 1,
          }}
          onMouseEnter={() => isMinimized && setIsMinimized(false)}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
        >
          <div className="bg-black/60 backdrop-blur-3xl p-5 rounded-[3rem] border border-white/10 flex items-center justify-between gap-6 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-5 overflow-x-auto no-scrollbar px-3 py-1">
              {/* Solar System Return Button */}
              <button
                onClick={() => onSelectPlanet(null)}
                className={`relative flex-shrink-0 group flex flex-col items-center gap-3 p-3 rounded-3xl transition-all ${
                  currentPlanet === null ? 'bg-blue-500/20 scale-110' : 'hover:bg-white/5'
                }`}
              >
                <div className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform group-hover:scale-110 border border-white/10 ${
                  currentPlanet === null ? 'bg-blue-500/40 border-blue-500/50' : 'bg-white/5'
                }`}>
                  <LayoutGrid className={`w-6 h-6 ${currentPlanet === null ? 'text-white' : 'text-white/40'}`} />
                </div>
                <span className={`text-[8px] font-mono font-bold tracking-widest uppercase ${
                  currentPlanet === null ? 'text-white' : 'text-white/30'
                }`}>
                  System
                </span>
              </button>

              <div className="h-12 w-px bg-white/10 mx-1" />

              {PLANETS.map((planet) => (
                <button
                  key={planet.id}
                  onClick={() => onSelectPlanet(planet)}
                  className={`relative flex-shrink-0 group flex flex-col items-center gap-3 p-3 rounded-3xl transition-all ${
                    currentPlanet?.id === planet.id ? 'bg-white/10 scale-110' : 'hover:bg-white/5'
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full shadow-xl transition-transform group-hover:scale-110 ${
                      currentPlanet?.id === planet.id ? 'ring-2 ring-blue-500 ring-offset-4 ring-offset-black/40' : ''
                    }`}
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.secondaryColor || '#000'})`,
                    }}
                  />
                  <span className={`text-[8px] font-mono font-bold tracking-widest uppercase ${
                    currentPlanet?.id === planet.id ? 'text-white' : 'text-white/30'
                  }`}>
                    {planet.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="h-16 w-px bg-white/10 mx-2" />

            <button
              onClick={() => setIsPlanetMenuOpen(!isPlanetMenuOpen)}
              className="flex-shrink-0 p-5 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all group"
            >
              <Layers className="w-6 h-6 group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          <AnimatePresence>
            {isPlanetMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                className="absolute bottom-full left-0 right-0 mb-6 bg-black/80 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-2xl"
              >
                <div className="grid grid-cols-2 gap-10">
                  {categories.map((cat) => (
                    <div key={cat} className="space-y-5">
                      <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black px-3">
                        {cat.replace('-', ' ')}
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {PLANETS.filter(p => p.category === cat).map(p => (
                          <button
                            key={p.id}
                            onClick={() => {
                              onSelectPlanet(p);
                              setIsPlanetMenuOpen(false);
                            }}
                            className={`flex items-center gap-4 p-3 rounded-2xl transition-all ${
                              currentPlanet?.id === p.id ? 'bg-blue-500/20 text-blue-400' : 'text-white/40 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: p.color }} />
                            <span className="text-xs font-bold tracking-wide">{p.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <div className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold mb-2">
          Solar System Explorer
        </div>
      </div>

    </div>
  );
};
