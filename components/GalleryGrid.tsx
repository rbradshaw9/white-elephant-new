'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { GalleryItem } from '@/lib/gallery2024';

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIndex);
    setSelectedItem(items[nextIndex]);
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(prevIndex);
    setSelectedItem(items[prevIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'ArrowLeft') goToPrevious();
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="relative aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer group"
            onClick={() => openLightbox(item, index)}
          >
            {item.type === 'image' ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading={index < 6 ? 'eager' : 'lazy'}
                priority={index < 6}
                quality={75}
              />
            ) : (
              <>
                <Image
                  src={item.thumbnail || item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  quality={75}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-8 h-8 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </div>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
              <p className="text-white p-4 font-medium">{item.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors z-50"
              aria-label="Close"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 text-white hover:text-green-500 transition-colors z-50"
              aria-label="Previous"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 text-white hover:text-green-500 transition-colors z-50"
              aria-label="Next"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === 'image' ? (
                <div className="relative w-full h-[80vh]">
                  <Image
                    src={selectedItem.src}
                    alt={selectedItem.alt}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                </div>
              ) : (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full max-h-[80vh] rounded-lg"
                >
                  Your browser does not support the video tag.
                </video>
              )}
              <p className="text-white text-center mt-4 text-lg">{selectedItem.alt}</p>
              <p className="text-white/60 text-center text-sm mt-2">
                {currentIndex + 1} of {items.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
