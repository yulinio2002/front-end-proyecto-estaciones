// src/pages/Inicio.tsx
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import bgImage from '../assets/clima2.png'; // Ajusta la ruta a tu imagen de fondo

const Inicio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div
      className="min-h-screen flex items-start justify-end"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Texto izquierdo alineado arriba */}
    <div className="flex-1 flex items-start justify-center px-4">
      <div className="text-white text-center font-extrabold drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)] space-y-1">
        <h1 className="text-6xl sm:text-7xl md:text-8xl tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 bg-clip-text text-transparent">
        SISTEMA DE
        </h1>
        <h1 className="text-6xl sm:text-7xl md:text-8xl tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 bg-clip-text text-transparent">
        MONITOREO
        </h1>
        <h1 className="text-7xl sm:text-8xl md:text-9xl tracking-tight bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
        CLIMÁTICO
        </h1>
      </div>
    </div>

      {/* Card de formulario centrado verticalmente */}
      <div className="self-center bg-white rounded-lg shadow-lg w-full max-w-md p-6 mr-8">
        {/* Pestañas */}
        <nav className="mb-4 flex justify-center space-x-4">
          <button
            onClick={() => setActiveTab('login')}
            className={`px-4 font-medium transition ${
              activeTab === 'login'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`px-4 font-medium transition ${
              activeTab === 'register'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Registrarse
          </button>
        </nav>

        {/* Formularios */}
        {activeTab === 'login' ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default Inicio;
