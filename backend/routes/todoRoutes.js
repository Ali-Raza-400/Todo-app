import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { deleteTodo, getTodo, saveTodo } from "../controllers/todoController.js";

const router = express.Router();

router.route("/all").get(protect, getTodo);
router.route("/save").post(protect, saveTodo);
router.route("/delete").delete(protect, deleteTodo);
//   .put(protect, updateUserProfile);

export default router;
