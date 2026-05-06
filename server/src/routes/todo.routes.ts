import {Router} from "express";
import { createTodo, deleteTodo, getAllTodos, toggleDone, updateTodo } from "../controllers/todo.controller";

const router = Router();

router.get("/", getAllTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.patch("/:id/done", toggleDone);
router.delete("/:id", deleteTodo);

export default router;