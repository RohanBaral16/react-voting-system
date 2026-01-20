const BASE_URL = 'http://localhost:5000';

// Login function
export const login = async (voterId: string, password: string) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // important for session
    body: JSON.stringify({ voterId, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data; // { voterId, name }
};

// Get logged-in user profile
export const getProfile = async () => {
  const res = await fetch(`${BASE_URL}/api/voter/profile`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Not logged in');
  }

  return data;
};

// Logout
export const logout = async () => {
  const res = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Logout failed');
  }

  return data;
};
