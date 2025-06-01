import prisma from "../database/prismaClient"
import { IImagen } from "../models/IImagen";

export const getAllImagenesService = async () => {
  return prisma.imagen.findMany({
    include: { detalle: true },
  });
};

export const getImagenByIdService = async (id: number) => {
  return prisma.imagen.findUnique({
    where: { id },
    include: { detalle: true },
  });
};

export const postImagenService = async (imagen: IImagen) => {
  return prisma.imagen.create({
    data: {
      disponible: imagen.disponible,
      url: imagen.url,
      alt: imagen.alt,
      detalle: {
        connect: { id: imagen.detalle.id },
      },
    },
  });
};

export const putImagenService = async (id: number, imagen: IImagen) => {
  return prisma.imagen.update({
    where: { id },
    data: {
      disponible: imagen.disponible,
      url: imagen.url,
      alt: imagen.alt,
      detalle: {
        connect: { id: imagen.detalle.id },
      },
    },
  });
};

export const deleteImagenService = async (id: number) => {
  return prisma.imagen.delete({
    where: { id },
  });
};
