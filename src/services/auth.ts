const API_BASE = import.meta.env.VITE_BASE_URL 
import type { RegisterRequest } from "../types";
import type { LoginRequest } from "../types";

export async function getCurrentUser() {
  const token = localStorage.getItem('jwtToken');
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}`,
  "ngrok-skip-browser-warning": "69420", }
  });
  if (!res.ok) throw new Error('No autorizado');
  return res.json();
}

export async function login(userData: LoginRequest) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!res.ok) throw new Error('Error al iniciar sesión');
  const data = await res.json();
  localStorage.setItem('jwtToken', data.token);
  return data;
}

export async function logout() {
  localStorage.removeItem('jwtToken');
  // Aquí podrías hacer una llamada al backend si necesitas invalidar el token
}

export async function register(userData: RegisterRequest) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

      if (!res.ok) {
        let errorMessage = 'Error en el registro';
        window.scrollTo({ top: 0, behavior: "smooth" });
        let errorBody: any = null;
        let isJson = false;
        try {
          errorBody = await res.clone().json();
          isJson = true;
        } catch {
          errorBody = await res.text();
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
      const data = await res.json();
      localStorage.setItem('jwtToken', data.token);
      return data;
}
  

