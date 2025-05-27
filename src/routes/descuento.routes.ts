import { Router } from "express";
import {
  getAllDescuentosController,
  getDescuentoByIdController,
  postDescuentoController,
  putDescuentoController,
  deleteDescuentoController,
} from "../controllers/descuentoController";

const router = Router();

router.get("/", getAllDescuentosController);
router.get("/:id", getDescuentoByIdController);
router.post("/", postDescuentoController);
router.put("/:id", putDescuentoController);
router.delete("/:id", deleteDescuentoController);

export default router;
