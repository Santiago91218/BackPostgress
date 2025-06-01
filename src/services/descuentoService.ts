import prisma from "../database/prismaClient"
import { IDescuento } from "../models/IDescuento";

export const getAllDescuentosService = async () => {
  return prisma.descuento.findMany();
};

export const getDescuentoByIdService = async (id: number) => {
  return prisma.descuento.findUnique({
    where: { id },
  });
};

export const postDescuentoService = async (descuento: IDescuento) => {
  return prisma.descuento.create({
    data: { ...descuento },
  });
};

export const putDescuentoService = async (
  id: number,
  newDescuento: IDescuento
) => {
  return prisma.descuento.update({
    where: { id },
    data: { ...newDescuento },
  });
};

export const deleteDescuentoService = async (id: number) => {
  return prisma.descuento.delete({
    where: { id },
  });
};
