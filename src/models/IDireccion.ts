import { Usuario } from "../generated/prisma";

export interface IDireccion {
  id: number;
  disponible?: boolean;
  localidad: string;
  pais: string;
  provincia: string;
  departamento: string;
  codigoPostal: string;
  usuarios?: Usuario[];
}
