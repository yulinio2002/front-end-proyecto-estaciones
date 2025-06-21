// src/services/usuarios.ts
import type { Usuario } from '../types';
import apiClient from './apiClient';

/** Obtiene el listado de usuarios (personas) */
export async function listUsuarios(): Promise<Usuario[]> {
  const { data } = await apiClient.get<{ content: Usuario[] }>('/api/personas');
  return data.content;
}

/** Actualiza un usuario existente mediante PUT */
export async function updateUsuario(
  id: number,
  data: Partial<Omit<Usuario, 'idPersona'>>
): Promise<Usuario> {
  const { data: res } = await apiClient.put<Usuario>(`/api/personas/${id}`, data);
  return res;
}

/** Elimina un usuario por su ID */
export async function deleteUsuario(id: number): Promise<void> {
  await apiClient.delete(`/api/personas/${id}`);
}
