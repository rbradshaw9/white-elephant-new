'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import RSVPForm from '@/components/RSVPForm';
import ElfNameReveal from '@/components/ElfNameReveal';
import { motion } from 'framer-motion';

function RSVPContent() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [rsvpData, setRsvpData] = useState<{ guestNames: string[]; elfNames: string[]; elfTaglines?: string[] } | null>(null);
  const [existingRsvp, setExistingRsvp] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');

  useEffect(() => {
    if (emailParam) {
      setLoading(true);
      fetch(`/api/rsvp?email=${encodeURIComponent(emailParam)}`)
        .then(res => res.json())
        .then(data => {
          if (data.rsvp) {
            setExistingRsvp(data.rsvp);
          }
        })
        .catch(err => console.error('Failed to load RSVP:', err))
        .finally(() => setLoading(false));
    }
  }, [emailParam]);

  const handleSuccess = (data: { guestNames: string[]; elfNames: string[]; elfTaglines: string[] }) => {
    setRsvpData(data);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-green-50 py-8 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg sm:text-xl text-gray-700">Loading your RSVP...</div>
          </div>
        ) : !showSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800 mb-3 sm:mb-4 px-2">
                {existingRsvp ? 'Edit Your RSVP ✏️' : 'Join the Fun! 🎄'}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 px-4">
                {existingRsvp ? 'Update your information below' : 'Fill out the form below to RSVP for our White Elephant Party'}
              </p>
            </div>
            <RSVPForm onSuccess={handleSuccess} existingRsvp={existingRsvp} />
          </motion.div>
        ) : (
          rsvpData && (
            <ElfNameReveal 
              guestNames={rsvpData.guestNames} 
              elfNames={rsvpData.elfNames}
              elfTaglines={rsvpData.elfTaglines}
            />
          )
        )}
      </div>
    </div>
  );
}

export default function RSVPPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-2xl text-gray-700">Loading...</div>
      </div>
    }>
      <RSVPContent />
    </Suspense>
  );
}
