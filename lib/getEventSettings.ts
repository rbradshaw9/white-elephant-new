import { createClient } from '@supabase/supabase-js';
import { eventConfig as defaultConfig } from '@/config/event';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getEventSettings() {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('id', 'event_settings')
      .single();

    if (error || !data) {
      console.log('Using default event settings');
      return defaultConfig;
    }

    // Merge database settings with defaults to ensure all properties exist
    return {
      ...defaultConfig,
      ...data.value,
    };
  } catch (error) {
    console.error('Error loading event settings:', error);
    return defaultConfig;
  }
}
