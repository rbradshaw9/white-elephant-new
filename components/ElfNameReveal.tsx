'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface ElfNameRevealProps {
  guestNames: string[];
  elfNames: string[];
}

export default function ElfNameReveal({ guestNames, elfNames }: ElfNameRevealProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          🎉 You&apos;re All Set! 🎉
        </h2>
        <p className="text-xl text-gray-700">
          Check your email for confirmation and meet your festive alter egos:
        </p>
      </motion.div>

      <div className="space-y-4">
        {guestNames.map((name, index) => (
          <motion.div
            key={index}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5, type: 'spring' }}
          >
            <Card className="border-4 border-green-600 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <CardContent className="p-6 bg-gradient-to-r from-red-50 via-white to-green-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
                      className="text-4xl"
                    >
                      🎅
                    </motion.div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Real Name</p>
                      <p className="text-2xl font-bold text-gray-800">{name}</p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                    className="text-4xl hidden md:block"
                  >
                    →
                  </motion.div>

                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 + 0.5 }}
                      className="text-4xl"
                    >
                      🧝
                    </motion.div>
                    <div>
                      <p className="text-sm text-green-600 font-medium">Elf Name</p>
                      <motion.p
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.4 }}
                        className="text-2xl font-bold text-green-700"
                      >
                        {elfNames[index]}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: guestNames.length * 0.2 + 0.5 }}
        className="mt-8 text-center space-y-4"
      >
        <p className="text-lg text-gray-700">
          ✉️ A confirmation email has been sent to your inbox with all the details!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-red-600 to-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            🏠 Back to Home
          </motion.a>
          <motion.a
            href="/gallery"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white border-4 border-green-600 text-green-700 px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            📸 View 2024 Gallery
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
