'use client';

import React, { useState } from 'react';
import { RSVP } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface EditRsvpDialogProps {
  rsvp: RSVP | null;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  password: string;
}

export default function EditRsvpDialog({ rsvp, open, onClose, onSave, password }: EditRsvpDialogProps) {
  const [formData, setFormData] = useState<RSVP | null>(rsvp);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Update form data when rsvp prop changes
  React.useEffect(() => {
    if (rsvp) {
      setFormData(rsvp);
    }
  }, [rsvp]);

  if (!formData) return null;

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      const response = await fetch('/api/admin/update-rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          rsvp: {
            id: formData.id,
            primary_name: formData.primary_name,
            email: formData.email,
            guest_count: formData.guest_names.length,
            guest_names: formData.guest_names,
            elf_names: formData.elf_names,
          }
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update');
      }

      onSave();
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleGuestNameChange = (index: number, value: string) => {
    const newGuestNames = [...formData.guest_names];
    newGuestNames[index] = value;
    setFormData({ ...formData, guest_names: newGuestNames });
  };

  const handleElfNameChange = (index: number, value: string) => {
    const newElfNames = [...formData.elf_names];
    newElfNames[index] = value;
    setFormData({ ...formData, elf_names: newElfNames });
  };

  const handleAddGuest = () => {
    setFormData({
      ...formData,
      guest_names: [...formData.guest_names, ''],
      elf_names: [...formData.elf_names, ''],
    });
  };

  const handleRemoveGuest = (index: number) => {
    if (formData.guest_names.length <= 1) {
      setError('Must have at least one guest');
      return;
    }
    const newGuestNames = formData.guest_names.filter((_, i) => i !== index);
    const newElfNames = formData.elf_names.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      guest_names: newGuestNames,
      elf_names: newElfNames,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit RSVP</DialogTitle>
          <DialogDescription>
            Update RSVP details, guest names, and elf names
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Primary Name */}
          <div>
            <Label htmlFor="primaryName">Primary Contact Name</Label>
            <Input
              id="primaryName"
              value={formData.primary_name}
              onChange={(e) => setFormData({ ...formData, primary_name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Guests ({formData.guest_names.length})</Label>
              <Button
                type="button"
                size="sm"
                onClick={handleAddGuest}
                variant="outline"
                className="text-green-600 border-green-600"
              >
                + Add Guest
              </Button>
            </div>

            {formData.guest_names.map((name, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-start p-3 bg-gray-50 rounded">
                <div className="col-span-5">
                  <Label className="text-xs">Guest Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => handleGuestNameChange(index, e.target.value)}
                    placeholder="Guest name"
                  />
                </div>
                <div className="col-span-5">
                  <Label className="text-xs">Elf Name</Label>
                  <Input
                    value={formData.elf_names[index] || ''}
                    onChange={(e) => handleElfNameChange(index, e.target.value)}
                    placeholder="Elf name"
                  />
                </div>
                <div className="col-span-2 flex items-end">
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemoveGuest(index)}
                    disabled={formData.guest_names.length <= 1}
                    className="w-full"
                  >
                    🗑️
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-800 rounded">
              {error}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
