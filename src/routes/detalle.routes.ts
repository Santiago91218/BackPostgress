import { Router } from "express";
import {
  getAllDetallesController,
  getDetalleByIdController,
  postDetalleController,
  putDetalleController,
  deleteDetalleController,
} from "../controllers/detalleController";

const router = Router();

router.get("/", getAllDetallesController);
router.get("/:id", getDetalleByIdController);
router.post("/", postDetalleController);
router.put("/:id", putDetalleController);
router.delete("/:id", deleteDetalleController);

export default router;
