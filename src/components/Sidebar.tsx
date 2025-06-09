import React, { useEffect, useState } from 'react';

interface Estacion {
  nombre: string;
  // agrega otros campos si los necesitas
}

const Sidebar: React.FC = () => {
  const [estaciones, setEstaciones] = useState<Estacion[]>([]);
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    fetch('http://localhost:8081/api/estaciones', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem('jwtToken');
          window.location.href = '/';
          throw new Error('No autorizado');
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Estacion[]>;
      })
      .then(data => setEstaciones(data))
      .catch(err => {
        console.error('Error al cargar estaciones:', err);
      });
  }, [token]);

  return (
    <div className="w-52 bg-gray-100 p-4 flex flex-col justify-between">
      <div>
        {estaciones.map(est => (
          <div className="mb-2" key={est.nombre}>
            <a
              href={`/usuarioSesion2?nombre=${encodeURIComponent(est.nombre)}`}
              className="text-decoration-none"
            >
              {est.nombre}
            </a>
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