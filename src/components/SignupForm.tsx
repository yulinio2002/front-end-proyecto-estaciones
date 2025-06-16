// src/components/SignupForm.tsx
import React, { useState } from 'react';
import type { FormEvent } from 'react';

interface SignupData {
  email: string;
  password: string;
  rol: number;
  dni: string;
  nombre: string;
  apellidos: string;
  celular: string;
  sexo: 'M' | 'F';
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupData>({
    email: '',
    password: '',
    rol: 0,
    dni: '',
    nombre: '',
    apellidos: '',
    celular: '',
    sexo: 'M',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'rol'
          ? parseInt(value, 10)
          : (value as SignupData[keyof SignupData]),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const resp = await fetch('http://localhost:8081/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!resp.ok) {
        let errorMessage = 'Error en el registro';
        window.scrollTo({ top: 0, behavior: "smooth" });
        let errorBody: any = null;
        let isJson = false;
        try {
          errorBody = await resp.clone().json();
          isJson = true;
        } catch {
          errorBody = await resp.text();
        }
        if (isJson && errorBody) {
          if (typeof errorBody.message === 'string') {
        errorMessage = errorBody.message;
          } else if (typeof errorBody === 'object') {
        // Concatenar todos los mensajes de validación del backend
        errorMessage = Object.values(errorBody)
          .map((msg) => (Array.isArray(msg) ? msg.join(', ') : msg))
          .join(' | ');
          }
        } else if (!isJson && typeof errorBody === 'string') {
          errorMessage = errorBody || errorMessage;
        }
        throw new Error(errorMessage);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      setSuccess('Usuario registrado correctamente');

      setFormData({
        email: '',
        password: '',
        rol: 0,
        dni: '',
        nombre: '',
        apellidos: '',
        celular: '',
        sexo: 'M',
      });
      setTimeout(() => {
        window.location.href = '/'; // Redirigir a la página de login
      }, 2000); // Esperar 2 segundos antes de redirigir
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Registro</h2>

      {error && (
        <div className="mb-4 text-red-700 bg-red-100 px-4 py-2 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 text-green-700 bg-green-100 px-4 py-2 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
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

        {/* Password */}
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

        {/* Rol */}
        <div>
          <label htmlFor="rol" className="block mb-1 font-medium">
            Rol (número)
          </label>
          <input
            type="number"
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            min={0}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* DNI */}
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

        {/* Nombre */}
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

        {/* Apellidos */}
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

        {/* Celular */}
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

        {/* Sexo */}
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

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } transition`}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
        {/* Link a Login después de registro exitoso */}
        {(
          <div className="text-center mt-4">
            <a
              href="/"
              className="text-blue-600 hover:underline font-medium"
            >
              Ir a Login
            </a>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
