// src/services/estaciones.ts
import { api } from '../api'
import type { Estacion } from '../types'

export async function listEstaciones(): Promise<Estacion[]> {
  const { data } = await api.get('/api/estaciones')
  return data
}

export async function createEstacion(
  data: Omit<Estacion, 'idEstacion'>,
): Promise<Estacion> {
  const { data: res } = await api.post('/api/estaciones', data)
  return res
}

export async function updateEstacion(
  id: number,
  data: Partial<Omit<Estacion, 'idEstacion'>>
): Promise<Estacion> {
  const { data: res } = await api.patch(`/api/estaciones/${id}`, data)
  return res
}

export async function deleteEstacion(id: number): Promise<void> {
  await api.delete(`/api/estaciones/${id}`)
}
