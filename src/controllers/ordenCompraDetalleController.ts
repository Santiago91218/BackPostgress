import { Request, Response } from "express";
import {
  getAllOrdenesCompraDetalleService,
  getOrdenCompraDetalleByIdService,
  postOrdenCompraDetalleService,
  putOrdenCompraDetalleService,
  deleteOrdenCompraDetalleService,
} from "../services/ordenCompraDetalleService";

export const getAllOrdenesCompraDetalleController = async (
  req: Request,
  res: Response
) => {
  try {
    const detalles = await getAllOrdenesCompraDetalleService();
    res.json(detalles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener detalles de orden de compra", error });
  }
};

export const getOrdenCompraDetalleByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const detalle = await getOrdenCompraDetalleByIdService(parseInt(id));

    if (!detalle) {
      res.status(404).json({ message: "Detalle de orden no encontrado" });
      return;
    }

    res.json(detalle);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener detalle de orden de compra", error });
  }
};

export const postOrdenCompraDetalleController = async (
  req: Request,
  res: Response
) => {
  try {
    const detalle = req.body;
    const newDetalle = await postOrdenCompraDetalleService(detalle);
    res
      .status(201)
      .json({ message: "Detalle de orden creado", detalle: newDetalle });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear detalle de orden de compra", error });
  }
};

export const putOrdenCompraDetalleController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const detalle = req.body;
    const updatedDetalle = await putOrdenCompraDetalleService(
      parseInt(id),
      detalle
    );
    res
      .status(201)
      .json({ message: "Detalle de orden actualizado", detalle: updatedDetalle });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar detalle de orden de compra", error });
  }
};

export const deleteOrdenCompraDetalleController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await deleteOrdenCompraDetalleService(parseInt(id));
    res.status(204).json({ message: "Detalle de orden eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar detalle de orden de compra", error });
  }
};
