// src/components/LoginForm.tsx
import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginData {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<LoginData>({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); // para redirigir

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const resp = await fetch('http://localhost:8081/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!resp.ok) {
                let errorMessage = 'Correo o contraseña incorrectos';
                try {
                    const errorData = await resp.json();
                    errorMessage = errorData.message || errorMessage;
                } catch {
                    // Si no es JSON, intenta obtener el texto
                    try {
                        errorMessage = await resp.text() || errorMessage;
                    } catch {
                        // Ignorar si tampoco se puede obtener el texto
                    }
                }
                throw new Error(errorMessage);
            }

            // Asumimos que la respuesta es { token: string, ... }
            const data = await resp.json();

            const token: string = data.token;
            if (!token) throw new Error('No se recibió token del servidor');

            // 1. Guardar el token en localStorage (o sessionStorage según tu preferencia)
            localStorage.setItem('jwtToken', token);

            // 2. Redirigir a la ruta privada (por ejemplo "/dashboard")
            navigate('/usuarioSesion1');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = () => {
        navigate('/registro');
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Iniciar Sesión</h2>

            {error && (
                <div className="mb-4 text-red-700 bg-red-100 px-4 py-2 rounded">
                    {error}
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

                {/* Botón de envío */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded text-white ${
                        loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                    } transition`}
                >
                    {loading ? 'Ingresando...' : 'Ingresar'}
                </button>
                {/* Botón de Registrarse */}
                <button
                    type="button"
                    onClick={handleRegister}
                    className="w-full py-2 rounded text-blue-700 border border-blue-600 mt-2 hover:bg-blue-50 transition"
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
