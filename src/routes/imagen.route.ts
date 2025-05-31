import { Router } from "express";
import {
  getAllImagenesController,
  getImagenByIdController,
  postImagenController,
  putImagenController,
  deleteImagenController,
} from "../controllers/imagenController";

const router = Router();

router.get("/", getAllImagenesController);
router.get("/:id", getImagenByIdController);
router.post("/", postImagenController);
router.put("/:id", putImagenController);
router.delete("/:id", deleteImagenController);

export default router;
