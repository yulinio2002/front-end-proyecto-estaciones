// src/components/StationsTab.tsx
import React, { useState, useEffect } from 'react'
import type { Estacion } from '../types'
import Modal from './Modal'
import {
  listEstaciones,
  createEstacion,
  updateEstacion,
  deleteEstacion
} from '../services/estaciones'

const StationsTab: React.FC = () => {
  const [estaciones, setEstaciones] = useState<Estacion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Estacion | null>(null)
  const [form, setForm] = useState<Partial<Omit<Estacion, 'idEstacion'>>>(
    { nombre: '', latitud: 0, longitud: 0, telefono: '', descripcion: '' }
  )

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    setError(null)
    try {
      const data = await listEstaciones()
      setEstaciones(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleAdd() {
    setEditing(null)
    setForm({ nombre: '', latitud: 0, longitud: 0, telefono: '', descripcion: '' })
    setShowModal(true)
  }

  function handleEdit(est: Estacion) {
    setEditing(est)
    const { idEstacion, ...rest } = est
    setForm(rest)
    setShowModal(true)
  }

  async function handleDelete(est: Estacion) {
    if (!window.confirm(`¿Eliminar "${est.nombre}"?`)) return
    try {
      await deleteEstacion(est.idEstacion)
      setEstaciones(prev => prev.filter(e => e.idEstacion !== est.idEstacion))
    } catch (err) {
      console.error(err)
      alert('Error al eliminar')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editing) {
        const updated = await updateEstacion(editing.idEstacion, form)
        setEstaciones(prev =>
          prev.map(e => (e.idEstacion === updated.idEstacion ? updated : e))
        )
      } else {
        const created = await createEstacion(form as Omit<Estacion, 'idEstacion'>)
        setEstaciones(prev => [...prev, created])
      }
      setShowModal(false)
    } catch (err) {
      console.error(err)
      alert('Error en la operación')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold">Administrar Estaciones</h4>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Agregar Estación
        </button>
      </div>

      {loading && <p>Cargando estaciones…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Nombre</th>
                <th className="border px-4 py-2">Latitud</th>
                <th className="border px-4 py-2">Longitud</th>
                <th className="border px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estaciones.map(est => (
                <tr key={est.idEstacion} className="even:bg-gray-50">
                  <td className="border px-4 py-2">{est.nombre}</td>
                  <td className="border px-4 py-2">{est.latitud}</td>
                  <td className="border px-4 py-2">{est.longitud}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(est)}
                      className="px-2 py-1 mr-2 text-yellow-700 bg-yellow-100 rounded hover:bg-yellow-200 text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(est)}
                      className="px-2 py-1 text-red-700 bg-red-100 rounded hover:bg-red-200 text-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {estaciones.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">
                    No hay estaciones registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h5 className="text-lg font-semibold">
            {editing ? 'Editar Estación' : 'Agregar Estación'}
          </h5>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm">Latitud</label>
                <input
                  type="number"
                  step="any"
                  value={form.latitud}
                  onChange={e =>
                    setForm(f => ({ ...f, latitud: parseFloat(e.target.value) }))
                  }
                  required
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <label className="block text-sm">Longitud</label>
                <input
                  type="number"
                  step="any"
                  value={form.longitud}
                  onChange={e =>
                    setForm(f => ({ ...f, longitud: parseFloat(e.target.value) }))
                  }
                  required
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm">Teléfono</label>
              <input
                type="text"
                value={form.telefono ?? ''}
                onChange={e =>
                  setForm(f => ({ ...f, telefono: e.target.value }))
                }
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm">Descripción</label>
              <textarea
                value={form.descripcion ?? ''}
                onChange={e =>
                  setForm(f => ({ ...f, descripcion: e.target.value }))
                }
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {editing ? 'Guardar' : 'Crear'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default StationsTab
