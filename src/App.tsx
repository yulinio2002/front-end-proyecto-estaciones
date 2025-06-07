
import './App.css'
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FirstView from './views/FirstView';
import SecondView from './views/SecondView';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import AdminMap from './components/AdminMap';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Barra de navegación global (opcional) */}
      {/* <header className="bg-gray-800 text-white px-6 py-3">
        <nav className="flex gap-4">
          <Link
            to="/"
            className="hover:underline"
          >
            Dashboard
          </Link>
          <Link
            to="/Segundo"
            className="hover:underline"
          >
            Reportes
          </Link>
        </nav>
      </header> */}

      {/* Aquí van las rutas */}
      <Routes>
        {/* <Route path="/" element={<FirstView />} /> */}
        {/* <Route path="/registro" element={<SignupForm />} /> */}
        {/* <Route path="/Segundo" element={<SecondView />} /> */}
        {/* <Route path="/login" element={<LoginForm />} /> */}
        <Route path="/admin" element={<AdminMap />} />
        <Route path="/" element={<LoginForm />} />  {/* Esta ruta es para el login, si quieres que sea la primera vista */}
        <Route path="/registro" element={<SignupForm />} />
        <Route path="/usuarioSesion1" element={<FirstView />} />
        <Route path="/usuarioSesion2" element={<SecondView />} />
        <Route path="/admin" element={<AdminMap />} />

        {/* Si quieres manejar “404”, puedes añadir: */}
        {/* <Route path="*" element={<NoEncontrado />} /> */}
      </Routes>
    </div>
  );
};

export default App;