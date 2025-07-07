import React from 'react';
import { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Map from '../components/MapView';
import { useNavigate } from 'react-router-dom';

const MonitoringSystem: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);
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