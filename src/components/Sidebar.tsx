import React, { useEffect, useState } from 'react';
import { listNodos } from '../services/nodos';
import { listEstaciones } from '../services/estaciones';
import { useNavigate } from 'react-router-dom';
import type { Estacion } from '../interfaces'
import { useAuth } from './AuthContext'
// interface Estacion {
//   nombre: string;
//   // agrega otros campos si los necesitas
// }

const Sidebar: React.FC = () => {
  const [estaciones, setEstaciones] = useState<Estacion[]>([]);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleVerDatos = async (estacion: Estacion) => {
    try {
      // Obtiene todos los nodos
      const nodos = await listNodos()
      // Busca el nodo asociado a la estación seleccionada
      const nodo = nodos.find(n => n.idEstacion === estacion.idEstacion)
      if (!nodo) {
        alert('No hay nodo asociado a esta estación')
        return
      }
      // Navega a SecondView con el idNodo y nombre de la estación
      navigate(`/usuarioSesion2?nombre=${encodeURIComponent(estacion.nombre)}&nodo=${nodo.idNodo}`)
    } catch (err) {
      alert('Error al buscar nodo')
      console.error(err)
    }
  }

  useEffect(() => {
    listEstaciones()
      .then(setEstaciones)
      .catch(err => {
        console.error('Error al cargar estaciones:', err)
        if (err.response?.status === 401) {
          setToken(null)
          navigate('/')
        }
      })
  }, [])

  return (
    <div className="w-52 bg-gray-100 p-4 flex flex-col justify-between">
      <div>
        {estaciones.map(est => (
          <div className="mb-2" key={est.nombre}>
            <button
              onClick={() => handleVerDatos(est)}
              className="w-full flex items-center justify-center bg-white rounded-md border border-gray-300 px-1 py-2 shadow-sm hover:bg-gray-200 transition text-gray-800"
            >
              {est.nombre}
            </button>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => {
            setToken(null);
            navigate('/');
          }}
          className="text-decoration-none px-2 py-2 rounded transition-colors hover:bg-gray-300 block text-center w-full"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;