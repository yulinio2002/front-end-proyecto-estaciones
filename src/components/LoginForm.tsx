// src/components/LoginForm.tsx
import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, login } from '../services/auth';
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
            const { token } = await login(formData);
            if (!token) throw new Error('No se recibió token del servidor');

            // 1. Guardar el token en localStorage (o sessionStorage según tu preferencia)
            localStorage.setItem('jwtToken', token);

            // 2. Redirigir a la ruta privada (por ejemplo "/dashboard")
            // navigate('/usuarioSesion1');
            const user = await getCurrentUser();
        if (user.rol === 'ADMIN') {
            navigate('/admin');
        } else {
            navigate('/usuarioSesion1');
        }
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
        <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border">
            <h2 className="text-3xl font-semibold text-center mb-6 text-primary">Iniciar Sesión</h2>

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
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Botón de envío */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Ingresando...' : 'Ingresar'}
                </button>
                {/* Botón de Registrarse */}
                <button
                    type="button"
                    onClick={handleRegister}
                    className="btn-secondary w-full mt-2"
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
