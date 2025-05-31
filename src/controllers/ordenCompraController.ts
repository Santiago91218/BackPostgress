import { Request, Response } from "express";
import {
  getAllOrdenesCompraService,
  getOrdenCompraByIdService,
  postOrdenCompraService,
  putOrdenCompraService,
  deleteOrdenCompraService,
} from "../services/ordenCompraService";

export const getAllOrdenesCompraController = async (
  req: Request,
  res: Response
) => {
  try {
    const ordenes = await getAllOrdenesCompraService();
    res.json(ordenes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener órdenes de compra", error });
  }
};

export const getOrdenCompraByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const orden = await getOrdenCompraByIdService(parseInt(id));

    if (!orden) {
      res.status(404).json({ message: "Orden de compra no encontrada" });
      return;
    }

    res.json(orden);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener orden de compra", error });
  }
};

export const postOrdenCompraController = async (
  req: Request,
  res: Response
) => {
  try {
    const orden = req.body;
    const newOrden = await postOrdenCompraService(orden);
    res
      .status(201)
      .json({ message: "Orden de compra creada", orden: newOrden });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear orden de compra",error});
  }
};

export const putOrdenCompraController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const orden = req.body;
    const updatedOrden = await putOrdenCompraService(parseInt(id), orden);
    res
      .status(201)
      .json({ message: "Orden de compra actualizada", orden: updatedOrden });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar orden de compra",error});
  }
};

export const deleteOrdenCompraController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await deleteOrdenCompraService(parseInt(id));
    res.status(204).json({ message: "Orden de compra eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar orden de compra", error });
  }
};
