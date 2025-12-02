'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Countdown from '@/components/Countdown';
import ShareInvite from '@/components/ShareInvite';
import FloatingEmojis from '@/components/FloatingEmojis';
import { useEventSettings } from '@/hooks/useEventSettings';
import { gallery2024 } from '@/lib/gallery2024';

export default function Home() {
  const { settings: eventConfig, loading } = useEventSettings();
  const featuredImages = gallery2024.filter(item => item.type === 'image').slice(0, 6);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-600 to-green-700 text-white py-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <FloatingEmojis />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 md:space-y-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3 md:mb-4 drop-shadow-lg leading-tight px-2">
                🎄 {eventConfig.title} 🎁
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto px-4">
                {eventConfig.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <Link
                href="/rsvp"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold bg-white text-red-700 rounded-full hover:bg-yellow-300 hover:text-red-800 transition-all transform hover:scale-105 shadow-2xl animate-pulse hover:animate-none min-h-[48px]"
              >
                🎟️ RSVP Now
              </Link>
              <Link
                href="/rules"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold bg-green-800 text-white rounded-full hover:bg-green-900 transition-all transform hover:scale-105 shadow-2xl min-h-[48px]"
              >
                📜 Learn the Rules
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

      {/* 2024 Stats Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-red-600 via-green-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12 px-4"
          >
            🎉 2024 Party: The Receipts 🎉
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              { emoji: '😭', value: '12', label: 'Broken Friendships' },
              { emoji: '🍷', value: '37', label: 'Glasses of Wine' },
              { emoji: '🤬', value: '89', label: 'Curse Words Used' },
              { emoji: '😈', value: '4', label: 'People Who Came Just to Steal' },
              { emoji: '🎁', value: '3', label: 'Regrettable Gift Choices' },
              { emoji: '💔', value: '7', label: 'Dramatic Exits' },
              { emoji: '📱', value: '23', label: 'Passive-Aggressive Texts Sent' },
              { emoji: '🙈', value: '1', label: 'Person Who Didn\'t Read the Rules' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-center hover:bg-white/20 transition-all transform hover:scale-105"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl mb-2 md:mb-3">{stat.emoji}</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 md:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm font-semibold opacity-90 leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-green-800 mb-8 md:mb-12">
            📅 Event Details
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-50 to-green-50 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg border-2 sm:border-4 border-red-600"
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <span className="text-2xl sm:text-3xl flex-shrink-0">📅</span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1">Date & Time</h3>
                    <p className="text-sm sm:text-base text-gray-700 break-words">
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
                
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <span className="text-2xl sm:text-3xl flex-shrink-0">📍</span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1">Location</h3>
                    {eventConfig.addressLink ? (
                      <a 
                        href={eventConfig.addressLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base text-blue-600 hover:text-blue-800 underline break-words"
                      >
                        {eventConfig.address}
                      </a>
                    ) : (
                      <p className="text-sm sm:text-base text-gray-700 break-words">{eventConfig.address}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-red-50 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg border-2 sm:border-4 border-green-600"
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <span className="text-2xl sm:text-3xl flex-shrink-0">⏰</span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1">Timing</h3>
                    <p className="text-sm sm:text-base text-gray-700">
                      Party starts at 6:00 PM<br/>
                      <span className="text-xs sm:text-sm text-gray-600">Arrive by 7:00 PM — Game starts at 7:30 sharp!</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <span className="text-2xl sm:text-3xl flex-shrink-0">👔</span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1">Dress Code</h3>
                    <p className="text-sm sm:text-base text-gray-700">{eventConfig.dressCode}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <span className="text-2xl sm:text-3xl flex-shrink-0">🎁</span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1">Gift Price Range</h3>
                    <p className="text-sm sm:text-base text-gray-700">{eventConfig.giftPriceRange}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <span className="text-2xl sm:text-3xl flex-shrink-0">🍽️</span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1">What to Bring</h3>
                    <p className="text-sm sm:text-base text-gray-700">
                      • A dish to share (dessert, snack, appetizer)<br/>
                      • Your favorite drinks/booze 🍷🍺<br/>
                      • Your competitive spirit!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Gallery Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-red-800 mb-2 md:mb-4">
            📸 2024 Party Highlights
          </h2>
          <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg mb-8 md:mb-12 px-4">
            Relive the magic from last year&apos;s celebration
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8">
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
                  loading={index < 3 ? 'eager' : 'lazy'}
                  priority={index < 3}
                  quality={75}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center px-4">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] text-base sm:text-lg font-bold bg-gradient-to-r from-red-600 to-green-600 text-white rounded-full hover:from-red-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-xl"
            >
              View Full Gallery →
            </Link>
          </div>

          {/* Share Section */}
          <ShareInvite />
        </div>
      </section>
    </div>
  );
}
