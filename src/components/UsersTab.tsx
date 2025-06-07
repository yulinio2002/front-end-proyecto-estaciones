// src/components/UsersTab.tsx
import React, { useState } from 'react';
import type { Usuario } from '../types';

const UsersTab: React.FC = () => {
  // En un caso real vendría de la API; aquí ponemos datos de ejemplo:
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: 1, nombre: 'admin1' },
    { id: 2, nombre: 'usuario2' },
  ]);

  const agregarUsuario = () => {
    // Lógica para agregar (por ahora, solo un alert)
    alert('Abrir modal/form para agregar usuario');
  };

  const editarUsuario = (u: Usuario) => {
    alert(`Editar usuario: ${u.nombre}`);
  };

  const eliminarUsuario = (u: Usuario) => {
    if (confirm(`¿Seguro que deseas eliminar a ${u.nombre}?`)) {
      setUsuarios(prev => prev.filter(x => x.id !== u.id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold">Gestión de Usuarios</h4>
        <button
          onClick={agregarUsuario}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Agregar Usuario
        </button>
      </div>

      <ul className="divide-y border border-gray-200 rounded">
        {usuarios.map(u => (
          <li
            key={u.id}
            className="flex justify-between items-center px-4 py-2 hover:bg-gray-50"
          >
            <span>{u.nombre}</span>
            <span className="flex gap-2">
              <button
                onClick={() => editarUsuario(u)}
                className="px-2 py-1 text-yellow-700 bg-yellow-100 rounded hover:bg-yellow-200 transition text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarUsuario(u)}
                className="px-2 py-1 text-red-700 bg-red-100 rounded hover:bg-red-200 transition text-sm"
              >
                Eliminar
              </button>
            </span>
          </li>
        ))}
        {usuarios.length === 0 && (
          <li className="px-4 py-2 text-center text-gray-500">
            No hay usuarios registrados.
          </li>
        )}
      </ul>
    </div>
  );
};

export default UsersTab;
