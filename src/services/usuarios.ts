import { api } from '../api'
import type { Usuario } from '../types'

export async function listUsuarios(): Promise<Usuario[]> {
  const { data } = await api.get('/api/personas')
  return (data as { content: Usuario[] }).content
}

export async function updateUsuario(
  id: number,
  data: Partial<Omit<Usuario, 'idPersona'>>
): Promise<Usuario> {
  const { data: res } = await api.put(`/api/personas/${id}`, data)
  return res as Usuario
}

export async function deleteUsuario(id: number): Promise<void> {
  await api.delete(`/api/personas/${id}`)
}
