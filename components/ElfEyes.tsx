'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EyePosition {
  x: number;
  y: number;
  side: 'left' | 'right' | 'top' | 'bottom';
}

export default function ElfEyes() {
  const [eyes, setEyes] = useState<EyePosition[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState<boolean[]>([]);

  useEffect(() => {
    // Generate one pair of eyes on a random edge
    const generateEyes = () => {
      const sides: ('left' | 'right' | 'top' | 'bottom')[] = ['left', 'right', 'top', 'bottom'];
      const side = sides[Math.floor(Math.random() * sides.length)];
      let x, y;
      
      switch (side) {
        case 'left':
          x = -20;
          y = Math.random() * 60 + 20; // 20-80%
          break;
        case 'right':
          x = window.innerWidth + 20;
          y = Math.random() * 60 + 20;
          break;
        case 'top':
          x = Math.random() * 60 + 20;
          y = -20;
          break;
        case 'bottom':
          x = Math.random() * 60 + 20;
          y = window.innerHeight + 20;
          break;
      }
      
      setEyes([{ x, y, side }]);
      setIsBlinking([false]);
    };

    // Show eyes after a delay
    const showTimer = setTimeout(() => {
      generateEyes();
    }, 3000);

    // Hide eyes after 8-12 seconds
    const hideTimer = setTimeout(() => {
      setEyes([]);
    }, Math.random() * 4000 + 8000);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Random blinking
    const blinkInterval = setInterval(() => {
      if (eyes.length > 0) {
        setIsBlinking([Math.random() > 0.7]); // 30% chance to blink
        
        // Reset blink after 150ms
        setTimeout(() => {
          setIsBlinking([false]);
        }, 150);
      }
    }, 2500);

    // Show/hide eyes in cycles
    const cycleInterval = setInterval(() => {
      if (eyes.length > 0) {
        // Hide eyes
        setEyes([]);
        
        // Show new eyes after 5-10 seconds
        setTimeout(() => {
          generateEyes();
          
          // Hide again after 8-12 seconds
          setTimeout(() => {
            setEyes([]);
          }, Math.random() * 4000 + 8000);
        }, Math.random() * 5000 + 5000);
      } else {
        // Show eyes immediately if hidden
        generateEyes();
        
        // Hide after 8-12 seconds
        setTimeout(() => {
          setEyes([]);
        }, Math.random() * 4000 + 8000);
      }
    }, 20000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(blinkInterval);
      clearInterval(cycleInterval);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const calculatePupilPosition = (eyeX: number, eyeY: number) => {
    const dx = mousePosition.x - eyeX;
    const dy = mousePosition.y - eyeY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(Math.sqrt(dx * dx + dy * dy) / 100, 8); // Max 8px movement
    
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {eyes.map((eye, index) => {
          const pupilPos = calculatePupilPosition(eye.x, eye.y);
          const position = eye.side === 'left' || eye.side === 'right' 
            ? { [eye.side]: '0px', top: `${eye.y}%` }
            : { [eye.side]: '0px', left: `${eye.x}%` };

          return (
            <motion.div
              key={`${eye.side}-${index}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="absolute"
              style={position}
            >
              <div className="relative flex gap-3">
                {/* Left Eye */}
                <div className="relative w-12 h-16 bg-white rounded-full shadow-lg border-2 border-gray-800 overflow-hidden">
                  {!isBlinking[index] ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100" />
                      <motion.div
                        className="absolute w-6 h-6 bg-gradient-to-br from-gray-800 to-black rounded-full top-1/2 left-1/2"
                        style={{
                          x: pupilPos.x,
                          y: pupilPos.y,
                          transform: 'translate(-50%, -50%)',
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <div className="absolute w-2 h-2 bg-white rounded-full top-1 right-1" />
                      </motion.div>
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-red-900 to-red-800" />
                  )}
                </div>

                {/* Right Eye */}
                <div className="relative w-12 h-16 bg-white rounded-full shadow-lg border-2 border-gray-800 overflow-hidden">
                  {!isBlinking[index] ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100" />
                      <motion.div
                        className="absolute w-6 h-6 bg-gradient-to-br from-gray-800 to-black rounded-full top-1/2 left-1/2"
                        style={{
                          x: pupilPos.x,
                          y: pupilPos.y,
                          transform: 'translate(-50%, -50%)',
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <div className="absolute w-2 h-2 bg-white rounded-full top-1 right-1" />
                      </motion.div>
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-red-900 to-red-800" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
