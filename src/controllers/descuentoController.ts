import { Request, Response } from "express";
import {
  getAllDescuentosService,
  getDescuentoByIdService,
  postDescuentoService,
  putDescuentoService,
  deleteDescuentoService,
} from "../services/descuentoService";

export const getAllDescuentosController = async (
  req: Request,
  res: Response
) => {
  try {
    const descuentos = await getAllDescuentosService();
    res.json(descuentos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener descuentos", error: error });
  }
};

export const getDescuentoByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const descuento = await getDescuentoByIdService(parseInt(id));

    if (!descuento) {
      res.status(404).json({ message: "Descuento no encontrado" });
    }

    res.json(descuento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener descuento", error });
  }
};

export const postDescuentoController = async (req: Request, res: Response) => {
  try {
    const descuento = req.body;
    const newDescuento = await postDescuentoService(descuento);
    res
      .status(201)
      .json({ message: "Descuento creado", descuento: newDescuento });
  } catch (error) {
    res.status(500).json({ message: "error al crear descuento", error });
  }
};

export const putDescuentoController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const descuento = req.body;
    const newDescuento = await putDescuentoService(parseInt(id), descuento);
    res
      .status(201)
      .json({ message: "Descuento actualizado", categoria: newDescuento });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar descuento", error });
  }
};

export const deleteDescuentoController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const descuentoEliminado = await deleteDescuentoService(parseInt(id));
    res.status(204).json({ message: "Descuento eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar descuento", error });
  }
};


/*
POST:
{
  "fechaInicio": "2025-06-01T00:00:00.000Z",
  "fechaFin": "2025-06-30T23:59:59.000Z",
  "descuento": 15.5
}
*/
