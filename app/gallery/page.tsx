'use client';

import { motion } from 'framer-motion';
import GalleryGrid from '@/components/GalleryGrid';
import { gallery2024 } from '@/lib/gallery2024';

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-red-50 py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-800 mb-3 sm:mb-4 px-4">
            📸 2024 Party Gallery
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto px-4">
            Relive the best moments from last year&apos;s White Elephant extravaganza! 
            Click any photo or video to view fullscreen.
          </p>
        </motion.div>

        <GalleryGrid items={gallery2024} />
      </div>
    </div>
  );
}
