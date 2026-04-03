import React, { useState } from 'react';
import { SpaceBackground } from './components/SpaceBackground';
import { PlanetView } from './components/PlanetView';
import { SolarSystemView } from './components/SolarSystemView';
import { Controls } from './components/Controls';
import { HUD } from './components/HUD';
import { Startup } from './components/Startup';
import { PlanetData } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Compass } from 'lucide-react';

import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [currentPlanet, setCurrentPlanet] = useState<PlanetData | null>(null);
  const [targetPlanet, setTargetPlanet] = useState<PlanetData | null>(null);
  const [timeMultiplier, setTimeMultiplier] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelectPlanet = async (planet: PlanetData | null) => {
    if (isTransitioning) return;

    if (planet === null) {
      setIsFocused(false);
      setTargetPlanet(null);
      return;
    }

    setTargetPlanet(planet);

    if (isFocused) {
      // Sequence: Zoom Out -> Wait -> Zoom In
      setIsTransitioning(true);
      setIsFocused(false);
      
      // Wait for exit animation
      setTimeout(() => {
        setCurrentPlanet(planet);
        setIsFocused(true);
        setIsTransitioning(false);
      }, 1000);
    } else {
      setCurrentPlanet(planet);
      setIsFocused(true);
    }
  };

  const handleBackToSolarSystem = () => {
    setIsFocused(false);
  };

  return (
    <ErrorBoundary>
      <div className="relative w-full h-screen overflow-hidden bg-black font-sans selection:bg-blue-500/30 select-none">
        <AnimatePresence mode="wait">
          {isBooting ? (
            <Startup key="startup" onComplete={() => setIsBooting(false)} />
          ) : (
            <motion.div 
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-full h-full"
            >
              <SpaceBackground />
              <HUD />

              <main className="relative w-full h-full">
                {/* Camera Transition Layer */}
                <motion.div 
                  className="w-full h-full"
                  animate={{
                    scale: isFocused ? 1.5 : 1,
                    opacity: isFocused ? 0 : 1,
                    filter: isFocused ? 'blur(20px)' : 'blur(0px)',
                  }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                  <SolarSystemView 
                    onSelectPlanet={handleSelectPlanet} 
                    timeMultiplier={timeMultiplier} 
                    targetPlanetId={targetPlanet?.id}
                  />
                </motion.div>

                {/* Focused Planet Layer */}
                <AnimatePresence mode="wait">
                  {isFocused && currentPlanet && (
                    <motion.div
                      key={currentPlanet.id}
                      initial={{ scale: 0.5, opacity: 0, filter: 'blur(10px)', rotate: -10 }}
                      animate={{ scale: 1, opacity: 1, filter: 'blur(0px)', rotate: 0 }}
                      exit={{ scale: 0.5, opacity: 0, filter: 'blur(10px)', rotate: 10 }}
                      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0"
                    >
                      <PlanetView 
                        planet={currentPlanet} 
                        timeMultiplier={timeMultiplier} 
                        isFocused={isFocused}
                        onFocusChange={(focused) => !focused && handleBackToSolarSystem()}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </main>

              <Controls 
                currentPlanet={currentPlanet}
                onSelectPlanet={handleSelectPlanet}
                timeMultiplier={timeMultiplier}
                onTimeChange={setTimeMultiplier}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}
