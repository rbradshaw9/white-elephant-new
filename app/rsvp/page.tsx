'use client';

import { useState } from 'react';
import RSVPForm from '@/components/RSVPForm';
import ElfNameReveal from '@/components/ElfNameReveal';
import { motion } from 'framer-motion';

export default function RSVPPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [rsvpData, setRsvpData] = useState<{ guestNames: string[]; elfNames: string[] } | null>(null);

  const handleSuccess = (data: { guestNames: string[]; elfNames: string[] }) => {
    setRsvpData(data);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {!showSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-green-800 mb-4">
                Join the Fun! 🎄
              </h1>
              <p className="text-xl text-gray-700">
                Fill out the form below to RSVP for our White Elephant Party
              </p>
            </div>
            <RSVPForm onSuccess={handleSuccess} />
          </motion.div>
        ) : (
          rsvpData && (
            <ElfNameReveal 
              guestNames={rsvpData.guestNames} 
              elfNames={rsvpData.elfNames} 
            />
          )
        )}
      </div>
    </div>
  );
}
