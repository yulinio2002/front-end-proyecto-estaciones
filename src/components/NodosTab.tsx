import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import type { Estacion ,Nodo, NodoPayload } from '../types'
import { listNodos, createNodo, updateNodo, deleteNodo } from '../services/nodos'
import { listEstaciones } from '../services/estaciones'
const NodosTab: React.FC = () => {
  const [nodos, setNodos] = useState<Nodo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [estaciones, setEstaciones] = useState<Estacion[]>([])

  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Nodo | null>(null)
  const [form, setForm] = useState<NodoPayload>({
    idEstacion: 0,
    parametros: [],
    estado: 'ACTIVO',
    fechaInstalacion: null,
    descripcion: '',
    token: '' 
  })

  useEffect(() => {
  listNodos().then(setNodos).catch(err => setError(err.message)).finally(() => setLoading(false))
  listEstaciones().then(setEstaciones)
  }, [])

  useEffect(() => {
    listNodos()
      .then(setNodos)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const openAdd = () => {
    setEditing(null)
    setForm({ idEstacion: 0, parametros: [], estado: 'ACTIVO', fechaInstalacion: null, descripcion: '', token: '' })
    setShowModal(true)
  }

  const openEdit = (n: Nodo) => {
    setEditing(n)
    setForm({
      idEstacion: n.idEstacion,
      parametros: n.parametros.map(p => p.nombre),
      estado: n.estado,
      fechaInstalacion: n.fechaInstalacion,
      descripcion: n.descripcion,
      token: '' // Aquí puedes agregar el token si es necesario
    })
    setShowModal(true)
  }

  const handleDelete = async (n: Nodo) => {
    if (!confirm(`¿Eliminar nodo ${n.idNodo}?`)) return
    await deleteNodo(n.idNodo)
    setNodos(prev => prev.filter(x => x.idNodo !== n.idNodo))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload: NodoPayload = { ...form }
    try {
      if (editing) {
        const updated = await updateNodo(editing.idNodo, payload)
        setNodos(prev => prev.map(x => x.idNodo === updated.idNodo ? updated : x))
      } else {
        const created = await createNodo(payload)
        setNodos(prev => [...prev, created])
      }
      setShowModal(false)
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-semibold">Gestión de Nodos</h4>
        <button onClick={openAdd} className="px-4 py-2 bg-blue-600 text-white rounded">
          Agregar Nodo
        </button>
      </div>

      {loading && <p>Cargando nodos…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Estación</th>
              <th className="border px-4 py-2">Parámetros</th>
              <th className="border px-4 py-2">Estado</th>
              <th className="border px-4 py-2">Instalación</th>
              <th className="border px-4 py-2">Descripción</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {nodos.map(n => (
              <tr key={n.idNodo} className="even:bg-gray-50">
                <td className="border px-4 py-2">
                  {estaciones.find(est => est.idEstacion === n.idEstacion)?.nombre || '-'}
                </td>
                <td className="border px-4 py-2">{n.parametros.map(p => p.nombre).join(', ')}</td>
                <td className="border px-4 py-2">{n.estado}</td>
                <td className="border px-4 py-2">{n.fechaInstalacion ?? '-'}</td>
                <td className="border px-4 py-2">{n.descripcion}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => openEdit(n)} className="mr-2 px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Editar</button>
                  <button onClick={() => handleDelete(n)} className="px-2 py-1 bg-red-100 text-red-700 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h5 className="text-lg font-semibold mb-4">{editing ? 'Editar Nodo' : 'Agregar Nodo'}</h5>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm">Estación</label>
              {/* <input
                type="number"
                value={form.idEstacion}
                onChange={e => setForm(f => ({ ...f, idEstacion: +e.target.value }))}
                className="w-full border px-2 py-1 rounded"
                required
              /> */}
              <select
              value={form.idEstacion}
              onChange={e => setForm(f => ({ ...f, idEstacion: +e.target.value }))}
              className="w-full border px-2 py-1 rounded"
              required
                       >
              <option value="">Seleccione una estación</option>
              {estaciones.map(est => (
                <option key={est.idEstacion} value={est.idEstacion}>
                  {est.nombre}
                </option>
              ))}
              </select>
            </div>
            <div>
              <label className="block text-sm">Parámetros (coma)</label>
              <input
                type="text"
                value={form.parametros.join(', ')}
                onChange={e => setForm(f => ({ ...f, parametros: e.target.value.split(/\s*,\s*/) }))}
                className="w-full border px-2 py-1 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm">Estado</label>
              <select
                value={form.estado}
                onChange={e => setForm(f => ({ ...f, estado: e.target.value as Nodo['estado'] }))}
                className="w-full border px-2 py-1 rounded"
              >
                <option value="ACTIVO">ACTIVO</option>
                <option value="INACTIVO">INACTIVO</option>
                <option value="RETIRADO">RETIRADO</option>
              </select>
            </div>
            <div>
              <label className="block text-sm">Fecha Instalación</label>
              <input
              type="date"
              value={form.fechaInstalacion ? form.fechaInstalacion.slice(0, 10) : ''}
              onChange={e => setForm(f => ({
                ...f,
                fechaInstalacion: e.target.value ? `${e.target.value}T00:00:00` : null
              }))}
              className="w-full border px-2 py-1 rounded"
              />
            </div>
            <div>
              <label className="block text-sm">Descripción</label>
              <textarea
                value={form.descripcion}
                onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                className="w-full border px-2 py-1 rounded"
              />
            </div>
            <div>
              <label className="block text-sm">Token</label>
              <input
                type="text"
                value={form.token}
                onChange={e => setForm(f => ({ ...f, token: e.target.value }))}
                required
                className="w-full border px-2 py-1 rounded"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{editing ? 'Guardar' : 'Crear'}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default NodosTab
