'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RSVP } from '@/lib/supabase';

interface GuestWithElf {
  name: string;
  elfName: string;
  elfTagline?: string;
  rsvpDate: string;
  strategy?: string;
  lifeAsGift?: string;
  isPrimary?: boolean;
}

export default function GuestsPage() {
  const [guests, setGuests] = useState<GuestWithElf[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalParties, setTotalParties] = useState(0);

  useEffect(() => {
    async function loadGuests() {
      try {
        const response = await fetch('/api/guests');
        if (response.ok) {
          const data = await response.json();
          setGuests(data.guests);
          setTotalParties(data.totalParties);
        }
      } catch (error) {
        console.error('Error loading guests:', error);
      } finally {
        setLoading(false);
      }
    }
    loadGuests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-red-50">
        <div className="text-2xl text-gray-600">Loading guest list...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-3 sm:mb-4 px-2">
            🎄 Guest List 🎅
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-2 px-4">
            Meet your fellow party-goers and their festive elf names!
          </p>
          <div className="flex justify-center mt-4 sm:mt-6">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-red-600">{guests.length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Total Guests</div>
            </div>
          </div>
        </motion.div>

        {guests.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="py-12 text-center">
              <div className="text-6xl mb-4">🎁</div>
              <p className="text-xl text-gray-600">
                No guests yet! Be the first to RSVP!
              </p>
            </CardContent>
          </Card>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3"
          >
            {guests.map((guest, index) => (
              <motion.div
                key={`${guest.name}-${guest.elfName}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-all duration-200 border hover:border-green-500 bg-white/80 backdrop-blur group cursor-default">
                  <CardHeader className="p-3 sm:p-4">
                    <CardTitle className="text-sm sm:text-base text-gray-800 flex items-center gap-1.5 group-hover:text-green-700 transition-colors">
                      <span className="text-base sm:text-lg flex-shrink-0">👤</span>
                      <span className="break-words min-w-0 leading-tight">{guest.name}</span>
                    </CardTitle>
                    <CardDescription className="flex flex-col gap-0.5">
                      <div className="text-xs sm:text-sm font-medium text-green-700 flex items-center gap-1.5">
                        <span className="text-sm sm:text-base flex-shrink-0">🧝</span>
                        <span className="break-words min-w-0 leading-tight">{guest.elfName}</span>
                      </div>
                      {guest.elfTagline && (
                        <p className="text-xs italic text-gray-600 ml-5 sm:ml-6 mt-0.5 leading-tight">
                          &quot;{guest.elfTagline}&quot;
                        </p>
                      )}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-red-50 to-green-50 border-2 border-red-200">
            <CardContent className="py-6 sm:py-8 px-4">
              <p className="text-base sm:text-lg text-gray-700 mb-4">
                Haven't RSVP'd yet? Join the fun!
              </p>
              <a
                href="/rsvp"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                RSVP Now! 🎄
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
