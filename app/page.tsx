'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Countdown from '@/components/Countdown';
import { eventConfig } from '@/config/event';
import { gallery2024 } from '@/lib/gallery2024';

export default function Home() {
  const featuredImages = gallery2024.filter(item => item.type === 'image').slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-600 to-green-700 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
                🎄 {eventConfig.title} 🎁
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                {eventConfig.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/rsvp"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-white text-red-700 rounded-full hover:bg-yellow-300 hover:text-red-800 transition-all transform hover:scale-105 shadow-2xl"
              >
                🎟️ RSVP Now
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-green-800 text-white rounded-full hover:bg-green-900 transition-all transform hover:scale-105 shadow-2xl"
              >
                📸 View 2024 Gallery
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Countdown targetDate={eventConfig.partyDateTime} />
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-green-800 mb-12">
            📅 Event Details
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-50 to-green-50 p-8 rounded-lg shadow-lg border-4 border-red-600"
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-3xl">📅</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Date & Time</h3>
                    <p className="text-gray-700">
                      {new Date(eventConfig.partyDateTime).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        timeZoneName: 'short'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-3xl">📍</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Location</h3>
                    <p className="text-gray-700">{eventConfig.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-red-50 p-8 rounded-lg shadow-lg border-4 border-green-600"
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-3xl">👔</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Dress Code</h3>
                    <p className="text-gray-700">{eventConfig.dressCode}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-3xl">🎁</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Gift Price Range</h3>
                    <p className="text-gray-700">{eventConfig.giftPriceRange}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Gallery Section */}
      <section className="py-16 bg-gradient-to-b from-white to-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-red-800 mb-4">
            📸 2024 Party Highlights
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Relive the magic from last year&apos;s celebration
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {featuredImages.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-gradient-to-r from-red-600 to-green-600 text-white rounded-full hover:from-red-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-xl"
            >
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
