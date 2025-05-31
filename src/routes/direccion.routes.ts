import { Router } from "express";
import {
  getAllDireccionesController,
  getDireccionByIdController,
  postDireccionController,
  putDireccionController,
  deleteDireccionController,
} from "../controllers/direccionController";

const router = Router();

router.get("/", getAllDireccionesController);
router.get("/:id", getDireccionByIdController);
router.post("/", postDireccionController);
router.put("/:id", putDireccionController);
router.delete("/:id", deleteDireccionController);

export default router;
