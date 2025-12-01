'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isPartyTime, setIsPartyTime] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setIsPartyTime(true);
        return null;
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isPartyTime) {
    return (
      <div className="bg-gradient-to-r from-green-600 via-red-600 to-green-600 text-white rounded-lg p-8 text-center shadow-2xl">
        <h2 className="text-4xl md:text-5xl font-bold animate-pulse">
          🎉 IT&apos;S PARTY TIME! 🎉
        </h2>
      </div>
    );
  }

  if (!timeLeft) {
    return null;
  }

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="bg-gradient-to-r from-red-700 via-green-700 to-red-700 text-white rounded-lg p-6 md:p-8 shadow-2xl">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        ⏰ Countdown to Party Time! ⏰
      </h2>
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {timeBlocks.map((block) => (
          <div
            key={block.label}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 text-center hover:bg-white/20 transition-all hover:scale-105"
          >
            <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2 transition-all duration-300">
              {String(block.value).padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm font-medium opacity-90">
              {block.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
