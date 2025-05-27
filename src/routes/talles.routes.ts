import { Router } from "express";
import {
  getAllTalleController,
  getTalleByIdController,
  postTalleController,
  putTalleController,
  deleteTalleController,
} from "../controllers/talleController";

const router = Router();

router.get("/", getAllTalleController);
router.get("/:id", getTalleByIdController);
router.post("/", postTalleController);
router.put("/:id", putTalleController);
router.delete("/:id", deleteTalleController);

export default router;
