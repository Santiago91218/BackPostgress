import { Router } from "express";
import {
  getAllProductosController,
  getProductoByIdController,
  postProductoController,
  putProductoController,
  deleteProductoController,
} from "../controllers/productoController";

const router = Router();

router.get("/", getAllProductosController);
router.get("/:id", getProductoByIdController);
router.post("/", postProductoController);
router.put("/:id", putProductoController);
router.delete("/:id", deleteProductoController);

export default router;
