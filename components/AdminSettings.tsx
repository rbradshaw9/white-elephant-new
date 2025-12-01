'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { eventConfig } from '@/config/event';

interface EventSettings {
  partyDateTime: string;
  title: string;
  address: string;
  dressCode: string;
  giftPriceRange: string;
  description: string;
  emailFromName: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<EventSettings>({
    partyDateTime: eventConfig.partyDateTime,
    title: eventConfig.title,
    address: eventConfig.address,
    dressCode: eventConfig.dressCode,
    giftPriceRange: eventConfig.giftPriceRange,
    description: eventConfig.description,
    emailFromName: process.env.NEXT_PUBLIC_EMAIL_FROM_NAME || 'The White Elephant Bash'
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (!response.ok) throw new Error('Failed to save settings');

      setMessage('✅ Settings saved! Changes will take effect after redeployment.');
    } catch (error) {
      setMessage('❌ Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Settings</h2>
        <p className="text-gray-600">Configure your party details and email settings</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message}
        </div>
      )}

      <Card className="p-6">
        <div className="space-y-6">
          {/* Event Title */}
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={settings.title}
              onChange={(e) => setSettings({ ...settings, title: e.target.value })}
              placeholder="The White Elephant Bash 2025"
            />
          </div>

          {/* Party Date/Time */}
          <div>
            <Label htmlFor="dateTime">Party Date & Time</Label>
            <Input
              id="dateTime"
              type="datetime-local"
              value={settings.partyDateTime.slice(0, 16)}
              onChange={(e) => setSettings({ ...settings, partyDateTime: e.target.value + ':00-07:00' })}
            />
            <p className="text-sm text-gray-500 mt-1">Current: {new Date(settings.partyDateTime).toLocaleString()}</p>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Party Address</Label>
            <Input
              id="address"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              placeholder="123 Holiday Lane, North Pole, CO 80501"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              placeholder="Join us for an evening of laughter, gift stealing, and holiday chaos!"
            />
          </div>

          {/* Dress Code */}
          <div>
            <Label htmlFor="dressCode">Dress Code</Label>
            <Input
              id="dressCode"
              value={settings.dressCode}
              onChange={(e) => setSettings({ ...settings, dressCode: e.target.value })}
              placeholder="Ugly Christmas Sweaters Encouraged! 🎄"
            />
          </div>

          {/* Gift Price Range */}
          <div>
            <Label htmlFor="giftPrice">Gift Price Range</Label>
            <Input
              id="giftPrice"
              value={settings.giftPriceRange}
              onChange={(e) => setSettings({ ...settings, giftPriceRange: e.target.value })}
              placeholder="$20 - $30"
            />
          </div>

          {/* Email From Name */}
          <div>
            <Label htmlFor="emailFromName">Email "From" Name</Label>
            <Input
              id="emailFromName"
              value={settings.emailFromName}
              onChange={(e) => setSettings({ ...settings, emailFromName: e.target.value })}
              placeholder="The White Elephant Bash"
            />
            <p className="text-sm text-gray-500 mt-1">This appears as the sender name in RSVP confirmation emails</p>
          </div>

          <div className="pt-4 border-t">
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="w-full sm:w-auto"
            >
              {saving ? 'Saving...' : '💾 Save Settings'}
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-yellow-50">
        <h3 className="font-bold text-lg mb-2">⚠️ Important Notes</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Settings are saved to a database and will persist</li>
          <li>• To apply changes site-wide, you need to redeploy on Vercel</li>
          <li>• Email template changes require code updates (for now)</li>
          <li>• Date/time changes will update the countdown automatically</li>
        </ul>
      </Card>
    </div>
  );
}
