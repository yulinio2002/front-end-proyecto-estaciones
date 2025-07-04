import { api } from '../api'
import type { Medicion, FilterParams } from '../types'

export async function getLastMedicionesByNodo(idNodo: number): Promise<Medicion[]> {
  const { data } = await api.get(`/api/mediciones/nodo/${idNodo}/last`)
  return data
}

export async function filterMediciones(params: FilterParams): Promise<Medicion[]> {
  const { data } = await api.post('/api/mediciones/filter', params)
  return data
}

export async function getAllMedicionesByNodo(idNodo: number): Promise<Medicion[]> {
  const { data } = await api.get(`/api/mediciones/nodo/${idNodo}`)
  return data
}
