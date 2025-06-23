import React, { useEffect, useState } from 'react';
import { listNodos } from '../services/nodos';
import { listEstaciones } from '../services/estaciones';
import { useNavigate } from 'react-router-dom';
import type { Estacion } from '../types'
// interface Estacion {
//   nombre: string;
//   // agrega otros campos si los necesitas
// }

const Sidebar: React.FC = () => {
  const [estaciones, setEstaciones] = useState<Estacion[]>([]);
  const navigate = useNavigate();

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
          localStorage.removeItem('jwtToken')
          window.location.href = '/'
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
              className="text-decoration-none"
            >
              {est.nombre}
            </button>
          </div>
        ))}
      </div>
      <div>
        <a href="/" className="text-decoration-none">Cerrar Sesión</a>
      </div>
    </div>
  );
};

export default Sidebar;