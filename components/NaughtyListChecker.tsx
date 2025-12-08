'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NaughtyListChecker() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [hasEnteredName, setHasEnteredName] = useState(false);

  const checkNaughtyList = async () => {
    if (!name.trim()) return;
    
    setIsChecking(true);
    setResult(null);
    setHasEnteredName(true);

    try {
      const response = await fetch('/api/naughty-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });

      const data = await response.json();
      
      // Dramatic pause
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResult(data.reason);
    } catch (error) {
      console.error('Error checking naughty list:', error);
      setResult("You're on the naughty list for trying to break our website. Classic.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setResult(null);
    setName('');
    setHasEnteredName(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="fixed bottom-24 sm:bottom-8 right-4 z-50">
        >
          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full shadow-2xl font-black text-sm sm:text-base flex items-center gap-2 border-2 border-white hover:shadow-red-500/50 transition-shadow min-h-[48px]"
          >
            <Sparkles className="w-5 h-5" />
            <span className="hidden sm:inline">Check Naughty List</span>
            <span className="sm:hidden">Naughty List</span>
          </motion.button>
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
              onClick={handleClose}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed inset-4 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:inset-auto z-[201] md:w-[90%] md:max-w-lg max-h-[90vh] overflow-auto"
            >
              <div className="bg-gradient-to-br from-red-600 via-red-700 to-green-700 p-1 rounded-2xl shadow-2xl">
                <div className="bg-white rounded-xl p-6 sm:p-8 relative">
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: isChecking ? Infinity : 0 }}
                    >
                      <h2 className="text-3xl sm:text-4xl font-black text-gray-800 mb-4">
                        🎅 Santa's Naughty List
                      </h2>
                    </motion.div>

                    {!result && !isChecking && (
                      <>
                        <p className="text-gray-600 mb-6 text-sm sm:text-base">
                          {!hasEnteredName ? "First, tell us your name so Santa knows who to judge..." : "Ready to face the truth?"}
                        </p>
                        {!hasEnteredName ? (
                          <>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && checkNaughtyList()}
                              placeholder="Enter your name..."
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 text-center text-lg font-semibold focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200"
                              autoFocus
                            />
                            <Button
                              onClick={checkNaughtyList}
                              disabled={!name.trim()}
                              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg font-black rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Check My Status
                            </Button>
                          </>
                        ) : (
                          <Button
                            onClick={checkNaughtyList}
                            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg font-black rounded-xl shadow-lg"
                          >
                            Check Again
                          </Button>
                        )}
                      </>
                    )}

                    {isChecking && (
                      <div className="py-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full mx-auto"
                        />
                        <p className="text-gray-600 mt-4 text-sm sm:text-base font-semibold">
                          Consulting Santa's records...
                        </p>
                      </div>
                    )}

                    {result && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="py-4"
                      >
                        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-600 rounded-xl p-6 mb-6">
                          <p className="text-2xl font-black text-red-700 mb-4">
                            ❌ NAUGHTY LIST CONFIRMED
                          </p>
                          <p className="text-gray-800 text-base sm:text-lg leading-relaxed font-semibold">
                            {result}
                          </p>
                        </div>
                        <Button
                          onClick={checkNaughtyList}
                          variant="outline"
                          className="border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold"
                        >
                          That's Not Fair! Check Again
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
