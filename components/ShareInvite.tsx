'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function ShareInvite() {
  const [qrCode, setQrCode] = useState('');
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.origin + '/rsvp' : '';

  useEffect(() => {
    if (url) {
      QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#15803d',
          light: '#ffffff'
        }
      }).then(setQrCode);
    }
  }, [url]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'The White Elephant Bash',
          text: 'Join us for a night of gift stealing and holiday chaos!',
          url: url
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-8 sm:mt-12 text-center px-4"
    >
      <Card className="p-4 sm:p-6 max-w-md mx-auto bg-gradient-to-br from-green-50 to-red-50 border-2 sm:border-4 border-green-600">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">📱 Share the Party!</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Help us spread the word</p>
        
        {qrCode && (
          <motion.div 
            className="bg-white p-3 sm:p-4 rounded-lg inline-block mb-3 sm:mb-4 shadow-lg"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={qrCode} alt="QR Code" className="w-40 sm:w-48 h-40 sm:h-48 mx-auto" />
            <p className="text-xs text-gray-500 mt-2">Scan to RSVP</p>
          </motion.div>
        )}

        <div className="space-y-2">
          <Button
            onClick={copyToClipboard}
            className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 min-h-[48px] text-base"
          >
            {copied ? '✓ Copied!' : '📋 Copy Link'}
          </Button>
          
          {typeof navigator !== 'undefined' && typeof navigator.share !== 'undefined' && (
            <Button
              onClick={shareNative}
              variant="outline"
              className="w-full border-2 border-green-600 min-h-[48px] text-base"
            >
              🔗 Share via...
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
