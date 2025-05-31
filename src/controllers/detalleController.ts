import { Request, Response } from "express";
import {
  getAllDetallesService,
  getDetalleByIdService,
  postDetalleService,
  putDetalleService,
  deleteDetalleService,
} from "../services/detalleServices";

export const getAllDetallesController = async (req: Request, res: Response) => {
  try {
    const detalles = await getAllDetallesService();
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener detalles", error });
  }
};

export const getDetalleByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const detalle = await getDetalleByIdService(parseInt(id));

    if (!detalle) {
      res.status(404).json({ message: "Detalle no encontrado" });
    }
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener detalle", error });
  }
};

export const postDetalleController = async (req: Request, res: Response) => {
  try {
    const detalle = req.body;
    const newDetalle = await postDetalleService(detalle);
    res.status(201).json({ message: "Detalle creado", detalle: newDetalle });
  } catch (error) {
    res.status(500).json({ message: "Error al crear detalle", error });
  }
};

export const putDetalleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const detalle = req.body;
    const updatedDetalle = await putDetalleService(parseInt(id), detalle);
    res
      .status(201)
      .json({ message: "Detalle actualizado", detalle: updatedDetalle });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar detalle", error });
  }
};

export const deleteDetalleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteDetalleService(parseInt(id));
    res.status(204).json({ message: "Detalle eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar detalle", error });
  }
};
