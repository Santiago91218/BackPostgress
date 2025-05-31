import { Router } from "express";
import {
  getAllOrdenesCompraDetalleController,
  getOrdenCompraDetalleByIdController,
  postOrdenCompraDetalleController,
  putOrdenCompraDetalleController,
  deleteOrdenCompraDetalleController,
} from "../controllers/ordenCompraDetalleController";

const router = Router();

router.get("/", getAllOrdenesCompraDetalleController);
router.get("/:id", getOrdenCompraDetalleByIdController);
router.post("/", postOrdenCompraDetalleController);
router.put("/:id", putOrdenCompraDetalleController);
router.delete("/:id", deleteOrdenCompraDetalleController);

export default router;
