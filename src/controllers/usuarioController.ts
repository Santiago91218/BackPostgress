import { Request, Response } from "express";
import {
  getAllUsuariosService,
  getUsuarioByIdService,
  postUsuarioService,
  putUsuarioService,
  deleteUsuarioService,
} from "../services/usuarioService";

export const getAllUsuariosController = async (req: Request, res: Response) => {
  try {
    const usuarios = await getAllUsuariosService();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

export const getUsuarioByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const usuario = await getUsuarioByIdService(parseInt(id));

    if (!usuario) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
};

export const postUsuarioController = async (req: Request, res: Response) => {
  try {
    const usuario = req.body;
    const newUsuario = await postUsuarioService(usuario);
    res.status(201).json({ message: "Usuario creado", usuario: newUsuario });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};

export const putUsuarioController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = req.body;
    const updatedUsuario = await putUsuarioService(parseInt(id), usuario);
    res
      .status(201)
      .json({ message: "Usuario actualizado", usuario: updatedUsuario });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

export const deleteUsuarioController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteUsuarioService(parseInt(id));
    res.status(204).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};
