// src/components/SignupForm.tsx
import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { register } from '../services/auth';
import type { RegisterRequest } from '../types/index';
import { useNavigate } from 'react-router-dom';

const SignupForm: React.FC = () => {
  const initialFormData: RegisterRequest = {
    email: '',
    password: '',
    rol: 0,
    dni: '',
    nombre: '',
    apellidos: '',
    celular: '',
    sexo: 'M',
  };

  const [formData, setFormData] = useState<RegisterRequest>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'rol'
          ? parseInt(value, 10)
          : (value as RegisterRequest[keyof RegisterRequest]),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await register(formData);

      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSuccess('Usuario registrado correctamente.');
      setFormData(initialFormData);

      setTimeout(() => {
        navigate('/')
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Error en el registro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {error && (
        <div className="mb-4 text-red-700 bg-red-100 px-4 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 text-green-700 bg-green-100 px-4rounded">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        
      >
        <div className="sm:col-span-2">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="dni" className="block mb-1 font-medium">
            DNI
          </label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="nombre" className="block mb-1 font-medium">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="apellidos" className="block mb-1 font-medium">
            Apellidos
          </label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="celular" className="block mb-1 font-medium">
            Celular
          </label>
          <input
            type="tel"
            id="celular"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="sexo" className="block mb-1 font-medium">
            Sexo
          </label>
          <select
            id="sexo"
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="sm:col-span-2 w-full py-2 rounded text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form> 
    </div>
  );
}

export default SignupForm;
