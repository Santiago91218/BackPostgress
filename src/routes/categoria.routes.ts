import { Router } from "express";
import {
  getAllCategoriasController,
  getCategoriaByIdController,
  postCategoriaController,
  putCategoriaController,
  deleteCategoriaController,
} from "../controllers/categoriaController";

const router = Router();

router.get("/", getAllCategoriasController);
router.get("/:id", getCategoriaByIdController);
router.post("/", postCategoriaController);
router.put("/:id", putCategoriaController);
router.delete("/:id", deleteCategoriaController);

export default router;
