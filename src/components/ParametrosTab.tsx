import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import type { Parametro } from '../types'
import {
  listParametros,
  createParametro,
  updateParametro,
  deleteParametro
} from '../services/parametros'

const ParametrosTab: React.FC = () => {
  const [parametros, setParametros] = useState<Parametro[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Parametro | null>(null)
  const [form, setForm] = useState<Partial<Omit<Parametro, 'id'>>>(
    { nombre: '', descripcion: '', unidad: '' }
  )

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    setError(null)
    try {
      const data = await listParametros()
      setParametros(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleAdd() {
    setEditing(null)
    setForm({ nombre: '', descripcion: '', unidad: '' })
    setShowModal(true)
  }

  function handleEdit(p: Parametro) {
    setEditing(p)
    const { id, ...rest } = p
    setForm(rest)
    setShowModal(true)
  }

  async function handleDelete(p: Parametro) {
    if (!window.confirm(`¿Eliminar parámetro ${p.nombre}?`)) return
    try {
      await deleteParametro(p.id)
      setParametros(prev => prev.filter(x => x.id !== p.id))
    } catch (err) {
      console.error(err)
      alert('Error al eliminar parámetro')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editing) {
        const updated = await updateParametro(editing.id, form)
        setParametros(prev => prev.map(p => p.id === updated.id ? updated : p))
      } else {
        const created = await createParametro(form as Omit<Parametro, 'id'>)
        setParametros(prev => [...prev, created])
      }
      setShowModal(false)
    } catch (err) {
      console.error(err)
      alert('Error al guardar parámetro')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold">Gestión de Parámetros</h4>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Agregar Parámetro
        </button>
      </div>

      {loading && <p>Cargando parámetros…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Descripción</th>
              <th className="border px-4 py-2">Unidad</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {parametros.map(p => (
              <tr key={p.id} className="even:bg-gray-50">
                <td className="border px-4 py-2">{p.nombre}</td>
                <td className="border px-4 py-2">{p.descripcion}</td>
                <td className="border px-4 py-2">{p.unidad}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-2 py-1 mr-2 text-yellow-700 bg-yellow-100 rounded hover:bg-yellow-200 text-sm"
                  >Editar</button>
                  <button
                    onClick={() => handleDelete(p)}
                    className="px-2 py-1 text-red-700 bg-red-100 rounded hover:bg-red-200 text-sm"
                  >Eliminar</button>
                </td>
              </tr>
            ))}
            {parametros.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No hay parámetros registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h5 className="text-lg font-semibold mb-4">
            {editing ? 'Editar Parámetro' : 'Agregar Parámetro'}
          </h5>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm">Nombre</label>
              <select
              value={form.nombre}
              onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
              required
              className="w-full border px-2 py-1 rounded"
              >
              <option value="">Seleccione un parámetro</option>
              <option value="TEMPERATURA">TEMPERATURA</option>
              <option value="HUMEDAD">HUMEDAD</option>
              <option value="RADIACION">RADIACION</option>
              <option value="PRESION">PRESION</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm">Descripción</label>
              <input
                type="text" value={form.descripcion}
                onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                required className="w-full border px-2 py-1 rounded" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm">Unidad</label>
              <input
                type="text" value={form.unidad}
                onChange={e => setForm(f => ({ ...f, unidad: e.target.value }))}
                required className="w-full border px-2 py-1 rounded" />
            </div>
            <div className="flex justify-end pt-4 space-x-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{editing ? 'Guardar' : 'Crear'}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default ParametrosTab
