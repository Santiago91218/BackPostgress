import { OrdenCompra, Producto } from "../generated/prisma";

export interface IOrdenCompraDetalle {
  id: number;
  disponible?: boolean;
  ordenCompra?: OrdenCompra;
  producto: Producto;
  cantidad: number;
}
