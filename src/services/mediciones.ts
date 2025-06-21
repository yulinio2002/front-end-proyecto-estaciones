// src/services/mediciones.ts
import type { Medicion, FilterParams } from '../types';
import apiClient from './apiClient';

/** Obtiene la última medición de cada parámetro para un nodo */
export async function getLastMedicionesByNodo(idNodo: number): Promise<Medicion[]> {
  const { data } = await apiClient.get<Medicion[]>(`/api/mediciones/nodo/${idNodo}/last`);
  return data;
}

/** Filtra las mediciones con cuerpo JSON */
export async function filterMediciones(params: FilterParams): Promise<Medicion[]> {
  const { data } = await apiClient.post<Medicion[]>(`/api/mediciones/filter`, params);
  return data;
}

/** Obtiene todas las mediciones de un nodo */
export async function getAllMedicionesByNodo(idNodo: number): Promise<Medicion[]> {
  const { data } = await apiClient.get<Medicion[]>(`/api/mediciones/nodo/${idNodo}`);
  return data;
}
