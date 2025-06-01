import prisma from "../database/prismaClient"
import { IProducto } from '../models/IProducto';

export const getAllProductosService = async () => {
  return await prisma.producto.findMany({
    include: {
      categoria: true,
    },
  });
};

export const getProductoByIdService = async (id: number) => {
  return await prisma.producto.findUnique({
    where: { id },
    include: {
      categoria: true,
    },
  });
};

export const postProductoService = async (producto: IProducto) => {
  return await prisma.producto.create({
    data: {
      nombre: producto.nombre,
      disponible: producto.disponible,
      tipoProducto: producto.tipoProducto,
      generoProducto: producto.generoProducto,
      categoria: {
        connect: {
          id: producto.categoria.id,
        },
      },
    },
    include: {
      categoria: true,
    },
  });
};

export const putProductoService = async (id: number, producto: IProducto) => {
  return await prisma.producto.update({
    where: { id },
    data: {
      nombre: producto.nombre,
      disponible: producto.disponible,
      tipoProducto: producto.tipoProducto,
      generoProducto: producto.generoProducto,
      categoria: {
        connect: {
          id: producto.categoria.id,
        },
      },
    },
    include: {
      categoria: true,
    },
  });
};

export const deleteProductoService = async (id: number) => {
  return await prisma.producto.delete({
    where: { id },
  });
};
