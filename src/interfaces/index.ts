// src/types/index.ts
export interface Usuario {
  idPersona: number;
  dni: string;
  nombre: string;
  apellidos: string;
  celular: string;
  sexo: string;
}

export interface Estacion {
 idEstacion: number;
  nombre: string;
  latitud: number;
  longitud: number;
  telefono: string | null;
  descripcion: string | null;
}
export interface Parametro {
  /** Identificador único del parámetro */
  id: number
  /** Nombre del parámetro (p.ej. 'TEMPERATURA') */
  nombre: string
  /** Descripción del parámetro */
  descripcion: string
  /** Unidad de medida (p.ej. '°F', '%') */
  unidad: string

}

export interface Nodo { 
  idNodo: number
  idEstacion: number
  parametros: Parametro[]
  estado: 'ACTIVO' | 'INACTIVO' | 'RETIRADO'
  fechaRegistro: string
  fechaInstalacion: string | null
  descripcion: string
}

export interface NodoPayload {
  idEstacion: number
  parametros: string[]
  estado: Nodo['estado']
  fechaInstalacion: string | null
  descripcion: string
  token: string | null
}

export interface Medicion {
  idMedicion: number
  nodo: number
  parametro: number
  fecha: string
  valor: number
}

export interface FilterParams {
  idNodo?: number
  idParametro?: number
  fechaInicio?: string
  fechaFin?: string
  idEstacion?: number
}
