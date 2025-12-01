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
}

interface RSVPFormProps {
  onSuccess: (data: { guestNames: string[]; elfNames: string[] }) => void;
  existingRsvp?: any;
}

export default function RSVPForm({ onSuccess, existingRsvp }: RSVPFormProps) {
  const [formData, setFormData] = useState<FormData>({
    primaryName: '',
    email: '',
    guestCount: 1,
    guestNames: [],
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
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-xl border-4 border-red-600">
      <CardHeader className="bg-gradient-to-r from-red-600 to-green-600 text-white">
        <CardTitle className="text-3xl text-center">🎄 RSVP for the Party! 🎁</CardTitle>
        <CardDescription className="text-center text-white/90 text-lg">
          Join us for an evening of gift stealing and holiday cheer!
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Primary Name */}
          <div>
            <Label htmlFor="primaryName" className="text-lg font-medium">
              Your Name *
            </Label>
            <Input
              id="primaryName"
              type="text"
              value={formData.primaryName}
              onChange={(e) => setFormData({ ...formData, primaryName: e.target.value })}
              placeholder="Santa Claus"
              className="mt-2"
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-lg font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="santa@northpole.com"
              className="mt-2"
              required
            />
          </div>

          {/* Guest Count */}
          <div>
            <Label htmlFor="guestCount" className="text-lg font-medium">
              Total Attendees (including you) *
            </Label>
            <Select
              value={formData.guestCount.toString()}
              onValueChange={handleGuestCountChange}
            >
              <SelectTrigger className="mt-2">
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
            <div className="space-y-4">
              <Label className="text-lg font-medium">
                Additional Guests ({formData.guestCount - 1}) *
              </Label>
              <p className="text-sm text-gray-600 -mt-2">
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
                    className="mt-1"
                    required
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white font-bold py-6 text-lg"
          >
            {isSubmitting ? '🎄 Submitting...' : '🎁 Submit RSVP'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
