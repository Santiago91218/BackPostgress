import prisma from "../database/prismaClient"
import { IDetalle } from "../models/IDetalle";

export const getAllDetallesService = async () => {
  return prisma.detalle.findMany({
    include: {
      talle: true,
      producto: true,
      precio: true,
      imagenes: true,
    },
  });
};

export const getDetalleByIdService = async (id: number) => {
  return prisma.detalle.findUnique({
    where: { id },
    include: {
      talle: true,
      producto: true,
      precio: true,
      imagenes: true,
    },
  });
};

export const postDetalleService = async (detalle: IDetalle) => {
  return prisma.detalle.create({
    data: {
      talle: { connect: { id: detalle.talle.id } },
      stock: detalle.stock,
      producto: detalle.producto ? { connect: { id: detalle.producto.id } } : undefined,
      color: detalle.color,
      estado: detalle.estado,
      precio: detalle.precio ? { connect: { id: detalle.precio.id } } : undefined,
      descripcion: detalle.descripcion,
      // imágenes se manejan aparte normalmente, no se insertan aquí directamente
    },
    include: {
      talle: true,
      producto: true,
      precio: true,
      imagenes: true,
    },
  });
};

export const putDetalleService = async (id: number, newDetalle: IDetalle) => {
  return prisma.detalle.update({
    where: { id },
    data: {
      talle: newDetalle.talle ? { connect: { id: newDetalle.talle.id } } : undefined,
      stock: newDetalle.stock,
      producto: newDetalle.producto ? { connect: { id: newDetalle.producto.id } } : undefined,
      color: newDetalle.color,
      estado: newDetalle.estado,
      precio: newDetalle.precio ? { connect: { id: newDetalle.precio.id } } : undefined,
      descripcion: newDetalle.descripcion,
    },
    include: {
      talle: true,
      producto: true,
      precio: true,
      imagenes: true,
    },
  });
};

export const deleteDetalleService = async (id: number) => {
  return prisma.detalle.delete({
    where: { id },
  });
};
