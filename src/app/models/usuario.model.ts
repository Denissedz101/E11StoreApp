export interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  usuario: string;
  clave: string;
  fecha_nacimiento?: string;
  direccion?: string;
  telefono?: string;
  comuna?: string;
  ciudad?: string;
}

