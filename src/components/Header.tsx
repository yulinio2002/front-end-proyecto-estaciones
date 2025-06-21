import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';

const Header: React.FC = () => {
  const [nombre, setNombre] = useState<string>('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setNombre(data.persona?.nombre || 'Usuario');
      } catch {
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