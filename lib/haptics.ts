/**
 * Trigger haptic feedback on supported devices
 */
export function triggerHaptic(type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' = 'light') {
  // Check if device supports haptic feedback
  if (typeof window === 'undefined') return;
  
  try {
    // iOS Haptic Feedback
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30],
        success: [10, 50, 10],
        warning: [20, 100, 20],
        error: [50, 100, 50],
      };
      
      navigator.vibrate(patterns[type]);
    }
    
    // Android Haptic Feedback (if available)
    // @ts-ignore - experimental API
    if (window.AndroidHaptics) {
      // @ts-ignore
      window.AndroidHaptics[type]?.();
    }
  } catch (error) {
    // Silently fail if haptics not supported
    console.debug('Haptic feedback not supported');
  }
}

/**
 * Hook for adding haptic feedback to buttons
 */
export function useHapticFeedback() {
  const handleClick = (callback?: () => void, hapticType: Parameters<typeof triggerHaptic>[0] = 'light') => {
    return (e: React.MouseEvent) => {
      triggerHaptic(hapticType);
      callback?.();
    };
  };

  return { handleClick, triggerHaptic };
}
