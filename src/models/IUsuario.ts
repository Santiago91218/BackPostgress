import { Direccion, TipoUsuario } from "../generated/prisma";

export interface IUsuario {
  id: number;
  disponible?: boolean;
  nombre: string;
  contrasenia: string;
  rol?: TipoUsuario;
  email: string;
  dni: number;
  direcciones?: Direccion[];
}
