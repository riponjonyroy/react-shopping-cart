import { useState, useEffect } from "react";

/**
 * useLocalStorage
 * A custom hook that syncs state with localStorage so the cart
 * survives page refreshes.
 *
 * @param {string} key        - The localStorage key to persist under.
 * @param {*}      initialValue - The fallback value when nothing is stored yet.
 * @returns {[*, Function]}   - [storedValue, setValue] — same API as useState.
 */
function useLocalStorage(key, initialValue) {
  // Lazy-init: read from localStorage on first render only
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`useLocalStorage: could not read key "${key}"`, error);
      return initialValue;
    }
  });

  // Keep localStorage in sync whenever the value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`useLocalStorage: could not write key "${key}"`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
