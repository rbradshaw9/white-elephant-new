'use client';

import { useState } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FormData {
  primaryName: string;
  email: string;
  guestCount: number;
  guestNames: string[];
  strategy: string;
  lifeAsGift: string;
}

interface RSVPFormProps {
  onSuccess: (data: { guestNames: string[]; elfNames: string[]; elfTaglines: string[] }) => void;
  existingRsvp?: any;
}

export default function RSVPForm({ onSuccess, existingRsvp }: RSVPFormProps) {
  const [formData, setFormData] = useState<FormData>({
    primaryName: '',
    email: '',
    guestCount: 1,
    guestNames: [],
    strategy: '',
    lifeAsGift: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing RSVP data
  React.useEffect(() => {
    if (existingRsvp) {
      const allGuests = existingRsvp.guest_names || [];
      const primaryName = allGuests[0] || '';
      const additionalGuests = allGuests.slice(1);
      
      setFormData({
        primaryName,
        email: existingRsvp.email,
        guestCount: allGuests.length,
        guestNames: additionalGuests,
        strategy: existingRsvp.strategy || '',
        lifeAsGift: existingRsvp.life_as_gift || '',
      });
    }
  }, [existingRsvp]);

  const handleGuestCountChange = (value: string) => {
    const count = parseInt(value);
    // Additional guests (not including primary)
    const additionalGuestsCount = Math.max(0, count - 1);
    const newGuestNames = Array(additionalGuestsCount).fill('').map((_, i) => formData.guestNames[i] || '');
    setFormData({ ...formData, guestCount: count, guestNames: newGuestNames });
  };

  const handleGuestNameChange = (index: number, value: string) => {
    const newGuestNames = [...formData.guestNames];
    newGuestNames[index] = value;
    setFormData({ ...formData, guestNames: newGuestNames });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Validation
    if (!formData.primaryName.trim()) {
      setError('Please enter your name');
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    // Validate all additional guest names are filled
    const allNamesFilled = formData.guestNames.every(name => name.trim());
    if (!allNamesFilled && formData.guestNames.length > 0) {
      setError('Please fill in all additional guest names');
      setIsSubmitting(false);
      return;
    }

    try {
      // Combine primary name with additional guests
      const allAttendees = [
        formData.primaryName.trim(),
        ...formData.guestNames.map(name => name.trim())
      ];

      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          primaryName: formData.primaryName.trim(),
          email: formData.email.trim(),
          guestCount: formData.guestCount,
          guestNames: allAttendees,
          strategy: formData.strategy || null,
          lifeAsGift: formData.lifeAsGift || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit RSVP');
      }

      const data = await response.json();
      onSuccess({
        guestNames: data.guestNames,
        elfNames: data.elfNames,
        elfTaglines: data.elfTaglines || [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-xl border-4 border-red-600">
      <CardHeader className="bg-gradient-to-r from-red-600 to-green-600 text-white p-4 sm:p-6">
        <CardTitle className="text-2xl sm:text-3xl text-center">🎄 RSVP for the Party! 🎁</CardTitle>
        <CardDescription className="text-center text-white/90 text-sm sm:text-base md:text-lg mt-2">
          Join us for an evening of gift stealing and holiday cheer!
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Primary Name */}
          <div>
            <Label htmlFor="primaryName" className="text-base sm:text-lg font-medium">
              Your Name *
            </Label>
            <Input
              id="primaryName"
              type="text"
              value={formData.primaryName}
              onChange={(e) => setFormData({ ...formData, primaryName: e.target.value })}
              placeholder="Santa Claus"
              className="mt-1.5 sm:mt-2 min-h-[44px] text-base"
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-base sm:text-lg font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="santa@northpole.com"
              className="mt-1.5 sm:mt-2 min-h-[44px] text-base"
              required
            />
          </div>

          {/* Guest Count */}
          <div>
            <Label htmlFor="guestCount" className="text-base sm:text-lg font-medium">
              Total Attendees (including you) *
            </Label>
            <Select
              value={formData.guestCount.toString()}
              onValueChange={handleGuestCountChange}
            >
              <SelectTrigger className="mt-1.5 sm:mt-2 min-h-[44px] text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'Person (just you)' : 'People'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Guest Names */}
          {formData.guestCount > 1 && (
            <div className="space-y-3 sm:space-y-4">
              <Label className="text-base sm:text-lg font-medium">
                Additional Guests ({formData.guestCount - 1}) *
              </Label>
              <p className="text-xs sm:text-sm text-gray-600 -mt-1 sm:-mt-2">
                You're already included above! Enter names for your {formData.guestCount - 1} additional {formData.guestCount === 2 ? 'guest' : 'guests'}.
              </p>
              {formData.guestNames.map((name, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Label htmlFor={`guest-${index}`} className="text-sm text-gray-600">
                    Additional Guest {index + 1}
                  </Label>
                  <Input
                    id={`guest-${index}`}
                    type="text"
                    value={name}
                    onChange={(e) => handleGuestNameChange(index, e.target.value)}
                    placeholder={`Guest ${index + 1} name`}
                    className="mt-1 min-h-[44px] text-base"
                    required
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Funny Questions */}
          <div className="border-t-2 border-dashed border-gray-300 pt-4 sm:pt-6 space-y-4">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">🎭 For Laughs (Optional)</h3>
              <p className="text-xs sm:text-sm text-gray-600">Help us get to know your chaos level</p>
            </div>

            {/* Strategy Dropdown */}
            <div>
              <Label htmlFor="strategy" className="text-base sm:text-lg font-medium">
                What's your White Elephant strategy?
              </Label>
              <Select
                value={formData.strategy}
                onValueChange={(value) => setFormData({ ...formData, strategy: value })}
              >
                <SelectTrigger className="mt-1.5 sm:mt-2 min-h-[44px] text-base">
                  <SelectValue placeholder="Pick your vibe..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="steal-everything">🦹 Steal everything (chaos agent)</SelectItem>
                  <SelectItem value="play-safe">😇 Play it safe (boring)</SelectItem>
                  <SelectItem value="pure-chaos">🔥 Pure chaos (agent of destruction)</SelectItem>
                  <SelectItem value="no-idea">🤷 I have no idea what I'm doing</SelectItem>
                  <SelectItem value="here-for-snacks">🍕 Just here for snacks</SelectItem>
                  <SelectItem value="friendship-destroyer">💔 Friendship destroyer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Life as Gift Text Field */}
            <div>
              <Label htmlFor="lifeAsGift" className="text-base sm:text-lg font-medium">
                If your life was a White Elephant gift, what would it be?
              </Label>
              <Input
                id="lifeAsGift"
                type="text"
                value={formData.lifeAsGift}
                onChange={(e) => setFormData({ ...formData, lifeAsGift: e.target.value })}
                placeholder="A half-eaten box of regrets..."
                className="mt-1.5 sm:mt-2 min-h-[44px] text-base"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded text-sm sm:text-base"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white font-bold py-4 sm:py-5 md:py-6 min-h-[52px] text-base sm:text-lg"
          >
            {isSubmitting ? '🎄 Submitting...' : '🎁 Submit RSVP'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
