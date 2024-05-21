import express from 'express'
import { completedTodo, createTodo, deleteTodo, getCompletedTodos, getDeletedTodos, getTodos, getUncompletedTodos, restoreTodo, uncompletedTodo, updateTodo } from '../controllers/todos.controller';
import { isAuth } from '../middlewares/isAuth';

const router = express.Router();

router.post('/create-todo', isAuth, createTodo);
router.get('/get-todos', isAuth, getTodos);
router.get('/completed-todos/', isAuth, getCompletedTodos);
router.get('/uncompleted-todos/', isAuth, getUncompletedTodos);
router.delete('/delete-todo/:id', isAuth, deleteTodo);
router.put('/update-todo/:id', isAuth, updateTodo)
router.patch('/complete-todo/:id', isAuth, completedTodo)
router.patch('/uncomplete-todo/:id', isAuth, uncompletedTodo)
router.get('/get-deleted-todos', isAuth, getDeletedTodos)
router.patch('/restore-todo/:id', isAuth, restoreTodo)

export default router;