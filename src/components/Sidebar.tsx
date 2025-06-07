import React from 'react';
const Sidebar: React.FC = () => {

  return (
    <div className="w-52 bg-gray-100 p-4 flex flex-col justify-between">
      <div>
        <div className="mb-2"><a href="usuarioSesion2?nombre=Estación Miraflores" className="text-decoration-none">Estación Miraflores</a></div>
        <div className="mb-2"><a href="distrito.html?nombre=San Isidro" className="text-decoration-none">San Isidro</a></div>
        <div className="mb-2"><a href="distrito.html?nombre=La Molina" className="text-decoration-none">La Molina</a></div>
        <div className="mb-2"><a href="distrito.html?nombre=Surco" className="text-decoration-none">Surco</a></div>
      </div>
      <div>
        <a href="/" className="text-decoration-none">Cerrar Sesión</a>
      </div>
    </div>
  );
};
export default Sidebar;