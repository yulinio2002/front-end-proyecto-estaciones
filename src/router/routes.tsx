import React from 'react'
import { Routes, Route } from 'react-router-dom'
import FirstView from '../pages/FirstView'
import SecondView from '../pages/SecondView'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'
import AdminMap from '../components/AdminMap'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<LoginForm />} />
    <Route path="/registro" element={<SignupForm />} />
    <Route
      path="/usuarioSesion1"
      element={
        <ProtectedRoute allowedRoles={["CLIENTE", "ADMIN"]}>
          <FirstView />
        </ProtectedRoute>
      }
    />
    <Route
      path="/usuarioSesion2"
      element={
        <ProtectedRoute allowedRoles={["CLIENTE", "ADMIN"]}>
          <SecondView />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin"
      element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
          <AdminMap />
        </ProtectedRoute>
      }
    />
  </Routes>
)

export default AppRoutes
