import { Router } from "express";
import {
  getAllUsuariosController,
  getUsuarioByIdController,
  postUsuarioController,
  putUsuarioController,
  deleteUsuarioController,
} from "../controllers/usuarioController";

const router = Router();

router.get("/", getAllUsuariosController);
router.get("/:id", getUsuarioByIdController);
router.post("/", postUsuarioController);
router.put("/:id", putUsuarioController);
router.delete("/:id", deleteUsuarioController);

export default router;
