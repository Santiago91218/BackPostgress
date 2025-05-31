import { Request, Response } from "express";
import {
  getAllDireccionesService,
  getDireccionByIdService,
  postDireccionService,
  putDireccionService,
  deleteDireccionService,
} from "../services/direccionService";

export const getAllDireccionesController = async (
  req: Request,
  res: Response
) => {
  try {
    const direcciones = await getAllDireccionesService();
    res.json(direcciones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener direcciones", error });
  }
};

export const getDireccionByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const direccion = await getDireccionByIdService(parseInt(id));
    if (!direccion) {
      res.status(404).json({ message: "Dirección no encontrada" });
    }
    res.json(direccion);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener dirección", error });
  }
};

export const postDireccionController = async (req: Request, res: Response) => {
  try {
    const direccionData = req.body;
    const nuevaDireccion = await postDireccionService(direccionData);
    res
      .status(201)
      .json({ message: "Dirección creada", direccion: nuevaDireccion });
  } catch (error) {
    res.status(500).json({ message: "Error al crear dirección", error });
  }
};

export const putDireccionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const direccionData = req.body;
    const direccionActualizada = await putDireccionService(
      parseInt(id),
      direccionData
    );
    res
      .status(201)
      .json({
        message: "Dirección actualizada",
        direccion: direccionActualizada,
      });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar dirección", error });
  }
};

export const deleteDireccionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await deleteDireccionService(parseInt(id));
    res.status(204).json({ message: "Dirección eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar dirección", error });
  }
};
