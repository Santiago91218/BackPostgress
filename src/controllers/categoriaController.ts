import { Request, Response } from "express";
import {
  getAllCategoriasService,
  getCategoriaByIdService,
  postCategoriaService,
  putCategoriaService,
  deleteCategoriaService,
} from "../services/categoriaService";

export const getAllCategoriasController = async (
  req: Request,
  res: Response
) => {
  try {
    const categorias = await getAllCategoriasService();
    res.json(categorias);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener categorias", error: error });
  }
};

export const getCategoriaByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const categoria = await getCategoriaByIdService(parseInt(id));

    if (!categoria) {
      res.status(404).json({ message: "Categoria no encontrada" });
    }

    res.json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener categoria", error });
  }
};

export const postCategoriaController = async (req: Request, res: Response) => {
  try {
    const categoria = req.body;
    const newCategoria = await postCategoriaService(categoria);
    res
      .status(201)
      .json({ message: "Categoria creada", categoria: newCategoria });
  } catch (error) {
    res.status(500).json({ message: "error al crear categoria", error });
  }
};

export const putCategoriaController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoria = req.body;
    const newCategoria = await putCategoriaService(parseInt(id), categoria);
    res
      .status(201)
      .json({ message: "Categoria actualizada", categoria: newCategoria });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar categoria", error });
  }
};

export const deleteCategoriaController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const categoriaEliminada = await deleteCategoriaService(parseInt(id));
    res.status(204).json({ message: "Categoria eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar categoria", error });
  }
};

/*
POST:
{
  "nombre": "Categoria 1",
  "descripcion": "desc 1"
}
*/
