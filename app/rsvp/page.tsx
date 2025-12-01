'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import RSVPForm from '@/components/RSVPForm';
import ElfNameReveal from '@/components/ElfNameReveal';
import { motion } from 'framer-motion';

function RSVPContent() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [rsvpData, setRsvpData] = useState<{ guestNames: string[]; elfNames: string[] } | null>(null);
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

  const handleSuccess = (data: { guestNames: string[]; elfNames: string[] }) => {
    setRsvpData(data);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-700">Loading your RSVP...</div>
          </div>
        ) : !showSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-green-800 mb-4">
                {existingRsvp ? 'Edit Your RSVP ✏️' : 'Join the Fun! 🎄'}
              </h1>
              <p className="text-xl text-gray-700">
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
