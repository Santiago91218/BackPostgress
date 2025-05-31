import { Imagen, Precio, Producto, Talle } from "../generated/prisma";

export interface IDetalle {
  id: number;
  disponible?: boolean;
  talle: Talle;
  stock: number;
  producto?: Producto;
  color?: string;
  estado: boolean;
  precio?: Precio;
  imagenes: Imagen[];
  descripcion?: string;
}
