// src/components/StationsTab.tsx
import React, { useState } from 'react';
import type { Estacion } from '../types';

const StationsTab: React.FC = () => {
  // Datos de ejemplo; en un caso real vendrían de la API
  const [estaciones, setEstaciones] = useState<Estacion[]>([
    { id: 1, nombre: 'Estación 1', ubicacion: 'Miraflores', lat: -12.1211, lng: -77.0301 },
    { id: 2, nombre: 'Estación 2', ubicacion: 'San Isidro', lat: -12.0987, lng: -77.0365 },
  ]);

  const agregarEstacion = () => {
    alert('Abrir modal/form para agregar estación');
  };

  const editarEstacion = (e: Estacion) => {
    alert(`Editar estación: ${e.nombre}`);
  };

  const eliminarEstacion = (e: Estacion) => {
    if (confirm(`¿Seguro que deseas eliminar ${e.nombre}?`)) {
      setEstaciones(prev => prev.filter(x => x.id !== e.id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold">Administrar Estaciones</h4>
        <button
          onClick={agregarEstacion}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Agregar Estación
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Ubicación</th>
              <th className="border border-gray-300 px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estaciones.map(e => (
              <tr key={e.id} className="even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{e.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{e.ubicacion}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => editarEstacion(e)}
                    className="px-2 py-1 text-yellow-700 bg-yellow-100 rounded hover:bg-yellow-200 text-sm mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarEstacion(e)}
                    className="px-2 py-1 text-red-700 bg-red-100 rounded hover:bg-red-200 text-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {estaciones.length === 0 && (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  No hay estaciones registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StationsTab;
