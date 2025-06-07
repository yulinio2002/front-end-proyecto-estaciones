// src/components/MonitoringSystem.tsx

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Map from './MapView';

const MonitoringSystem: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <Map />
      </div>
    </div>
  );
};

export default MonitoringSystem;
