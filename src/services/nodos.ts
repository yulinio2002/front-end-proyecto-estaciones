import type { Nodo, NodoPayload } from '../types';
import apiClient from './apiClient';

export async function listNodos(): Promise<Nodo[]> {
  const { data } = await apiClient.get<Nodo[]>('/api/nodos');
  return data;
}

export async function createNodo(data: NodoPayload): Promise<Nodo> {
  const { data: res } = await apiClient.post<Nodo>('/api/nodos', data);
  return res;
}

export async function updateNodo(id: number, data: NodoPayload): Promise<Nodo> {
  const { data: res } = await apiClient.patch<Nodo>(`/api/nodos/${id}`, data);
  return res;
}

export async function deleteNodo(id: number): Promise<void> {
  await apiClient.delete(`/api/nodos/${id}`);
}
