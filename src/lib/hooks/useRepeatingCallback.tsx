import { useEffect } from "react";

/**
 * Custom hook to have a callback called repeatingly.
 * @param interval Time to wait before triggering the callback.
 * @param callback Callback to call after each interval.
 */
export default function useRepeatingCallback(interval: number, callback: () => void) {
  useEffect(() => {
    const autoPlayInterval = setInterval(() => {
      callback();
    }, interval);

    return () => clearInterval(autoPlayInterval);
  });
}
