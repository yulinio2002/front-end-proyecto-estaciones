// src/services/parametros.ts
import type { Parametro } from '../types';
import apiClient from './apiClient';

/** Obtiene todos los parámetros */
export async function listParametros(): Promise<Parametro[]> {
  const { data } = await apiClient.get<Parametro[]>('/api/parametros');
  return data;
}

/** Crea un nuevo parámetro */
export async function createParametro(
  data: Omit<Parametro, 'id'>
): Promise<Parametro> {
  const { data: res } = await apiClient.post<Parametro>('/api/parametros', data);
  return res;
}

/** Actualiza un parámetro existente */
export async function updateParametro(
  id: number,
  data: Partial<Omit<Parametro, 'id'>>
): Promise<Parametro> {
  const { data: res } = await apiClient.patch<Parametro>(`/api/parametros/${id}`, data);
  return res;
}

/** Elimina un parámetro */
export async function deleteParametro(id: number): Promise<void> {
  await apiClient.delete(`/api/parametros/${id}`);
}
