'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Calendar, BookOpen, Sparkles } from 'lucide-react';
import { triggerHaptic } from '@/lib/haptics';

export default function MobileBottomNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Show nav when scrolling up, hide when scrolling down
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/rsvp', icon: Calendar, label: 'RSVP', highlight: true },
    { href: '/guests', icon: Users, label: 'Guests' },
    { href: '/rules', icon: BookOpen, label: 'Rules' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-white border-t-2 border-gray-200 shadow-2xl pb-safe"
        >
          <div className="grid grid-cols-4 gap-1 px-2 py-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => triggerHaptic('light')}
                  className={`flex flex-col items-center justify-center min-h-[56px] rounded-lg transition-all relative ${
                    isActive
                      ? 'text-red-600'
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  {item.highlight && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"
                    />
                  )}
                  <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''}`} />
                  <span className={`text-xs mt-1 font-semibold ${isActive ? 'text-red-600' : ''}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-red-600 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
