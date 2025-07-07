// src/services/mediciones.ts
import type { Medicion, FilterParams } from '../types'

const API_BASE = import.meta.env.VITE_BASE_URL 
function authHeader(): Record<string,string> {
  const token = localStorage.getItem('jwtToken')
  return token ? { Authorization: `Bearer ${token}`,
"ngrok-skip-browser-warning": "69420", } : {}
}

/** Obtiene la última medición de cada parámetro para un nodo */
export async function getLastMedicionesByNodo(idNodo: number): Promise<Medicion[]> {
  const res = await fetch(`${API_BASE}/api/mediciones/nodo/${idNodo}/last`, {
    headers: authHeader(),
    
  })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}

/** Filtra las mediciones con cuerpo JSON */
export async function filterMediciones(params: FilterParams): Promise<Medicion[]> {
  const res = await fetch(`${API_BASE}/api/mediciones/filter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
      "ngrok-skip-browser-warning": "69420",
    },
    body: JSON.stringify(params)
  })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}
/**Filtra todo */
export async function getAllMedicionesByNodo(idNodo: number): Promise<Medicion[]> {
  const res = await fetch(`${API_BASE}/api/mediciones/nodo/${idNodo}`, {
    headers: authHeader(),
  })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}