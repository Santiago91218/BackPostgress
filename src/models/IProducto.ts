import { Categoria, TipoProducto } from "../generated/prisma";
import { GeneroProducto } from "../generated/prisma";

export interface IProducto {
  id: number;
  disponible: boolean;
  nombre: string;
  tipoProducto: TipoProducto;
  generoProducto: GeneroProducto;
  categoria: Categoria;
}
