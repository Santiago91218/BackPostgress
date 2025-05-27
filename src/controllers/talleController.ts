import { Request, Response } from "express";
import {
  getAllTallesService,
  getTalleByIdService,
  postTalleService,
  putTalleService,
  deleteTalleService,
} from "../services/talleService";

export const getAllTalleController = async (req: Request, res: Response) => {
  try {
    const talles = await getAllTallesService();
    res.json(talles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener talles", error: error });
  }
};

export const getTalleByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const talle = await getTalleByIdService(parseInt(id));

    if (!talle) {
      res.status(404).json({ message: "Talle no encontrado" });
    }

    res.json(talle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener talle", error });
  }
};

export const postTalleController = async (req: Request, res: Response) => {
  try {
    const talle = req.body;
    const newTalle = await postTalleService(talle);
    res.status(201).json({ message: "Talle creado", descuento: newTalle });
  } catch (error) {
    res.status(500).json({ message: "error al crear talle", error });
  }
};

export const putTalleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const talle = req.body;
    const newTalle = await putTalleService(parseInt(id), talle);
    res.status(201).json({ message: "Talle actualizado", categoria: newTalle });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar talle", error });
  }
};

export const deleteTalleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const talleEliminado = await deleteTalleService(parseInt(id));
    res.status(204).json({ message: "Talle eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar talle", error });
  }
};

/*
POST:
{
  "talle": "M"
}
*/
