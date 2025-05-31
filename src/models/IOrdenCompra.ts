import { Direccion, Usuario } from "../generated/prisma";

export interface IOrdenCompra {
  id: number;
  disponible?: boolean;
  usuario: Usuario;
  total?: number;
  descuento?: number;
  fechaCompra?: string;
  direccionEnvio?: Direccion;
}
