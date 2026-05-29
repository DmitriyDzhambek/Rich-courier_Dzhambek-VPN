// Hook для haptic feedback
export const useHaptic = () => {
  const vibrate = (pattern: number | number[] = 10) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const light = () => vibrate(10);
  const medium = () => vibrate(30);
  const heavy = () => vibrate(50);
  const success = () => vibrate([30, 20, 30]);
  const error = () => vibrate([50, 50, 50]);
  const tap = () => vibrate(5);

  return { vibrate, light, medium, heavy, success, error, tap };
};
