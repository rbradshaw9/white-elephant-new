'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function CookieBannerParody() {
  const [isVisible, setIsVisible] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Show after 3 seconds, only if not dismissed before
    const dismissed = localStorage.getItem('cookieParodyDismissed');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const messages = [
    {
      title: "🍪 Cookie Notice",
      text: "This website uses cookies to judge your gift-wrapping skills and share your questionable life choices with Santa.",
      buttons: ["Accept All Judgement", "Reject (Santa will remember this)"],
      disclaimer: ""
    },
    {
      title: "🎅 Are You Sure?",
      text: "By rejecting cookies, you acknowledge that you're probably on the Naughty List anyway. We'll also tell your mom about that time you regifted her present.",
      buttons: ["Fine, Accept", "I Stand By My Poor Choices"],
      disclaimer: ""
    },
    {
      title: "🔥 Final Warning",
      text: "Okay, we're legally required to tell you we don't actually use cookies. But we ARE judging you. That's free and doesn't require consent.",
      buttons: ["Fine, Whatever 🙄"],
      disclaimer: "(This is obviously a joke. We don't use cookies.)"
    }
  ];

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('cookieParodyDismissed', 'true');
  };

  const handleReject = () => {
    if (stage < messages.length - 1) {
      setStage(stage + 1);
    } else {
      handleDismiss();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed top-4 left-4 right-4 sm:left-4 sm:right-auto sm:max-w-md z-[100] pointer-events-auto"
        >
          <div className="bg-gradient-to-br from-red-600 via-red-700 to-green-700 p-1 rounded-2xl shadow-2xl">
            <div className="bg-white rounded-xl p-6 relative">
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                key={stage}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-black text-gray-800 mb-3 pr-6">
                  {messages[stage].title}
                </h3>
                <p className="text-sm text-gray-700 mb-5 leading-relaxed">
                  {messages[stage].text}
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                  {messages[stage].buttons.map((buttonText, index) => (
                    <button
                      key={index}
                      onClick={index === 0 ? handleDismiss : handleReject}
                      className={`px-4 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg ${
                        index === 0
                          ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {buttonText}
                    </button>
                  ))}
                </div>

                {messages[stage].disclaimer && (
                  <p className="text-xs text-gray-500 italic mt-3 text-center">
                    {messages[stage].disclaimer}
                  </p>
                )}
              </motion.div>

              <div className="flex gap-1.5 mt-4 justify-center">
                {messages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === stage ? 'bg-red-600 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
