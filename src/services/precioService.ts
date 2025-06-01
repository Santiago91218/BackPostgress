import prisma from "../database/prismaClient"
import { IPrecio } from "../models/IPrecio";

export const getAllPreciosService = async () => {
  return prisma.precio.findMany();
};

export const getPrecioByIdService = async (id: number) => {
  return prisma.precio.findUnique({
    where: { id },
  });
};

export const postPrecioService = async (precio: Partial<IPrecio>) => {
  if (precio.precioCompra === undefined) {
    throw new Error("El campo 'precioCompra' es obligatorio.");
  }
  if (precio.precioVenta === undefined) {
    throw new Error("El campo 'precioVenta' es obligatorio.");
  }

  return prisma.precio.create({
    data: {
      disponible: precio.disponible ?? true,
      precioCompra: precio.precioCompra,
      precioVenta: precio.precioVenta,
      descuentoId: precio.descuentoId,
    },
  });
};

export const putPrecioService = async (id: number, newPrecio: Partial<IPrecio>) => {
  return prisma.precio.update({
    where: { id },
    data: {
      disponible: newPrecio.disponible,
      precioCompra: newPrecio.precioCompra,
      precioVenta: newPrecio.precioVenta,
      descuentoId: newPrecio.descuentoId,
    },
  });
};

export const deletePrecioService = async (id: number) => {
  return prisma.precio.delete({
    where: { id },
  });
};
