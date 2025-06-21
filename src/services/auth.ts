import { API_BASE } from './api';

export async function getCurrentUser() {
  const token = localStorage.getItem('jwtToken');
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('No autorizado');
  return res.json();
}
