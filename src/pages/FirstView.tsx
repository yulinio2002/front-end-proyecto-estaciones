import React from 'react';
import { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Map from '../components/MapView';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const MonitoringSystem: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  useEffect(() => {
    if (!token) {
      navigate('/', { replace: true });
    }
  }, [navigate, token]);
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