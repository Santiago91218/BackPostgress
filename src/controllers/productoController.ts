import { Request, Response } from "express";
import {
  getAllProductosService,
  getProductoByIdService,
  postProductoService,
  putProductoService,
  deleteProductoService,
} from "../services/productoService";

export const getAllProductosController = async (
  req: Request,
  res: Response
) => {
  try {
    const productos = await getAllProductosService();
    res.json(productos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener productos", error: error });
  }
};

export const getProductoByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const producto = await getProductoByIdService(parseInt(id));

    if (!producto) {
      res.status(404).json({ message: "Producto no encontrado" });
    } else {
      res.json(producto);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener producto", error });
  }
};

export const postProductoController = async (req: Request, res: Response) => {
  try {
    const producto = req.body;
    const newProducto = await postProductoService(producto);
    res
      .status(201)
      .json({ message: "Producto creado", producto: newProducto });
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
};

export const putProductoController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producto = req.body;
    const newProducto = await putProductoService(parseInt(id), producto);
    res
      .status(201)
      .json({ message: "Producto actualizado", producto: newProducto });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
};

export const deleteProductoController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await deleteProductoService(parseInt(id));
    res.status(204).json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};
