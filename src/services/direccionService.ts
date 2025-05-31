import { PrismaClient } from "@prisma/client";
import { IDireccion } from "../models/IDireccion";

const prisma = new PrismaClient();

export const getAllDireccionesService = async (): Promise<IDireccion[]> => {
  const direcciones = await prisma.direccion.findMany({
    include: {
      usuarioDirecciones: {
        include: {
          usuario: true,
        },
      },
    },
  });

  return direcciones.map((direccion: any) => ({
    ...direccion,
    usuarios: direccion.usuarioDirecciones.map((ud: any) => ud.usuario),
  }));
};

export const getDireccionByIdService = async (
  id: number
): Promise<IDireccion | null> => {
  const direccion = await prisma.direccion.findUnique({
    where: { id },
    include: {
      usuarioDirecciones: {
        include: {
          usuario: true,
        },
      },
    },
  });

  if (!direccion) return null;

  return {
    ...direccion,
    usuarios: direccion.usuarioDirecciones.map((ud: any) => ud.usuario),
  };
};

export const postDireccionService = async (
  direccionData: Omit<IDireccion, "id" | "usuarios">
): Promise<IDireccion> => {
  const newDireccion = await prisma.direccion.create({
    data: direccionData,
  });
  return newDireccion;
};

export const putDireccionService = async (
  id: number,
  direccionData: Partial<Omit<IDireccion, "id" | "usuarios">>
): Promise<IDireccion | null> => {
  const updatedDireccion = await prisma.direccion.update({
    where: { id },
    data: direccionData,
  });
  return updatedDireccion;
};

export const deleteDireccionService = async (id: number): Promise<void> => {
  await prisma.direccion.delete({
    where: { id },
  });
};
