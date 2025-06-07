import React from 'react';
const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center h-16 bg-white border-b border-gray-300 px-4">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-300 flex justify-center items-center mr-2">Logo</div>
      </div>
      <div className="flex items-center">
        <h5 className="m-0 text-xl font-bold">Sistema de Monitoreo ZASO</h5>
      </div>
      <div className="text-right">
        <div>Hola, Rafael</div>
        <a href="/" className="text-blue-500">Cerrar sesión</a>
      </div>
    </header>
  );
};
export default Header;