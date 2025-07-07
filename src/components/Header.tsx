// src/components/Header.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';
import Logo from '../assets/logo1.png'; // Ajusta ruta si es necesario
import { User } from 'lucide-react'; // Icono de usuario

interface UserType {
  persona?: { nombre?: string };
  rol?: string;
}

const Header: React.FC = () => {
  const [nombre, setNombre] = useState<string>('Usuario');
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
 const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/', { replace: true });
  };
  useEffect(() => {
    (async () => {
      try {
        const user: UserType = await getCurrentUser();
        setNombre(user.persona?.nombre || 'Usuario');
      } catch {
        setNombre('Usuario');
      }
    })();
  }, []);



  return (
    <header className="w-full flex items-center justify-between h-20 bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg px-8 py-4">
      {/* Logo y título */}
      <div className="absolute left-8 flex items-center space-x-4">
        <img
          src={Logo}
          alt="Logo"
          className="w-12 h-12 rounded-full border-2 border-white shadow-md"
        />
      </div>
      <div className="flex-1 flex justify-center">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Sistema de Monitoreo IoClima
        </h1>
      </div>

      {/* Icono de usuario con dropdown */}
      <div className="relative flex items-center space-x-2" ref={menuRef}>
        <button
          className="flex items-center space-x-2 focus:outline-none"
        >
          <User className="w-6 h-6 text-white" />
          <span className="text-white font-extrabold hidden sm:inline">{nombre}</span>
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Header;

