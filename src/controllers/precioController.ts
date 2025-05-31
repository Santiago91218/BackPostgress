import { Request, Response } from "express";
import {
  getAllPreciosService,
  getPrecioByIdService,
  postPrecioService,
  putPrecioService,
  deletePrecioService,
} from "../services/precioService";

export const getAllPreciosController = async (req: Request, res: Response) => {
  try {
    const precios = await getAllPreciosService();
    res.json(precios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener precios", error });
  }
};

export const getPrecioByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const precio = await getPrecioByIdService(parseInt(id));

    if (!precio) {
      res.status(404).json({ message: "Precio no encontrado" });
      return;
    }

    res.json(precio);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener precio", error });
  }
};

export const postPrecioController = async (req: Request, res: Response) => {
  try {
    const precio = req.body;
    const newPrecio = await postPrecioService(precio);
    res.status(201).json({ message: "Precio creado", precio: newPrecio });
  } catch (error) {
    res.status(500).json({ message: "Error al crear precio", error });
  }
};

export const putPrecioController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const precio = req.body;
    const updatedPrecio = await putPrecioService(parseInt(id), precio);
    res.status(201).json({ message: "Precio actualizado", precio: updatedPrecio });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar precio", error });
  }
};

export const deletePrecioController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deletePrecioService(parseInt(id));
    res.status(204).json({ message: "Precio eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar precio", error });
  }
};
