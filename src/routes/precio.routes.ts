import { Router } from "express";
import {
  getAllPreciosController,
  getPrecioByIdController,
  postPrecioController,
  putPrecioController,
  deletePrecioController,
} from "../controllers/precioController";

const router = Router();

router.get("/", getAllPreciosController);
router.get("/:id", getPrecioByIdController);
router.post("/", postPrecioController);
router.put("/:id", putPrecioController);
router.delete("/:id", deletePrecioController);

export default router;
