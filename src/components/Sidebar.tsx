// src/components/Sidebar.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listNodos } from '../services/nodos';
import { listEstaciones } from '../services/estaciones';
import type { Estacion } from '../types';

const Sidebar: React.FC = () => {
  const [estaciones, setEstaciones] = useState<Estacion[]>([]);
  const navigate = useNavigate();

  // Manejador para ver datos de la estación
  const handleVerDatos = async (estacion: Estacion) => {
    try {
      const nodos = await listNodos();
      const nodo = nodos.find(n => n.idEstacion === estacion.idEstacion);
      if (!nodo) {
        alert('No hay nodo asociado a esta estación');
        return;
      }
      navigate(
        `/usuarioSesion2?nombre=${encodeURIComponent(estacion.nombre)}&nodo=${nodo.idNodo}`
      );
    } catch (err) {
      console.error('Error al buscar nodo:', err);
      alert('Error al buscar nodo');
    }
  };

  // Cargar estaciones al montar
  useEffect(() => {
    const cargarEstaciones = async () => {
      try {
        const data = await listEstaciones();
        setEstaciones(data);
      } catch (err: any) {
        console.error('Error al cargar estaciones:', err);
        if (err.message.includes('401')) {
          localStorage.removeItem('jwtToken');
          navigate('/', { replace: true });
        }
      }
    };
    cargarEstaciones();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/', { replace: true });
  };

  return (
    <aside className="w-56 bg-gray-100 p-4 flex flex-col h-screen overflow-y-auto">
      {/* Lista de estaciones */}
      <nav className="flex flex-col space-y-2">
        {estaciones.map(est => (
          <button
            key={est.idEstacion}
            onClick={() => handleVerDatos(est)}
            className="w-full text-left px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
          >
            {est.nombre}
          </button>
        ))}
      </nav>
      {/* Botón de cerrar sesión justo después de la lista */}
      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
