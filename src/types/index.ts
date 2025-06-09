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
