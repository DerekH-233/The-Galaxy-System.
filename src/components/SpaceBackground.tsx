import React, { useMemo } from 'react';
import { motion } from 'motion/react';

export const SpaceBackground: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 600 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
    }));
  }, []);

  const dustClouds = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 400 + 200,
      color: i % 2 === 0 ? 'rgba(88, 28, 135, 0.05)' : 'rgba(30, 58, 138, 0.05)',
      duration: Math.random() * 20 + 20,
    }));
  }, []);

  return (
    <div className="fixed inset-0 bg-[#020617] overflow-hidden -z-10">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-radial-[at_50%_50%] from-blue-900/10 via-transparent to-transparent" />
      
      {/* Moving Nebulae/Dust Clouds */}
      {dustClouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute rounded-full blur-[120px]"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            top: cloud.top,
            left: cloud.left,
            width: cloud.size,
            height: cloud.size,
            backgroundColor: cloud.color,
          }}
        />
      ))}

      {/* Stars with Parallax Drift */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)]"
            animate={{
              opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        ))}
      </div>

      {/* Cosmic Dust Particles */}
      <div className="absolute inset-0 opacity-20 mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </div>
  );
};
