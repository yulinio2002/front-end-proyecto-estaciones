import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081'
})

// Adjunta token en cada solicitud si existe
api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwtToken')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export interface LoginPayload {
  email: string
  password: string
}

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post('/auth/login', payload)
  return data
}

export interface SignupPayload {
  email: string
  password: string
  rol: number
  dni: string
  nombre: string
  apellidos: string
  celular: string
  sexo: 'M' | 'F'
}

export const register = async (payload: SignupPayload) => {
  const { data } = await api.post('/auth/signup', payload)
  return data
}

export const getCurrentUser = async () => {
  const { data } = await api.get('/auth/me')
  return data
}
