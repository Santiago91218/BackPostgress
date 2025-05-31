import { PrismaClient } from "../generated/prisma";
import { IOrdenCompra } from "../models/IOrdenCompra";

const prisma = new PrismaClient();

export const getAllOrdenesCompraService = async () => {
  return prisma.ordenCompra.findMany({
    include: {
      usuario: true,
      direccionEnvio: true,
    },
  });
};

export const getOrdenCompraByIdService = async (id: number) => {
  return prisma.ordenCompra.findUnique({
    where: { id },
    include: {
      usuario: true,
      direccionEnvio: true,
    },
  });
};

export const postOrdenCompraService = async (orden: Partial<IOrdenCompra>) => {
  // Validar que venga el ID de usuario
  if (!orden.usuario?.id) {
    throw new Error("El ID del usuario es obligatorio.");
  }

  // Verificar que el usuario exista en la base de datos
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { id: orden.usuario.id },
  });

  if (!usuarioExistente) {
    throw new Error("El usuario especificado no existe.");
  }

  // Validar dirección si se incluye
  if (orden.direccionEnvio?.id) {
    const direccionExistente = await prisma.direccion.findUnique({
      where: { id: orden.direccionEnvio.id },
    });

    if (!direccionExistente) {
      throw new Error("La dirección de envío especificada no existe.");
    }
  }

  // Crear la orden de compra
  return prisma.ordenCompra.create({
    data: {
      disponible: orden.disponible ?? true,
      total: orden.total,
      descuento: orden.descuento,
      fechaCompra: orden.fechaCompra,
      usuario: {
        connect: { id: orden.usuario.id },
      },
      direccionEnvio: orden.direccionEnvio
        ? {
            connect: { id: orden.direccionEnvio.id },
          }
        : undefined,
    },
    include: {
      usuario: true,
      direccionEnvio: true,
    },
  });
};

export const putOrdenCompraService = async (
  id: number,
  newOrden: Partial<IOrdenCompra>
) => {
  if (newOrden.usuario?.id) {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: newOrden.usuario.id },
    });
    if (!usuarioExistente) {
      throw new Error("El usuario especificado no existe.");
    }
  }

  if (newOrden.direccionEnvio?.id) {
    const direccionExistente = await prisma.direccion.findUnique({
      where: { id: newOrden.direccionEnvio.id },
    });
    if (!direccionExistente) {
      throw new Error("La dirección de envío especificada no existe.");
    }
  }

  return prisma.ordenCompra.update({
    where: { id },
    data: {
      disponible: newOrden.disponible,
      total: newOrden.total,
      descuento: newOrden.descuento,
      fechaCompra: newOrden.fechaCompra,
      usuario: newOrden.usuario
        ? {
            connect: { id: newOrden.usuario.id },
          }
        : undefined,
      direccionEnvio: newOrden.direccionEnvio
        ? {
            connect: { id: newOrden.direccionEnvio.id },
          }
        : undefined,
    },
    include: {
      usuario: true,
      direccionEnvio: true,
    },
  });
};

export const deleteOrdenCompraService = async (id: number) => {
  return prisma.ordenCompra.delete({
    where: { id },
  });
};
