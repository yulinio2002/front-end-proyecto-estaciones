import { api } from './api'
import type { Parametro } from '../interfaces'

export async function listParametros(): Promise<Parametro[]> {
  const { data } = await api.get('/api/parametros')
  return data as Parametro[]
}

export async function createParametro(
  data: Omit<Parametro, 'id'>
): Promise<Parametro> {
  const { data: res } = await api.post('/api/parametros', data)
  return res as Parametro
}

export async function updateParametro(
  id: number,
  data: Partial<Omit<Parametro, 'id'>>
): Promise<Parametro> {
  const { data: res } = await api.patch(`/api/parametros/${id}`, data)
  return res as Parametro
}

export async function deleteParametro(id: number): Promise<void> {
  await api.delete(`/api/parametros/${id}`)
}
