import express from 'express'
import {
	getAllTodos,
	postAddTodo,
	putEditTodo,
	deleteTodo,
} from '../controllers/todos.js'

const router = express.Router()

router.post('/todos', postAddTodo)

router.get('/todos/:userLogin', getAllTodos)

router.put('/todos/:id', putEditTodo)

router.delete('/todos/:id', deleteTodo)

export default router
