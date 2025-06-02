import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import {
  getAllUsuariosController,
  getUsuarioByIdController,
  postUsuarioController,
  putUsuarioController,
  deleteUsuarioController,
} from "../controllers/usuarioController";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "default-secret";

//Middleware de JWT para ver si estamos autenticados

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    console.error("Error en la autenticacion: ", error);
    res.status(403).json({ error: "No tienes acceso a este recurso" });
  }
};

router.get("/", authenticateToken, getAllUsuariosController);
router.get("/:id", authenticateToken, getUsuarioByIdController);
router.post("/", authenticateToken, postUsuarioController);
router.put("/:id", authenticateToken, putUsuarioController);
router.delete("/:id", authenticateToken, deleteUsuarioController);

export default router;
