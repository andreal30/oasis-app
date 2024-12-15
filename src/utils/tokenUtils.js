// Set token in local storage
export const setToken = (token) => {
  localStorage.setItem("token", token);
  // console.log("Saving token to localStorage:", token);
};

// Get token from local storage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token from local storage
export const clearToken = () => {
  localStorage.removeItem("token");
};

// Check if token exists
export const hasToken = () => {
  return !!getToken();
};
