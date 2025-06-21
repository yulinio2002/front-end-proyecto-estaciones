import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [nombre, setNombre] = useState<string>('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) return;
      try {
        const res = await fetch('http://localhost:8081/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setNombre(data.persona.nombre|| 'Usuario');
        }
      } catch (error) {
        setNombre('Usuario');
      }
    };
    fetchUser();
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem('jwtToken');
  //   window.location.href = '/'; // o la ruta de login
  // };
   const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    // reemplaza la ruta en el historial
    navigate('/', { replace: true });
  };

  return (
    <header className="flex justify-between items-center h-16 bg-white border-b border-gray-300 px-4">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-300 flex justify-center items-center mr-2">Logo</div>
      </div>
      <div className="flex items-center">
        <h5 className="m-0 text-xl font-bold">Sistema de Monitoreo ZASO</h5>
      </div>
      <div className="text-right">
        <div>{nombre}</div>
        <button onClick={handleLogout} className="text-blue-500">Cerrar sesión</button>
      </div>
    </header>
  );
};

export default Header;
