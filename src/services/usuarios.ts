// src/services/personas.ts
import type { Usuario } from '../types'
import { API_BASE, authHeader } from './api'

/**
 * Obtiene el listado de usuarios (personas) paginadas
 * y devuelve solo el array content.
 */
export async function listUsuarios(): Promise<Usuario[]> {
  const res = await fetch(`${API_BASE}/api/personas`, {
    headers: { ...authHeader() }
  })
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`)
  }
  const data = await res.json() as {
    content: Usuario[]
    // otras props de paginación omitidas
  }
  return data.content
}

/**
 * Actualiza un usuario existente mediante PUT
 */
export async function updateUsuario(
  id: number,
  data: Partial<Omit<Usuario, 'idPersona'>>
): Promise<Usuario> {
  const res = await fetch(`${API_BASE}/api/personas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`)
  }
  return res.json() as Promise<Usuario>
}

/**
 * Elimina un usuario por su ID
 */
export async function deleteUsuario(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/personas/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader() }
  })
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`)
  }
}
