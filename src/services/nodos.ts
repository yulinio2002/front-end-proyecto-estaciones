import { api } from '../api'
import type { Nodo, NodoPayload } from '../types'

export async function listNodos(): Promise<Nodo[]> {
  const { data } = await api.get('/api/nodos')
  return data as Nodo[]
}

export async function createNodo(data: NodoPayload): Promise<Nodo> {
  const { data: res } = await api.post('/api/nodos', data)
  return res as Nodo
}

export async function updateNodo(id: number, data: NodoPayload): Promise<Nodo> {
  const { data: res } = await api.patch(`/api/nodos/${id}`, data)
  return res as Nodo
}

export async function deleteNodo(id: number): Promise<void> {
  await api.delete(`/api/nodos/${id}`)
}
