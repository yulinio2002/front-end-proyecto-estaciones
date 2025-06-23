// src/components/Admin.tsx
import React, { useState } from 'react';
import Header from './Header';
import UsersTab from './UsersTab';
import AlertsTab from './AlertsTab';
import StationsTab from './StationsTab';
import ParametrosTab from './ParametrosTab';
import NodosTab from './NodosTab';
import MapView from './MapView';
//import type { Estacion } from '../types';

type TabKey = 'usuarios' | 'alertas' | 'estaciones'| 'parametros'| 'nodos';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('usuarios');

  // Datos de ejemplo para las estaciones (pueden venir de una llamada a la API más adelante)
  // const estaciones: Estacion[] = [
  //   { id: 1, nombre: 'Estación Miraflores', ubicacion: 'Miraflores', lat: -12.1211, lng: -77.0301 },
  //   { id: 2, nombre: 'Estación San Isidro', ubicacion: 'San Isidro', lat: -12.0987, lng: -77.0365 },
  //   { id: 3, nombre: 'Estación La Molina', ubicacion: 'La Molina', lat: -12.0850, lng: -76.9350 },
  //   { id: 4, nombre: 'Estación Surco', ubicacion: 'Surco', lat: -12.1532, lng: -76.9716 },
  // ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* 1) Header existente */}
      <Header />

      {/* 2) Contenedor principal: Tabs arriba, y luego map abajo */}
      <div className="flex-1 overflow-auto px-4 py-6">
        {/* 2.1) Títulos de pestañas */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-6">
        <button
          onClick={() => setActiveTab('usuarios')}
          className={`pb-2 text-sm font-medium ${
            activeTab === 'usuarios'
          ? 'border-b-2 border-blue-600 text-blue-600'
          : 'text-gray-600 hover:text-gray-800'
          }`}
          type="button"
        >
          Usuarios
        </button>
        {/* <button
          onClick={() => setActiveTab('alertas')}
          className={`pb-2 text-sm font-medium ${
            activeTab === 'alertas'
          ? 'border-b-2 border-blue-600 text-blue-600'
          : 'text-gray-600 hover:text-gray-800'
          }`}
          type="button"
        >
          Alertas
        </button> */}
        <button
          onClick={() => setActiveTab('estaciones')}
          className={`pb-2 text-sm font-medium ${
            activeTab === 'estaciones'
          ? 'border-b-2 border-blue-600 text-blue-600'
          : 'text-gray-600 hover:text-gray-800'
          }`}
          type="button"
        >
          Estaciones
        </button>
        <button
          onClick={() => setActiveTab('parametros')}
          className={`pb-2 text-sm font-medium ${
            activeTab === 'parametros'
          ? 'border-b-2 border-blue-600 text-blue-600'
          : 'text-gray-600 hover:text-gray-800'
          }`}
          type="button"
        >
          Parámetros
        </button>
        <button
          onClick={() => setActiveTab('nodos')}
          className={`pb-2 text-sm font-medium ${
            activeTab === 'nodos'
          ? 'border-b-2 border-blue-600 text-blue-600'
          : 'text-gray-600 hover:text-gray-800'
          }`}
          type="button"
        >
          Nodos
        </button>
          </nav>
        </div>

        {/* 2.2) Contenido de la pestaña activa */}
        <div className="mb-8">
          {activeTab === 'usuarios' && <UsersTab />}
          {activeTab === 'alertas' && <AlertsTab />}
          {activeTab === 'estaciones' && <StationsTab />}
          {activeTab === 'parametros' && <ParametrosTab />}
          {activeTab === 'nodos' && <NodosTab />}
        </div>

        {/* 3) Mapa de estaciones (siempre aparece debajo de las pestañas) */}
        {/* <AdminMap estaciones={estaciones} /> */}
        <h2 className="text-xl font-semibold mb-4">Mapa de Estaciones</h2>
      <div className="h-96 border rounded-lg overflow-hidden">
            <MapView/>
      </div>
      </div>
    </div>
  );
};

export default Admin;
