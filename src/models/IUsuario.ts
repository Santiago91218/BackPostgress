import { Direccion, TipoUsuario } from "../generated/prisma";

export interface IUsuario {
  id: number;
  disponible?: boolean;
  nombre?: string | null;
  contrasenia: string;
  rol?: TipoUsuario | null;
  email: string;
  dni?: number | null;
  direcciones?: Direccion[];
}
