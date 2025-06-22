// src/components/UsersTab.tsx
import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import type { Usuario } from '../types'
import {
  listUsuarios,
  updateUsuario,
  deleteUsuario
} from '../services/usuarios'

const UsersTab: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Usuario | null>(null)
  const [form, setForm] = useState<Partial<Omit<Usuario, 'idPersona'>>>(
    { dni: '', nombre: '', apellidos: '', celular: '', sexo: 'M' }
  )

  useEffect(() => {
    fetchUsuarios()
  }, [])

  async function fetchUsuarios() {
    setLoading(true)
    setError(null)
    try {
      const data = await listUsuarios()
      setUsuarios(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleEdit(u: Usuario) {
    setEditing(u)
    const { idPersona, ...rest } = u
    setForm(rest)
    setShowModal(true)
  }

  async function handleDelete(u: Usuario) {
    if (!window.confirm(`¿Eliminar usuario ${u.nombre} ${u.apellidos}?`)) return
    try {
      await deleteUsuario(u.idPersona)
      setUsuarios(prev => prev.filter(x => x.idPersona !== u.idPersona))
    } catch (err) {
      console.error(err)
      alert('Error al eliminar usuario')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!editing) return
    try {
      const updated = await updateUsuario(editing.idPersona, form)
      setUsuarios(prev =>
        prev.map(u => (u.idPersona === updated.idPersona ? updated : u))
      )
      setShowModal(false)
    } catch (err) {
      console.error(err)
      alert('Error al actualizar usuario')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
      <h4 className="text-xl font-semibold">Gestión de Usuarios</h4>
      {/* Si quieres agregar funcionalidad de agregar usuario, agrega un botón aquí */}
      {/* <button
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Agregar Usuario
      </button> */}
      </div>

      {loading && <p>Cargando usuarios…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
          <th className="border px-4 py-2">Nombre</th>
          <th className="border px-4 py-2">Apellidos</th>
          <th className="border px-4 py-2">DNI</th>
          <th className="border px-4 py-2">Celular</th>
          <th className="border px-4 py-2">Sexo</th>
          <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
          <tr key={u.idPersona} className="even:bg-gray-50">
            <td className="border px-4 py-2">{u.nombre}</td>
            <td className="border px-4 py-2">{u.apellidos}</td>
            <td className="border px-4 py-2">{u.dni}</td>
            <td className="border px-4 py-2">{u.celular ?? '-'}</td>
            <td className="border px-4 py-2">{u.sexo}</td>
            <td className="border px-4 py-2">
            <button
              onClick={() => handleEdit(u)}
              className="px-2 py-1 mr-2 text-yellow-700 bg-yellow-100 rounded hover:bg-yellow-200 text-sm"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(u)}
              className="px-2 py-1 text-red-700 bg-red-100 rounded hover:bg-red-200 text-sm"
            >
              Eliminar
            </button>
            </td>
          </tr>
          ))}
          {usuarios.length === 0 && (
          <tr>
            <td colSpan={6} className="py-4 text-center text-gray-500">
            No hay usuarios registrados.
            </td>
          </tr>
          )}
        </tbody>
        </table>
      </div>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h5 className="text-lg font-semibold mb-4">{editing ? 'Editar Usuario' : 'Agregar Usuario'}</h5>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm">DNI</label>
              <input
                type="text"
                value={form.dni}
                onChange={e => setForm(f => ({ ...f, dni: e.target.value }))}
                required
                className="w-full border px-2 py-1 rounded"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm">Nombre</label>
              <input
                type="text"
                value={form.nombre}
                onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                required
                className="w-full border px-2 py-1 rounded"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm">Apellidos</label>
              <input
                type="text"
                value={form.apellidos}
                onChange={e => setForm(f => ({ ...f, apellidos: e.target.value }))}
                required
                className="w-full border px-2 py-1 rounded"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm">Celular</label>
              <input
                type="text"
                value={form.celular ?? ''}
                onChange={e => setForm(f => ({ ...f, celular: e.target.value }))}
                className="w-full border px-2 py-1 rounded"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm">Sexo</label>
              <select
                value={form.sexo}
                onChange={e => setForm(f => ({ ...f, sexo: e.target.value }))}
                className="w-full border px-2 py-1 rounded"
              >
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
            </div>
            <div className="flex justify-end pt-4 space-x-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default UsersTab
