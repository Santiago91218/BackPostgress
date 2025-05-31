import { Detalle } from "../generated/prisma";

export interface IImagen {
  id: number;
  disponible?: boolean;
  url: string;
  alt: string;
  detalle: Detalle;
}
