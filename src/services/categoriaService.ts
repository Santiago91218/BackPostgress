import prisma from "../database/prismaClient"
import { ICategoria } from "../models/ICategoria";

export const getAllCategoriasService = async () => {
  return prisma.categoria.findMany();
};

export const getCategoriaByIdService = async (id: number) => {
  return prisma.categoria.findUnique({
    where: { id },
  });
};

export const postCategoriaService = async (categoria: ICategoria) => {
  return prisma.categoria.create({
    data: { ...categoria }, //colocar las propiedades individuales del objeto, no el objeto completo.
  });
};

export const putCategoriaService = async (
  id: number,
  newCategoria: ICategoria
) => {
  return prisma.categoria.update({
    where: { id },
    data: { ...newCategoria }, //Buscá la categoría con este id, y sobrescribí todos los campos que vengan en newCategoria
  });
};

export const deleteCategoriaService = async (id: number) => {
  return prisma.categoria.delete({
    where: { id },
  });
};
