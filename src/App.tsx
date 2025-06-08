
import './App.css'
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FirstView from './views/FirstView';
import SecondView from './views/SecondView';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import AdminMap from './components/AdminMap';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
        <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/registro" element={<SignupForm />} />
        <Route
          path="/usuarioSesion1"
          element={
            <PrivateRoute>
              <FirstView />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarioSesion2"
          element={
            <PrivateRoute>
              <SecondView />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminMap />
            </PrivateRoute>
          }
        />
      </Routes>

    </div>
  );
};

export default App;