export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

export function authHeader(): Record<string, string> {
  const token = localStorage.getItem('jwtToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
