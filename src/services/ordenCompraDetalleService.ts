import prisma from "../database/prismaClient"
import { IOrdenCompraDetalle } from "../models/IOrdenCompraDetalle";

export const getAllOrdenesCompraDetalleService = async () => {
  return prisma.ordenCompraDetalle.findMany({
    include: {
      ordenCompra: true,
      producto: true,
    },
  });
};

export const getOrdenCompraDetalleByIdService = async (id: number) => {
  return prisma.ordenCompraDetalle.findUnique({
    where: { id },
    include: {
      ordenCompra: true,
      producto: true,
    },
  });
};

export const postOrdenCompraDetalleService = async (
  detalle: Partial<IOrdenCompraDetalle>
) => {
  // Validar que venga el ID de producto (obligatorio)
  if (!detalle.producto?.id) {
    throw new Error("El ID del producto es obligatorio.");
  }

  // Validar que el producto exista
  const productoExistente = await prisma.producto.findUnique({
    where: { id: detalle.producto.id },
  });
  if (!productoExistente) {
    throw new Error("El producto especificado no existe.");
  }

  // Validar que si se incluye ordenCompra, exista en BD
  if (detalle.ordenCompra?.id) {
    const ordenExistente = await prisma.ordenCompra.findUnique({
      where: { id: detalle.ordenCompra.id },
    });
    if (!ordenExistente) {
      throw new Error("La orden de compra especificada no existe.");
    }
  }

  return prisma.ordenCompraDetalle.create({
    data: {
      disponible: detalle.disponible ?? true,
      cantidad: detalle.cantidad ?? 1,
      producto: {
        connect: { id: detalle.producto.id },
      },
      ordenCompra: detalle.ordenCompra
        ? {
            connect: { id: detalle.ordenCompra.id },
          }
        : undefined,
    },
    include: {
      ordenCompra: true,
      producto: true,
    },
  });
};

export const putOrdenCompraDetalleService = async (
  id: number,
  newDetalle: Partial<IOrdenCompraDetalle>
) => {
  if (newDetalle.producto?.id) {
    const productoExistente = await prisma.producto.findUnique({
      where: { id: newDetalle.producto.id },
    });
    if (!productoExistente) {
      throw new Error("El producto especificado no existe.");
    }
  }

  if (newDetalle.ordenCompra?.id) {
    const ordenExistente = await prisma.ordenCompra.findUnique({
      where: { id: newDetalle.ordenCompra.id },
    });
    if (!ordenExistente) {
      throw new Error("La orden de compra especificada no existe.");
    }
  }

  return prisma.ordenCompraDetalle.update({
    where: { id },
    data: {
      disponible: newDetalle.disponible,
      cantidad: newDetalle.cantidad,
      producto: newDetalle.producto
        ? {
            connect: { id: newDetalle.producto.id },
          }
        : undefined,
      ordenCompra: newDetalle.ordenCompra
        ? {
            connect: { id: newDetalle.ordenCompra.id },
          }
        : undefined,
    },
    include: {
      ordenCompra: true,
      producto: true,
    },
  });
};

export const deleteOrdenCompraDetalleService = async (id: number) => {
  return prisma.ordenCompraDetalle.delete({
    where: { id },
  });
};
