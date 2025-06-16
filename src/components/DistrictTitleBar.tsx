import React from 'react';

interface Props {
  distrito: string;
}

const DistrictTitleBar: React.FC<Props> = ({ distrito }) => {
  return (
    <div className="flex justify-between items-center bg-gray-700 text-white px-6 py-2">
      <h5 className="text-lg font-semibold">{distrito}</h5>
      <a
        href="/usuarioSesion1"
        
        className="btn btn-outline-light btn-sm border border-white rounded px-3 py-1 hover:bg-white hover:text-gray-700 transition"
      >
        Volver al inicio
      </a>
    </div>
  );
};

export default DistrictTitleBar;
