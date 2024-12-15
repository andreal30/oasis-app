// Set an item in localStorage, automatically stringifying JSON
export const setLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  console.log(`Saved to localStorage: ${key}`);
};

// Get an item from localStorage, automatically parsing JSON
export const getLocal = (key) => {
  const item = localStorage.getItem(key);
  try {
    return JSON.parse(item);
  } catch {
    return item; // If parsing fails, return raw value
  }
};

// Remove an item from localStorage
export const clearLocal = (key) => {
  localStorage.removeItem(key);
};

// Check if an item exists in localStorage
export const hasToken = (key) => !!localStorage.getItem(key);
