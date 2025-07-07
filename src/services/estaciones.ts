// src/services/estaciones.ts
import type { Estacion } from '../types';

const API_BASE = import.meta.env.VITE_BASE_URL

function authHeader(): Record<string, string> {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    return { Authorization: `Bearer ${token}`,
  "ngrok-skip-browser-warning": "69420", };
  }
  return {};
}

export async function listEstaciones(): Promise<Estacion[]> {
  const res = await fetch(`${API_BASE}/api/estaciones`, {
    headers: { ...authHeader(),
      "ngrok-skip-browser-warning": "69420",
     
     }
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

export async function createEstacion(
  data: Omit<Estacion, 'idEstacion'>,
): Promise<Estacion> {
  const res = await fetch(`${API_BASE}/api/estaciones`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
      "ngrok-skip-browser-warning": "69420",
     
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

export async function updateEstacion(
  id: number,
  data: Partial<Omit<Estacion, 'idEstacion'>>
): Promise<Estacion> {
  const res = await fetch(`${API_BASE}/api/estaciones/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
      "ngrok-skip-browser-warning": "69420",
     
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

export async function deleteEstacion(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/estaciones/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader(),
      "ngrok-skip-browser-warning": "69420",
     
      
     }
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
}
