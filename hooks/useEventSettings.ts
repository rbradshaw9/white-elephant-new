'use client';

import { useState, useEffect } from 'react';
import { eventConfig as defaultConfig } from '@/config/event';

export function useEventSettings() {
  const [settings, setSettings] = useState(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch('/api/admin/settings');
        if (response.ok) {
          const data = await response.json();
          if (data.settings) {
            setSettings({ ...defaultConfig, ...data.settings });
          }
        }
      } catch (error) {
        console.error('Error loading event settings:', error);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  return { settings, loading };
}
