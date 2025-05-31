import { Request, Response } from "express";
import {
  getAllImagenesService,
  getImagenByIdService,
  postImagenService,
  putImagenService,
  deleteImagenService,
} from "../services/imagenServices";
import { getDetalleByIdService } from "../services/detalleServices";

export const getAllImagenesController = async (req: Request, res: Response) => {
  try {
    const imagenes = await getAllImagenesService();
    res.json(imagenes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener imágenes", error });
  }
};

export const getImagenByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const imagen = await getImagenByIdService(parseInt(id));

    if (!imagen) {
      res.status(404).json({ message: "Imagen no encontrada" });
    }

    res.json(imagen);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener imagen", error });
  }
};

export const postImagenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const imagen = req.body;
    // Validar existencia del detalle
    const detalle = await getDetalleByIdService(imagen.detalle.id);
    if (!detalle) {
      res.status(400).json({ message: "El detalle asociado no existe" });
    }
    const newImagen = await postImagenService(imagen);
    res.status(201).json({ message: "Imagen creada", imagen: newImagen });
  } catch (error) {
    res.status(500).json({ message: "Error al crear imagen", error });
  }
};

export const putImagenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const imagen = req.body;
    // Validar existencia del detalle
    const detalle = await getDetalleByIdService(imagen.detalle.id);
    if (!detalle) {
      res.status(400).json({ message: "El detalle asociado no existe" });
    }
    const updatedImagen = await putImagenService(parseInt(id), imagen);
    res
      .status(200)
      .json({ message: "Imagen actualizada", imagen: updatedImagen });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar imagen", error });
  }
};

export const deleteImagenController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteImagenService(parseInt(id));
    res.status(204).json({ message: "Imagen eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar imagen", error });
  }
};
