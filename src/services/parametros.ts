// src/services/parametros.ts
import type { Parametro } from '../types'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081'

function authHeader(): Record<string, string> {
  const token = localStorage.getItem('jwtToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/**
 * Obtiene todos los parámetros
 */
export async function listParametros(): Promise<Parametro[]> {
  const res = await fetch(`${API_BASE}/api/parametros`, {
    headers: { ...authHeader() }
  })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json() as Promise<Parametro[]>
}

/**
 * Crea un nuevo parámetro
 */
export async function createParametro(
  data: Omit<Parametro, 'id'>
): Promise<Parametro> {
  const res = await fetch(`${API_BASE}/api/parametros`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json() as Promise<Parametro>
}

/**
 * Actualiza un parámetro existente
 */
export async function updateParametro(
  id: number,
  data: Partial<Omit<Parametro, 'id'>>
): Promise<Parametro> {
  const res = await fetch(`${API_BASE}/api/parametros/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json() as Promise<Parametro>
}

/**
 * Elimina un parámetro
 */
export async function deleteParametro(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/parametros/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader() }
  })
  if (!res.ok) throw new Error(`Error ${res.status}`)
}