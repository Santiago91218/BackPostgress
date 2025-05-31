import { Router } from "express";
import {
  getAllOrdenesCompraController,
  getOrdenCompraByIdController,
  postOrdenCompraController,
  putOrdenCompraController,
  deleteOrdenCompraController,
} from "../controllers/ordenCompraController";

const router = Router();

router.get("/", getAllOrdenesCompraController);
router.get("/:id", getOrdenCompraByIdController);
router.post("/", postOrdenCompraController);
router.put("/:id", putOrdenCompraController);
router.delete("/:id", deleteOrdenCompraController);

export default router;
