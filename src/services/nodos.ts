import type { Nodo, NodoPayload } from '../types'
import { API_BASE, authHeader } from './api'

export async function listNodos(): Promise<Nodo[]> {
  const res = await fetch(`${API_BASE}/api/nodos`, { headers: authHeader() })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json() as Promise<Nodo[]>
}

export async function createNodo(data: NodoPayload): Promise<Nodo> {
  const res = await fetch(`${API_BASE}/api/nodos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json() as Promise<Nodo>
}

export async function updateNodo(id: number, data: NodoPayload): Promise<Nodo> {
  const res = await fetch(`${API_BASE}/api/nodos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json() as Promise<Nodo>
}

export async function deleteNodo(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/nodos/${id}`, {
    method: 'DELETE', headers: authHeader() })
  if (!res.ok) throw new Error(`Error ${res.status}`)
}
