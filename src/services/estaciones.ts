// src/services/estaciones.ts
import type { Estacion } from '../types';
import apiClient from './apiClient';

export async function listEstaciones(): Promise<Estacion[]> {
  const { data } = await apiClient.get<Estacion[]>('/api/estaciones');
  return data;
}

export async function createEstacion(
  data: Omit<Estacion, 'idEstacion'>,
): Promise<Estacion> {
  const { data: res } = await apiClient.post<Estacion>('/api/estaciones', data);
  return res;
}

export async function updateEstacion(
  id: number,
  data: Partial<Omit<Estacion, 'idEstacion'>>
): Promise<Estacion> {
  const { data: res } = await apiClient.patch<Estacion>(`/api/estaciones/${id}`, data);
  return res;
}

export async function deleteEstacion(id: number): Promise<void> {
  await apiClient.delete(`/api/estaciones/${id}`);
}
