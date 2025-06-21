import apiClient from './apiClient';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  rol: number;
  dni: string;
  nombre: string;
  apellidos: string;
  celular: string;
  sexo: 'M' | 'F';
}

export async function login(data: LoginPayload) {
  const res = await apiClient.post<{ token: string }>('/auth/login', data);
  return res.data;
}

export async function signup(data: SignupPayload) {
  const res = await apiClient.post('/auth/signup', data);
  return res.data;
}

export async function getCurrentUser() {
  const res = await apiClient.get('/auth/me');
  return res.data;
}
