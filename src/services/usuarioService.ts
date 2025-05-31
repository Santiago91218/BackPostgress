import { PrismaClient } from "@prisma/client";
import { IUsuario } from "../models/IUsuario";

const prisma = new PrismaClient();

export const getAllUsuariosService = async () => {
  const usuarios = await prisma.usuario.findMany({
    include: {
      usuarioDirecciones: {
        include: {
          direccion: true,
        },
      },
    },
  });

  return usuarios.map((usuario: any) => ({
    ...usuario,
    direcciones: usuario.usuarioDirecciones.map((ud: any) => ud.direccion),
  }));
};

export const getUsuarioByIdService = async (id: number) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id },
    include: {
      usuarioDirecciones: {
        include: {
          direccion: true,
        },
      },
    },
  });

  if (!usuario) return null;

  return {
    ...usuario,
    direcciones: usuario.usuarioDirecciones.map((ud: any) => ud.direccion),
  };
};

export const postUsuarioService = async (usuario: IUsuario) => {
  const { direcciones, ...restoUsuario } = usuario;

  const nuevoUsuario = await prisma.usuario.create({
    data: {
      ...restoUsuario,
      usuarioDirecciones: direcciones
        ? {
            create: direcciones.map((direccion) => ({
              direccion: {
                connect: { id: direccion.id },
              },
            })),
          }
        : undefined,
    },
    include: {
      usuarioDirecciones: {
        include: {
          direccion: true,
        },
      },
    },
  });

  return {
    ...nuevoUsuario,
    direcciones: nuevoUsuario.usuarioDirecciones.map((ud: any) => ud.direccion),
  };
};

export const putUsuarioService = async (id: number, usuario: IUsuario) => {
  const { direcciones, ...restoUsuario } = usuario;

  // Borrar relaciones previas si se mandan nuevas direcciones
  if (direcciones) {
    await prisma.usuarioDireccion.deleteMany({
      where: {
        usuarioId: id,
      },
    });
  }

  const updatedUsuario = await prisma.usuario.update({
    where: { id },
    data: {
      ...restoUsuario,
      usuarioDirecciones: direcciones
        ? {
            create: direcciones.map((direccion) => ({
              direccion: {
                connect: { id: direccion.id },
              },
            })),
          }
        : undefined,
    },
    include: {
      usuarioDirecciones: {
        include: {
          direccion: true,
        },
      },
    },
  });

  return {
    ...updatedUsuario,
    direcciones: updatedUsuario.usuarioDirecciones.map((ud: any) => ud.direccion),
  };
};

export const deleteUsuarioService = async (id: number) => {
  await prisma.usuarioDireccion.deleteMany({ where: { usuarioId: id } });

  return await prisma.usuario.delete({
    where: { id },
  });
};
