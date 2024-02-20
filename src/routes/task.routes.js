import { Router } from "express";
import { createTask, deleteTask, findAllTasks, findOneTaskById, updateTask } from '../controllers/task.controller.js';

const router = Router();

router.get('/', findAllTasks);
router.get('/:id', findOneTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
