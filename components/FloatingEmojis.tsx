'use client';

import { motion } from 'framer-motion';

const emojis = ['🎄', '🎁', '⭐', '❄️', '🎅', '🔔'];

export default function FloatingEmojis() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {emojis.map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl md:text-6xl opacity-20"
          initial={{
            x: Math.random() * 100 + '%',
            y: '100%',
          }}
          animate={{
            y: '-20%',
            x: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: index * 2,
            ease: 'linear',
          }}
          style={{
            left: `${(index * 15) % 100}%`,
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}
