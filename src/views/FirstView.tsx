import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Map from '../components/MapView';

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